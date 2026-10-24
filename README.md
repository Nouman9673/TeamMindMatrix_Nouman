# NeighborlyWork — Hyperlocal Community Blue-Collar Marketplace & Fair Work Platform

> **Connecting you with reliable, background-checked local professionals in 30 minutes or less.**  
> Restoring dignity, fair wages, and mutual trust to neighborhood trades with 100% worker rate autonomy and 0% platform wage cuts.

---

## 🌟 Overview

**NeighborlyWork** is a modern, high-performance hyperlocal service marketplace designed to solve gig-economy wage squeezing and slow dispatch times. Homeowners can browse vetted neighborhood tradespeople, negotiate budgets freely, or book guaranteed 30-minute dispatches. In turn, blue-collar workers set their own rates, retain 100% of their earnings, receive live on-demand dispatch alerts with countdown timers, and withdraw funds with instant zero-fee bank payouts.

---

## 🚀 Key Features

### 1. 🔍 Hyperlocal Marketplace & Proximity Search
- **Geo-Radius Filtering**: Filter nearby trades within 1, 2, or 5-mile zones for rapid doorstep arrival.
- **Dynamic Keyword & Category Search**: Live keyword search across worker names, trade specialties, categories (Plumbing, Electrical, Cleaning, Appliance, Carpentry, Painting), and specialized skill tags.
- **Rating & Availability Filters**: Sort by Proximity, Highest Rated (4.8+ ★, 4.9+ ★, 5.0 ★), or Freedom Hourly Rate.
- **⚡ 30-Minute Instant Dispatch Mode**: Filters for available professionals ready for immediate dispatch.

### 2. 🤝 Two-Way Budget Negotiation & Counter-Offer Loop
- **Direct Budget Proposals**: Homeowners can propose a custom budget and duration, guided by transparent indicators of worker rate minimums.
- **Live On-Demand Alerts with Countdown**: Incoming job alerts tick down live in the Worker Dashboard.
- **Interactive Counter-Offers**: Workers can propose an alternative fair rate. The customer immediately receives an active counter-offer card to Accept or Decline with one tap.
- **Escrow Protection**: Funds are locked safely in escrow with 0% platform deductions.

### 3. 🗺️ Live Simulated GPS Telemetry & Safety OTP Code
- **Neighborhood Route Map**: Visualizes real-time transit telemetry (miles away, estimated transit speed).
- **Dynamic ETA Countdown**: Real-time arrival time estimation.
- **Doorstep Verification Code (OTP)**: Generates a secure 4-digit code that customers share only upon the worker's physical arrival to ensure verified access.
- **Privacy-Masked Calling**: Direct phone communication without exposing personal numbers.

### 4. 🛠️ Worker Control Center & Transparent Wallet
- **Dispatch Readiness Toggle**: One-tap online/offline toggle for incoming job requests.
- **Worker Rate Freedom**: Workers can adjust their base hourly rate at any time, instantly updating the public marketplace.
- **Active Dispatch Schedules**: Timeline of daily jobs (*Dispatched* &rarr; *En Route* &rarr; *Arrived* &rarr; *In Progress* &rarr; *Completed*).
- **0% Commission Wallet**: Transparent breakdown showing 100% direct take-home earnings with zero middleman deductions.
- **Printable/Exportable Payout Receipts**: Transparent ledger receipts detailing verified milestone releases and $0 bank transfer fees.

### 5. 🛡️ Trust, Safety & Verification Matrix
- **100% Background Screened**: Municipal database checks and Trade Guild peer inspection.
- **Inspected Tools & Code Compliance**: Vetted for certified safety standards and tools.
- **24/7 Community SOS Helpline**: Instant emergency dispatch hotline for active water leaks or electrical hazards.

---

## ⚡ Performance & Engineering Benchmarks

- **Zero Linter Warnings & Errors**: Tested and verified with `oxlint` across all files.
- **Blazing Fast Vite 8 / Rolldown Build**: Production bundle builds in **~1.19s**.
- **Optimized Chunk Splitting**:
  - `vendor-react` (~210 kB): Isolated for long-term browser cache retention.
  - `vendor-icons` (~21 kB): Dedicated icon chunk.
  - Main Application (~127 kB): Ultra-lean, compressed application bundle.
- **60 FPS Render Optimization**: Heavy filtering and sorting wrapped in `useMemo` to prevent re-render thrashing during countdown timer ticks.

---

## 📦 Tech Stack

- **Framework**: React 19 + Vite 8 (Rolldown)
- **Styling**: Tailwind CSS v4 + Tailwind Merge + CLSX
- **Icons**: Lucide React
- **Linter**: Oxlint (Oxc Project)

---

## 🛠️ Getting Started

### Prerequisites
- Node.js (v20+ recommended)
- npm / pnpm / yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/Nouman9673/Vecna-Verse-.git
cd Vecna-Verse-

# Install dependencies
npm install
```

### Running Locally
```bash
# Start Vite development server
npm run dev
```
Open [http://localhost:5173/](http://localhost:5173/) in your browser.

### Quality Verification & Production Build
```bash
# Run ultra-fast oxlint
npm run lint

# Build optimized production bundle
npm run build

# Preview production build
npm run preview
```

---

## 📄 License
MIT License. Built for fair work and community empowerment.
