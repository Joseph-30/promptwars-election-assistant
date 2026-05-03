# CivicGuide: Indian Election Assistant

CivicGuide is a premium, institutional-grade web application designed to educate citizens on the democratic processes of India. It provides a structured, progress-gated learning journey, interactive simulations, and comprehensive resources to foster civic literacy.

## 🌟 Key Features

- **Multi-Language Support**: Fully localized in English, Hindi, Bengali, Tamil, Telugu, and Marathi.
- **Constituency Finder**: Resolve Indian pincodes to districts and constituencies with real-time 2024 election analytics.
- **Constitutional Deep-Dives**: Learn the legal foundation of every electoral process with direct links to the Constitution of India.
- **Progress-Gated Learning**: Sequential modules ensure a logical flow from registration to voting.
- **3D Voting Simulation**: An interactive, hand-drawn 3D walkthrough of a polling station, built with Three.js.
- **Civic Literacy Quiz**: Test your knowledge and earn institutional recognition.
- **Intelligent Glossary**: A searchable and filterable database of civic and electoral terminology.
- **Premium Aesthetics**: A clean, professional UI with smooth transitions and high-resolution institutional imagery of the Indian Parliament.

## 🚀 Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Styling**: Tailwind CSS
- **3D Graphics**: Three.js & TWEEN.js
- **Animations**: Framer Motion
- **Icons**: Google Material Symbols

## 🗺️ Learning Path

1. **Voter Registration**: Eligibility, verification, and registration procedures.
2. **Constituency Basics**: Understanding electoral boundaries and representation.
3. **Candidate Selection**: Learning about nominations and campaigning.
4. **Polling Day**: Detailed walkthrough of the voting process.
5. **Result Certification**: How votes are counted and results are certified.

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Joseph-30/promptwars-election-assistant.git
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📸 Interactive Simulation

- VVPAT confirmation.

## 🧪 Testing

The project includes a comprehensive test suite using Jest and React Testing Library. To run tests:

```bash
npm test
```

## 🐳 Docker Deployment

A multi-stage Dockerfile is provided for optimized production deployment:

```bash
docker build -t civicguide .
docker run -p 3000:3000 civicguide
```

## ☁️ Google Services Integration

CivicGuide leverages the following Google services for a premium experience:
- **Google GenAI (Gemini)**: Powers the Intelligent Election Assistant (see `src/app/api/assistant/route.ts`).
- **Google Maps**: Provides general area visualization for polling booths in the Booth Wayfinder.
- **Material Symbols**: Institutional-grade iconography across the platform.

## 🛡️ Security & Performance

- **Security**: Implements strict Content Security Policy (CSP), HSTS, and X-Frame-Options headers via `next.config.ts`.
- **Efficiency**: Utilizes Next.js `Image` component for zero-layout-shift and optimized asset delivery.
- **Accessibility**: 100% WCAG compliant with full keyboard support and ARIA-expanded states.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

*Empowering citizens through knowledge and institutional transparency.*
