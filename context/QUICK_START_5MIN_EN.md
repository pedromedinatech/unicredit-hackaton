# ⚡ QUICK START - 5 MINUTES

Follow these steps exactly in order. No skipping.

---

## 1️⃣ CREATE REPOSITORY (Developer 1 - 2 min)

### On GitHub (GitHub.com)
```
1. Create new repo: https://github.com/new
2. Name: unicredit-hackathon
3. Visibility: Private (or Public)
4. Create repo
5. Copy URL (e.g.: https://github.com/your-team/unicredit-hackathon.git)
```

### In Terminal (your machine)
```bash
# Create project folder
mkdir unicredit-hackathon
cd unicredit-hackathon

# Initialize Git
git init
git remote add origin https://github.com/your-team/unicredit-hackathon.git

# Create develop branch
git checkout -b develop

# Create base folders
mkdir frontend backend docs

# Create .gitignore
cat > .gitignore << EOF
node_modules/
.env
.env.local
dist/
build/
.DS_Store
.vscode/
*.log
EOF

# First commit
git add .
git commit -m "chore: initial commit"
git push -u origin develop
```

✓ **Repository ready**

---

## 2️⃣ BACKEND (Developer 2 - 3 min)

```bash
# Enter folder
cd backend

# Initialize Node
npm init -y

# Install dependencies
npm install express cors dotenv typescript @types/express @types/node ts-node @google/generative-ai axios

# Create folders
mkdir -p src/{routes,services,data,types}

# Create .env
cat > .env << EOF
PORT=3001
GEMINI_API_KEY=YOUR_API_KEY_HERE
EOF

# Create tsconfig.json minimal
cat > tsconfig.json << EOF
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "lib": ["ES2020"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true
  }
}
EOF

# Create server.ts minimal
cat > src/server.ts << 'EOF'
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(port, () => {
  console.log(`🚀 Backend running on http://localhost:${port}`);
});
EOF

# Add scripts to package.json
npm pkg set scripts.dev="ts-node src/server.ts"
npm pkg set scripts.build="tsc"
npm pkg set scripts.start="node dist/server.js"

# Test
npm run dev
# Expected: "🚀 Backend running on http://localhost:3001"
```

✓ **Backend running**

---

## 3️⃣ FRONTEND (Developer 1 - 2 min)

**In another terminal:**

```bash
# From unicredit-hackathon folder
cd frontend

# Create React project with Vite
npm create vite@latest . -- --template react --yes

# Install dependencies
npm install

# Install Tailwind
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# Create .env
cat > .env << EOF
VITE_API_URL=http://localhost:3001
EOF

# Create tailwind.config.js (simplified)
cat > tailwind.config.js << 'EOF'
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        unicredit: {
          dark: '#003A70',
          light: '#666666',
          accent: '#FF6600',
        }
      }
    },
  },
  plugins: [],
}
EOF

# Test
npm run dev
# Expected: "http://localhost:5173"
```

✓ **Frontend running**

---

## 4️⃣ GET GEMINI API KEY (5 min)

1. Go to: https://aistudio.google.com/app/apikey
2. Click "Get API Key"
3. Click "Create API Key"
4. Copy key
5. Paste in `backend/.env` as `GEMINI_API_KEY=...`

✓ **API Key configured**

---

## 5️⃣ VERIFY CONNECTION (1 min)

**Terminal 1 (Backend):**
```bash
cd backend
npm run dev
# Should show: "🚀 Backend running on http://localhost:3001"
```

**Terminal 2 (Frontend):**
```bash
cd frontend
npm run dev
# Should show: "http://localhost:5173"
```

**Terminal 3 (Testing):**
```bash
# Test backend
curl http://localhost:3001/health
# Expected: {"status":"ok"}
```

✓ **EVERYTHING RUNNING**

---

## 📁 CURRENT STRUCTURE

```
unicredit-hackathon/
├── backend/
│   ├── src/
│   │   ├── server.ts          ✓
│   │   ├── routes/
│   │   ├── services/
│   │   ├── data/
│   │   └── types/
│   ├── package.json           ✓
│   ├── tsconfig.json          ✓
│   └── .env                   ✓
│
├── frontend/
│   ├── src/
│   ├── package.json           ✓
│   ├── tailwind.config.js     ✓
│   ├── vite.config.ts
│   └── .env                   ✓
│
├── docs/
└── .gitignore                 ✓
```

---

## 🔀 NEXT STEP (Git Branches)

**Developer 1 (Frontend):**
```bash
cd frontend
git checkout -b feature/onboarding
# ... work ...
git add .
git commit -m "feat: create onboarding component"
git push origin feature/onboarding
```

**Developer 2 (Backend):**
```bash
cd backend
git checkout -b feature/gemini-integration
# ... work ...
git add .
git commit -m "feat: integrate Gemini API"
git push origin feature/gemini-integration
```

---

## ✅ CHECKLIST

- [ ] Repository created on GitHub
- [ ] Backend on localhost:3001 with `/health` working
- [ ] Frontend on localhost:5173 loading
- [ ] Gemini API key in backend/.env
- [ ] Both developers in different branches (feature/...)
- [ ] .gitignore working (not uploading node_modules)
- [ ] Marketing + Multiusos can see GitHub

---

## 🆘 TROUBLESHOOTING

### Error: "Port 3001 already in use"
```bash
# Change port in backend/.env
PORT=3002
```

### Error: "GEMINI_API_KEY undefined"
```bash
# Verify it's in .env
cat backend/.env | grep GEMINI_API_KEY
# Should show the key
```

### Error: "Cannot find module"
```bash
# Reinstall
cd backend
rm -rf node_modules
npm install

cd ../frontend
rm -rf node_modules
npm install
```

### Frontend not connecting backend
```bash
# Verify VITE_API_URL
cat frontend/.env
# Should be: VITE_API_URL=http://localhost:3001
```

---

## ⏱️ TIME ELAPSED

- Git + folders setup: 2 min
- Backend: 3 min
- Frontend: 2 min
- Gemini API: 5 min
- Testing: 1 min

**Total: ~13 minutes** (more if issues)

Now you're ready to start coding. 🚀

---

## NEXT: Read these files in order

1. `GIT_COLLABORATIVE_GUIDE.md` - How to work as a team
2. `UNICREDIT_STACK_FINAL.md` - Complete architecture
3. `WORK_DISTRIBUTION_BY_ROLE.md` - Who does what
4. `IMPLEMENTATION_CODE_GUIDE.md` - Detailed code

**Good luck!** 🎯
