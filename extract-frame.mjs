import puppeteer from 'puppeteer';

const url = process.argv[2];
const outPath = process.argv[3];
const seekTime = parseFloat(process.argv[4] || '1.5');

const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--autoplay-policy=no-user-gesture-required'] });
const page = await browser.newPage();
await page.setViewport({ width: 1280, height: 720 });

await page.setContent(`<html><body style="margin:0;background:#000;"><video id="v" src="${url}" muted playsinline style="width:1280px;height:720px;display:block;"></video></body></html>`);

await page.evaluate((t) => {
  return new Promise((resolve, reject) => {
    const v = document.getElementById('v');
    let seeked = false;
    v.addEventListener('seeked', () => { if (!seeked) { seeked = true; resolve(); } });
    v.addEventListener('error', () => reject(new Error('video error: ' + JSON.stringify(v.error))));
    v.addEventListener('canplaythrough', () => {
      if (seeked) return;
      v.currentTime = Math.min(t, (v.duration || t) * 0.5);
    }, { once: true });
    v.load();
    setTimeout(() => reject(new Error('timeout waiting for video, readyState=' + v.readyState + ' networkState=' + v.networkState + ' error=' + JSON.stringify(v.error))), 15000);
  });
}, seekTime);

const handle = await page.$('#v');
await handle.screenshot({ path: outPath });
await browser.close();
console.log('Saved frame to', outPath);
