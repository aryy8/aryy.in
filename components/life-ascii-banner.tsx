"use client";
import { useEffect, useRef } from "react";
import "./life-banner.css";

// Dense coloured ASCII render of the wing photo. The plane stays put; sky and clouds drift back past it.
const RAMP = " .'`,:;!i<+?|1tfjxnuczXUJCLQ0Zmwqpbhao#MW8B@";
const COLS = 240;                 // same density as the original static render
const Y0 = 0.24, YSPAN = 0.6;     // vertical slice of the photo shown in the 3:1 banner
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
      const SW = 960, SH = 540;
      const off = document.createElement("canvas");
      off.width = SW; off.height = SH;
      const octx = off.getContext("2d", { willReadFrequently: true })!;
      octx.drawImage(img, 0, 0, SW, SH);
      const px = octx.getImageData(0, 0, SW, SH).data;
      octx.clearRect(0, 0, SW, SH);
      octx.drawImage(maskImg, 0, 0, SW, SH);
      const md = octx.getImageData(0, 0, SW, SH).data;
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
        const dark = true; // card is always dark; see life-banner.css
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
          // far things (sky, horizon) crawl, near clouds rush past
          const depth = Math.max(0, (ny - HORIZON + 0.05) / (1 - HORIZON));
          const shift = t * (0.12 + 2.6 * depth * depth);
          const sy = Math.min(SH - 1, (ny * SH) | 0);
          for (let c = 0; c < COLS; c++) {
            const nx = c / COLS;
            let sx = nx * SW;
            const plane = mask[(sy * SW + Math.min(SW - 1, (nx * SW) | 0))] > 127;
            if (ny > HORIZON - 0.03 && !plane) {
              let u = (((sx - shift) % (cleanW * 2)) + cleanW * 2) % (cleanW * 2);
              if (u > cleanW) u = cleanW * 2 - u;
              sx = u;
            }
            const i = (sy * SW + Math.min(SW - 1, sx | 0)) * 4;
            const R = px[i], G = px[i + 1], B = px[i + 2];
            const v = cdf[(0.299 * R + 0.587 * G + 0.114 * B) | 0];
            const m = Math.max(R, G, B, 1);
            let k: number, ci: number;
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
            ctx.fillStyle = `rgb(${Math.min(255, cr) | 0},${Math.min(255, cg) | 0},${Math.min(255, cb) | 0})`;
            ctx.fillText(RAMP[ci], c * cw, r * ch);
          }
        }
        t += 2.2;
      };
      draw();
      if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) timer = setInterval(draw, 60);
    };
    img.onload = ready; maskImg.onload = ready; ready();
    return () => { alive = false; if (timer) clearInterval(timer); };
  }, []);
  return <canvas ref={ref} aria-hidden="true" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", display: "block" }} />;
}
