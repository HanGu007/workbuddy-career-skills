# 知识卡片生成器

> 本 Skill 为「职途星」专家的能力模块，负责将文字材料/原始素材转化为精美的知识卡片组。核心目标：干货满满、逻辑清晰、有分享欲和收藏欲。

## 触发时机

当用户发送原始素材（文章、笔记、文档内容、文字材料等）并要求生成知识卡片时启用。

## 核心设计原则

**干货密度最大化 + 视觉吸引力 = 让人想收藏和分享**

1. **内容为王**：每张卡片的信息密度要高，不留大片空白
2. **逻辑清晰**：卡片之间有递进关系，单张卡片内部结构分明
3. **字体放大**：正文≥16pt，标题≥24pt，关键数据≥28pt
4. **3:4比例**：宽度900px × 高度1200px
5. **配色统一**：一组卡片使用同一套配色方案，视觉连贯

## 完整工作流程

### 步骤1：内容分析与干货总结 ✅必做

1. **通读材料**：仔细阅读用户提供的全部原始素材
2. **提取核心观点**：识别材料中的关键论点、数据、方法、结论
3. **去除水分**：删除过渡句、套话、重复内容，只保留干货
4. **逻辑梳理**：按内在逻辑关系（并列/递进/因果/时间线）组织内容

**输出**：在对话中简要展示分析结果（3-5句话概括材料核心内容+分章结构）

### 步骤2：分章节/分段规划 ✅必做

1. **确定卡片组结构**：根据材料内容确定分为几个章节/主题
2. **每章分配1-N张卡片**：内容多的章节可拆为多张，内容少的可合并
3. **规划每张卡片的信息量**：每张卡片聚焦1个核心观点，包含2-4个支撑要点
4. **确定卡片顺序**：封面卡→章节卡→内容卡→总结卡

**卡片类型**：

| 类型 | 用途 | 数量 |
|------|------|------|
| 封面卡 | 主题+吸引眼球的标题 | 1张 |
| 章节引导卡 | 章节标题+本章核心要点预告 | 每章0-1张 |
| 内容卡 | 核心干货，每卡1个主题 | 按内容量决定 |
| 总结卡 | 全文核心要点回顾+行动建议 | 1张 |

### 步骤3：生成知识卡片HTML ✅必做

为每张卡片生成独立的HTML文件，放入临时目录（默认 `[用户图片目录]\知识卡片\[卡片组名称]\html\`）。

#### 3.1 卡片画布尺寸

```css
.card {
  width: 900px;
  height: 1200px;  /* 3:4比例 */
  overflow: hidden;
  position: relative;
}
```

#### 3.2 字体大小规范（关键！字体要大！）

| 元素 | 字号 | 字重 | 说明 |
|------|------|------|------|
| 封面主标题 | 36-42px | 800 | 极大、醒目 |
| 封面副标题 | 22-26px | 400 | 补充说明 |
| 章节标题 | 28-32px | 700 | 醒目但不压过封面 |
| 内容卡片标题 | 24-28px | 700 | 每张卡片的核心观点 |
| 正文要点 | 18-20px | 400 | 清晰可读 |
| 关键数据/数字 | 28-36px | 800 | 数据突出展示 |
| 引用/强调文字 | 20-22px | 500 | 略大于正文 |
| 页脚信息 | 14px | 400 | 卡片编号、来源 |
| 装饰编号 | 48-72px | 900 | 超大透明度装饰数字 |

#### 3.3 版面布局原则

**核心原则：干货满满，不留大片空白**

1. **上密下疏**：标题区域紧凑（标题+副标题合占15-20%高度），内容区域充实（70-75%），底部信息区简练（5-10%）
2. **要点间距**：行间距1.6-1.8倍，要点之间间距8-12px，不要太松散
3. **边距**：左右内边距60-70px，上下内边距50-60px——比一般设计稍窄，增加内容区域
4. **禁止大面积留白**：如果某张卡片内容偏少，加大字号或增加视觉装饰元素（色块、编号、图标）填充
5. **色彩填充**：卡片背景不能全白，必须有渐变/色块/装饰形状来填充空间

#### 3.4 配色方案（5套预设，根据材料主题自动选择）

**方案A — 专业商务（默认）**：适合职场、商业、管理类
```
主色：#1E3A5F（深蓝）
强调色：#E8913A（橙金）
背景渐变：#1E3A5F → #2C5282
正文：#FFFFFF（白底卡片内）/ #F0F4F8（浅底卡片内）
装饰：#E8913A 半透明
```

**方案B — 活力成长**：适合学习、技能、成长类
```
主色：#6C3CE1（紫）
强调色：#FF6B9D（粉红）
背景渐变：#6C3CE1 → #4A1FB8
正文：#FFFFFF
装饰：#FF6B9D 半透明
```

**方案C — 清新自然**：适合健康、生活、环保类
```
主色：#059669（翠绿）
强调色：#F59E0B（琥珀黄）
背景渐变：#059669 → #047857
正文：#FFFFFF
装饰：#F59E0B 半透明
```

**方案D — 科技未来**：适合技术、AI、数据类
```
主色：#0F172A（深蓝黑）
强调色：#38BDF8（天蓝）
背景渐变：#0F172A → #1E293B
正文：#E2E8F0
装饰：#38BDF8 半透明
```

**方案E — 温暖人文**：适合教育、心理、人文类
```
主色：#9F1239（深红）
强调色：#FBBF24（金黄）
背景渐变：#9F1239 → #881337
正文：#FFFFFF
装饰：#FBBF24 半透明
```

**配色选择规则**：
- 简历/求职/职场相关 → 方案A
- 学习方法/技能提升 → 方案B
- 无法判断时 → 方案A

#### 3.5 卡片内部元素规范

**封面卡**：
- 超大主标题居中或偏上
- 副标题/一句话概括
- 装饰色块/形状填充空白区域
- 底部标注「[主题] · 知识卡片」

**内容卡**：
- 左上角大号装饰章节编号（48-72px，低透明度15-25%）
- 标题（核心观点）
- 2-4个要点，每个要点前用色块圆点或数字标记
- 关键数据/数字用强调色+大字号突出
- 底部：卡片编号（如 3/8）

**总结卡**：
- "核心要点回顾"标题
- 按章节列出最关键的1-2个要点
- 底部：行动建议或金句
- 卡片编号（如 8/8）

#### 3.6 HTML模板

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <title>[卡片标题]</title>
  <style>
    *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: "PingFang SC", "Microsoft YaHei", "Noto Sans SC", sans-serif;
      -webkit-font-smoothing: antialiased;
      background: #f0f0f0;
    }
    .card {
      width: 900px;
      height: 1200px;
      overflow: hidden;
      position: relative;
      display: flex;
      flex-direction: column;
    }

    /* === 封面卡样式 === */
    .card-cover {
      background: linear-gradient(135deg, [主色] 0%, [主色深] 100%);
      color: #FFFFFF;
      padding: 80px 70px;
      justify-content: center;
    }
    .card-cover .cover-label {
      font-size: 18px;
      font-weight: 500;
      opacity: 0.7;
      letter-spacing: 4px;
      text-transform: uppercase;
      margin-bottom: 30px;
    }
    .card-cover .cover-title {
      font-size: 42px;
      font-weight: 800;
      line-height: 1.25;
      margin-bottom: 24px;
    }
    .card-cover .cover-subtitle {
      font-size: 24px;
      font-weight: 400;
      opacity: 0.85;
      line-height: 1.5;
    }
    .card-cover .cover-decoration {
      position: absolute;
      right: -50px;
      bottom: -50px;
      width: 300px;
      height: 300px;
      border-radius: 50%;
      background: [强调色];
      opacity: 0.15;
    }
    .card-cover .cover-decoration-2 {
      position: absolute;
      right: 80px;
      top: 60px;
      width: 120px;
      height: 120px;
      border-radius: 50%;
      background: [强调色];
      opacity: 0.1;
    }

    /* === 内容卡样式 === */
    .card-content {
      background: linear-gradient(135deg, [主色] 0%, [主色深] 100%);
      color: #FFFFFF;
      padding: 50px 65px;
    }
    .card-content .chapter-num {
      font-size: 72px;
      font-weight: 900;
      opacity: 0.12;
      position: absolute;
      top: 20px;
      left: 30px;
      line-height: 1;
    }
    .card-content .card-title {
      font-size: 28px;
      font-weight: 700;
      margin-bottom: 35px;
      line-height: 1.3;
      position: relative;
    }
    .card-content .card-title::after {
      content: '';
      display: block;
      width: 50px;
      height: 4px;
      background: [强调色];
      margin-top: 12px;
      border-radius: 2px;
    }
    .card-content .point {
      display: flex;
      align-items: flex-start;
      gap: 14px;
      margin-bottom: 22px;
      font-size: 19px;
      line-height: 1.7;
    }
    .card-content .point .bullet {
      flex-shrink: 0;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: [强调色];
      margin-top: 9px;
    }
    .card-content .highlight {
      color: [强调色];
      font-weight: 700;
      font-size: 28px;
    }
    .card-content .callout {
      background: rgba(255,255,255,0.1);
      border-left: 4px solid [强调色];
      padding: 16px 20px;
      border-radius: 0 8px 8px 0;
      margin: 20px 0;
      font-size: 20px;
      line-height: 1.6;
    }
    .card-content .card-footer {
      margin-top: auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 20px;
      border-top: 1px solid rgba(255,255,255,0.15);
      font-size: 14px;
      opacity: 0.6;
    }

    /* === 总结卡样式 === */
    .card-summary {
      background: linear-gradient(135deg, [主色] 0%, [主色深] 100%);
      color: #FFFFFF;
      padding: 50px 65px;
    }
    .card-summary .summary-title {
      font-size: 32px;
      font-weight: 800;
      margin-bottom: 30px;
    }
    .card-summary .summary-section {
      margin-bottom: 24px;
    }
    .card-summary .summary-section h3 {
      font-size: 20px;
      font-weight: 600;
      margin-bottom: 10px;
      color: [强调色];
    }
    .card-summary .summary-section p {
      font-size: 18px;
      line-height: 1.7;
      opacity: 0.9;
    }
    .card-summary .action-box {
      background: [强调色];
      color: [主色深];
      padding: 20px 24px;
      border-radius: 12px;
      margin-top: 20px;
      font-size: 20px;
      font-weight: 600;
      text-align: center;
    }
  </style>
</head>
<body>
  <!-- 封面卡 / 内容卡 / 总结卡 按需选用 -->
</body>
</html>
```

### 步骤4：Playwright截图保存 ✅必做

生成所有卡片HTML后，使用Playwright逐一打开并截图保存为PNG。

#### 4.1 截图脚本模板

截图脚本位于 `scripts/screenshot_cards.js`，由专家在运行时动态生成并执行。

**核心逻辑**：
1. 使用Playwright（Chromium）启动无头浏览器
2. 逐一打开每张卡片HTML文件
3. 对 `.card` 元素进行精确截图（clip到900×1200区域）
4. 保存为PNG到 `[用户图片目录]\知识卡片\[卡片组名称]\`

**截图脚本框架**：

```javascript
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

async function screenshotCards(htmlDir, outputDir) {
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 900, height: 1200 },
    deviceScaleFactor: 2  // 2x清晰度
  });
  const page = await context.newPage();

  const htmlFiles = fs.readdirSync(htmlDir)
    .filter(f => f.endsWith('.html'))
    .sort();

  for (const file of htmlFiles) {
    const htmlPath = path.join(htmlDir, file);
    await page.goto('file:///' + htmlPath.replace(/\\/g, '/'), { waitUntil: 'networkidle' });

    const card = await page.$('.card');
    if (card) {
      const pngName = file.replace('.html', '.png');
      await card.screenshot({
        path: path.join(outputDir, pngName),
        clip: { x: 0, y: 0, width: 900, height: 1200 }
      });
      console.log('已保存: ' + pngName);
    }
  }

  await browser.close();
  console.log('全部截图完成！共 ' + htmlFiles.length + ' 张');
}

// 从命令行参数获取路径
const htmlDir = process.argv[2];
const outputDir = process.argv[3];
screenshotCards(htmlDir, outputDir).catch(e => { console.error(e); process.exit(1); });
```

#### 4.2 截图执行方式

```bash
node scripts/screenshot_cards.js "<html目录>" "<输出目录>"
```

**Playwright安装检查**：执行截图前，先确认playwright已安装。若未安装：
```bash
cd [WorkBuddy Node.js workspace目录] && npm install playwright
```

**备选截图方案**（Playwright不可用时）：
1. 使用 `preview_url` 在浏览器中预览HTML
2. 使用系统截图工具手动截图（告知用户操作方法）

### 步骤5：交付与确认 ✅必做

1. **预览检查**：使用 `preview_url` 预览每张卡片HTML，确认排版正确
2. **截图验证**：检查截图文件是否已生成且大小>0
3. **卡片组目录**：确认 `[用户图片目录]\知识卡片\[卡片组名称]\` 下有完整PNG文件
4. **交付文件**：使用 `deliver_attachments` 交付所有PNG截图
5. **清理HTML**：保留HTML源文件（用户可能想修改），不做删除

## 卡片组命名规则

自动根据材料主题命名卡片组文件夹：

1. **提取核心关键词**：从材料内容中提取2-4个关键词
2. **组合命名**：`[核心主题]·[副主题]`，如 `STAR法则·简历写作`
3. **文件名安全**：去除特殊字符 `\/:*?"<>|`
4. **长度限制**：文件夹名不超过40字符

**示例**：
- 材料是简历写作技巧 → `简历写作·核心技巧`
- 材料是面试常见问题 → `面试攻略·高频问题`
- 材料是职业规划方法 → `职业规划·方法论`

## 卡片文件命名规则

每张卡片HTML/PNG命名格式：`[序号]_[简短标题].html` / `[序号]_[简短标题].png`

- 序号：两位数字，从01开始（01, 02, 03...）
- 标题：2-6个字的中文标题，去除特殊字符
- 示例：`01_封面.html`, `02_简历诊断.html`, `03_STAR法则.png`

## 内容密度自查清单

每张卡片生成后必须检查：

- [ ] 卡片内无大面积空白区域（>15%的纯色空白视为不合格）
- [ ] 字体大小符合规范（正文≥18px，标题≥24px）
- [ ] 关键数据/数字已用强调色和大字号突出
- [ ] 每张内容卡有2-4个实质要点（不是空洞的标题）
- [ ] 卡片编号正确（如 3/8）
- [ ] 整组卡片配色统一、风格连贯
- [ ] 封面卡有吸引人的标题
- [ ] 总结卡有行动建议或金句
- [ ] 所有文字清晰可读（2x截图下文字不模糊）

## 错误处理

| 错误场景 | 处理方式 |
|---------|---------|
| Playwright未安装 | 尝试安装；安装失败则使用备选方案（预览+手动截图） |
| 截图文件为空/损坏 | 重新截图一次；仍失败则保留HTML交付并告知用户 |
| 输出目录不存在 | 自动创建 `[用户图片目录]\知识卡片\[卡片组名称]\` |
| HTML渲染异常 | 调整HTML模板后重新生成 |
| 材料内容过少 | 减少卡片数量（最少3张：封面+1内容+总结），加大字号填充 |
| 材料内容过多 | 增加卡片数量（无上限），每张卡片仍保持1个核心观点 |

## 与其他Skill的协作

- **knowledge-base-retriever**：生成卡片前可先检索知识库获取补充素材
- **resume-html-generator**：卡片HTML技术栈与简历HTML一致，可复用字体栈和渲染经验
