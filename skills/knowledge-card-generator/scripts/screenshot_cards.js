const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

async function screenshotCards(htmlDir, outputDir) {
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 900, height: 1200 },
    deviceScaleFactor: 2
  });
  const page = await context.newPage();

  const htmlFiles = fs.readdirSync(htmlDir)
    .filter(f => f.endsWith('.html'))
    .sort();

  let successCount = 0;

  for (const file of htmlFiles) {
    const htmlPath = path.join(htmlDir, file);
    const fileUrl = 'file:///' + htmlPath.replace(/\\/g, '/');

    try {
      await page.goto(fileUrl, { waitUntil: 'networkidle', timeout: 15000 });
    } catch (e) {
      console.log('跳过（加载超时）: ' + file);
      continue;
    }

    const card = await page.$('.card');
    if (card) {
      const pngName = file.replace('.html', '.png');
      const outputPath = path.join(outputDir, pngName);
      await card.screenshot({
        path: outputPath,
        clip: { x: 0, y: 0, width: 900, height: 1200 }
      });

      // Verify file size
      const stats = fs.statSync(outputPath);
      if (stats.size > 1000) {
        console.log('已保存: ' + pngName + ' (' + Math.round(stats.size / 1024) + 'KB)');
        successCount++;
      } else {
        console.log('警告: ' + pngName + ' 文件过小，可能截图失败');
      }
    } else {
      console.log('跳过（未找到.card元素）: ' + file);
    }
  }

  await browser.close();
  console.log('\n===== 截图完成！成功 ' + successCount + '/' + htmlFiles.length + ' 张 =====');
  console.log('输出目录: ' + outputDir);
}

// CLI usage: node screenshot_cards.js <htmlDir> <outputDir>
const htmlDir = process.argv[2];
const outputDir = process.argv[3];

if (!htmlDir || !outputDir) {
  console.error('用法: node screenshot_cards.js <HTML目录> <输出目录>');
  process.exit(1);
}

if (!fs.existsSync(htmlDir)) {
  console.error('HTML目录不存在: ' + htmlDir);
  process.exit(1);
}

screenshotCards(htmlDir, outputDir).catch(e => {
  console.error('截图失败:', e.message);
  process.exit(1);
});
