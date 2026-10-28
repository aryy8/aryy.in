"use client";
import { useEffect, useRef } from "react";

// Animated ASCII render of the wing photo: sky + plane stay put, clouds drift past with parallax.
const RAMP = " .'`,:;!i<+?|1tfjxnuczXUJCLQ0Zmwqpbhao#MW8B@";
const Y0 = 0.12, YSPAN = 0.6; // vertical slice of the photo shown in the banner
const HORIZON = 0.42; // photo y where clouds start
const CLEAN_W = 0.66; // left part of photo with no plane, used as cloud texture

function inPlane(x: number, y: number) {
  // rough shapes (normalized photo coords) for the wing, winglet and engine
  const winglet = x > 0.79 && x < 0.845 && y > 0.155 && y < 0.3;
  const wing = x > 0.79 && y > 0.26 + (x - 0.8) * 0.2 && y < 0.31 + (x - 0.8) * 0.85;
  const engine = x > 0.68 && y > 0.63 - (x - 0.68) * 0.52;
  return winglet || wing || engine;
}

export function LifeAsciiBanner() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current!;
    const img = new Image();
    img.src = "/life/wing-src.jpg";
    let timer: ReturnType<typeof setInterval> | undefined;
    img.onload = () => {
      const SW = 640, SH = 360;
      const off = document.createElement("canvas");
      off.width = SW; off.height = SH;
      const octx = off.getContext("2d", { willReadFrequently: true })!;
      octx.drawImage(img, 0, 0, SW, SH);
      const px = octx.getImageData(0, 0, SW, SH).data;
      const cleanW = Math.floor(SW * CLEAN_W);
      const sample = (sx: number, sy: number) => {
        const i = (Math.min(SH - 1, Math.max(0, sy | 0)) * SW + Math.min(SW - 1, Math.max(0, sx | 0))) * 4;
        return [px[i], px[i + 1], px[i + 2]];
      };
      const ctx = canvas.getContext("2d")!;
      let t = 0;
      const draw = () => {
        const dpr = window.devicePixelRatio || 1;
        const w = canvas.clientWidth, h = canvas.clientHeight;
        if (canvas.width !== Math.round(w * dpr)) { canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr); }
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        const cols = Math.max(80, Math.round(w / 2.6));
        const cw = w / cols, ch = cw * 1.7;
        const rows = Math.ceil(h / ch);
        ctx.fillStyle = "#02040a"; ctx.fillRect(0, 0, w, h);
        ctx.font = `bold ${ch * 0.95}px ui-monospace, Menlo, monospace`;
        ctx.textBaseline = "top";
        for (let r = 0; r < rows; r++) {
          const ny = Y0 + (r / rows) * YSPAN;
          const depth = Math.max(0, (ny - HORIZON) / (1 - HORIZON));
          const shift = t * (0.15 + 3.2 * depth * depth);
          for (let c = 0; c < cols; c++) {
            const nx = c / cols;
            let sx = nx * SW;
            const sy = ny * SH;
            if (ny > HORIZON - 0.02 && !inPlane(nx, ny)) {
              // clouds scroll right-to-left past the window, mirrored tiling for a seamless loop
              let u = (sx + shift) % (cleanW * 2);
              if (u > cleanW) u = cleanW * 2 - u;
              sx = u;
            }
            const [R, G, B] = sample(sx, sy);
            const lum = (0.299 * R + 0.587 * G + 0.114 * B) / 255;
            const m = Math.max(R, G, B, 1), k = (115 + 140 * lum) / m;
            const ci = Math.max(2, Math.min(RAMP.length - 1, Math.floor(Math.pow(lum, 0.85) * RAMP.length)));
            ctx.fillStyle = `rgb(${Math.min(255, R * k) | 0},${Math.min(255, G * k) | 0},${Math.min(255, B * k) | 0})`;
            ctx.fillText(RAMP[ci], c * cw, r * ch);
          }
        }
        t += 2.4;
      };
      draw();
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (!reduce) timer = setInterval(draw, 50);
    };
    return () => { if (timer) clearInterval(timer); };
  }, []);
  return <canvas ref={ref} aria-hidden="true" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", display: "block" }} />;
}
