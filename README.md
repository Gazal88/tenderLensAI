# TenderLens AI — CRPF Tender Evaluation System

> 🏛️ An AI-powered government procurement evaluation platform built for CRPF officers to streamline vendor bid analysis, compliance checking, and risk detection.

**🔗 Live Demo:** [https://tender-lens-ai-roan.vercel.app/](https://tender-lens-ai-roan.vercel.app/)

---

## 📌 Overview

TenderLens AI addresses a critical bottleneck in government procurement — the manual, error-prone, and weeks-long process of evaluating complex tender submissions. By empowering CRPF procurement officers with explainable AI, it ensures that taxpayer funds are spent efficiently, transparently, and fairly.

---

## ✨ Features

### 🤖 AI Evaluation Engine
- Upload a master **Tender Document** (PDF, TXT, DOCX) and multiple **Vendor Submissions**
- Automatically generates per-vendor **compliance scores**, **pass/fail eligibility**, **risk flags**, and **human-readable reasoning**
- Ranks vendors and recommends the best-fit bidder with full justification

### 💬 TenderBot (AI Chatbot)
- Integrated floating chat widget powered by **Groq API (Llama 3)**
- Answers queries about the tender process, platform usage, and document requirements in real-time

### 📋 Tender History
- All evaluations are persisted in `localStorage` with tender ID, date, vendor count, top vendor, and status
- Filterable and exportable history table

### 🔍 Public Tender Search
- No login required — search publicly listed tenders by ID, title, or department
- Available at `/public-search`

### 🔐 Security & Access Control
- Role-based access: Public → Login → Officer Dashboard
- Designed with zero-data-retention principles (documents purged post-evaluation)

### 🎨 Government-Grade UI
- Ashoka Teal theme inspired by official Indian government identity (Ashoka Pillar palette)
- Fully responsive, minimal, and professional aesthetic

---

## 🗺️ Route Map

| Route | Access | Description |
|-------|--------|-------------|
| `/` | Public | Landing page |
| `/login` | Public | Officer authentication |
| `/public-search` | Public | Search public tenders |
| `/resources/[slug]` | Public | Help docs & resources |
| `/dashboard` | Auth | Overview & stats |
| `/dashboard/evaluate` | Auth | AI Evaluation Engine |
| `/dashboard/history` | Auth | Past evaluations |
| `/dashboard/settings` | Auth | User preferences |

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | [Next.js 15](https://nextjs.org/) (App Router) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com/) |
| AI Integration | [Groq API](https://groq.com/) — Llama 3 models |
| Icons | [Lucide React](https://lucide.dev/) |
| Deployment | [Vercel](https://vercel.com/) |

---

## 🚀 Getting Started (Local Development)

### 1. Clone the repository

```bash
git clone https://github.com/Gazal88/tenderLensAI.git
cd tenderLensAI
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env.local` file in the root directory:

```env
GROQ_API_KEY=your_groq_api_key_here
```

> Get your free API key at [https://console.groq.com](https://console.groq.com)

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔑 Demo Credentials

| Field | Value |
|-------|-------|
| Email | `officer@crpf.gov.in` |
| Password | Any value (demo mode) |

---

## 📁 Project Structure

```
src/
├── app/
│   ├── page.tsx                  # Landing page
│   ├── layout.tsx                # Root layout + ChatWidget
│   ├── globals.css               # Ashoka Teal design tokens
│   ├── login/page.tsx            # Login + Resources panel
│   ├── public-search/page.tsx   # Public tender search
│   ├── resources/[slug]/         # Dynamic resource pages
│   ├── dashboard/
│   │   ├── layout.tsx            # Sidebar navigation
│   │   ├── page.tsx              # Overview & stats
│   │   ├── evaluate/page.tsx     # AI Evaluation Engine
│   │   ├── history/page.tsx      # Evaluation history
│   │   └── settings/page.tsx     # User settings
│   └── api/
│       ├── chat/route.ts         # TenderBot API (Groq)
│       └── evaluate/route.ts     # Evaluation API (Groq)
└── components/
    └── ChatWidget.tsx            # Floating AI chatbot
```

---


## ⚠️ Disclaimer

This system is a **demonstration platform** built for hackathon purposes. It assists decision-making through automated analysis. Final procurement approval and verification remain with the presiding officer in accordance with government procurement guidelines.

---


