# Generative-AI-in-Marketing — OPC AI Growth Decision System

> Put a growth team in a chat box.

AI-powered growth decision system for global OPC (One Person Company) e-commerce sellers. Chat + Dashboard dual-entry product that automates the full ad lifecycle: insight -> creative -> launch -> optimize.

## Project Structure

```
Marketing-Project/
├── README.md                          <- You are here
├── OPC-Product-Design.md              <- Product design framework (v0.1)
├── OPC-PRD.md                         <- Product requirements document (v1.0)
└── marketing-dashboard/               <- Interactive prototype (Next.js)
```

## Documents

### 1. Product Design Framework

**File:** `OPC-Product-Design.md`

Covers product vision, user personas, architecture, user journeys, dashboard wireframes, creative engine design, pricing model, GTM strategy, compliance, and success metrics.

Key sections:
- Target user: OPC sellers with $500-$5,000/month ad budget
- Chat-first (Telegram -> WhatsApp) + Web Dashboard
- Self-built creative engine (LLM copy + Diffusion images)
- 4-tier pricing: Free / Pro $49 / Scale $149 / Enterprise
- OpenClaw + Claw Skill open-source strategy
- Competitive analysis (Madgicx, Revealbot, Smartly.io, AdCreative.ai)

### 2. PRD (Product Requirements Document)

**File:** `OPC-PRD.md`

Full PRD with 12 user stories (P0-P2), technical architecture, API contracts, data model, success metrics, 26-week timeline, and open questions.

Key specs:
- 7-person team, 4-phase delivery (Foundation -> Intelligence -> Growth -> Scale)
- PostgreSQL + Redis (BullMQ) + S3/R2 + CDN + Secrets Manager
- Meta Marketing API integration with async job queue
- GDPR/CCPA compliance with data retention policies
- Pricing table with tier-gated feature matrix

### 3. Interactive Prototype

**Directory:** `marketing-dashboard/`

Next.js 16 + React + TypeScript + Tailwind CSS + Recharts prototype with 5 core pages.

## Running the Prototype

```bash
cd marketing-dashboard

# Install dependencies
npm install

# Development mode
npm run dev

# Production mode (recommended)
npm run build && npm start
```

Open http://localhost:3000 in your browser.

## Prototype Pages

| Page | URL | Description |
|------|-----|-------------|
| **Home** | `/` | KPI cards, action items, 7-day trend chart, agent recommendations |
| **Campaigns** | `/campaigns` | Campaign list with filters, search, status management |
| **Campaign Detail** | `/campaigns/:id` | Performance charts, creative comparison, audience breakdown |
| **Creative Studio** | `/creative-studio` | AI creative generator, variant preview with CTR estimates, asset library |
| **Onboarding** | `/onboarding` | 4-step wizard: Connect Meta -> Import Product -> Set Budget -> Launch |

## Tech Stack (Prototype)

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4 with custom design tokens
- **Charts:** Recharts
- **Icons:** Lucide React

## Key Features Demonstrated

- Responsive layout (mobile + desktop breakpoints)
- Interactive agent recommendation cards (Execute / Later with toast feedback)
- Campaign filtering and status management
- Creative variant generation with loading animation
- Budget guardrail configuration with input validation
- Empty state handling for campaigns without data
- Sidebar navigation with disabled "coming soon" items

## Architecture (Target)

```
Chat (Telegram/WhatsApp via OpenClaw)  <->  Web Dashboard (Next.js)
                    |                              |
                 API Gateway (JWT + OAuth + Rate Limiting)
                    |
    +------------+------------+-----------+--------------+
    | Campaign   | Creative   | Insight   | Notification |
    | Service    | Service    | Service   | Service      |
    +-----+------+-----+------+----+------+------+------+
          |            |           |             |
       BullMQ (Redis) -- Async Job Queue
          |
    +-----+------+----------+----------+------------+
    | PostgreSQL |  Redis   | S3 + CDN | Meta API   |
    | (RLS)      | (Cache)  | (Assets) | (Ads)      |
    +------------+----------+----------+------------+
```

## Roadmap

- **Phase 1 (W1-6):** Foundation -- DB, API skeleton, Meta OAuth, one-click launch
- **Phase 2 (W7-12):** Intelligence -- Daily reports, optimization engine, creative generation
- **Phase 3 (W13-18):** Growth -- Beta launch, user feedback iteration, public launch
- **Phase 4 (W19-26):** Scale -- Scale tier, enterprise outreach, multi-channel exploration

## Related

- **Platform:** [generative-ai-marketing.com](https://generative-ai-marketing.com)
- **OpenClaw Framework:** Open-source AI agent framework for chat-to-execution
- **Claw Skill:** Open-source Meta ad execution skill on ClawHub

---

*Generated: 2026-03-31*
