// Frames 2x Playwright captures (scripts/raw/<slug>.png) on per-project gradients and exports WebP + AVIF to public/projects.
import { chromium } from 'playwright';
import sharp from 'sharp';
import fs from 'fs';
const g = {petal:['#064e3b','#10b981','#0b1210'], mingraph:['#1e293b','#3b82f6','#0b0f19'], lattice:['#1e3a8a','#60a5fa','#0a0f1f'], texlab:['#27272a','#94a3b8','#0b0b0d'], uniway:['#3b0764','#f97316','#120a10']};
const b = await chromium.launch(); const p = await b.newPage({viewport:{width:800,height:500}, deviceScaleFactor:2});
for (const [k,[a,c,d]] of Object.entries(g)) {
  const img = fs.readFileSync(`scripts/raw/${k}.png`).toString('base64');
  await p.setContent(`<html><body style="margin:0"><div style="width:800px;height:500px;background:radial-gradient(120% 90% at 85% 0%, ${c}88 0%, transparent 55%),linear-gradient(140deg, ${a} 0%, ${d} 100%);display:flex;align-items:flex-end;justify-content:center;overflow:hidden">
  <div style="width:680px;margin-bottom:-24px;border-radius:14px;overflow:hidden;box-shadow:0 30px 60px -10px rgba(0,0,0,.6),0 0 0 1px rgba(255,255,255,.12);background:#1a1a1d">
   <div style="height:26px;display:flex;align-items:center;gap:6px;padding:0 12px;background:#202024"><i style="width:9px;height:9px;border-radius:50%;background:#ff5f57"></i><i style="width:9px;height:9px;border-radius:50%;background:#febc2e"></i><i style="width:9px;height:9px;border-radius:50%;background:#28c840"></i><span style="margin-left:12px;font:11px system-ui;color:#9a9aa2">${k}.aryy.in</span></div>
   <img src="data:image/png;base64,${img}" style="display:block;width:680px"></div></div></body></html>`);
  const buf = await p.screenshot();
  await sharp(buf).webp({quality:82}).toFile(`public/projects/${k}.webp`);
  await sharp(buf).avif({quality:55}).toFile(`public/projects/${k}.avif`);
}
await b.close();
