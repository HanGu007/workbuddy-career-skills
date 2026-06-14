# 简历HTML生成器

> 本 Skill 为「职途星」专家的核心能力模块，负责将优化后的简历生成为排版专业的HTML文件（一页A4精确排版）并同步转化为PDF文件。

## 触发时机

当简历内容改写完成，需要输出最终交付物时启用。

## 核心设计原则

**一页A4纸，PDF排版零失误** — 所有设计决策都围绕这一目标展开。

## A4纸张精确尺寸

```
A4物理尺寸：210mm × 297mm
安全打印区域：190mm × 277mm
推荐内容区域：180mm × 267mm（左右各留15mm，上下各留15mm）
```

## 页面容器CSS

```css
@page {
  size: A4 portrait;
  margin: 12mm 15mm;
}
.page {
  width: 180mm;
  min-height: 267mm;
  max-height: 267mm;
  margin: 0 auto;
  padding: 6mm 0;
  background: #fff;
  overflow: hidden;
  position: relative;
}
```

## 信息密度规范

| 内容模块 | 占比上限 | 行数控制 | 间距策略 |
|---------|---------|---------|---------|
| 姓名+联系方式+求职意向 | 8% | 3-4行 | 姓名20px下方间距，联系方式紧凑单行 |
| 个人简介 | 8% | 3行（不超过4行） | 上下各6px间距 |
| 教育经历 | 12% | 每段2-3行 | 段间距8px |
| 工作/实习经历 | 40% | 每段经历3-5条描述 | 段间距10px，条目间距2px |
| 项目经历 | 15% | 每个项目2-3行 | 段间距8px |
| 技能+荣誉+证书 | 17% | 紧凑标签排列 | 模块间距8px |

**一页适配自检规则**：
1. 行数估算：A4内容区高度267mm，正文行高约5.5mm，可用约48行正文
2. 总行数不超过48行
3. 超出时精简优先级：项目经历 > 荣誉证书 > 工作经历条目 > 教育经历 > 个人简介
4. 绝对底线：工作经历条目不少于每段2条，教育经历必须完整

## 字体大小规范

| 元素 | 字号 | 行高 | 字重 | 说明 |
|------|------|------|------|------|
| 姓名 | 22pt | 1.2 | 700 (Bold) | 最醒目，页面视觉锚点 |
| 职位/求职意向 | 11pt | 1.3 | 400 | 紧跟姓名下方 |
| 联系方式 | 9pt | 1.4 | 400 | 图标+文字，紧凑排列 |
| 模块标题 | 11pt | 1.3 | 700 | 左侧4px竖线强调色 |
| 公司/学校名 | 10.5pt | 1.3 | 600 | 经历段标题 |
| 职位/专业 | 10pt | 1.3 | 400 | 紧跟公司名同行 |
| 时间 | 9pt | 1.3 | 400 | 右对齐，灰色 |
| 正文描述 | 9.5pt | 1.45 | 400 | 核心内容 |
| 标签 | 8.5pt | 1.3 | 400 | 圆角标签样式 |
| 个人简介 | 9.5pt | 1.5 | 400 | 略松行高 |

**字体栈**：`"PingFang SC", "Microsoft YaHei", "Noto Sans SC", "Helvetica Neue", sans-serif`

## PDF转换防乱版保障

### 规则1：使用绝对单位mm/pt，禁止px/em/rem
```css
.page { width: 180mm; }
h1 { font-size: 22pt; }
p { font-size: 9.5pt; line-height: 1.45; }
```

### 规则2：固定行高，使用line-height数值倍数
```css
p, li { line-height: 1.45; }
```

### 规则3：禁止使用margin塌陷的垂直间距
```css
.section { padding: 0 0 3mm 0; }
```

### 规则4：flex布局对齐，避免float
```css
.header { display: flex; justify-content: space-between; align-items: flex-start; }
```

### 规则5：打印样式强制覆盖
```css
@media print {
  @page { size: A4 portrait; margin: 12mm 15mm; }
  body { margin: 0; padding: 0; background: #fff; }
  .page { margin: 0; box-shadow: none; width: 100%; max-height: none; }
  * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
}
```

## 配色方案

- 主色：#1a1a2e（深蓝黑，标题、竖线）
- 强调色：#534AB7（紫色，模块竖线、标签边框、链接）
- 背景：#FFFFFF
- 正文：#333333
- 辅助信息：#666666（时间、次要描述）
- 标签背景：#F0EEFF（浅紫）
- 标签边框：#534AB7

## HTML完整模板

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <title>[姓名] - 优化简历</title>
  <style>
    *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
    @page { size: A4 portrait; margin: 12mm 15mm; }
    body { font-family: "PingFang SC", "Microsoft YaHei", "Noto Sans SC", "Helvetica Neue", sans-serif; color: #333; background: #f0f0f0; -webkit-font-smoothing: antialiased; }
    .page { width: 180mm; min-height: 267mm; max-height: 267mm; margin: 0 auto; padding: 6mm 0; background: #fff; overflow: hidden; position: relative; }
    .header { display: flex; justify-content: space-between; align-items: flex-start; padding: 0 6mm 4mm 6mm; border-bottom: 0.5pt solid #e0e0e0; }
    .header-left { flex: 1; }
    .name { font-size: 22pt; font-weight: 700; color: #1a1a2e; line-height: 1.2; }
    .objective { display: inline-block; margin-top: 1.5mm; padding: 0.8mm 3mm; font-size: 10pt; color: #534AB7; background: #F0EEFF; border-radius: 2mm; }
    .header-right { text-align: right; font-size: 9pt; color: #666; line-height: 1.6; }
    .section { padding: 3mm 6mm 0 6mm; }
    .section-title { display: flex; align-items: center; gap: 2mm; font-size: 11pt; font-weight: 700; color: #1a1a2e; padding-bottom: 1.5mm; margin-bottom: 1.5mm; border-bottom: 0.5pt solid #e0e0e0; }
    .section-title::before { content: ''; display: inline-block; width: 1mm; height: 4.5mm; background: #534AB7; border-radius: 0.5mm; }
    .entry { padding-bottom: 2mm; }
    .entry-header { display: flex; justify-content: space-between; align-items: baseline; line-height: 1.4; }
    .entry-title { font-size: 10.5pt; font-weight: 600; color: #1a1a2e; }
    .entry-subtitle { font-size: 10pt; color: #555; margin-left: 2mm; }
    .entry-date { font-size: 9pt; color: #999; white-space: nowrap; flex-shrink: 0; }
    .entry-items { padding-left: 3mm; list-style: none; }
    .entry-items li { font-size: 9.5pt; line-height: 1.45; color: #333; padding-bottom: 0.5mm; position: relative; }
    .entry-items li::before { content: '•'; position: absolute; left: -3mm; color: #534AB7; }
    .tag-group { display: flex; flex-wrap: wrap; gap: 1.5mm; }
    .tag { display: inline-flex; align-items: center; padding: 0.8mm 2.5mm; font-size: 8.5pt; color: #534AB7; background: #F0EEFF; border: 0.5pt solid #534AB7; border-radius: 2mm; line-height: 1.3; }
    .tag-secondary { color: #666; background: #f5f5f5; border-color: #ddd; }
    .summary { font-size: 9.5pt; line-height: 1.5; color: #444; padding: 0 1mm; }
    @media print { body { background: #fff; margin: 0; } .page { margin: 0; box-shadow: none; width: 100%; } * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; } }
  </style>
</head>
<body>
  <div class="page">
    <div class="header">
      <div class="header-left"><div class="name">[姓名]</div><div class="objective">[求职意向]</div></div>
      <div class="header-right"><div>[📱 手机号码]</div><div>[✉ 电子邮箱]</div><div>[📍 城市]</div></div>
    </div>
    <div class="section"><div class="section-title">个人简介</div><div class="summary">[个人简介]</div></div>
    <div class="section"><div class="section-title">教育经历</div><!-- entries --></div>
    <div class="section"><div class="section-title">工作经历</div><!-- entries --></div>
    <div class="section"><div class="section-title">项目经历</div><!-- entries --></div>
    <div class="section"><div class="section-title">专业技能</div><!-- tags --></div>
    <div class="section" style="padding-top: 2mm;"><div class="section-title">荣誉证书</div><!-- tags --></div>
  </div>
</body>
</html>
```

## PDF转化

使用浏览器无头打印（puppeteer/playwright）将HTML转化为PDF：

```javascript
page.pdf({
  format: 'A4',
  printBackground: true,
  margin: { top: '12mm', right: '15mm', bottom: '12mm', left: '15mm' },
  preferCSSPageSize: true,
  scale: 1
})
```

**转化后必检**：①只有1页 ②排版与HTML一致 ③颜色完整 ④文字无截断

## 一页适配检查清单

1. 浏览器预览检查：无溢出
2. 内容行数检查：≤48行
3. 模块完整性检查：姓名+联系方式、教育经历、工作经历、技能均存在
4. 字体规范检查：姓名22pt、正文9.5pt、标签8.5pt，使用pt
5. 间距规范检查：模块间距3mm、条目间距0.5mm，使用mm
6. 内容溢出时按精简优先级处理

## 文件命名

### 通用版（无目标岗位）
- HTML：`简历_[姓名]_优化版.html`
- PDF：`简历_[姓名]_优化版.pdf`

### 岗位专属版（有目标公司+岗位）
- HTML：`简历_[姓名]_优化版_[公司名]_[岗位名].html`
- PDF：`简历_[姓名]_优化版_[公司名]_[岗位名].pdf`
- 打招呼用语：`打招呼_[公司名]_[岗位名].txt`

> **示例**：
> - `简历_张三_优化版_字节跳动_产品经理.html`
> - `简历_张三_优化版_字节跳动_产品经理.pdf`
> - `打招呼_字节跳动_产品经理.txt`

## 岗位专属简历额外处理

当提供目标公司+岗位时，HTML生成需做以下额外调整：

1. **简历标题**：`<title>[姓名] - [公司名] [岗位名]</title>`
2. **求职意向**：在 `.objective` 元素中显示具体岗位名称，而非笼统方向
3. **经历排序**：与JD最相关的经历排在最前（如果简历中有多段经历可调序）
4. **HTML中嵌入打招呼用语**：在HTML末尾以注释形式嵌入打招呼内容，方便用户复制

## 打招呼用语输出

岗位专属简历生成完成后，必须同时输出打招呼用语：

1. **在对话中直接展示**：
   ```
   💬 打招呼用语（[公司名]-[岗位名]）：
   [50字以内打招呼内容]
   ```

2. **保存为txt文件**：`打招呼_[公司名]_[岗位名].txt`，内容为纯文本打招呼用语

3. **保存到求职档案**：将打招呼用语记录到对应公司档案的简历版本目录下

### 打招呼用语规范
- 字数：50字以内（含标点）
- 结构：我是谁（年限+领域）+ 核心匹配点 + 行动号召
- 禁止套话，必须有针对该岗位的具体匹配点
- 语气：专业但不生硬，有温度但不谄媚
