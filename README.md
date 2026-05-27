# 📉 Tax Loss Harvesting Dashboard

A premium, highly optimized cryptocurrency tax optimization dashboard engineered with **React 18**, **Tailwind CSS v4**, and **Zustand**. This application replicates an institutional wealth-management portal, calculating real-time net capital gains liabilities and projecting tax savings dynamically across fluctuating asset indexes.

### 🚀 Live Deployment
**Experience the live application here:** [https://tax-loss-harvester-bay.vercel.app](https://tax-loss-harvester-bay.vercel.app)

---

## ✨ Features & Assignment Requirements Met

### 🎯 Core Functional Requirements (100% Complete)
* **Pre-Harvesting Baseline:** Accurately renders static baseline data from the Capital Gains API (`Net Capital Gains = profits - losses`).
* **Reactive Post-Harvesting Engine:** Instantly recalculates short-term and long-term liabilities based on user selections. Positive gains add to profits; negative gains add to losses via absolute values.
* **Dynamic Savings Trigger:** The "Tax Savings" banner conditionally renders *only* if the post-harvesting realized gains fall below the baseline.
* **Interactive Holdings Table:** Renders all assets with multi-select capabilities, dynamic "Amount to Sell" rendering, and accurate financial mapping.

### ⭐ Bonus Points Achieved
* **Mobile Responsiveness:** Fluid layouts using flexbox and horizontal scroll wrappers ensure the dashboard looks perfect on mobile and desktop displays.
* **Clean, Reusable Components:** Strict architectural separation into logical components (`HarvestingCards`, `HoldingsTable`, `AnimatedNumber`).
* **Proper State Management:** Utilized **Zustand** for lightweight, atomic state tracking, avoiding unnecessary global re-renders.
* **Visual Feedback:** Integrated **Framer Motion** for premium micro-interactions (staggered blur reveals, glowing row hovers, and animated numbers).
* **Loader/Error States:** Integrated **TanStack Query** to handle asynchronous API promises with a custom loading screen.
* **"View All" Progressive Disclosure:** Smart table pagination initially restricts the view to 4 items for UI cleanliness, expandable via a toggle.

---

## 🛠️ Technology Stack
* **Core Framework:** React 18 (Vite)
* **Styling Engine:** Tailwind CSS v4 (Native `@theme` API implementation)
* **State Management:** Zustand
* **Async Caching:** TanStack Query v5 (React Query)
* **Animations:** Framer Motion
* **Icons:** Lucide React

---

## 🧠 Architecture & Edge Cases Handled (Engineering Notes)

To ensure this application operates at a production-ready standard, several critical edge cases present in the raw dummy data were actively mitigated:

1. **Duplicate Asset Keys:** The mock payload contains intentional duplicate coins (e.g., multiple `USDC` variants). The data layer intercepts the response and synthesizes deterministic composite keys (`${coin}-${index}`) to ensure React's virtual DOM reconciliation never stumbles during sorting.
2. **Cumulative Layout Shift (CLS) Prevention:** Standard HTML `<table>` tags collapse during complex animations. This table was completely rebuilt using a rigid **CSS Grid** layout (`grid-cols-[...]`), ensuring columns never jitter or resize when Framer Motion mounts/unmounts sorting arrows or selling badges.
3. **Scientific Notation Noise Filtration:** Extremely low fractional cryptographic balances (e.g., `3.46e-17`) are clamped directly to zero at the formatting tier to protect dashboard scannability and prevent ugly string rendering.
4. **Indian Currency Formatting:** All financial data utilizes the native `Intl.NumberFormat('en-IN')` API to ensure correct comma placement (Lakhs/Crores) and consistent decimal alignment.

---

## 🏎️ Local Installation Guide

Want to run the project locally? Follow these steps:

1. **Clone the repository:**
   ```bash
   git clone <your-github-repo-url>
   cd tax-loss-harvester

2. **Install Dependencies:**
   ```bash
   npm install
3. **Start the Vite development server:**
   ```bash
   npm run dev
