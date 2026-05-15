# 🎯 UNICREDIT FINTECH HACKATHON - FINAL TECHNICAL STACK

**Theme:** AI Financial Coach - Banking chatbot with personalized product recommendations

**Duration:** 48 hours (May 15-16, 2026)
**Team:** 5 people (2 developers, 2 marketing, 1 multiuser)
**Unique Value:** Chatbot recommends specific products with direct links + Iași branch location

---

## 🎯 FINAL SCOPE (CHATBOT FOCUS)

### ✅ WHAT WE BUILD:
1. **Minimal Onboarding** - 5-7 questions to characterize user
2. **AI Chatbot** - Natural conversation with Gemini in English
3. **Personalized Recommendations** - UniCredit products + direct links + branch info
4. **Interactive UI** - React minimal, responsive, UniCredit branding

### ❌ OUT OF SCOPE:
- Full dashboard
- Transaction history
- Multiple users in DB
- Complex login/auth
- Real bank API integration

### 👤 Simulated Client (Age 23):
```json
{
  "name": "Alex Thompson",
  "age": 23,
  "employment": "Student + Freelancer",
  "monthly_income": 800,
  "monthly_spending": 600,
  "savings": 2500,
  "goals": ["travel", "new laptop"],
  "risk_tolerance": "low",
  "interests": ["tech", "travel"],
  "city": "Iași, Romania",
  "problems": ["unclear budget", "impulse spending"]
}
```

### 🏢 Hardcoded Iași Branch:
```json
{
  "name": "UniCredit Iași - City Center",
  "address": "Str. Cuza Vodă 35, Iași, Romania",
  "phone": "+40 232 261 000",
  "email": "iasi@unicredit.ro",
  "hours": "Mon-Fri: 9:00-18:00, Sat: 9:00-13:00",
  "distance_km": 2.5,
  "coordinates": {
    "lat": 47.1646,
    "lng": 27.5842
  }
}
```

---

## 🏗️ SIMPLIFIED ARCHITECTURE

```
┌─────────────────────────────────────────────────┐
│            FRONTEND (React SPA)                  │
│  - Onboarding form (5-7 questions)              │
│  - Chat UI (messages, input)                    │
│  - Responsive mobile-first                      │
│  - UniCredit branding (colors, fonts, logos)    │
│  - Language: English (MVP)                      │
└───────────────┬─────────────────────────────────┘
                │ HTTP/REST
                │
┌───────────────▼─────────────────────────────────┐
│         BACKEND (Node.js/Express)                │
│  - Endpoint POST /api/chat                      │
│  - Fetch & parse UniCredit products             │
│  - Generate embeddings (Gemini)                 │
│  - Call Gemini API with RAG prompt              │
│  - Parse response + add links/branch            │
└───────────────┬─────────────────────────────────┘
                │
┌───────────────▼─────────────────────────────────┐
│   GEMINI API + Hardcoded Data                    │
│  - LLM: Gemini 2.0 Flash (FREE)                 │
│  - Embeddings: Embedding-001 (FREE)             │
│  - Client data: hardcoded in backend            │
│  - Products: parsed from unicredit.ro           │
│  - Branch: hardcoded Iași location              │
└─────────────────────────────────────────────────┘
```

---

## 📚 TECH STACK

| Layer | Technology | Why |
|-------|-----------|-----|
| **Frontend** | React 18 + Vite | Fast, hot reload, minimal |
| **Styling** | Tailwind CSS | Responsive, UniCredit colors |
| **HTTP Client** | Axios | Simple and robust |
| **Backend** | Node.js + Express | Minimal, flexible, fast |
| **Language** | TypeScript | Type safety |
| **LLM** | Gemini 2.0 Flash | FREE, built-in embeddings |
| **Data** | JSON hardcoded | No DB, demo only |
| **Hosting Demo** | Vercel/GitHub Pages | FREE, easy deploy |

---

## 🔑 CRITICAL TECH REQUIREMENTS

### 1. API LLM Integration ✅
- ✅ Use Gemini API
- ✅ Prompt with client profile in JSON
- ✅ Search for relevant products (embeddings)
- ✅ Response in English, personalized

### 2. Value-Added Recommendations ✅
```
User asks: "I want to save money for a trip"
Bot responds:
"I recommend our Term Deposit with 5.5% annual interest.
Your money grows while you wait for your trip.
📍 Nearest branch: Iași, Str. Cuza Vodă 35
📞 Phone: +40 232 261 000
🔗 View product: https://www.unicredit.ro/depozite-la-termen"
```

### 3. Interactive MVP Flow
```
1. User lands on page
2. Completes 5-7 quick questions
3. Simulated profile created (Alex Thompson's data)
4. Accesses chat with AI Financial Coach
5. Asks questions about money/products
6. AI responds personalized + recommends
7. Click links → see product or call branch
```

---

## 📁 FOLDER STRUCTURE

```
unicredit-hackathon/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Onboarding.tsx          # Quick 5-7 questions form
│   │   │   ├── ChatBot.tsx             # Chat UI
│   │   │   ├── MessageBubble.tsx       # Single message
│   │   │   ├── Header.tsx              # UniCredit logo
│   │   │   └── LanguageToggle.tsx      # EN/RO toggle (for future)
│   │   ├── pages/
│   │   │   └── App.tsx                 # Main page
│   │   ├── services/
│   │   │   └── api.ts                  # Backend calls
│   │   ├── types/
│   │   │   └── index.ts                # TypeScript types
│   │   └── main.tsx
│   ├── public/
│   │   └── unicredit-logo.svg          # Bank logo
│   ├── package.json
│   ├── vite.config.ts
│   └── tsconfig.json
│
├── backend/
│   ├── src/
│   │   ├── server.ts                   # Entry point
│   │   ├── routes/
│   │   │   └── chatRoutes.ts           # POST /api/chat
│   │   ├── services/
│   │   │   ├── geminiService.ts        # Gemini integration + RAG
│   │   │   ├── productsService.ts      # Fetch & parse products
│   │   │   └── recommendationService.ts # Recommendation logic
│   │   ├── data/
│   │   │   ├── clientProfile.ts        # Alex Thompson (hardcoded)
│   │   │   ├── products.json           # UniCredit catalog
│   │   │   └── branches.json           # Iași branch (hardcoded)
│   │   └── types/
│   │       └── index.ts
│   ├── .env.example
│   ├── package.json
│   ├── tsconfig.json
│   └── README.md
│
├── docs/
│   ├── ARCHITECTURE.md                 # Architecture diagram
│   ├── API_REFERENCE.md                # API endpoints
│   ├── DESIGN_GUIDE.md                 # UniCredit branding
│   └── GEMINI_PROMPTING.md             # Prompt strategy
│
├── .gitignore
├── .github/
│   └── workflows/                      # CI/CD (optional)
├── README.md                           # Project documentation
└── CONTRIBUTING.md                     # Collaboration guide
```

---

## 🔧 INITIAL SETUP

### Environment Variables

**`.env.example` (shared):**
```env
# Backend
PORT=3001
NODE_ENV=development

# Gemini API
GEMINI_API_KEY=AIzaSyD_YOUR_KEY_HERE

# Frontend
VITE_API_URL=http://localhost:3001
```

### Quick Setup (5 minutes)

**Backend:**
```bash
cd backend
npm install
npm run dev
# → http://localhost:3001
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev
# → http://localhost:5173
```

---

## 📋 API ENDPOINT

### POST /api/chat

**Request:**
```json
{
  "message": "I want to save money for a trip",
  "clientProfile": {
    "name": "Alex Thompson",
    "age": 23,
    "monthly_income": 800,
    "monthly_spending": 600,
    "savings": 2500,
    "goals": ["travel", "laptop"],
    "risk_tolerance": "low",
    "city": "Iași"
  }
}
```

**Response:**
```json
{
  "response": "I recommend our Term Deposit with 5.5% annual interest. Your money grows while you wait for your trip. 📍 Nearest branch: Iași, Str. Cuza Vodă 35 | 📞 +40 232 261 000 | 🔗 https://www.unicredit.ro/depozite-la-termen",
  "recommendedProduct": {
    "id": "term_deposit",
    "name": "Term Deposit",
    "url": "https://www.unicredit.ro/depozite-la-termen",
    "branch": "Iași, Str. Cuza Vodă 35",
    "phone": "+40 232 261 000"
  }
}
```

---

## 🎨 UNICREDIT BRANDING

### Colors (from official guide)
- **Primary:** UniCredit Blue (#003A70)
- **Secondary:** Gray (#666666)
- **Accent:** Orange (#FF6600)
- **Background:** White (#FFFFFF)

### Typography
- Font: UniCredit Sans (or similar sans-serif)
- Heading: Bold/500
- Body: Regular/400

### Logo & Assets
- Download: https://zeroheight.com/44059a76b/p/643050-brand-styleguide/b/742877
- Colors: https://zeroheight.com/44059a76b/p/72eb57-colors
- Icons: https://zeroheight.com/44059a76b/p/86f701-iconography

---

## 📊 UNICREDIT PRODUCTS (Complete Catalog)

Fetched from https://www.unicredit.ro/ro/persoane-fizice.html and stored in `backend/src/data/products.json`

### Main Categories:

**Accounts & Cards:**
- Current Account
- Savings Account
- Debit Card
- Credit Card
- Meal Card

**Credits:**
- Mortgage Credit
- Personal Loans
- Refinancing Loan
- Credit Cards

**Savings & Investment:**
- Term Deposits
- Savings Accounts
- Investment Funds
- OneMarkets Fund

**Insurance:**
- Genius Protect
- Home Insurance
- Life Insurance
- Premium/Start Invest
- Umbrella Coverage

**Digital Services:**
- Mobile Banking
- Online Banking
- ShopSmart
- Apple Pay
- Google Pay
- RoPay

---

## 🎯 GEMINI PROMPT STRATEGY

### Prompt Template (English)

```
You are an expert financial advisor for UniCredit Romania.
Your task is to provide personalized financial advice.

CLIENT PROFILE:
- Name: Alex Thompson
- Age: 23
- Monthly Income: $800
- Monthly Spending: $600
- Savings: $2500
- Goals: Travel, new laptop
- Risk Tolerance: Low
- Location: Iași, Romania

RELEVANT PRODUCTS:
{relevant_products_json}

BRANCH INFORMATION:
Address: Str. Cuza Vodă 35, Iași, Romania
Phone: +40 232 261 000
Hours: Mon-Fri 9:00-18:00, Sat 9:00-13:00

USER QUESTION: {user_message}

RESPOND IN ENGLISH:
1. Give educational financial advice
2. Recommend the most appropriate product
3. Include: product name, URL link, branch address, phone
4. Be concise (max 3 sentences)
5. Be friendly and professional
6. Make it actionable for the user
```

### Key Points:
- ✅ Always respond in English
- ✅ Personalize based on Alex's profile
- ✅ Recommend ONE primary product
- ✅ Include direct links
- ✅ Include branch location + phone
- ✅ Educational tone (not pushy)
- ✅ Address the specific goal/problem

---

## 🚀 DEVELOPMENT TIMELINE (48h)

### Hour 0-4: Setup + Core Backend
- [ ] Git repository created
- [ ] Backend scaffolding (Express + TypeScript)
- [ ] Create `/api/chat` endpoint (basic)
- [ ] Initial Gemini API integration

### Hour 4-8: Products + RAG Implementation
- [ ] Fetch products from unicredit.ro
- [ ] Generate embeddings with Gemini
- [ ] Implement product relevance search
- [ ] Add links and branch information

### Hour 8-12: Frontend + Onboarding
- [ ] Setup React + Vite
- [ ] Create Onboarding component (5-7 questions)
- [ ] Connect with backend
- [ ] Apply UniCredit branding

### Hour 12-16: Chatbot UI + Testing
- [ ] Create ChatBot component
- [ ] Connect with `/api/chat` endpoint
- [ ] Improve Gemini prompts
- [ ] Manual testing (10+ questions)

### Hour 16-20: Polish + Documentation
- [ ] Improve UI/UX
- [ ] Test responsive (mobile/tablet)
- [ ] Write documentation
- [ ] Prepare demo presentation

### Hour 20-48: Buffer
- [ ] Bug fixes
- [ ] Prompt refinements
- [ ] UX improvements
- [ ] Demo rehearsal
- [ ] Final tweaks

---

## ✅ TECHNICAL CHECKLIST

### Backend
- [ ] Express server running
- [ ] `/api/chat` endpoint functional
- [ ] Gemini API integrated
- [ ] Products parsed from unicredit.ro
- [ ] Embeddings generated correctly
- [ ] Semantic product search working
- [ ] Responses include links + branch info
- [ ] Tested with 15+ questions in English
- [ ] All responses in English

### Frontend
- [ ] React + Vite running
- [ ] Onboarding component (5-7 questions)
- [ ] ChatBot component functional
- [ ] Connected with backend
- [ ] Responsive (mobile + desktop)
- [ ] UniCredit branding applied
- [ ] Clean and professional UI
- [ ] Smooth user experience

### Integration
- [ ] Frontend + Backend communicating
- [ ] Client profile saved from onboarding
- [ ] Chat fully functional end-to-end
- [ ] Personalized recommendations working
- [ ] Links clickable and correct
- [ ] Branch info accurate

### Documentation
- [ ] README complete
- [ ] API reference
- [ ] Setup instructions
- [ ] Branding guide
- [ ] Contributing.md

---

## 🌍 DEPLOYMENT (Optional if time permits)

**Frontend:**
```bash
cd frontend
npm run build
# Deploy to Vercel / GitHub Pages
```

**Backend:**
```bash
# Deploy to Railway, Render, Heroku, etc.
# Or keep on localhost for demo
```

---

## 📚 OFFICIAL RESOURCES

| Resource | Link |
|----------|------|
| UniCredit Website | https://www.unicredit.ro/ro/persoane-fizice.html |
| Brand Guide | https://zeroheight.com/44059a76b/p/643050-brand-styleguide |
| Colors | https://zeroheight.com/44059a76b/p/72eb57-colors |
| Icons | https://zeroheight.com/44059a76b/p/86f701-iconography |
| Gemini API Docs | https://ai.google.dev/ |
| React Docs | https://react.dev/ |
| Express Docs | https://expressjs.com/ |

---

## 🎯 HACKATHON EVALUATION (Judging Criteria)

| Criteria | Weight | How to Achieve |
|----------|--------|----------------|
| **Concept & Innovation** | 50% | Chatbot that recommends with real links. Real differentiation vs competition. |
| **Code Quality** | 25% | Clean code, well-structured, functional |
| **Brand Alignment** | 15% | UniCredit colors, fonts, logos applied correctly |
| **UI Design** | 10% | Clean, responsive, professional interface |

---

## ✅ NEXT STEPS

1. **Create Git repository** with structure
2. **Divide tasks** between 2 developers
3. **Initial setup** (backend + frontend boilerplate)
4. **Fetch UniCredit products**
5. **Integrate Gemini API** progressively
6. **Improve prompts** iteratively
7. **Polish UI** per branding
8. **Final demo** with clear use cases

---

**Ready to build! 🚀**
