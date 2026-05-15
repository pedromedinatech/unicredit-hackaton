# 👥 WORK DISTRIBUTION BY ROLE

**Team:** 2 Developers + 2 Marketing + 1 Multiuser
**Duration:** 48 hours
**Goal:** AI Financial Coach chatbot MVP

---

## 👨‍💻 DEVELOPER 1 (Frontend Lead)

### Responsibilities:
- [ ] Setup React + Vite project
- [ ] Create component architecture
- [ ] Build Onboarding component (5-7 questions)
- [ ] Build ChatBot component (UI/UX)
- [ ] API integration with backend
- [ ] Responsive design (mobile-first)
- [ ] UniCredit branding implementation
- [ ] Language support groundwork (for future i18n)

### Timeline:
- **Hour 0-2:** React setup + scaffolding
- **Hour 2-6:** Component structure + Onboarding
- **Hour 6-10:** ChatBot UI + message display
- **Hour 10-14:** Backend integration + styling
- **Hour 14-20:** Responsive design + polish
- **Hour 20-48:** Buffer for iterations

### Tech Stack:
```typescript
- React 18
- Vite
- TypeScript
- Tailwind CSS
- Axios
```

### Key Files to Create:
```
frontend/src/
├── components/
│   ├── Onboarding.tsx       # Form with 5-7 questions
│   ├── ChatBot.tsx          # Main chat interface
│   ├── MessageBubble.tsx    # Individual message display
│   ├── Header.tsx           # Logo + branding
│   └── InputBox.tsx         # Chat input
├── pages/
│   └── App.tsx              # Main page controller
├── services/
│   └── api.ts               # Backend API calls
├── types/
│   └── index.ts             # TypeScript definitions
└── styles/
    └── globals.css          # Global styles
```

### Questions for Onboarding:
```
1. What's your name?
2. What's your age?
3. What's your employment status?
4. Approximately how much do you earn per month?
5. What are your main financial goals?
6. How do you feel about financial risk? (Low/Medium/High)
7. (Optional) Any specific money problems you face?
```

### Design Checklist:
- [ ] UniCredit blue (#003A70) as primary
- [ ] Clean, minimal design
- [ ] Smooth animations on transitions
- [ ] Clear call-to-action buttons
- [ ] Readable font sizes (minimum 14px)
- [ ] Good contrast ratios
- [ ] Mobile-responsive grid

---

## 👨‍💻 DEVELOPER 2 (Backend Lead)

### Responsibilities:
- [ ] Setup Node.js + Express server
- [ ] Fetch UniCredit products from web
- [ ] Integrate Gemini API
- [ ] Generate product embeddings
- [ ] Implement `/api/chat` endpoint with RAG
- [ ] Product search & relevance
- [ ] Response formatting with links + branch
- [ ] Testing with multiple questions
- [ ] Error handling & validation

### Timeline:
- **Hour 0-2:** Express setup + scaffolding
- **Hour 2-4:** Fetch products from unicredit.ro
- **Hour 4-8:** Gemini API integration + embeddings
- **Hour 8-12:** `/api/chat` endpoint complete
- **Hour 12-16:** Testing + prompt refinement
- **Hour 16-20:** Performance + error handling
- **Hour 20-48:** Buffer for improvements

### Tech Stack:
```typescript
- Node.js + Express
- TypeScript
- @google/generative-ai
- Axios
```

### Key Files to Create:
```
backend/src/
├── server.ts
├── routes/
│   └── chatRoutes.ts        # POST /api/chat
├── services/
│   ├── geminiService.ts     # LLM integration
│   ├── productsService.ts   # Product fetching
│   └── recommendationService.ts
├── data/
│   ├── clientProfile.ts     # Alex Thompson (hardcoded)
│   ├── products.json        # UniCredit catalog
│   └── branches.json        # Iași branch info
└── types/
    └── index.ts
```

### Gemini Service Implementation:

```typescript
// Key functions needed:
- generateEmbedding(text: string): Promise<number[]>
- searchRelevantProducts(query: string, k: number): Promise<Product[]>
- chatWithRAG(message: string, clientProfile: Profile): Promise<Response>

// Prompt strategy:
- Build context with client profile
- Include top 3 relevant products
- Add branch information
- Generate personalized, actionable response
```

### Product Fetching Strategy:

```
1. Fetch unicredit.ro/ro/persoane-fizice.html
2. Parse HTML for product information
3. Store in products.json with:
   - id (unique identifier)
   - name
   - description
   - category
   - url (direct link)
   - key_benefits
   - target_audience

4. Generate embeddings for each product description
5. Store embeddings for RAG search
```

### Response Format Example:

```json
{
  "response": "Based on your goal to travel, I recommend our Term Deposit with 5.5% annual interest. Your savings will grow safely while you prepare for your trip. 📍 Visit: Str. Cuza Vodă 35, Iași | 📞 +40 232 261 000 | 🔗 https://www.unicredit.ro/depozite-la-termen",
  "recommendedProduct": {
    "id": "term_deposit",
    "name": "Term Deposit",
    "url": "https://www.unicredit.ro/depozite-la-termen",
    "interestRate": "5.5%",
    "terms": ["3 months", "6 months", "12 months"]
  },
  "branchInfo": {
    "address": "Str. Cuza Vodă 35, Iași, Romania",
    "phone": "+40 232 261 000",
    "email": "iasi@unicredit.ro",
    "hours": "Mon-Fri: 9:00-18:00, Sat: 9:00-13:00"
  }
}
```

### Testing Scenarios:

```
Test Case 1: New to banking
User: "I have 2000 euros and don't know what to do with it"
Expected: Recommend savings account or term deposit

Test Case 2: Travel planning
User: "I want to save money for a vacation"
Expected: Recommend savings account or term deposit

Test Case 3: Student budget
User: "I'm a student with little money, can I get a loan?"
Expected: Explain options for young people

Test Case 4: Risk aversion
User: "I don't want to lose my money"
Expected: Recommend low-risk products (savings, deposits)

Test Case 5: Credit building
User: "How can I build my credit history?"
Expected: Recommend credit card with low limits
```

---

## 📊 MARKETING 1 (Presentation & Narrative)

### Responsibilities:
- [ ] Create elevator pitch (30 seconds)
- [ ] Write project description
- [ ] Prepare presentation slides (3-5 slides)
- [ ] Define the "why" - uniqueness
- [ ] Argue how it meets hackathon requirements
- [ ] Create demo video/screencast (if time)
- [ ] Write talking points for each slide
- [ ] Practice presentation delivery

### Deliverables:
```
- Pitch deck (3-5 slides, PowerPoint/Keynote/Google Slides)
- Project description (GitHub)
- Presentation script (5-7 minutes)
- Judge summary (1-2 page)
```

### Pitch Structure:

**Slide 1: Problem**
```
"How many of you struggle to understand which financial products
are right for you? Even at a bank's website, it's hard to know
if a loan, savings account, or credit card fits your situation."
```

**Slide 2: Solution**
```
"Alex is using our AI Financial Coach chatbot. It asks simple
questions, understands his goals, and recommends the perfect
UniCredit product for his needs."
```

**Slide 3: Live Demo**
```
[Quick 1-2 minute demo of chatbot in action]
```

**Slide 4: Why It's Different**
```
- Real product recommendations with direct links
- Personalized based on financial profile
- Branch information right in the chat
- Educational, not pushy
- Works in English (expandable to Romanian)
```

**Slide 5: Impact**
```
- Improves user experience at UniCredit
- Reduces decision paralysis
- Increases product adoption
- Can be integrated into their existing app
```

### Key Points to Emphasize:

✅ **Innovation (50% of score)**
- Chatbot that actually recommends products
- Links directly to products + branch location
- Personalization based on real profile
- Real value, not just a chatbot

✅ **Code Quality (25%)**
- Clean, well-structured codebase
- Proper separation of concerns
- Error handling
- Documented

✅ **Brand Alignment (15%)**
- UniCredit colors, fonts, logos
- Professional appearance
- Follows brand guidelines

✅ **UI Design (10%)**
- Clean, modern interface
- Mobile responsive
- Good user experience

### Timeline:
- **Hour 8-12:** Understand chatbot completely
- **Hour 12-16:** Write narrative + create slides
- **Hour 16-24:** Prepare slides + practice
- **Hour 24-48:** Rehearse + refine presentation

---

## 📊 MARKETING 2 (Content & Assets)

### Responsibilities:
- [ ] Write comprehensive README
- [ ] Create use case documentation
- [ ] Take screenshots of each screen
- [ ] Create screencasts/GIFs
- [ ] Document technical approach (simplified)
- [ ] Create case studies/examples
- [ ] Organize visual assets
- [ ] Proofread all documentation

### Deliverables:
```
- README.md (complete and clear)
- Use cases (5+ documented examples)
- Screenshots (all main screens)
- Demo GIF (chatbot in action)
- Setup guide
```

### README Structure:

```markdown
# UniCredit AI Financial Coach

## What is it?
A chatbot that helps you find the right UniCredit product for your financial goals.

## Features
- 5-minute onboarding to understand your profile
- AI-powered recommendations in English
- Direct links to products
- Iași branch information

## How it works
1. Answer a few quick questions
2. Tell Alex what your money goal is
3. Get a personalized product recommendation
4. Click to learn more or call the branch

## Try it
[Link to demo]

## Technologies
- Frontend: React + TypeScript
- Backend: Node.js + Express
- AI: Gemini API (FREE)

## Architecture
[Simple diagram]

## Setup
[Quick start instructions]

## Future Enhancements
- Romanian language support
- Multiple locations
- More sophisticated recommendations
- Integration with real banking API
```

### Use Cases to Document:

```
Use Case 1: The Traveler
Profile: 23-year-old student wanting to save for vacation
Goal: Have 1000 euros in 6 months
Recommendation: Term Deposit with 5.5% interest
Impact: Safer way to save + earning interest

Use Case 2: The Saver
Profile: 23-year-old freelancer with irregular income
Goal: Build emergency fund
Recommendation: Savings Account
Impact: Flexible, always accessible

Use Case 3: The Investor
Profile: Young professional wanting to grow wealth
Goal: Start investing
Recommendation: Investment Funds
Impact: Diversified portfolio, professional management

Use Case 4: The Credit Builder
Profile: No credit history
Goal: Build credit score
Recommendation: Credit Card with low limit
Impact: Establish financial credibility

Use Case 5: The Borrower
Profile: Need money for specific purchase
Goal: Get a personal loan
Recommendation: Personal Loan with fixed rate
Impact: Predictable payments, competitive rates
```

### Screenshots to Capture:

1. Homepage with onboarding button
2. Onboarding form (questions 1-3)
3. Onboarding form (questions 4-7)
4. Chat interface - empty state
5. Chat - user question
6. Chat - bot recommendation with links
7. Branch information popup
8. Product link (external)

### Timeline:
- **Hour 4-8:** Understand the product
- **Hour 8-14:** Write documentation
- **Hour 14-20:** Capture screenshots/GIFs
- **Hour 20-48:** Update as development progresses

---

## 🛠️ MULTIUSER (Coordinator & QA)

### Responsibilities:
- [ ] Coordinate team communication
- [ ] Manage Git repository
- [ ] Perform QA testing
- [ ] Prepare demo environment
- [ ] Document processes
- [ ] Provide team support

### Key Tasks:

#### Git & Repository (Hour 0-4):
```bash
- Create GitHub repo with proper structure
- Setup branch protection rules
- Add all team members
- Create templates (PR, issue)
- Setup .gitignore, README templates
```

#### Communication (Ongoing):
```
- Discord/Slack channel
- Daily standup (15 min)
- Share blockers quickly
- Celebrate merges
```

#### QA Testing (Hour 12-48):
```
Manual Testing Checklist:
- [ ] Onboarding questions load properly
- [ ] All 7 questions are required
- [ ] Form submission works
- [ ] Chat loads after onboarding
- [ ] Can type messages
- [ ] Bot responds (doesn't timeout)
- [ ] Response is in English
- [ ] Links are clickable
- [ ] Branch info is correct
- [ ] Responses are personalized
- [ ] Mobile responsive (test on phone)
- [ ] No console errors
- [ ] Fast load times
- [ ] No broken links
```

#### Demo Preparation (Hour 16-48):
```
Environment Setup:
- [ ] Backend running on localhost:3001
- [ ] Frontend running on localhost:5173
- [ ] Gemini API key configured
- [ ] Products parsed correctly
- [ ] Client profile loaded
- [ ] Ready to demo without internet issues
- [ ] Demo script prepared
- [ ] Talking points ready
```

#### Demo Script:
```
1. "This is Alex, 23, freelancer from Iași"
2. "She completes our quick onboarding"
3. "Now she asks the chatbot..."
4. "User: I want to save money for a trip"
5. "Bot recommends Term Deposit"
6. "Shows branch location and phone"
7. "Link to product on UniCredit website"
```

### Testing Scenarios to Run:

**Browser Compatibility:**
- [ ] Chrome
- [ ] Firefox
- [ ] Safari (if Mac)
- [ ] Edge

**Devices:**
- [ ] Desktop (1920x1080)
- [ ] Tablet (iPad 768x1024)
- [ ] Mobile (iPhone 375x667)

**Edge Cases:**
- [ ] Empty responses
- [ ] Timeout handling
- [ ] Network error recovery
- [ ] Multiple rapid questions
- [ ] Special characters in input

### Timeline:
- **Hour 0-2:** Git setup
- **Hour 4-8:** Communication setup + process docs
- **Hour 12-24:** QA testing as code is written
- **Hour 24-48:** Demo prep + final QA

---

## 📅 COLLABORATIVE TIMELINE

### Hour 0-4: Foundation Phase

**Developers:**
- Git repo setup ✓
- Backend: npm init + Express scaffold
- Frontend: npm create vite + React scaffold

**Marketing:**
- Read hackathon requirements
- Understand the problem
- Start documentation

**Multiuser:**
- Coordinate setup
- Verify everyone has Git
- Test environment

**Standup:** All gather (30 min)
- Confirm understanding
- Divide tasks
- Plan daily meetings

---

### Hour 4-8: Parallel Development

**Dev 1 + Marketing 2:**
- Frontend: Onboarding component
- Marketing: Document structure

**Dev 2 + Multiuser:**
- Backend: Fetch UniCredit products
- Setup: Verify Gemini API works

**Marketing 1:**
- Understand the product deeply
- Start writing narrative

**Standup:** 15 min check-in

---

### Hour 8-12: Integration Phase

**Dev 1 + Dev 2:**
- Connect frontend to backend
- Test first flow end-to-end

**Marketing:**
- First draft of pitch
- Screenshot planning

**Multiuser:**
- QA initial flow
- Note any issues

**Standup:** 20 min
- Demo of first working flow
- Discuss any blockers

---

### Hour 12-16: Refinement Phase

**Dev 1:**
- Improve UI
- Responsive design
- UniCredit branding

**Dev 2:**
- Improve Gemini prompts
- Increase personalization
- Add links + branch info

**Marketing + Multiuser:**
- Capture screenshots
- QA comprehensive testing
- Prepare presentation

**Standup:** 20 min

---

### Hour 16-20: Polish Phase

**All:**
- QA exhaustive testing
- Bug fixes
- Last-minute improvements

**Dev 1:** UI/UX final tweaks
**Dev 2:** Prompt optimization
**Marketing:** Presentation rehearsal (45 min)
**Multiuser:** Full test suite

---

### Hour 20-48: Buffer & Delivery

**Flexible work** based on needs:
- Prompt iterations
- UX improvements
- Presentation rehearsals
- Documentation updates
- Demo environment finalization

**Before Demo (Hour 46-48):**
- Full system test
- Practice presentation
- Backup plan ready
- All links verified
- Demo script ready

---

## 🎯 DAILY MEETINGS

| Time | Duration | Who | Focus |
|------|----------|-----|-------|
| Hour 0 | 30 min | ALL | Kickoff + roles |
| Hour 4 | 15 min | ALL | Progress check |
| Hour 8 | 20 min | ALL | Demo + decisions |
| Hour 12 | 20 min | ALL | Integration status |
| Hour 16 | 20 min | ALL | QA update |
| Hour 20 | 30 min | Devs + Multi | Final demo test |
| Hour 24 | 30 min | Marketing + Devs | Presentation rehearsal |
| Hour 36 | 30 min | ALL | Final sync |

---

## ✅ ROLE-SPECIFIC CHECKLISTS

### Developer 1 Checklist:
- [ ] React + Vite running
- [ ] Components functional
- [ ] Backend connected
- [ ] Responsive mobile + desktop
- [ ] UniCredit branding applied
- [ ] No console errors
- [ ] TypeScript strict mode

### Developer 2 Checklist:
- [ ] Express running
- [ ] Products parsed
- [ ] Gemini API integrated
- [ ] Embeddings generated
- [ ] `/api/chat` fully functional
- [ ] Responses with links + branch
- [ ] Tested 15+ questions in English
- [ ] All responses in English

### Marketing 1 Checklist:
- [ ] Pitch deck complete
- [ ] Presentation 5-7 minutes
- [ ] Rehearsed multiple times
- [ ] Answers to likely questions prepared
- [ ] Speaking notes ready
- [ ] Timing perfect

### Marketing 2 Checklist:
- [ ] README complete
- [ ] Screenshots captured
- [ ] Use cases documented
- [ ] Setup instructions clear
- [ ] No typos
- [ ] All links working

### Multiuser Checklist:
- [ ] Git workflow implemented
- [ ] QA comprehensive
- [ ] Demo environment ready
- [ ] Team communication smooth
- [ ] Backup plans ready
- [ ] All documentation updated

---

## 💡 SUCCESS FORMULA

**Technical Excellence (50%):** 
- Chatbot works perfectly
- Recommendations are smart
- Links all work
- Fast responses

**Great Presentation (30%):**
- Clear, confident delivery
- Compelling narrative
- Live demo impresses
- Answers questions well

**Professional Polish (20%):**
- Clean code
- Good UI
- Clear documentation
- Brand alignment

---

**You've got this! 🚀**
