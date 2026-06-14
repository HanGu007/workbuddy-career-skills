# CareerStar (职途星) — 简历面试辅导专家

[![Expert Type](https://img.shields.io/badge/type-Agent-blue)](https://workbuddy.cn)
[![Version](https://img.shields.io/badge/version-4.4.0-green)](https://github.com/HanGu007/workbuddy-career-skills)

> 拥有15年职业顾问经验的 WorkBuddy AI 专家，专注简历诊断、精准改写、深度背调、面试辅导与求职档案追踪。

## 核心能力

| # | 能力 | 说明 |
|---|------|------|
| 1 | 简历专属诊断 | 多模态直读、四维度评分、三大问题识别、HTML诊断报告 |
| 2 | 简历逐条改写 | 四段式结构、禁用词替换、Star法则、专属性检查 |
| 3 | 从零生成简历 | 8大模块引导式提问、STAR法则经历提炼 |
| 4 | 企业深度背调 | 8步背调流程、薪资发放风险/劳动仲裁/法人征信审查 |
| 5 | 面试辅导模拟 | 4维度深度问题设计、模拟面试、应答辅导 |
| 6 | 知识库检索 | 强制调用IMA知识库(726条内容)、文件名输出 |
| 7 | 简历HTML生成 | A4排版、CSS模板、PDF转化、一页适配检查 |
| 8 | 求职档案追踪 | Excel模板管理、投递进度、面试追踪、薪资对比 |
| 9 | 知识卡片生成 | 内容分析→干货总结→3:4卡片HTML→Playwright截图 |

## 目录结构

```
resume-career-coach/
├── agents/
│   └── resume-career-coach.md       # Agent 主定义
├── skills/
│   ├── resume-diagnosis/            # 简历诊断
│   ├── resume-rewrite/              # 简历改写
│   ├── resume-from-scratch/         # 从零生成简历
│   ├── resume-html-generator/       # 简历HTML生成
│   ├── company-intelligence/        # 企业情报
│   ├── company-background-check/    # 企业背调
│   ├── interview-coaching/          # 面试辅导
│   ├── knowledge-base-retriever/    # 知识库检索
│   ├── knowledge-card-generator/    # 知识卡片生成
│   └── job-tracking/                # 求职档案追踪
├── templates/
│   ├── 求职档案_综合版（模板）.xlsx
│   └── 求职档案_空白版.xlsx
├── avatars/
│   └── expert.png
├── .codebuddy-plugin/
│   └── plugin.json
└── README.md
```

## 安装

将专家目录放入 WorkBuddy 的专家目录：

```
~/.workbuddy/plugins/marketplaces/my-experts/plugins/resume-career-coach/
```

### 前置依赖

本专家依赖以下 WorkBuddy 连接器：

| 连接器 | 用途 | 必需 |
|--------|------|:--:|
| IMA知识库 | 检索专业知识库「简历助手（开放下载）」 | ✅ |
| 企查查 (qcc-company) | 企业信用查询、法人征信 | ✅ |
| 天眼查 (tyc-mcp) | 补充数据源 | ⚪ |
| 腾讯文档 (tencent-docs) | 备选输出方式 | ⚪ |

> IMA知识库ID: `7467810531846595`（公开共享知识库，安装后需申请加入）

## 使用示例

在 WorkBuddy 中激活专家后：

```
帮我诊断这份简历
```

```
字节跳动-高级产品经理，帮我做专属简历改写+企业背调
```

```
我没有简历，帮我从零生成一份
```

```
帮我准备明天的产品经理面试
```

```
查看我的求职投递进度
```

## 许可证

MIT License

## 作者

- GitHub: [@HanGu007](https://github.com/HanGu007)
