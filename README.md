# CivicTrack — Election Education Assistant

> An interactive civic education platform that guides first-time voters through every stage of the democratic process — from voter registration to result certification.

---

## ✨ Features

### 🗺️ Interactive Election Timeline (Dashboard)
- Visual step-by-step timeline of the full election cycle: **Registration → Primaries → Campaigns → General Election → Certification**
- Each stage expands with a description, *Why It Matters* section, action steps, and advanced details
- Progress tracking — completed modules are visually marked across the timeline
- Animated entry states with Framer Motion

### 📚 Guided Process Navigator (Learning)
- Module-by-module deep-dive learning experience
- Sequential unlock system — each module must be completed before the next is unlocked
- Rich content per module with action steps and contextual details
- Progress state persisted across navigation within the session

### 🧠 Micro-Quiz
- Knowledge-check quiz tied to the election curriculum
- Immediate feedback with correct/incorrect states and explanations
- Module completion triggered on quiz success
- Questions cover eligibility, MCC, VVPAT, NOTA, and more

### 📖 Glossary & Smart FAQ
- **17-term interactive glossary** covering key election vocabulary (Absentee Ballot, EVM, Gerrymandering, NOTA, VVPAT, etc.)
- Inline **GlossaryTooltip** component for contextual term definitions
- **SmartFAQ** panel with common voter questions and detailed answers

### 🗳️ Voting Simulation
- Standalone HTML simulation (`public/voting-simulation.html`) that walks users through a mock voting experience
- Designed as an embeddable or linked companion to the main app

### 🎬 Welcome / Onboarding
- Animated welcome screen that introduces the platform's purpose before entering the main app
- Entry point to the full learning experience

### 🧭 Navigation
- **Fixed top app bar** with logo, global nav tabs (Dashboard / Learning / Quiz / Resources), region selector, notifications, and user avatar
- **Collapsible left sidebar** with per-module status icons (locked 🔒, in-progress, completed ✅) and quick-access buttons
- **Mobile bottom navigation bar** for responsive access on small screens

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js 16](https://nextjs.org/) (App Router) |
| Runtime | React 19 |
| Language | TypeScript 5 |
| Styling | Tailwind CSS v4 |
| Animation | Framer Motion 12 |
| Icons | Lucide React, Google Material Symbols |
| Utilities | clsx, tailwind-merge |
| Linting | ESLint 9 + eslint-config-next |
| Containerisation | Docker (node:20-alpine, multi-stage build) |
| Deployment | Google Cloud Run |

---

## 📁 Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout (fonts, metadata)
│   ├── page.tsx            # Main SPA shell — routing, sidebar, top nav
│   └── globals.css         # Global design tokens & base styles
├── components/
│   ├── layout/
│   │   └── Sidebar.tsx             # Reusable sidebar shell
│   ├── timeline/
│   │   └── InteractiveTimeline.tsx # Election cycle timeline (Dashboard view)
│   ├── navigator/
│   │   └── GuidedProcessNavigator.tsx # Sequential module learning view
│   ├── quiz/
│   │   └── MicroQuiz.tsx           # Knowledge-check quiz
│   ├── faq/
│   │   └── SmartFAQ.tsx            # FAQ + Glossary panel
│   ├── glossary/
│   │   └── GlossaryTooltip.tsx     # Inline term tooltip component
│   ├── welcome/
│   │   └── WelcomeOnboarding.tsx   # Animated entry / onboarding screen
│   └── ui/
│       ├── button.tsx      # Base Button component
│       ├── card.tsx        # Base Card component
│       └── badge.tsx       # Base Badge component
├── context/
│   └── VoterModeContext.tsx  # React context for voter mode state
├── data/
│   └── mockData.ts          # All static content — timeline, FAQ, quiz, glossary
public/
├── voting-simulation.html   # Standalone voting simulation page
├── capitol_dome.png         # Hero imagery
├── hero_building.png
├── polling_station.png
├── primaries_img.png
├── reg_img.png
└── cert_img.png
Dockerfile                   # Multi-stage Docker build (node:20-alpine)
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js >= 20.9.0** (required by Next.js 16 and `@tailwindcss/oxide`)
- npm

### Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

### Build

```bash
npm run build
npm run start
```

---

## 🐳 Docker

```bash
# Build
docker build -t civictrack .

# Run
docker run -p 3000:3000 civictrack
```

The Dockerfile uses a **multi-stage build** (`deps` → `builder` → `runner`) on `node:20-alpine` to produce a minimal production image via Next.js standalone output.

---

## ☁️ Cloud Run Deployment

The app is configured for deployment to **Google Cloud Run**. The build is triggered via Cloud Build using the included `Dockerfile`.

```bash
gcloud run deploy civictrack \
  --source . \
  --region europe-west1 \
  --allow-unauthenticated
```

> **Note:** Ensure your Cloud Build environment uses `node:20-alpine` or later. Node 18 is incompatible with Next.js 16.

---

## 📊 Data Model

All content is driven by static TypeScript data in `src/data/mockData.ts`:

| Export | Type | Description |
|---|---|---|
| `timelineData` | `TimelineEvent[]` | 5 election stages with descriptions, action steps & advanced info |
| `faqData` | `FAQ[]` | Common voter questions with answers |
| `quizData` | `QuizQuestion[]` | Multiple-choice questions with explanations |
| `glossaryData` | `GlossaryTerm[]` | 17 civic/election vocabulary terms |

---

## 🗺️ Roadmap / Planned

- [ ] State/region-specific content personalisation
- [ ] User authentication & persistent progress
- [ ] Additional quiz question banks per module
- [ ] Accessibility (WCAG 2.1 AA) audit pass
- [ ] Internationalisation (i18n) support
