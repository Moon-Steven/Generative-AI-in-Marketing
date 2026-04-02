# PRD: Generative-AI-in-Marketing — OPC AI 增长决策系统

> Product Requirements Document

**版本:** v1.0  
**日期:** 2026-03-31  
**作者:** Product Team  
**状态:** Draft  
**关联文档:** [产品设计框架](./OPC-Product-Design.md)

---

## 1. Overview

### 1.1 Problem Statement

全球电商 OPC（One Person Company）创业者面临一个核心矛盾：**有产品、有供应链，但没有投放能力。**

- 中国已有 1200 万+ OPC 创业者，同比增长 47%
- 主流电商平台获客成本已达 ¥800/人（~$110），持续攀升
- 一个人无法同时完成选品、运营、客服和专业广告投放
- 现有工具要么太专业（Meta Ads Manager），要么太浅（只生成文案）

OPC 用户需要的不是另一个工具，而是一个**能替代整个投放团队的 AI 系统**。

### 1.2 Goal

打造一款 **Chat + Dashboard 双入口**的 AI 增长决策产品，让 OPC 电商创业者：

- **5 分钟内**从产品链接到广告提交（vs 传统流程 2-3 天；Meta 审核额外需要 15 分钟至 24 小时）
- **无需投放知识**即可获得专业级广告效果
- **ROAS 提升 ≥ 30%** 相对于用户手动投放基线（比绝对 ROAS 目标更公平，因 ROAS 取决于产品本身）
- **6 个月内**积累 10,000+ 活跃 OPC 用户（配合 $50K+ 市场预算）

### 1.3 Target Users

**Primary Persona: Solo E-commerce Operator**

| 属性 | 描述 |
|------|------|
| 身份 | 个体电商创业者，1 人运营 |
| 平台 | Shopify / 独立站 / Amazon |
| 地域 | 全球（首批聚焦英语市场） |
| 广告预算 | $500 - $5,000/月 |
| 技术水平 | 能用 Shopify 开店，但不懂 Meta Ads Manager |
| 核心诉求 | "帮我把广告跑起来，别让我亏钱" |

**Secondary Persona: Small Growth Team**

| 属性 | 描述 |
|------|------|
| 身份 | 2-5 人的小型电商团队 |
| 痛点 | 有初级投手但效率低、经验不足 |
| 核心诉求 | 提高投放效率，减少人力依赖 |

### 1.4 Scope

**In Scope (v1.0):**
- Chat Agent（OpenClaw 框架，首发 Telegram，后续 WhatsApp）
- Web Dashboard（Home / Campaigns / Creative Studio / Settings）
- Meta（Facebook / Instagram）广告投放全链路
- 自建素材生成引擎（文案 + 图片）
- Free / Pro / Scale / Enterprise 四档定价
- GDPR / CCPA 基础合规

**Out of Scope (v1.0):**
- TikTok / Google Ads 渠道（v2.0）
- 视频素材生成（v1.5）
- Amazon Ads 集成（v2.0）
- 企业版多账户协作（v2.0）
- 自定义归因模型（v2.0）
- 微信接入（v2.0，需中国市场专项合规）

---

## 2. Background & Context

### 2.1 Why Now?

1. **OPC 浪潮爆发** — 2025 年 OPC 注册量同比增长 47%，中国政府（深圳龙岗等）已出台 OpenClaw + OPC 专项补贴
2. **AI Agent 基础设施成熟** — OpenClaw 框架提供了 Chat → 执行的完整通道，Claw Skill 架构让功能可组合、可分发
3. **获客成本危机** — 电商获客成本持续攀升，OPC 用户对效率工具的付费意愿正在提高
4. **平台技术储备** — 已积累 $10M+ 的 Meta 广告投放经验，Claw Skill 达到 92%+ 执行完成率

### 2.2 Strategic Alignment

```
Generative-AI-in-Marketing 企业级增长决策系统
          │
          ├── Enterprise Layer（付费，$20M+ 年投放客户）
          │   └── Realize → Manif → Hunt → AGX → Lan57
          │
          └── OPC Layer（本 PRD，Freemium）  ← 我们在这里
              └── Claw Skill → Chat Agent → Dashboard
                  │
                  └── 增长飞轮: 免费用户量 → 数据积累 → 模型提升 → 企业客户
```

### 2.3 Key Metrics Baseline

| 指标 | 当前状态 | 目标 |
|------|---------|------|
| Claw Skill 执行完成率 | 92% | 97% |
| 用户从注册到首投提交时间 | N/A（新产品） | < 5 min（不含 Meta 审核时间） |
| 用户 ROAS 提升率 | N/A | ≥ 30% vs 手动投放基线 |
| 月活 OPC 用户数 | 0 | 10,000（6 个月内，配合 $50K+ 市场预算） |
| Free → Pro 转化率 | N/A | ≥ 5%（行业基准 2-5%，保守目标） |

### 2.4 团队配置假设

本 PRD 时间线基于以下团队配置：

| 角色 | 人数 | 职责 |
|------|------|------|
| Product Manager | 1 | 需求定义、优先级管理 |
| Full-stack Engineer | 3 | Dashboard + API + 集成 |
| AI/ML Engineer | 1 | 素材生成引擎 + 优化模型 |
| Frontend Engineer | 1 | Dashboard UI + Chat Agent 前端 |
| Designer | 1 | UI/UX 设计 |
| **合计** | **7** | |

---

## 3. User Stories & Requirements

### 3.1 P0 — Must Have（MVP）

#### US-01: 一键开投

> **As** an OPC seller,  
> **I want to** paste my product link and have AI create & launch ads automatically,  
> **So that** I can start advertising without learning Meta Ads Manager.

**Acceptance Criteria:**
- [ ] 用户输入 Shopify / 独立站 URL，系统自动抓取产品标题、描述、图片、价格
- [ ] 系统生成 3 套创意方向（含文案 + 受众定位 + 出价策略），用户选择一个
- [ ] 确认后，系统自动在 Meta 后台创建 Campaign → AdSet → Ad
- [ ] 广告上线后，Chat 通知用户"广告已上线"
- [ ] 全程耗时 < 5 分钟
- [ ] 支持英语、中文产品页面解析

#### US-02: 日报推送

> **As** an OPC seller,  
> **I want to** receive a daily summary of my ad performance,  
> **So that** I know how my money is being spent without logging into dashboards.

**Acceptance Criteria:**
- [ ] 每日固定时间（用户可设定）通过 Chat 推送一条摘要
- [ ] 包含：昨日花费、收入、订单数、ROAS、vs 前日变化
- [ ] 如果有异常（ROAS 下降 > 20%、花费超预算），标记为 Action Required
- [ ] 附带 1-2 条优化建议（可选执行）
- [ ] 用户回复"执行"即可应用建议

#### US-03: 一键优化

> **As** an OPC seller,  
> **I want to** apply AI-recommended optimizations with a single tap,  
> **So that** I don't need to understand ad optimization details.

**Acceptance Criteria:**
- [ ] Agent 基于效果数据自动生成优化建议（调预算、换素材、调受众、暂停广告）
- [ ] 每条建议包含：操作内容 + 预期效果 + 风险提示
- [ ] 用户在 Chat 中回复"执行"或在 Dashboard 点击按钮即可应用
- [ ] 执行前展示变更预览，执行后确认结果
- [ ] 支持"撤销"最近一次优化操作

#### US-04: Web Dashboard — Home 总览

> **As** an OPC seller,  
> **I want to** see all my ad performance at a glance on a web dashboard,  
> **So that** I can get the big picture when I have time to sit down and review.

**Acceptance Criteria:**
- [ ] 顶部 KPI 卡片：Revenue / Orders / ROAS / Spend（含 vs 昨日变化）
- [ ] Action Required 区域：需要用户决策的项目（红色标记）
- [ ] Running Well 区域：运行正常的广告（绿色标记）
- [ ] 7 天趋势图（可切换 Revenue / Spend / ROAS / Orders）
- [ ] Agent 建议卡片：内嵌执行按钮
- [ ] 数据实时同步，Chat 操作后 Dashboard 自动刷新

#### US-05: Ad Account Connection

> **As** a new user,  
> **I want to** connect my Meta ad account securely,  
> **So that** the platform can manage ads on my behalf.

**Acceptance Criteria:**
- [ ] 支持 Meta OAuth 授权流程
- [ ] 清晰说明所需权限范围
- [ ] 支持多 Ad Account（Pro 及以上）
- [ ] 连接状态可在 Settings 中查看和管理
- [ ] Token 刷新自动处理，过期前提醒用户重新授权

#### US-06: Budget Guardrail

> **As** an OPC seller with limited budget,  
> **I want to** set spending limits that automatically pause my ads,  
> **So that** I never overspend or lose money I can't afford.

**Acceptance Criteria:**
- [ ] 用户可设定日预算上限和总预算上限
- [ ] 用户可设定 ROAS 下限（如 < 1.0 自动暂停）
- [ ] 触发护栏时，自动暂停广告并通过 Chat 通知
- [ ] 用户确认后才能恢复投放
- [ ] Dashboard Settings 中可管理所有护栏规则

### 3.2 P1 — Should Have

#### US-07: Creative Studio — 素材生成

> **As** an OPC seller,  
> **I want to** generate ad creatives (images + copy) from my product photos,  
> **So that** I don't need to hire a designer or copywriter.

**Acceptance Criteria:**
- [ ] 输入产品图片 + 目标市场 + 风格偏好，生成 3-5 套素材变体
- [ ] 每套包含：广告图（1:1 + 9:16）+ 标题 + 正文 + CTA
- [ ] 显示 CTR 预估评分
- [ ] 支持在线编辑（替换文案、调整布局）
- [ ] 一键将素材应用到现有广告或新建广告
- [ ] Asset Library 管理所有历史素材

#### US-08: Creative Studio — A/B Testing

> **As** an OPC seller,  
> **I want to** automatically test multiple creative variants,  
> **So that** the best-performing creative gets more budget.

**Acceptance Criteria:**
- [ ] 选择 2-5 套素材进入 A/B 测试
- [ ] 系统自动分配预算并追踪各变体表现
- [ ] 达到统计显著性后，自动关停低效变体，集中预算到 winner
- [ ] 在 Campaign Detail 中展示各变体对比数据
- [ ] Chat 推送测试结果："Creative A 胜出，CTR 高 40%，已自动切换"

#### US-09: Products Management

> **As** an OPC seller managing multiple products,  
> **I want to** import and manage my product catalog in one place,  
> **So that** I can quickly launch ads for any product.

**Acceptance Criteria:**
- [ ] 支持 Shopify 商店一键同步全部产品
- [ ] 支持手动输入 URL 导入单个产品
- [ ] 产品卡片显示：图片、名称、价格、当前广告状态
- [ ] 从产品页直接"Launch Ad"进入一键开投流程

#### US-10: Multi-language Copy Generation

> **As** a cross-border seller,  
> **I want to** generate ad copy in multiple languages from one product,  
> **So that** I can sell to different markets without translation.

**Acceptance Criteria:**
- [ ] 支持 EN / ZH / ES / FR / DE / JA / PT / AR 8 种语言
- [ ] 不是直译，而是基于目标市场文化的 localized 文案
- [ ] 用户可选择一键生成所有语言版本或指定语言

### 3.3 P2 — Nice to Have

#### US-11: Insights — Competitor Signals

> **As** an OPC seller,  
> **I want to** see what ads my competitors are running,  
> **So that** I can learn from their strategies.

**Acceptance Criteria:**
- [ ] 输入竞品品牌或 URL，系统从 Meta Ad Library 抓取竞品广告
- [ ] 分析竞品创意风格、文案策略、投放时长
- [ ] 生成差异化建议："竞品在打折扣，你可以打品质牌"

#### US-12: Insights — Audience Discovery

> **As** an OPC seller,  
> **I want to** discover new audience segments I haven't tried,  
> **So that** I can expand my customer base.

**Acceptance Criteria:**
- [ ] 基于现有广告数据，发现高潜力未覆盖受众
- [ ] 显示预估受众规模、预期 CPA、竞争程度
- [ ] 一键创建针对新受众的测试广告

---

## 4. Design & UX

### 4.1 Design Principles

1. **Zero Learning Curve** — OPC 用户不应该需要学习任何广告专业知识
2. **Action-Oriented** — 每个页面都有明确的下一步操作
3. **Trust Through Transparency** — 每一分钱的花费和每个 AI 决策都可追溯
4. **Chat = Speed, Dashboard = Depth** — 两个入口互补，不重复

### 4.2 User Flows

#### Flow 1: New User Onboarding

```
Landing Page
  │
  ├─ Sign Up (Email / Google / Apple)
  │
  ├─ Connect Meta Ad Account (OAuth)
  │
  ├─ Import First Product
  │  ├─ Paste Shopify URL
  │  └─ OR Enter product details manually
  │
  ├─ Set Budget & Guardrails
  │  ├─ Daily budget ($)
  │  └─ Minimum ROAS threshold
  │
  ├─ AI Generates 3 Creative Directions
  │  └─ User picks one
  │
  ├─ Confirm & Launch
  │
  └─ Redirect to Dashboard Home
     └─ "Your first ad is live! We'll send you a report tomorrow."
```

#### Flow 2: Daily Optimization Loop

```
Agent Pushes Daily Report (Chat)
  │
  ├─ User reads summary
  │
  ├─ If Action Required:
  │  ├─ Agent explains issue + proposes fix
  │  ├─ User replies "执行" → Agent applies changes
  │  └─ Agent confirms: "Done. ✓"
  │
  └─ If all good:
     └─ Agent: "一切正常，继续观察。有问题随时问我。"
```

#### Flow 3: Creative Refresh

```
Agent detects creative fatigue (CTR declining 3+ days)
  │
  ├─ Chat: "蓝牙耳机 US 广告创意疲劳，CTR 下降 23%。要我生成新素材？"
  │
  ├─ User: "好"
  │
  ├─ Creative Studio generates 3 new variants
  │  └─ Displayed in Chat (with preview) + Dashboard
  │
  ├─ User picks one (Chat or Dashboard)
  │
  └─ Agent swaps creative, confirms: "新素材已上线替换旧素材 ✓"
```

### 4.3 Key Screens

| 屏幕 | 核心目的 | 关键元素 |
|------|---------|---------|
| **Home** | "今天赚没赚钱" | KPI 卡片 + Action Items + 趋势图 + Agent 建议 |
| **Campaigns List** | "我的所有广告" | 状态标签 + ROAS 排序 + 快速操作 |
| **Campaign Detail** | "这个广告的全部数据" | Performance 图表 + Creative 对比 + Audience 分布 |
| **Creative Studio** | "生成和管理素材" | 生成器 + 变体预览 + Asset Library |
| **Products** | "我的产品目录" | 产品卡片 + 广告状态 + Quick Launch |
| **Settings** | "账户和配置" | Ad Account + Budget Rules + Notifications + Billing |
| **Onboarding** | "5 分钟搞定" | Step-by-step wizard, 4 步完成 |

### 4.4 Edge Cases & Error States

| 场景 | 处理方式 |
|------|---------|
| Meta OAuth 失败 | 展示具体错误 + 重试按钮 + 人工支持入口 |
| 产品 URL 无法解析 | 降级为手动输入表单 |
| 广告被 Meta 拒绝 | Chat 通知 + 解释被拒原因 + 自动调整重试 |
| 预算用完 | 自动暂停 + 通知 + 询问是否追加 |
| 素材生成失败 | 重试 1 次 + 失败则提供模板选择 |
| 用户长期未登录 | 继续自动优化 + 每周邮件摘要 |
| Meta API 限流 | 队列排队 + 用户侧展示"处理中" |
| ROAS 持续 < 1.0 | 触发护栏暂停 + 分析报告 + 建议调整策略 |

### 4.5 Accessibility Requirements

- WCAG 2.1 AA 合规
- 支持屏幕阅读器
- 键盘导航完整支持
- 颜色不作为唯一信息载体（配合图标/文字）
- 支持亮色/暗色主题

---

## 5. Technical Considerations

### 5.1 High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         Client Layer                             │
│                                                                  │
│  ┌──────────────────┐    ┌─────────────────────────────────┐    │
│  │  Chat Clients     │    │  Web Dashboard (Next.js / React) │    │
│  │  · Telegram (v1)  │    │  · SSR for SEO                   │    │
│  │  · WhatsApp (v2)  │    │  · WebSocket for real-time       │    │
│  │                    │    │  · Responsive (mobile-first)     │    │
│  │  via OpenClaw     │    │                                  │    │
│  └────────┬─────────┘    └──────────────┬────────────────────┘    │
│           │                              │                        │
├───────────┴──────────────────────────────┴────────────────────────┤
│                         API Gateway                               │
│  · Authentication (JWT + OAuth)                                   │
│  · Rate limiting                                                  │
│  · Request routing                                                │
├───────────────────────────────────────────────────────────────────┤
│                         Service Layer                             │
│                                                                   │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌───────────────────┐   │
│  │ Campaign │ │ Creative │ │ Insight  │ │ Notification      │   │
│  │ Service  │ │ Service  │ │ Service  │ │ Service           │   │
│  │          │ │          │ │          │ │                    │   │
│  │ · CRUD   │ │ · Copy   │ │ · Data   │ │ · Daily report    │   │
│  │ · Launch │ │   Gen    │ │   pull   │ │ · Action alerts   │   │
│  │ · Optimize│ │ · Image │ │ · Trend  │ │ · Chat dispatch   │   │
│  │ · Budget │ │   Gen    │ │   detect │ │                    │   │
│  │   guard  │ │ · CTR    │ │ · Anomaly│ │                    │   │
│  │          │ │   predict│ │   detect │ │                    │   │
│  └────┬─────┘ └────┬─────┘ └────┬─────┘ └────┬──────────────┘   │
│       │            │            │             │                    │
├───────┴────────────┴────────────┴─────────────┴───────────────────┤
│                         Data Layer                                │
│                                                                   │
├───────────────────────────────────────────────────────────────────┤
│                    Message Queue (BullMQ on Redis)                 │
│  · Campaign creation/launch (async Meta API calls)                │
│  · Creative generation jobs                                       │
│  · Daily report scheduling                                        │
│  · Retry with exponential backoff for Meta API failures           │
├───────────────────────────────────────────────────────────────────┤
│                         Data Layer                                │
│                                                                   │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────────────┐   │
│  │PostgreSQL│ │  Redis   │ │S3/R2+CDN │ │ Meta Marketing   │   │
│  │          │ │          │ │          │ │ API              │   │
│  │ · Users  │ │ · Cache  │ │ · Assets │ │                   │   │
│  │ · Camps  │ │ · Session│ │ · Images │ │ · Campaign CRUD  │   │
│  │ · Products│ │ · BullMQ│ │ · Videos │ │ · Audience Mgmt  │   │
│  │ · Metrics│ │ · PubSub │ │(Cloudflare│ │ · Conversion API │   │
│  │          │ │          │ │  CDN)    │ │                   │   │
│  └──────────┘ └──────────┘ └──────────┘ └──────────────────┘   │
│                                                                   │
│  ┌──────────────────┐                                             │
│  │ Secrets Manager   │ ← Meta tokens 独立加密存储 (AWS KMS)       │
│  └──────────────────┘                                             │
└───────────────────────────────────────────────────────────────────┘
```

### 5.2 Core API Contracts

**通用规范：**
- 所有 `GET` 列表接口支持 `?page=1&per_page=20&sort=created_at&order=desc&q=keyword` 分页/排序/搜索
- API 版本策略：`/api/v1/` 为稳定版，breaking change 升级 major version，旧版保留 6 个月
- Rate Limit: Free 100 req/min, Pro 500 req/min, Scale 2000 req/min

#### Campaign API

```
POST   /api/v1/campaigns              # 创建广告（一键开投）— 异步，返回 job_id
GET    /api/v1/campaigns               # 获取广告列表（分页）
GET    /api/v1/campaigns/:id           # 获取广告详情
PATCH  /api/v1/campaigns/:id           # 更新广告配置
POST   /api/v1/campaigns/:id/optimize  # 应用优化建议
POST   /api/v1/campaigns/:id/pause     # 暂停广告
POST   /api/v1/campaigns/:id/resume    # 恢复广告
```

#### Creative API

```
POST   /api/v1/creatives/generate      # 生成素材变体
GET    /api/v1/creatives                # 素材库列表
GET    /api/v1/creatives/:id           # 素材详情
PATCH  /api/v1/creatives/:id           # 编辑素材
POST   /api/v1/creatives/:id/apply     # 应用素材到广告
```

#### Product API

```
POST   /api/v1/products/import         # 导入产品（URL 解析）
POST   /api/v1/products/sync/shopify   # Shopify 同步
GET    /api/v1/products                 # 产品列表
GET    /api/v1/products/:id            # 产品详情
```

#### Insight API

```
GET    /api/v1/insights/daily/:campaign_id    # 每日报告
GET    /api/v1/insights/overview               # 全局概览
GET    /api/v1/insights/audience/:campaign_id  # 受众分析
POST   /api/v1/insights/competitors            # 竞品分析
```

### 5.3 Data Model (Core Entities)

```
User
├── id, email, name, plan_tier, created_at
├── meta_accounts: MetaAccount[]
└── settings: UserSettings

MetaAccount
├── id, user_id, meta_account_id
├── token_ref: string (指向 Secrets Manager 中的加密 token，不直接存储)
├── status: connected | expired | revoked
└── last_synced_at

Product
├── id, user_id, name, description, price, currency
├── images: string[]
├── source_url, source_platform (shopify | manual | other)
└── campaigns: Campaign[]

Campaign
├── id, user_id, product_id, meta_campaign_id
├── status: draft | active | paused | completed | error
├── daily_budget, total_budget, min_roas, currency (USD|EUR|GBP|CNY...)
├── target_market, target_audience
├── creatives: Creative[]
├── metrics: CampaignMetric[]
└── optimizations: Optimization[]

Creative
├── id, user_id, campaign_id, type: image | video  (user_id 冗余字段，支持 Asset Library 跨 campaign 查询)
├── headline, body_text, cta
├── asset_url, thumbnail_url
├── sizes: { "1:1": url, "9:16": url }
├── status: draft | active | paused | retired
├── predicted_ctr
└── actual_metrics: { ctr, cpc, conversions }

CampaignMetric (time-series, daily)
├── campaign_id, date
├── spend, revenue, orders, roas
├── impressions, clicks, ctr, cpc, cpa
└── (audience_breakdown 拆为独立 AudienceMetric 表，支持索引和跨 campaign 查询)

AudienceMetric (time-series, daily)
├── campaign_id, date, segment_key (e.g. "25-28M")
├── spend, revenue, roas, impressions, clicks
└── (可按 segment 聚合分析)

Optimization
├── id, campaign_id, type: budget | creative | audience | pause
├── status: proposed | accepted | rejected | applied | reverted
├── description, expected_impact, risk_level
├── proposed_at, applied_at
└── result_metrics (post-optimization comparison)
```

### 5.4 Performance Requirements

| 指标 | 目标 |
|------|------|
| Dashboard 首屏加载 | < 2s (P95) |
| API 响应时间 | < 500ms (P95) |
| 素材生成时间（文案 + 图片） | < 30s |
| 产品 URL 解析 | < 10s |
| 广告上线（从确认到 Meta 生效） | < 60s |
| Chat 消息响应 | < 3s |
| 日报推送准时率 | 99.5% |
| 系统可用性 | 99.9% |

### 5.5 Security & Privacy

| 领域 | 措施 |
|------|------|
| **认证** | JWT + OAuth 2.0, Session 过期 24h |
| **Meta Token** | 独立 Secrets Manager (AWS KMS) 加密存储, 自动 Token rotation, 过期前 7 天提醒用户 |
| **数据传输** | 全链路 HTTPS/TLS 1.3 |
| **数据存储** | PII 字段加密, 数据库加密 at rest |
| **权限** | RBAC (为未来多用户扩展预留) |
| **合规** | GDPR (EU) + CCPA (CA)；PIPL 推迟至微信接入时 |
| **数据保留** | 广告指标 2 年；账户删除后 30 天清除全部 PII |
| **用户权利** | 支持数据导出 (Right to Portability)、账户删除 (Right to Erasure)、30 天内响应 |
| **租户隔离** | Row-Level Security (PostgreSQL RLS)，确保用户间数据不可互访 |
| **审计** | 所有广告操作记录完整审计日志，不可篡改 |
| **速率限制** | Platform API: Free 100/min, Pro 500/min, Scale 2000/min; Meta API: per-account 配额池 + BullMQ 排队 + exponential backoff |
| **素材安全** | AI 生成内容经 Meta Ad Policy 预审检查 + 敏感内容过滤（色情/暴力/政治） |
| **反滥用** | Free Tier: 每日素材生成 ≤ 5 次，产品导入需验证 URL 可访问性 |

---

## 6. Success Metrics

### 6.1 Primary KPIs

| KPI | 目标 | 测量方式 | 频率 |
|-----|------|---------|------|
| **Monthly Active Users (MAU)** | 10,000（Month 6，配合 $50K+ 市场预算） | 产品内埋点 (Mixpanel) | Weekly |
| **ROAS 提升率** | ≥ 30% vs 用户手动投放基线 | 对照组 A/B 测试 + 用户自报基线 | Monthly |
| **Time-to-First-Ad-Submitted** | < 5 min | 注册到首个广告提交的时间差（不含 Meta 审核） | Per user |
| **Free → Pro Conversion** | ≥ 5% | Billing events (Stripe) | Monthly |
| **Pro Monthly Churn** | < 5% | Billing events | Monthly |

### 6.2 Secondary Metrics

| Metric | 目标 | 说明 |
|--------|------|------|
| Daily Report Open Rate | ≥ 70% | Chat 日报被阅读的比例 |
| Optimization Accept Rate | ≥ 60% | 用户接受 AI 建议的比例 |
| Creative Generation Usage | ≥ 3x/user/month | 素材生成功能使用频率 |
| Dashboard DAU/MAU | ≥ 40% | Dashboard 用户粘性 |
| NPS | ≥ 50 | 季度用户调研 |
| Churn Rate (Pro) | < 5%/month | Pro 用户月流失率 |

### 6.3 Measurement Plan

- **Phase 1 (Month 1-2):** 只关注 Time-to-First-Ad + Onboarding 完成率
- **Phase 2 (Month 3-4):** 开始追踪 ROAS + Daily Report 互动率
- **Phase 3 (Month 5-6):** 全面追踪转化率 + 留存 + NPS
- **工具:** Mixpanel (产品分析) + Stripe (营收) + 自建 Dashboard (广告指标)

---

## 6.4 Pricing Table

| | **Free** | **Pro — $49/月** | **Scale — $149/月** | **Enterprise — 按需** |
|---|---|---|---|---|
| 产品数 | 1 | 5 | 无限 | 无限 |
| 广告账户 | 1 | 3 | 10 | 无限 |
| AI 素材生成 | 5 次/天 | 20 次/月 | 无限 | 无限 |
| 日报推送 | ✓ | ✓ | ✓ | ✓ |
| 一键优化 | 基础 | 完整 | 完整 + 自定义策略 | 完整 + Lan57 |
| 预算护栏 | — | ✓ | ✓ | ✓ |
| A/B 测试 | — | ✓ | ✓ | ✓ |
| 多渠道 | Meta only | Meta only | Meta + TikTok + Google | 全渠道 |
| 支持 | 社区 | 优先邮件 | 专属顾问 | 客户成功经理 + SLA |
| API Rate Limit | 100/min | 500/min | 2000/min | 定制 |

**定价逻辑:** Pro 定价 $49 确保对月预算 $500 的用户成本占比 < 10%。Enterprise 独立定价服务年投放 $1M+ 客户。

---

## 7. Timeline & Milestones

### Phase 1: Foundation (Week 1-6)

| 周次 | 里程碑 | 交付物 |
|------|--------|--------|
| W1-2 | 技术架构搭建 | DB schema + API 骨架 + Meta OAuth |
| W3-4 | 核心投放流程 | 一键开投 (Chat + API) + 产品导入 |
| W5-6 | Dashboard MVP | Home 总览 + Campaign Detail |

**Phase 1 Gate:** 内部可跑通从产品导入 → 广告上线 → 数据回流全流程

### Phase 2: Intelligence (Week 7-12)

| 周次 | 里程碑 | 交付物 |
|------|--------|--------|
| W7-8 | 日报 + 优化引擎 | Daily Report + 一键优化 |
| W9-10 | 素材生成 v1 | 文案生成 + 图片合成 + Creative Studio UI |
| W11-12 | 预算护栏 + Settings | Guardrail 自动暂停 + 完整 Settings 页 |

**Phase 2 Gate:** 邀请 50 个 Alpha 用户测试，Time-to-First-Ad < 10 min

### Phase 3: Growth (Week 13-18)

| 周次 | 里程碑 | 交付物 |
|------|--------|--------|
| W13-14 | Beta Launch | Free + Pro Tier 上线 |
| W15-16 | 产品打磨 | 根据 Beta 反馈迭代 + A/B 测试功能 |
| W17-18 | Public Launch | 开放注册 + 内容营销启动 |

**Phase 3 Gate:** 1,000 注册用户，ROAS ≥ 1.5，Onboarding 完成率 ≥ 60%

### Phase 4: Scale (Week 19-26)

| 周次 | 里程碑 | 交付物 |
|------|--------|--------|
| W19-22 | 增长加速 | Referral 机制 + Case Study + Community |
| W23-26 | Scale Tier + v2 规划 | $299 计划上线 + TikTok 渠道调研 |

### Dependencies

| 依赖 | 风险等级 | 缓解措施 |
|------|---------|---------|
| Meta Marketing API 审核 | 高 | 提前申请 + 准备备用 BM 账户 |
| OpenClaw 框架稳定性 | 中 | 参与社区 + 本地 fork 兜底 |
| 素材生成模型质量 | 中 | 先用 API 服务，逐步自建 |
| Shopify API 对接 | 低 | 文档成熟，有现成 SDK |

---

## 8. Open Questions

### Decisions to Make

| # | 问题 | 选项 | 建议 | 决策人 |
|---|------|------|------|--------|
| Q1 | Dashboard 技术栈？ | Next.js / Remix / Nuxt | Next.js (生态最成熟) | Tech Lead |
| Q2 | 图片生成用 API 还是自部署？ | Stability AI API / 自部署 SD | 先用 API，规模化后自部署 | Tech Lead |
| Q3 | Chat 首发支持哪些 IM？ | WhatsApp + Telegram / 先只做一个 | 先做 Telegram（开发成本低），快速验证 | PM |
| Q4 | Free Tier 是否限制广告花费？ | 限制 / 不限制 | 不限制（用户花越多我们数据越多） | PM + BD |
| Q5 | 素材是否需要人工审核？ | 纯 AI / AI + 人工 | v1 纯 AI + Meta 自带审核兜底 | PM |
| Q6 | 支付方式？ | Stripe / Paddle | Stripe（全球覆盖好） | Finance |

### Assumptions to Validate

| 假设 | 验证方式 | 时间 |
|------|---------|------|
| OPC 用户愿意为 $99/月的投放工具付费 | Alpha 用户访谈 + 预注册转化率 | Phase 2 |
| AI 生成的素材 ROAS 能达到人工水平的 80%+ | A/B 测试（AI vs 人工素材） | Phase 2 |
| Chat-first 比 Dashboard-first 的用户更活跃 | 两组用户行为对比 | Phase 3 |
| 日报推送能有效提升留存 | 有/无日报用户的 D7/D30 留存对比 | Phase 3 |

### Risks to Mitigate

| 风险 | 概率 | 影响 | 缓解策略 |
|------|------|------|---------|
| Meta 封禁自动化投放账户 | 中 | 致命 | 严格合规 + 渐进式自动化 + 保留人工确认环节 |
| AI 素材大量被 Meta 审核拒绝 | 中 | 高 | 内置 Meta Ad Policy 检查器 + 投放前预审 |
| 用户 ROAS 不达预期导致信任崩塌 | 中 | 高 | 强化预算护栏 + 透明的效果归因 + 明确设定期望 |
| 竞品快速跟进（如 AdCreative.ai） | 高 | 中 | 深耕决策层壁垒 + 数据飞轮 + OPC 社区绑定 |
| OpenClaw 框架 breaking change | 低 | 中 | 版本锁定 + 抽象层隔离 |

---

*PRD Generated: 2026-03-31*  
*Status: Draft — Pending Team Review*  
*Next Steps: Design Review → Technical Spike → Sprint Planning*
