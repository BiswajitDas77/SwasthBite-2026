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
<img width="1468" height="677" alt="Screenshot 2026-04-30 at 4 56 25 AM" src="https://github.com/user-attachments/assets/59d6c438-78d5-4c9b-94ef-d8d9d18fa814" />
<img width="620" height="689" alt="Screenshot 2026-04-30 at 4 56 42 AM" src="https://github.com/user-attachments/assets/d036f333-869a-418a-8a63-b99509beade6" />

<img width="1455" height="827" alt="Screenshot 2026-04-30 at 4 57 15 AM" src="https://github.com/user-attachments/assets/3118c8dc-2463-4b3a-ac0c-a92a0fcebd05" />
<img width="1470" height="833" alt="Screenshot 2026-04-30 at 4 57 01 AM" src="https://github.com/user-attachments/assets/2a5156b9-ca60-4414-919c-ec581147721d" />


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

### 🎯 Personalized Recommendations
- AI-curated **Diet Plans** with macro-balanced Indian meals
- **Workout Plans** across Yoga, Gym, and Cardio categories
- Embedded YouTube workout videos for guided sessions
- Filters by duration, calorie burn, and fitness goal

### 👤 Profile & Settings
- Google Sign-In via **Firebase Authentication**
- Guest mode for instant access without sign-up
- Full profile editor: calorie goals, protein targets, cuisine preferences, budget, city
- Sustainability impact tracker (CO₂ saved by buying local)

---

## 🏗️ Architecture & Tech Stack

```
swasthbite/
├── src/
│   ├── components/
│   │   ├── Dashboard.tsx          # Main app shell with sidebar & bottom nav
│   │   ├── LandingPage.tsx        # Animated marketing landing page
│   │   ├── Onboarding.tsx         # Multi-step user onboarding flow
│   │   ├── Logo.tsx               # SVG-based SwasthBite logo
│   │   ├── ThemeToggle.tsx        # Dark/Light mode toggle
│   │   ├── CatWidget.tsx          # Animated cat mascot easter egg
│   │   ├── PrismBackground.tsx    # 3D prism particle background (Three.js)
│   │   ├── SynapseBackground.tsx  # Neural network animated background
│   │   └── subpages/
│   │       ├── HomeSubpage.tsx           # Dashboard home with health overview
│   │       ├── AarogyaSubpage.tsx        # Health score & metrics
│   │       ├── ChatSubpage.tsx           # Swastha AI chat interface
│   │       ├── MandiSubpage.tsx          # Live market prices & trends
│   │       ├── MealPlanSubpage.tsx       # 7-day Vedic meal planner
│   │       ├── RecommendationsSubpage.tsx # Diet & workout recommendations
│   │       ├── PrescriptionSubpage.tsx   # Prescription analyzer
│   │       ├── RewardsSubpage.tsx        # Coins, badges & coupons
│   │       └── ProfileSubpage.tsx        # User profile & settings
│   ├── context/
│   │   └── AuthContext.tsx        # Firebase auth + profile state management
│   ├── services/
│   │   └── aiService.ts           # LLM + Food scanning AI service layer
│   ├── data/
│   │   ├── calorieMapping.ts      # 80+ Indian food calorie/protein data
│   │   └── foodDatabase.ts        # Extended food nutritional database
│   └── lib/
│       ├── firebase.ts            # Firebase configuration
│       └── utils.ts               # Tailwind class merge utilities
├── backend/
│   └── main.py                    # FastAPI server for model inference
├── public/
│   ├── manifest.json              # PWA Web App Manifest
│   ├── sw.js                      # Service Worker for PWA installation
│   └── icon.svg                   # App icon
├── server.ts                      # Express + Vite dev server
├── vite.config.ts                 # Vite build configuration
└── package.json                   # Project dependencies
```

---

## 🧬 AI & ML Pipeline

```
User uploads food image
         │
         ▼
┌─────────────────────┐
│  FastAPI Backend     │  ← Custom CNN (food_model_v2.keras)
│  /predict endpoint   │    Trained on 80+ Indian food classes
└────────┬────────────┘
         │ Food class + confidence
         ▼
┌─────────────────────┐
│  calorieMapping.ts  │  ← Lookup calories, protein, macros
│  (Local Database)   │
└────────┬────────────┘
         │ Nutritional data
         ▼
┌─────────────────────┐
│  Aarogya Score      │  ← Recalculate health score
│  Recalculation      │
└─────────────────────┘
```

```
User sends chat message
         │
         ▼
┌─────────────────────┐
│  LM Studio Local    │  ← LLaMA 3 8B Instruct
│  (Port 1234)        │    OpenAI-compatible API
└────────┬────────────┘
         │ AI Response
         ▼
┌─────────────────────┐
│  System Prompt with │  ← Profile, goals, history,
│  User Context       │    fasting dates, Aarogya score
└─────────────────────┘
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 20+ and **npm**
- **Python** 3.10+ (for backend food scanner)
- **LM Studio** (for local AI chat — optional)
- A **Firebase** project with Firestore + Google Auth enabled

### 1. Clone the repository

```bash
git clone https://github.com/BiswajitDas77/SwasthBite-2026.git
cd SwasthBite-2026
```

### 2. Install frontend dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the root directory:

```env
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### 4. Start the development server

```bash
npm run dev
```

The app will be available at **http://localhost:3000**

### 5. (Optional) Start the FastAPI food scanner backend

```bash
cd backend
pip install fastapi uvicorn tensorflow pillow python-multipart
uvicorn main:app --reload --port 8000
```

### 6. (Optional) Start LM Studio for AI Chat

1. Download [LM Studio](https://lmstudio.ai/)
2. Load `meta-llama-3-8b-instruct` model
3. Start the local server on port `1234`

---

## 📱 Installing as a Mobile App (PWA)

SwasthBite is a fully installable Progressive Web App. To install it on your phone:

**iPhone (Safari):**
1. Open the app URL in Safari
2. Tap the **Share** button
3. Select **"Add to Home Screen"**

**Android (Chrome):**
1. Open the app URL in Chrome
2. Tap the **3-dot menu**
3. Select **"Install App"** or **"Add to Home Screen"**

Once installed, SwasthBite launches full-screen with no browser UI — exactly like a native app.

---

## 🛠️ Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build production bundle |
| `npm run preview` | Preview production build locally |
| `npm run lint` | TypeScript type checking |
| `npm run clean` | Remove build artifacts |

---

## 🌐 Deployment

### Deploy to Vercel (Frontend)

```bash
npm install -g vercel
vercel --prod
```

### Deploy to Netlify

```bash
npm run build
# Drag and drop the /dist folder to Netlify dashboard
# Or connect your GitHub repo directly
```

> **Note:** For the AI food scanner to work after deployment, you must also deploy the FastAPI backend to a cloud service (Railway, Render, or AWS EC2) and update the API URL in `src/services/aiService.ts`.

---

## 🔑 Key Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `react` | 19 | UI framework |
| `typescript` | 5.8 | Type safety |
| `vite` | 6 | Build tool & dev server |
| `tailwindcss` | 4 | Utility-first CSS |
| `motion` | 12 | Animations & transitions |
| `firebase` | 12 | Authentication & Firestore |
| `three` | 0.184 | 3D market charts & backgrounds |
| `recharts` | 3 | Data visualization charts |
| `tesseract.js` | 7 | OCR for prescription/label scanning |
| `gsap` | 3 | Advanced scroll animations |
| `lucide-react` | 0.546 | Icon library |
| `@google/genai` | 1.50 | Gemini API (optional cloud AI) |

---

## 🙏 Acknowledgements

- **Ayurvedic dietary principles** that form the foundation of our meal planning logic
- **Azadpur Mandi, Delhi** — India's largest vegetable market — as the reference for our market pricing model
- The open-source **Indian Food Images dataset** used to train our custom CNN model
- **LM Studio** for enabling local LLM inference without cloud costs

---

## 👥 Team

**SwasthBite 2026** — Built with ❤️ for the health and wellness of every Indian household.


## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

<div align="center">

**Made with 🌿 for healthier India**

[🌐 Live Demo](https://github.com/BiswajitDas77/SwasthBite-2026) · [🐛 Report Bug](https://github.com/BiswajitDas77/SwasthBite-2026/issues) · [✨ Request Feature](https://github.com/BiswajitDas77/SwasthBite-2026/issues)

</div>
