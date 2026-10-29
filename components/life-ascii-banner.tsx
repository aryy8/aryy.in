"use client";
import { useEffect, useRef } from "react";
import "./life-banner.css";

// Dense coloured ASCII render of the wing photo. The plane stays put; sky and clouds drift back past it.
const RAMP = " .'`,:;!i<+?|1tfjxnuczXUJCLQ0Zmwqpbhao#MW8B@";
const COLS = 240;                 // same density as the original static render
const Y0 = 0.11, YSPAN = 0.89;     // vertical slice of the photo shown in the 2:1 banner
const HORIZON = 0.42;             // photo y where the cloud deck starts
const CLEAN_W = 0.66;             // left part of the photo with no plane, used as moving texture

function inPlane(x: number, y: number) {
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
    const maskImg = new Image();
    maskImg.src = "/life/wing-mask.png";
    img.src = "/life/wing-src.jpg";
    let timer: ReturnType<typeof setInterval> | undefined;
    let alive = true, started = false;
    const ready = () => {
      if (!alive || started || !img.complete || !maskImg.complete || !img.naturalWidth || !maskImg.naturalWidth) return;
      started = true;
      // Area-average the photo down to one pixel per character cell (like the original render),
      // so the plane's curves come out smooth instead of point-sampled and jagged.
      const SW = COLS, SH = Math.round(COLS * (9 / 16) * (6 / 10));
      const shrink = (src: CanvasImageSource, w0: number, h0: number) => {
        let cur: CanvasImageSource = src, w = w0, h = h0;
        while (w / 2 > SW) {
          const c = document.createElement("canvas"); w = Math.round(w / 2); h = Math.round(h / 2);
          c.width = w; c.height = h; const x = c.getContext("2d")!; x.imageSmoothingQuality = "high";
          x.drawImage(cur, 0, 0, w, h); cur = c;
        }
        const out = document.createElement("canvas"); out.width = SW; out.height = SH;
        const ox = out.getContext("2d", { willReadFrequently: true })!; ox.imageSmoothingQuality = "high";
        ox.drawImage(cur, 0, 0, SW, SH);
        return ox.getImageData(0, 0, SW, SH).data;
      };
      const px = shrink(img, img.naturalWidth, img.naturalHeight);
      const md = shrink(maskImg, maskImg.naturalWidth, maskImg.naturalHeight);
      const mask = new Uint8Array(SW * SH);
      for (let i = 0; i < mask.length; i++) mask[i] = md[i * 4];
      // histogram equalisation of luminance, like the original render
      const hist = new Float64Array(256);
      for (let i = 0; i < px.length; i += 4) hist[(0.299 * px[i] + 0.587 * px[i + 1] + 0.114 * px[i + 2]) | 0]++;
      const cdf = new Float64Array(256); let acc = 0;
      for (let i = 0; i < 256; i++) { acc += hist[i]; cdf[i] = acc / (SW * SH); }
      const cleanW = Math.floor(SW * CLEAN_W);
      const ctx = canvas.getContext("2d")!;
      let t = 0;
      const draw = () => {
        const dark = document.documentElement.classList.contains("dark");
        const dpr = window.devicePixelRatio || 1;
        const w = canvas.clientWidth, h = canvas.clientHeight;
        if (canvas.width !== Math.round(w * dpr)) { canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr); }
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        const cw = w / COLS, ch = cw * (10 / 6);
        const rows = Math.ceil(h / ch);
        ctx.clearRect(0, 0, w, h);
        ctx.font = `bold ${cw * 1.5}px "DejaVu Sans Mono", Menlo, ui-monospace, monospace`;
        ctx.textBaseline = "top";
        for (let r = 0; r < rows; r++) {
          const ny = Y0 + (r / rows) * YSPAN;
          // one shared cloud speed keeps cloud shapes intact (no streaking)
          const shift = t;
          const sy = Math.min(SH - 1, (ny * SH) | 0);
          for (let c = 0; c < COLS; c++) {
            const nx = c / COLS;
            const sxi = Math.min(SW - 1, (nx * SW) | 0);
            const plane = mask[sy * SW + sxi] > 127;
            let R: number, G: number, B: number;
            if (ny > HORIZON - 0.03 && !plane) {
              // seamless loop over the clean cloud strip: period P, cross-fade the seam over BL cells,
              // bilinear between columns so motion is smooth instead of stepping a cell at a time
              const BL = 24, P = cleanW - BL;
              let u = ((nx * SW - shift) % P + P) % P;
              const tap = (x: number, ch: number) => {
                const x0 = Math.floor(x), f = x - x0;
                const a = px[(sy * SW + Math.min(SW - 1, x0)) * 4 + ch], b = px[(sy * SW + Math.min(SW - 1, x0 + 1)) * 4 + ch];
                return a + (b - a) * f;
              };
              const T = (ch: number) => u < BL ? tap(u + P, ch) + (tap(u, ch) - tap(u + P, ch)) * (u / BL) : tap(u, ch);
              R = T(0); G = T(1); B = T(2);
            } else {
              const i = (sy * SW + sxi) * 4;
              R = px[i]; G = px[i + 1]; B = px[i + 2];
            }
            let v = cdf[Math.min(255, (0.299 * R + 0.587 * G + 0.114 * B) | 0)];
            const m = Math.max(R, G, B, 1);
            let k: number, ci: number;
            if (ny < HORIZON && !plane) {
              // high, thin wisps drifting slowly across the sky so it isn't static
              const sx2 = nx * 9 - t * 0.012, sy2 = ny * 22;
              const wisp = Math.max(0, Math.sin(sx2 + Math.sin(sy2 * 0.7 + sx2 * 0.3) * 1.6) * Math.sin(sy2 + sx2 * 0.4) - 0.55) * 1.6;
              const shimmer = 0.04 * Math.sin(nx * 14 + ny * 30 - t * 0.05);
              v = Math.min(1, v + wisp * 0.5 + shimmer);
            }

            if (dark) {
              k = (170 + 85 * v) / m;
              ci = Math.floor(v * RAMP.length);
            } else {
              // light mode: ink on paper, so darker parts of the photo get denser, deeper-coloured glyphs
              k = (40 + 120 * v) / m;
              ci = Math.floor((1 - v * 0.85) * RAMP.length);
            }
            ci = Math.max(2, Math.min(RAMP.length - 1, ci));
            // designed palette: sky fades from deep azure to pale ice at the horizon,
            // clouds go from periwinkle shadows to pure white highlights
            const lerp = (x: number, y: number, q: number) => x + (y - x) * q;
            let cr: number, cg: number, cb: number;
            if (ny < HORIZON) {
              const q = Math.pow(Math.max(0, (ny - Y0) / (HORIZON - Y0)), 1.6);
              cr = lerp(56, 214, q); cg = lerp(132, 234, q); cb = lerp(255, 255, q);
              const wq = Math.max(0, v - 0.5) * 0.9; cr = lerp(cr, 255, wq); cg = lerp(cg, 255, wq); cb = lerp(cb, 255, wq);
            } else {
              const q = Math.pow(v, 0.9);
              cr = lerp(98, 255, q); cg = lerp(140, 255, q); cb = lerp(225, 255, q);
            }
            if (plane) {
              // aircraft drawn exactly like the original static render: true photo colours
              const k0 = (120 + 135 * v) / m;
              cr = R * k0; cg = G * k0; cb = B * k0;
              ci = Math.max(2, Math.min(RAMP.length - 1, Math.floor(v * RAMP.length)));
            }
            if (!dark) {
              // light card: ink on a pale sky. Bright photo areas become sparse, pale glyphs; shadows become dense blue ink
              const lv = Math.pow(v, 2.4);
              const q = lv;
              ci = Math.max(2, Math.min(RAMP.length - 1, Math.floor((1 - lv * 0.8) * RAMP.length)));
              if (plane) {
                const k1 = (10 + 110 * lv) / m;
                cr = R * k1; cg = G * k1; cb = B * k1 + 18;
              } else if (ny < HORIZON) {
                cr = lerp(35, 120, q); cg = lerp(95, 165, q); cb = lerp(215, 240, q);
              } else {
                cr = lerp(18, 135, q); cg = lerp(45, 172, q); cb = lerp(125, 235, q);
              }
            }
            ctx.fillStyle = `rgb(${Math.min(255, cr) | 0},${Math.min(255, cg) | 0},${Math.min(255, cb) | 0})`;
            ctx.fillText(RAMP[ci], c * cw, r * ch);
          }
        }
        t += 0.3;
      };
      draw();
      if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) timer = setInterval(draw, 30);
    };
    img.onload = ready; maskImg.onload = ready; ready();
    return () => { alive = false; if (timer) clearInterval(timer); };
  }, []);
  return <canvas ref={ref} aria-hidden="true" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", display: "block" }} />;
}
