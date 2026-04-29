<div align="center">

# 🌿 SwasthBite
### *The AI-Powered Vedic Nutrition Platform for Indian Diets*

[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev/)
[![Firebase](https://img.shields.io/badge/Firebase-12-FFCA28?style=for-the-badge&logo=firebase)](https://firebase.google.com/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-4-06B6D4?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)
[![PWA](https://img.shields.io/badge/PWA-Ready-5A0FC8?style=for-the-badge&logo=pwa)](https://web.dev/progressive-web-apps/)

> **SwasthBite** is a premium, mobile-first Progressive Web App that delivers hyper-personalized nutrition intelligence rooted in Ayurvedic and Satvik dietary principles. It combines real-time Indian market pricing, AI-powered food scanning, and a custom-trained deep learning model to help users make healthier food choices every single day.

</div>

---

## 📸 Screenshots

<img width="1468" height="677" alt="Screenshot 1" src="https://github.com/user-attachments/assets/59d6c438-78d5-4c9b-94ef-d8d9d18fa814" />
<img width="620" height="689" alt="Screenshot 2" src="https://github.com/user-attachments/assets/d036f333-869a-418a-8a63-b99509beade6" />
<img width="1455" height="827" alt="Screenshot 3" src="https://github.com/user-attachments/assets/3118c8dc-2463-4b3a-ac0c-a92a0fcebd05" />
<img width="1470" height="833" alt="Screenshot 4" src="https://github.com/user-attachments/assets/2a5156b9-ca60-4414-919c-ec581147721d" />

> *Premium dark-mode UI with glassmorphism, micro-animations, and a mobile-first bottom navigation.*

---

## ✨ Key Features

### 🧠 Swastha AI — Personalized Nutrition Coach
- Conversational AI assistant powered by a **local LLM (LLaMA 3 8B)** via LM Studio
- Deeply personalized advice based on your Aarogya Score, health goals, fasting schedule, and cuisine preferences
- Full conversation history and context-aware follow-up questions
- Fallback intelligence using curated calorie and protein mapping data

### 🍽️ Food Scanner — Real-Time AI Dish Recognition
- **Custom-trained Keras CNN model** (`food_model_v2.keras`) trained on 80+ Indian food categories
- Camera-based scan directly from mobile browser
- Instant calorie, protein, and macronutrient breakdown
- OCR-based label scanning using **Tesseract.js**
- Falls back gracefully to a FastAPI backend for edge-case dishes

### 📊 Aarogya Score — Dynamic Health Index
- Personalized health score (0–100) calculated from meal logs, protein intake, and diet variety
- Real-time score updates after every meal logged
- Visual circular progress indicator with health trend analysis
- Actionable recommendations to improve your score

### 🥗 Vedic Meal Planner — 7-Day AI-Curated Plan
- Full 7-day Satvik meal plans tailored to your calorie goals, budget, and cuisine preferences
- Fasting-aware scheduling (marks meals safe for Ekadashi, Navratri, etc.)
- Daily calorie, protein, and budget breakdown with progress bars
- One-click PDF export via browser print

### 🛒 Mandi Live Prices — Real Indian Market Data
- Live simulation of Indian vegetable & grain market prices (Azadpur Mandi, Delhi)
- Price trend indicators (📈 High / 📉 Low / ⚖️ Stable)
- Real-time 3D market trend charts powered by **Three.js**
- Search and filter across 12+ staple Indian ingredients
- Market insight sidebar with buying recommendations

### 💊 Prescription Analyzer
- Upload a medical prescription and get diet recommendations aligned with your medication
- Highlights foods to avoid and foods to prioritize based on drug interactions

### 🏆 Rewards System — Swastha Coins
- Earn coins by logging meals, maintaining streaks, and achieving health milestones
- Milestone badges: *Ancient Roots, Mandi Master, Health Warrior, Thali Pro*
- Redeem coins for real discount coupons (Zepto, Blinkit, BigBasket, Instamart)
- Unique voucher code generation with a satisfying ticket-tear animation

---

## 🏗️ Architecture & Tech Stack

```
swasthbite/
├── src/
│   ├── components/
│   │   ├── Dashboard.tsx          # Main app shell with sidebar & bottom nav
│   │   ├── LandingPage.tsx        # Animated marketing landing page
│   │   ├── Onboarding.tsx         # Multi-step user onboarding flow
│   │   └── subpages/
│   │       ├── HomeSubpage.tsx           # Dashboard home with health overview
│   │       ├── AarogyaSubpage.tsx        # Health score & metrics
│   │       ├── ChatSubpage.tsx           # Swastha AI chat interface
│   │       ├── MandiSubpage.tsx          # Live market prices & trends
│   │       ├── MealPlanSubpage.tsx       # 7-day Vedic meal planner
│   │       └── ProfileSubpage.tsx        # User profile & settings
│   ├── context/
│   │   └── AuthContext.tsx        # Firebase auth + profile state management
│   ├── services/
│   │   └── aiService.ts           # LLM + Food scanning AI service layer
│   └── lib/
│       └── firebase.ts            # Firebase configuration
├── backend/
│   └── main.py                    # FastAPI server for model inference
├── public/
│   ├── manifest.json              # PWA Web App Manifest
│   ├── sw.js                      # Service Worker for PWA installation
│   └── icon.svg                   # App icon
└── package.json                   # Project dependencies
```

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/BiswajitDas77/SwasthBite-2026.git
cd SwasthBite-2026
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start development server
```bash
npm run dev
```

---

## 👥 Team
**SwasthBite 2026** — Built with ❤️ for the health and wellness of every Indian household.

| Member | Role |
|--------|------|
| Biswajit Das | Lead Developer & ML Engineer |
| Sainath | Frontend & UI/UX Engineer |

---

## 📄 License
This project is licensed under the **MIT License**.

<div align="center">

**Made with 🌿 for healthier India**

[🌐 Live Demo](https://github.com/BiswajitDas77/SwasthBite-2026) · [🐛 Report Bug](https://github.com/BiswajitDas77/SwasthBite-2026/issues) · [✨ Request Feature](https://github.com/BiswajitDas77/SwasthBite-2026/issues)

</div>
