// Frames 2x screenshots (scripts/raw/<slug>.png) centred on per-project gradients and exports WebP + AVIF to public/projects. Optional arg: a single slug.
import { chromium } from 'playwright';
import sharp from 'sharp';
import fs from 'fs';
const g = {petal:['#166534','#86efac','#0a1f14'], mingraph:['#1e293b','#3b82f6','#0b0f19'], lattice:['#1e3a8a','#60a5fa','#0a0f1f'], texlab:['#27272a','#94a3b8','#0b0b0d'], uniway:['#3b0764','#f97316','#120a10']};
const b = await chromium.launch(); const p = await b.newPage({viewport:{width:800,height:500}, deviceScaleFactor:2});
for (const [k,[a,c,d]] of Object.entries(g).filter(([k])=>!process.argv[2]||k===process.argv[2])) {
  const img = fs.readFileSync(`scripts/raw/${k}.png`).toString('base64');
  await p.setContent(`<html><body style="margin:0"><div style="width:800px;height:500px;display:flex;align-items:center;justify-content:center;background:radial-gradient(120% 90% at 85% 0%, ${c}77 0%, transparent 55%),radial-gradient(90% 80% at 0% 100%, ${c}33 0%, transparent 60%),linear-gradient(140deg, ${a} 0%, ${d} 100%)">
  <div style="width:720px;${k==='petal'?'':'height:420px;'}line-height:0;border-radius:14px;overflow:hidden;box-shadow:0 24px 50px -12px rgba(0,0,0,.65),0 0 0 1px rgba(255,255,255,.10)">
   <img src="data:image/png;base64,${img}" style="display:block;width:100%;height:${k==='petal'?'auto':'100%'};object-fit:cover;object-position:top center"></div></div></body></html>`);
  await p.waitForTimeout(150);
  const buf = await p.screenshot();
  await sharp(buf).webp({quality:88}).toFile(`public/projects/${k}.webp`);
  await sharp(buf).avif({quality:62}).toFile(`public/projects/${k}.avif`);
}
await b.close();
