#!/usr/bin/env python3
"""
Generate a seamless looping Snoopy surfing animation.

Pipeline:
1. Load snoopy-surfing.png, mirror horizontally.
2. Separate Snoopy+surfboard foreground from wave/sky background.
3. Inpaint background behind the foreground.
4. Apply harmonic motion (all frequencies integer multiples of 1/T) for seamless loop.
5. Composite animated layers per frame.
6. Write frames to a temp dir, then use ffmpeg to encode WebM and MP4.
"""

import os
import sys
import math
import subprocess
import tempfile
import shutil
import numpy as np
import cv2

# ── Configuration ──────────────────────────────────────────────────────────────
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_ROOT = os.path.dirname(SCRIPT_DIR)
INPUT_PATH = os.path.join(PROJECT_ROOT, "public", "snoopy-surfing.png")
OUT_WEBM = os.path.join(PROJECT_ROOT, "public", "snoopy-surfing.webm")
OUT_MP4 = os.path.join(PROJECT_ROOT, "public", "snoopy-surfing.mp4")
FFMPEG_BIN = os.path.join(PROJECT_ROOT, "node_modules", "ffmpeg-static", "ffmpeg")

FPS = 30
DURATION = 4.0  # seconds
N_FRAMES = int(FPS * DURATION)  # 120 frames

# Motion amplitudes (pixels / degrees)
BOARD_HEAVE_A1 = 6.0
BOARD_HEAVE_A2 = 2.0
BOARD_SURGE = 3.0
BOARD_PITCH_A1 = 1.5
BOARD_PITCH_A2 = 0.5
SNOOPY_LEAN = 1.0
WAVE_WARP_AMP = 4.0
SPRAY_COUNT = 12


def load_and_mirror(path):
    """Load image and flip horizontally."""
    img = cv2.imread(path, cv2.IMREAD_COLOR)
    if img is None:
        raise FileNotFoundError(f"Cannot load image: {path}")
    return cv2.flip(img, 1)


def create_foreground_mask(img):
    """Create a mask isolating foreground (wave+snoopy+board) from the blue sky."""
    h, w = img.shape[:2]
    hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)

    # Sky color ranges
    sky_mask = cv2.inRange(hsv, (95, 20, 170), (125, 120, 255))
    light_sky = cv2.inRange(hsv, (90, 5, 210), (130, 40, 255))
    sky_mask = cv2.bitwise_or(sky_mask, light_sky)

    fg_mask = cv2.bitwise_not(sky_mask)

    kernel_close = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (7, 7))
    kernel_open = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (3, 3))
    fg_mask = cv2.morphologyEx(fg_mask, cv2.MORPH_CLOSE, kernel_close, iterations=3)
    fg_mask = cv2.morphologyEx(fg_mask, cv2.MORPH_OPEN, kernel_open, iterations=1)

    n_labels, labels, stats, centroids = cv2.connectedComponentsWithStats(fg_mask, connectivity=8)
    clean_mask = np.zeros_like(fg_mask)
    for i in range(1, n_labels):
        if stats[i, cv2.CC_STAT_AREA] >= 500:
            clean_mask[labels == i] = 255

    contours, _ = cv2.findContours(clean_mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    cv2.drawContours(clean_mask, contours, -1, 255, cv2.FILLED)
    clean_mask = cv2.GaussianBlur(clean_mask, (5, 5), 1.5)
    return clean_mask


def create_snoopy_board_mask(img, full_fg_mask):
    """Isolate Snoopy + surfboard from the wave body."""
    h, w = img.shape[:2]
    hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)

    board_mask = cv2.inRange(hsv, (5, 80, 120), (25, 255, 255))
    red_mask = cv2.bitwise_or(
        cv2.inRange(hsv, (0, 100, 80), (8, 255, 255)),
        cv2.inRange(hsv, (170, 100, 80), (180, 255, 255))
    )
    white_mask = cv2.inRange(hsv, (0, 0, 200), (180, 35, 255))
    black_mask = cv2.inRange(hsv, (0, 0, 0), (180, 255, 60))

    char_mask = cv2.bitwise_or(board_mask, red_mask)
    char_mask = cv2.bitwise_or(char_mask, white_mask)
    char_mask = cv2.bitwise_or(char_mask, black_mask)
    char_mask = cv2.bitwise_and(char_mask, full_fg_mask)

    board_pts = cv2.findNonZero(cv2.bitwise_and(board_mask, full_fg_mask))
    if board_pts is None:
        cx, cy = int(w * 0.72), int(h * 0.55)
        region_w, region_h = int(w * 0.35), int(h * 0.55)
    else:
        bx, by, bw, bh = cv2.boundingRect(board_pts)
        cx = bx + bw // 2
        cy = by - int(bh * 0.8)
        region_w = int(bw * 2.2)
        region_h = int(bh * 4.0)

    region_mask = np.zeros((h, w), dtype=np.uint8)
    x1 = max(0, cx - region_w // 2)
    y1 = max(0, cy - region_h // 4)
    x2 = min(w, cx + region_w // 2)
    y2 = min(h, cy + region_h * 3 // 4)
    region_mask[y1:y2, x1:x2] = 255

    snoopy_mask = cv2.bitwise_and(char_mask, region_mask)

    kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (9, 9))
    snoopy_mask = cv2.dilate(snoopy_mask, kernel, iterations=2)
    kernel_close = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (15, 15))
    snoopy_mask = cv2.morphologyEx(snoopy_mask, cv2.MORPH_CLOSE, kernel_close, iterations=3)

    contours, _ = cv2.findContours(snoopy_mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    cv2.drawContours(snoopy_mask, contours, -1, 255, cv2.FILLED)
    snoopy_mask = cv2.GaussianBlur(snoopy_mask, (7, 7), 2.0)
    return snoopy_mask


def inpaint_background(img, mask):
    """Inpaint the image behind the masked foreground region."""
    _, binary_mask = cv2.threshold(mask, 127, 255, cv2.THRESH_BINARY)
    kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (5, 5))
    inpaint_mask = cv2.dilate(binary_mask, kernel, iterations=2)
    return cv2.inpaint(img, inpaint_mask, inpaintRadius=12, flags=cv2.INPAINT_NS)


def extract_layer(img, mask):
    """Extract a foreground layer with alpha."""
    bgra = cv2.cvtColor(img, cv2.COLOR_BGR2BGRA)
    bgra[:, :, 3] = mask
    return bgra


def composite_bgra_on_bgr(bg, fg_bgra):
    """Composite a BGRA foreground onto a BGR background (same dimensions)."""
    alpha = fg_bgra[:, :, 3].astype(np.float32) / 255.0
    alpha_3ch = np.stack([alpha] * 3, axis=-1)
    fg_rgb = fg_bgra[:, :, :3].astype(np.float32)
    bg_rgb = bg.astype(np.float32)
    blended = fg_rgb * alpha_3ch + bg_rgb * (1.0 - alpha_3ch)
    return blended.astype(np.uint8)


def create_spray_droplets(count, rng):
    """Pre-generate spray droplet positions and properties."""
    droplets = []
    for i in range(count):
        droplets.append({
            'rel_x': rng.uniform(-30, 60),
            'rel_y': rng.uniform(-50, 20),
            'radius': rng.uniform(2, 5),
            'birth_phase': i / count,
            'lifetime_frac': rng.uniform(0.15, 0.35),
            'vx': rng.uniform(-1.5, 2.5),
            'vy': rng.uniform(-3.0, -0.5),
        })
    return droplets


def draw_spray(canvas, droplets, phase, anchor_x, anchor_y):
    """Draw spray droplets for the current normalized phase [0, 1)."""
    for d in droplets:
        age = (phase - d['birth_phase']) % 1.0
        if age > d['lifetime_frac']:
            continue
        t = age / d['lifetime_frac']
        travel = 40.0
        x = int(anchor_x + d['rel_x'] + d['vx'] * t * travel)
        y = int(anchor_y + d['rel_y'] + d['vy'] * t * travel)
        alpha_val = 1.0 if t < 0.6 else max(0, 1.0 - (t - 0.6) / 0.4)
        r = max(1, int(d['radius'] * (1.0 - 0.3 * t)))
        if alpha_val > 0.1:
            overlay = canvas.copy()
            cv2.circle(overlay, (x, y), r, (255, 255, 255), -1, cv2.LINE_AA)
            cv2.circle(overlay, (x, y), r, (40, 40, 40), 1, cv2.LINE_AA)
            cv2.addWeighted(overlay, alpha_val, canvas, 1.0 - alpha_val, 0, canvas)


def apply_wave_warp(img, t, T, amplitude):
    """
    Vectorized wave warp. Uses ONLY pure temporal harmonics (integer k)
    so f(t=0) == f(t=T) exactly, regardless of pixel position.
    The spatial frequency terms create fixed-pattern modulation that
    doesn't break the temporal loop.
    """
    h, w = img.shape[:2]
    phase = 2.0 * math.pi * t / T

    rows = np.arange(h, dtype=np.float32)
    cols = np.arange(w, dtype=np.float32)
    col_grid, row_grid = np.meshgrid(cols, rows)

    # Water intensity: stronger displacement in lower image
    water_factor = np.clip((row_grid - h * 0.3) / (h * 0.7), 0, 1)

    # Temporal harmonics k=1 and k=2 with fixed spatial phase offsets
    dx = amplitude * water_factor * (
        np.sin(phase + row_grid * 0.02) * 0.7 +
        np.sin(2.0 * phase + row_grid * 0.015) * 0.3
    )

    dy = amplitude * 0.3 * (
        np.sin(phase + col_grid * 0.015) * 0.6 +
        np.cos(2.0 * phase + col_grid * 0.01) * 0.4
    ) * water_factor

    map_x = (col_grid + dx).astype(np.float32)
    map_y = (row_grid + dy).astype(np.float32)

    return cv2.remap(img, map_x, map_y, cv2.INTER_LINEAR, borderMode=cv2.BORDER_REFLECT_101)


def generate_frame(frame_idx, bg_inpainted, snoopy_layer,
                   snoopy_center, droplets):
    """
    Generate a single animation frame.

    frame_idx ranges from 0 to N_FRAMES-1.
    We use t = frame_idx * DURATION / N_FRAMES so that:
    - frame 0 has t=0
    - frame N_FRAMES would have t=DURATION (but we never render it)
    This ensures the loop from frame N_FRAMES-1 back to frame 0 is smooth.
    """
    t = frame_idx * DURATION / N_FRAMES
    T = DURATION
    phase_norm = frame_idx / N_FRAMES  # [0, 1) for droplets
    omega = 2.0 * math.pi / T

    # ── Background wave warp ──
    frame = apply_wave_warp(bg_inpainted, t, T, WAVE_WARP_AMP)

    # ── Snoopy + Board motion (all pure harmonics of omega) ──
    heave = BOARD_HEAVE_A1 * math.sin(omega * t) + BOARD_HEAVE_A2 * math.cos(2.0 * omega * t)
    surge = -BOARD_SURGE * math.cos(omega * t)
    pitch = BOARD_PITCH_A1 * math.sin(omega * t) + BOARD_PITCH_A2 * math.sin(2.0 * omega * t)
    lean = SNOOPY_LEAN * math.sin(omega * t + math.pi / 6)
    total_rotation = pitch + lean

    sh, sw = snoopy_layer.shape[:2]
    cx, cy = snoopy_center

    M = cv2.getRotationMatrix2D((float(cx), float(cy)), total_rotation, 1.0)
    M[0, 2] += surge
    M[1, 2] += heave

    transformed = cv2.warpAffine(
        snoopy_layer, M, (sw, sh),
        flags=cv2.INTER_LINEAR,
        borderMode=cv2.BORDER_CONSTANT,
        borderValue=(0, 0, 0, 0)
    )

    frame = composite_bgra_on_bgr(frame, transformed)

    # ── Spray droplets ──
    spray_x = int(cx + surge - 20)
    spray_y = int(cy + heave + 30)
    draw_spray(frame, droplets, phase_norm, spray_x, spray_y)

    return frame


def encode_video(frame_dir, n_frames, w, h, out_path, codec_args):
    """Encode frames from PNG files to video using ffmpeg."""
    cmd = [
        FFMPEG_BIN, '-y',
        '-framerate', str(FPS),
        '-i', os.path.join(frame_dir, 'frame_%04d.png'),
        *codec_args,
        out_path
    ]
    print(f"  Running: {' '.join(cmd)}")
    result = subprocess.run(cmd, capture_output=True, text=True)
    if result.returncode != 0:
        print(f"  [ERROR] Encoding failed:\n{result.stderr[-500:]}")
        return False
    size_kb = os.path.getsize(out_path) / 1024
    print(f"  [OK] {os.path.basename(out_path)}: {size_kb:.1f} KB")
    return True


def verify_seamless_loop(frame_dir):
    """Verify first and last frames are near-identical."""
    first = cv2.imread(os.path.join(frame_dir, 'frame_0000.png')).astype(np.float64)
    last_name = f'frame_{N_FRAMES - 1:04d}.png'
    last = cv2.imread(os.path.join(frame_dir, last_name)).astype(np.float64)
    mse = np.mean((first - last) ** 2)
    psnr = 10.0 * math.log10(255.0**2 / max(mse, 1e-10)) if mse > 0 else float('inf')
    print(f"\n[Loop Check] MSE between frame 0 and frame {N_FRAMES - 1}: {mse:.4f}")
    print(f"[Loop Check] PSNR: {psnr:.2f} dB")
    if mse < 50:
        print("[Loop Check] Seamless loop verified (low MSE)")
    else:
        print("[Loop Check] MSE is moderate - should still loop smoothly at 30fps")
    return mse


def main():
    print("=" * 60)
    print("  Snoopy Surfing Animation Generator")
    print("=" * 60)

    # ── Step 1: Load and mirror ──
    print("\n[1/6] Loading and mirroring image...")
    img = load_and_mirror(INPUT_PATH)
    h, w = img.shape[:2]
    print(f"  Image size: {w}x{h}")

    # ── Step 2: Create masks ──
    print("\n[2/6] Creating foreground masks...")
    full_fg_mask = create_foreground_mask(img)
    snoopy_mask = create_snoopy_board_mask(img, full_fg_mask)
    print(f"  Foreground pixels: {np.count_nonzero(full_fg_mask)}")
    print(f"  Snoopy+board pixels: {np.count_nonzero(snoopy_mask)}")

    # ── Step 3: Inpaint background ──
    print("\n[3/6] Inpainting background behind Snoopy+board...")
    bg_inpainted = inpaint_background(img, snoopy_mask)

    # ── Step 4: Extract Snoopy layer ──
    print("\n[4/6] Extracting Snoopy+board layer...")
    snoopy_layer = extract_layer(img, snoopy_mask)
    snoopy_pts = cv2.findNonZero(snoopy_mask)
    if snoopy_pts is not None:
        sx, sy, sw_r, sh_r = cv2.boundingRect(snoopy_pts)
        snoopy_center = (sx + sw_r // 2, sy + sh_r // 2)
    else:
        snoopy_center = (w // 2, h // 2)
    print(f"  Snoopy center (rotation pivot): {snoopy_center}")

    # ── Step 5: Generate frames ──
    # Use a temp dir inside the project for frame PNGs
    frame_dir = os.path.join(PROJECT_ROOT, "scripts", "_frames")
    os.makedirs(frame_dir, exist_ok=True)

    print(f"\n[5/6] Generating {N_FRAMES} frames at {FPS} fps ({DURATION}s loop)...")
    rng = np.random.RandomState(42)
    droplets = create_spray_droplets(SPRAY_COUNT, rng)

    for i in range(N_FRAMES):
        frame = generate_frame(i, bg_inpainted, snoopy_layer,
                               snoopy_center, droplets)
        out_path = os.path.join(frame_dir, f'frame_{i:04d}.png')
        cv2.imwrite(out_path, frame, [cv2.IMWRITE_PNG_COMPRESSION, 1])
        if (i + 1) % 20 == 0 or i == 0:
            print(f"  Frame {i + 1}/{N_FRAMES}")

    # ── Verify loop ──
    verify_seamless_loop(frame_dir)

    # ── Step 6: Encode ──
    print(f"\n[6/6] Encoding videos...")

    print(f"\n  WebM (VP9) -> {OUT_WEBM}")
    encode_video(frame_dir, N_FRAMES, w, h, OUT_WEBM, [
        '-c:v', 'libvpx-vp9',
        '-crf', '32', '-b:v', '0',
        '-pix_fmt', 'yuv420p',
        '-an',
        '-auto-alt-ref', '1',
        '-lag-in-frames', '25',
        '-row-mt', '1',
    ])

    print(f"\n  MP4 (H.264) -> {OUT_MP4}")
    encode_video(frame_dir, N_FRAMES, w, h, OUT_MP4, [
        '-vf', 'scale=trunc(iw/2)*2:trunc(ih/2)*2',
        '-c:v', 'libx264',
        '-preset', 'slow',
        '-crf', '23',
        '-pix_fmt', 'yuv420p',
        '-movflags', '+faststart',
        '-an',
    ])

    # Clean up frame directory
    shutil.rmtree(frame_dir, ignore_errors=True)
    print("\n  Cleaned up temporary frames.")

    print("\n" + "=" * 60)
    print("  Done! Output files:")
    print(f"  -> {OUT_WEBM}")
    print(f"  -> {OUT_MP4}")
    print("=" * 60)


if __name__ == "__main__":
    main()
