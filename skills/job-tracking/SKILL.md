# 求职档案投递进度追踪

> 本 Skill 为「职途星」专家的求职档案管理模块，提供 Excel 模板管理、投递进度建档、面试追踪和薪资对比分析能力。

## 触发时机

| 触发场景 | 触发源 | 自动/手动 | Excel写入目标 |
|---------|--------|----------|-------------|
| 简历优化完成（路径A步骤A13） | resume-html-generator | 自动 | 投递明细表新增行 |
| 企业背调完成（路径A/B步骤A6/B5） | company-background-check | 自动 | 投递明细表"备注"列 |
| 面试准备完成（路径A/B/C步骤A16/B10/C5） | interview-coaching | 自动 | 面试准备清单新增行 |
| 收到Offer（用户主动告知） | 用户对话 | 自动 | 薪资对比分析新增列 |
| 状态变更（用户提到已投递/面试/拒绝等） | 用户对话 | 自动 | 投递明细表"当前状态"列 |
| 用户要求"查看求职档案/投递进度" | 用户对话 | 手动 | 读取+HTML看板 |
| 用户要求"新建/更新求职档案" | 用户对话 | 手动 | 按需操作 |

## 能力概述

| 功能 | 说明 |
|------|------|
| 模板分发 | 向用户提供空白求职档案 Excel 模板 |
| 自动同步 | 在关键流程节点自动将数据写入Excel |
| 进度看板 | 生成可视化 HTML 看板展示求职进度 |
| 面试追踪 | 记录面试轮次、问题、评价 |
| 薪资对比 | 多 Offer 薪资福利对比分析 |

## 模板文件

内置模板路径：`templates/求职档案_综合版（模板）.xlsx`

### 模板结构

```
├─ 投递总览      # 求职仪表盘：目标信息 + 投递数据统计
├─ 投递明细表    # 详细投递记录（17个字段）
├─ 面试准备清单  # 面试知识点、可能问题、公司文化
└─ 薪资对比分析  # 多 Offer 薪资福利横向对比
```

### 模板字段定义（投递明细表）

| 列序 | 字段 | 说明 | 示例 |
|------|------|------|------|
| A | 序号 | 自动编号 | 1 |
| B | 公司名称 | 目标公司全称 | 字节跳动 |
| C | 职位/岗位 | 投递岗位名称 | 高级前端工程师 |
| D | 城市 | 工作城市 | 北京 |
| E | 薪资范围(K/月) | JD标注或沟通薪资 | 45-50 |
| F | 投递渠道 | 内推/Boss直聘/猎聘/官网等 | 内推 |
| G | 投递日期 | 实际投递日期（YYYY-MM-DD） | 2026-04-02 |
| H | 当前状态 | 待回复/笔试/一面/二面/HR面/offer/已拒绝 | offer |
| I | 面试轮次 | 已完成面试轮次 | 4 |
| J | HR姓名 | 对接HR姓名 | 张经理 |
| K | 下一步行动 | 待办事项 | 确认offer细节 |
| L | 截止日期 | Offer确认截止或下次面试日期 | 2026-04-25 |
| M | 投递备注 | 部门/团队+背调风险等级 | 抖音团队｜背调🟢低风险 |
| N | 面试日期 | 各轮面试日期记录 | 2026-04-10 |
| O | 面试问题汇总 | 记录被问到的关键问题 | 如何管理10人前端团队？ |
| P | 面试评价复盘 | 自我评价和复盘 | 技术深度回答较好... |
| Q | 备注 | 其他补充信息 | 内推人：李四 |

## Excel自动同步写入规范

### 写入原则

1. **写入前备份**：首次写入用户的Excel文件前，创建 `.bak` 备份
2. **追加不覆盖**：新增行追加到现有数据末尾，不修改已有行的内容（"当前状态"列除外）
3. **状态列可更新**：仅"当前状态"(H列)允许覆写更新
4. **写入后必验证**：每次写入后重新打开文件确认数据已落位

### 写入流程（标准模板）

```python
import openpyxl
from copy import copy

def write_to_excel(excel_path, sheet_name, row_data, target_row=None):
    """
    向求职档案Excel写入数据
    excel_path: 用户Excel文件路径
    sheet_name: 目标Sheet名
    row_data: dict，key=列字母(A-Q)，value=写入内容
    target_row: 指定行号，None则追加到末尾
    """
    wb = openpyxl.load_workbook(excel_path)
    ws = wb[sheet_name]

    if target_row is None:
        # 找到第一个空行（从第2行开始，第1行是表头）
        target_row = 2
        while ws.cell(row=target_row, column=1).value is not None:
            target_row += 1

    for col_letter, value in row_data.items():
        col_num = openpyxl.utils.column_index_from_string(col_letter)
        ws.cell(row=target_row, column=col_num, value=value)

    wb.save(excel_path)

    # ===== 写入后验证 =====
    wb2 = openpyxl.load_workbook(excel_path)
    ws2 = wb2[sheet_name]
    verified = True
    for col_letter, value in row_data.items():
        col_num = openpyxl.utils.column_index_from_string(col_letter)
        actual = ws2.cell(row=target_row, column=col_num).value
        if actual != value:
            verified = False
            break
    wb2.close()

    if not verified:
        raise Exception(f"Excel写入验证失败：Sheet={sheet_name}, Row={target_row}")
    return target_row
```

### 场景一：简历生成/优化完成 → 新增投递记录

**触发点**：路径A步骤A13、路径B步骤B7

```python
row_data = {
    'A': 序号,                    # 自动递增
    'B': 公司名称,
    'C': 职位/岗位,
    'D': 城市,
    'E': 薪资范围,
    'F': 投递渠道,                # 用户告知或默认"待确认"
    'G': 投递日期,                # 当前日期 YYYY-MM-DD
    'H': '待投递',                # 初始状态
    'I': 0,                       # 面试轮次
    'J': '',                      # HR姓名
    'K': '准备投递',
    'L': '',                      # 截止日期
    'M': 投递备注,                # 部门/团队信息
    'N': '',                      # 面试日期
    'O': '',                      # 面试问题
    'P': '',                      # 面试评价
    'Q': f'简历版本：{简历文件名}' # 备注记录简历版本
}
write_to_excel(excel_path, '投递明细表（综合版）', row_data)
```

### 场景二：企业背调完成 → 更新备注列

**触发点**：路径A步骤A6、路径B步骤B5、路径C步骤C3

```python
# 找到对应公司所在行
target_row = find_row_by_company(excel_path, '投递明细表（综合版）', company_name)
if target_row:
    current_note = ws.cell(row=target_row, column=13).value or ''
    risk_note = f"背调{风险等级}｜{风险要点一句话}"
    new_note = f"{current_note}｜{risk_note}" if current_note else risk_note
    row_data = {'M': new_note}
    write_to_excel(excel_path, '投递明细表（综合版）', row_data, target_row)
```

### 场景三：面试准备完成 → 新增面试准备记录

**触发点**：路径A步骤A16、路径B步骤B10、路径C步骤C5

```python
row_data = {
    'A': 公司名称,
    'B': 面试阶段,               # 一面/二面/HR面
    'C': 面试形式,               # 现场/视频/电话
    'D': 技术知识点,              # 逗号分隔
    'E': 可能的面试题,            # 分号分隔
    'F': 公司特色/文化要点,
    'G': 面试官信息
}
write_to_excel(excel_path, '面试准备清单', row_data)
```

### 场景四：状态变更 → 更新"当前状态"列

**触发点**：用户对话中提到状态变更

```python
# 状态映射
status_map = {
    '待投递': 'pending',
    '已投递': 'submitted',
    'HR已回复': 'hrReplied',
    '面试中': 'interviewing',
    '一面': 'interviewing',
    '二面': 'interviewing',
    'HR面': 'interviewing',
    'Offer': 'offer',
    '已拒绝': 'rejected',
    '暂停': 'hold',
}

target_row = find_row_by_company(excel_path, '投递明细表（综合版）', company_name)
if target_row:
    row_data = {'H': 新状态}
    write_to_excel(excel_path, '投递明细表（综合版）', row_data, target_row)
```

### 场景五：收到Offer → 薪资对比分析新增列

**触发点**：用户提到收到Offer

```python
# 在薪资对比分析表第1行找到下一个空列
next_col = find_next_empty_col(excel_path, '薪资对比分析', row=1)
if next_col:
    salary_data = {
        next_col: 公司名称,
        # 逐行写入薪资数据
    }
```

## 工作流程

### 流程一：首次使用（分发空白模板）

当用户首次需要使用求职档案功能时：

1. **检查是否有现有档案**：询问用户是否已有求职档案文件
2. **无档案 → 生成空白模板**：
   - 运行数据清除脚本：`scripts/clear_template.py`
   - 向用户提供 `求职档案_空白版.xlsx` 文件
   - 说明模板各 Sheet 的用途
3. **有档案 → 读取现有档案**：使用 xlsx skill 读取用户提供的文件

### 流程二：自动录入投递信息

在简历优化/岗位专属简历生成后，自动执行：

1. **提取信息**：
   - 公司名称（用户提供的目标公司）
   - 职位/岗位（目标岗位）
   - 城市（从JD或用户描述中提取）
   - 薪资范围（从JD中提取）
   - 投递渠道（用户说明）
   - 投递日期（当前日期）
   - 当前状态 → 初始为"待投递"或"已投递"
   - 简历版本文件名（岗位专属简历的文件名）
   - 打招呼用语（生成的打招呼文本）

2. **双通道同步**：
   - **JSON档案**（主数据源）：更新 `applications.json` + `companies/[公司名]/投递记录.json`
   - **Excel档案**（用户本地副本）：按"场景一"规范写入投递明细表
   - 两条通道**都必须执行**，互为备份

3. **写入后验证**：
   - 重新打开Excel确认数据已落位
   - 验证失败时：保留JSON数据，告知用户"Excel写入异常，已保存JSON格式"

4. **提示用户**：
   ```
   📋 已为你录入求职档案：
   公司：XXX | 岗位：XXX | 状态：待投递
   ✅ JSON档案已同步 ✅ Excel已同步
   💡 你可以随时让我查看投递进度看板
   ```

### 流程三：生成 HTML 进度看板

当用户要求"查看求职进度"时：

1. **读取档案数据**：读取 `applications.json` 和 `companies/` 目录
2. **生成看板 HTML**：
   - 总览仪表盘：投递数/回复率/面试率/Offer数
   - 状态分布图：各环节转化率
   - 时间线视图：按时间排序的投递记录
   - 公司详情卡片：每家公司的完整信息
3. **保存看板**：`求职档案/看板/求职进度看板.html`
4. **预览确认**：使用 preview_url 确认看板正常渲染
5. **展示给用户**

### 流程四：状态更新

当用户提到状态变更时：

| 用户表述 | 状态更新 | 追问信息 | Excel动作 |
|---------|---------|---------|---------|
| "我投了XX公司" | 待投递→已投递 | 投递渠道？ | 更新H列+填写F列 |
| "HR回复我了" | 已投递→HR已回复 | 回复内容？ | 更新H列 |
| "下周一面" | → 一面 | 具体时间？ | 更新H列+填写N列 |
| "拿到Offer了" | → Offer | 薪资？截止日期？ | 更新H列+新增薪资对比列 |
| "被拒了" | → 已拒绝 | 原因？ | 更新H列+填写P列 |

## 数据清除脚本使用

### 手动清除（生成空白模板）

```bash
python3 scripts/clear_template.py <模板路径> [输出路径]
```

示例：
```bash
python3 scripts/clear_template.py templates/求职档案_综合版（模板）.xlsx
# 输出：templates/求职档案_空白版_20260101_120000.xlsx
```

### 清除规则

- **投递总览**：保留表头结构和公式，清空个人目标和统计数据
- **投递明细表**：保留第1行表头，清空所有数据行
- **面试准备清单**：保留表头，清空所有面试准备记录
- **薪资对比分析**：保留对比项列表(A列)和表头(A1)，清空所有公司数据列(B-D列含第1行)

## 与其他 Skill 的协作

| 协作 Skill | 协作场景 | 自动同步动作 |
|-----------|---------|------------|
| `resume-rewrite` | 生成岗位专属简历后 | 投递明细表新增行 |
| `resume-html-generator` | 生成HTML/PDF后 | 投递明细表"备注"列记录文件名 |
| `company-background-check` | 背调完成后 | 投递明细表"备注"列写入风险等级 |
| `interview-coaching` | 面试辅导后 | 面试准备清单新增行 |

## 输出规范

### 档案录入确认格式

```
📋 求职档案已更新
━━━━━━━━━━━━━━━━━━━━━
公司：字节跳动
岗位：高级前端工程师
状态：已投递 → 一面
更新时间：2026-04-15 14:30
━━━━━━━━━━━━━━━━━━━━━
✅ JSON档案 ✅ Excel同步
下一步：准备一面（预计4月18日）
```

### 进度看板数据要求

看板必须包含：
1. **关键指标卡**：总投递数、回复率、面试转化率、Offer数
2. **漏斗图**：投递→回复→面试→Offer 各环节转化率
3. **状态分布**：各环节数量统计
4. **活跃投递列表**：最近7天有更新的记录
5. **待办提醒**：即将到期的截止日期

## 异常处理

| 异常场景 | 处理方式 |
|---------|---------|
| Excel文件被占用无法写入 | 等待3秒重试一次，仍失败→仅写入JSON，告知用户手动更新Excel |
| Excel文件不存在 | 自动从模板生成空白版，然后写入 |
| 写入后验证失败 | 保留JSON数据，告知用户"Excel写入异常，已保存JSON格式，稍后可手动补充" |
| Sheet名不匹配 | 列出所有Sheet名，匹配最接近的（模糊匹配），无法匹配则告知用户 |

## 注意事项

1. **模板分发优先 Excel**：用户需要本地管理时提供 Excel 模板，需要在线查看时提供 HTML 看板
2. **双通道同步**：JSON 档案是主数据源，Excel 是用户本地副本，每次数据变更都必须同步两条通道
3. **隐私保护**：档案中不得包含用户身份证号、家庭住址等敏感信息
4. **定期提醒**：某家公司 7 天无更新时主动提醒用户跟进
5. **写入前备份**：首次写入用户的Excel时创建 .bak 备份文件
