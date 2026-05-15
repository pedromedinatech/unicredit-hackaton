# 📚 GIT COLLABORATIVE GUIDE FOR TEAMS

**Team:** 2 Developers + 2 Marketing + 1 Multiuser
**Duration:** 48 hours
**Goal:** Chatbot MVP with personalized product recommendations

---

## WHAT IS GIT?

**Git** is like a "version control" = history of changes to your code.

**Simple analogy:** Imagine Google Docs for code:
- When someone makes a change, it's saved in the history
- You can see who changed what and when
- If something breaks, you can go back

---

## SIMPLE STRUCTURE FOR YOUR CASE

For **2 developers + 3 non-tech**, I recommend **GitHub Flow** (super simple):

```
┌─────────────────────────────────────────┐
│         MAIN BRANCH (production)        │ ← Code that works
│    (working code + tested)              │
└────────────┬────────────────────────────┘
             │
             │ When I need to change something
             │
┌────────────▼────────────────────────────┐
│      MY BRANCH (develop/feature)        │ ← Code I'm testing
│  (code I'm experimenting with)          │
│  name: develop or feature/chatbot       │
└────────────┬────────────────────────────┘
             │
             │ When I finish and it works
             │
    Pull Request (review)
             │
             ▼
      Is it good? Yes ─► MERGE to MAIN
```

---

## ROLES IN YOUR TEAM

### 👨‍💻 Developer 1
- Creates branches with features
- Makes commits with changes
- Opens Pull Requests
- Reviews Developer 2's code

### 👨‍💻 Developer 2
- Same as Developer 1
- Coordinates with Developer 1

### 📊 Marketing (2 people) + Multiuser (1 person)
- **DO NOT touch code directly**
- Can access the repository to see progress
- Download documentation / assets / designs
- Comment on Pull Requests if needed

---

## FLOW STEP BY STEP (What you'll do)

### 1️⃣ INITIAL - Clone the project

```bash
# Only once, at the beginning
git clone https://github.com/your-team/unicredit-hackathon.git
cd unicredit-hackathon
```

✓ Now you have all the code on your machine

---

### 2️⃣ CREATE YOUR BRANCH (when you're going to work)

```bash
# Update code from server
git pull origin main

# Create a new branch with your name/feature
git checkout -b feature/chatbot-gemini-integration
```

**Clear branch names:**
- ✅ `feature/chatbot-gemini-integration`
- ✅ `feature/onboarding-form`
- ✅ `feature/product-fetching`
- ❌ `my-branch` (unclear)
- ❌ `asdfjkl` (not descriptive)

✓ Now you work in **YOUR branch**, other people's code doesn't affect you

---

### 3️⃣ WORK AND SAVE CHANGES (commits)

```bash
# See what files you changed
git status

# Add changes you want to save
git add src/services/geminiService.ts

# Save changes (commit)
git commit -m "feat: implement product search with embeddings"
```

**Clear commit messages:**
- ✅ `feat: add chat endpoint with RAG`
- ✅ `fix: fix error in product seed`
- ✅ `docs: update README with instructions`
- ❌ `changes` (not descriptive)
- ❌ `asdfg` (unreadable)

**Recommended format:**
```
<type>: <short description>

<longer description optional>

Examples of type:
- feat: new functionality
- fix: bug fix
- docs: documentation
- style: code formatting
- refactor: reorganize code
```

---

### 4️⃣ PUSH YOUR CHANGES (push)

```bash
# Send your branch to server
git push origin feature/chatbot-gemini-integration
```

✓ Now your code is on GitHub, others can see it

---

### 5️⃣ CREATE PULL REQUEST (PR) - Ask for review

**On GitHub (web interface):**
1. Go to repo → "Pull requests"
2. Click "New Pull Request"
3. Compare `main` ← `feature/chatbot-gemini-integration`
4. Write description of changes
5. Assign reviewer (the other developer)
6. Submit

**Example description:**
```
## Description
I implemented Gemini API integration for the chatbot.

## Changes
- ✅ Gemini service with RAG
- ✅ POST /api/chat endpoint
- ✅ Product seed with embeddings

## Testing
- Tested with 10+ questions in English
- Personalized responses based on profile
- Product links included

## Screenshots/Links
[Include evidence of working feature]

## Checklist
- [ ] Code reviewed
- [ ] Testing completed
- [ ] Documentation updated
```

---

### 6️⃣ REVIEW (Other developer reviews)

**Developer 2 opens your PR and:**
- Reads the code
- Asks questions if something is unclear
- Approves or asks for changes

```
"✅ Approved" → You can merge
"Needs changes" → Go back, adjust, push again
```

---

### 7️⃣ MERGE TO MAIN (integrate changes)

```bash
# On GitHub, click "Merge Pull Request"
# Or in terminal (if you prefer):
git checkout main
git pull origin main
git merge feature/chatbot-gemini-integration
git push origin main
```

✓ Your code is now in `main` (production)

---

### 8️⃣ CLEANUP YOUR BRANCH (optional but good)

```bash
# Delete local branch
git branch -d feature/chatbot-gemini-integration

# Delete remote branch (on GitHub)
git push origin -d feature/chatbot-gemini-integration
```

✓ Avoids accumulating old branches

---

## CONFLICTS (when two people change the same thing)

**Scenario:** You change line 50 of file.ts, Developer 2 also changes line 50 of file.ts

```bash
# Try to pull
git pull origin main

# ⚠️ CONFLICT! Git doesn't know which version to use
```

**Git marks the conflicts like this:**
```javascript
<<<<<<< HEAD
// Your version
console.log("my code");
=======
// Remote version
console.log("Developer 2's code");
>>>>>>> feature/other-change
```

**Solution:**
1. Open the file
2. Decide which version to keep (or combine both)
3. Delete the lines with `<<<<`, `====`, `>>>>`
4. Commit again

**How to avoid conflicts:**
- ✅ Divide tasks (you: chatbot, Dev 2: onboarding)
- ✅ Do `git pull` before starting
- ✅ Small, frequent commits
- ✅ Review PRs quickly

---

## BEST PRACTICES FOR YOUR TEAM

### 1. **Branching by Feature**
```
main → always works
├─ feature/chatbot
├─ feature/onboarding
└─ feature/products-fetch
```

### 2. **Frequent and small commits**
```
❌ Bad:
commit 1: "did everything"

✅ Good:
commit 1: "feat: add Gemini service"
commit 2: "feat: implement /chat endpoint"
commit 3: "fix: fix error in embeddings"
```

### 3. **Protect main branch**
In GitHub → Settings → Branches:
- ✅ Require Pull Request reviews (minimum 1)
- ✅ Require status checks to pass
- ✅ Dismiss PRs with conflicts

### 4. **Clear communication**
```
On Discord/Slack:
"Working on chatbot-gemini-integration"
"PR opened: #42"
"Merged to main"
```

---

## MOST USED COMMANDS

```bash
# See status
git status

# See history
git log --oneline

# Undo changes (before commit)
git checkout -- file.ts

# Undo last commit (but keep changes)
git reset --soft HEAD~1

# Switch branch
git checkout feature/other-branch

# Update my branch with main changes
git pull origin main

# See differences
git diff

# Stash (save changes temporarily)
git stash
git stash pop
```

---

## FOR THE 3 NON-TECH PEOPLE

**The only things you need to know:**

1. **Download project:**
   ```bash
   git clone https://github.com/your-team/unicredit-hackathon.git
   ```

2. **See progress:**
   - GitHub → "Commits" (see who changed what)
   - GitHub → "Pull Requests" (see work in progress)

3. **Download documentation/assets:**
   ```bash
   git pull origin main
   # Now you have README, documentation, etc.
   ```

4. **Don't touch code** (don't make code commits)
   - Can edit README
   - Can add assets in `/assets` folder
   - DO NOT change `.ts`, `.tsx`, `.sql` files

---

## RECOMMENDED INITIAL SETUP

### On GitHub:

1. **Create repository** (one of the developers):
   ```
   Name: unicredit-hackathon
   Visibility: Private (if private) or Public
   ```

2. **Protect main:**
   - Settings → Branches → Add rule
   - Branch name pattern: `main`
   - ✅ Require pull request reviews before merging
   - ✅ Require status checks to pass
   - ✅ Require branches to be up to date

3. **Add team:**
   - Settings → Collaborators
   - Invite the 5 people

### In terminal (Developer 1):

```bash
# Initial setup
git clone <repo-url>
cd unicredit-hackathon

# Create develop branch
git checkout -b develop
git push origin develop

# Create .gitignore template
echo "node_modules/" >> .gitignore
echo ".env" >> .gitignore
echo "dist/" >> .gitignore
echo ".DS_Store" >> .gitignore

git add .gitignore
git commit -m "chore: add gitignore"
git push origin develop
```

---

## TYPICAL DAY FLOW

```
Morning:
1. git pull origin main (update)
2. git checkout -b feature/my-task
3. ... work on my branch ...
4. git add . && git commit -m "..."
5. git push origin feature/my-task

Afternoon:
6. Open PR on GitHub
7. Developer 2 reviews
8. ... maybe ask for changes ...
9. Make changes, commit, push
10. Developer 2 approves
11. Merge to main on GitHub

End of day:
12. git checkout main
13. git pull origin main
14. Everything updated for next feature
```

---

## TROUBLESHOOTING

### "I forgot to make my branch and already edited files"
```bash
git stash                    # Save changes
git checkout -b feature/new
git stash pop               # Restore changes in new branch
git add . && git commit -m "..."
```

### "I need to see what changed since yesterday"
```bash
git log --since="24 hours ago" --oneline
```

### "I messed up, I want to undo last commit"
```bash
# If you didn't push (local):
git reset --soft HEAD~1

# If you already pushed (remote, careful):
git revert HEAD
```

### "I have a conflict, what do I do?"
```bash
# See conflicts
git status

# Open the files and resolve manually
# Then:
git add .
git commit -m "fix: resolve merge conflicts"
git push origin feature/my-branch
```

---

## QUICK REFERENCE TABLE

| Command | What it does |
|---------|-------------|
| `git clone URL` | Download project |
| `git pull origin main` | Update code |
| `git checkout -b feature/X` | Create new branch |
| `git status` | See changes |
| `git add .` | Prepare changes |
| `git commit -m "msg"` | Save changes |
| `git push origin feature/X` | Upload branch |
| `git log --oneline` | See history |
| `git diff` | See differences |
| `git merge feature/X` | Combine branches |
| `git branch -d feature/X` | Delete branch |

---

## FINAL RECOMMENDATION

For your hackathon:

✅ **Simple GitHub Flow:**
- 1 `main` branch (production)
- Each feature in its own branch (`feature/chatbot`, `feature/onboarding`, etc.)
- Pull Request + review before merge
- **DO NOT share main** - only tested changes

✅ **Clear communication:**
- Discord/Slack: "Working on X", "PR opened", "Merged"
- PRs with clear description
- Quick reviews (max 1 hour)

✅ **For non-tech:**
- Can see progress on GitHub
- Download documentation
- Comment on PRs
- **Don't edit code**

---

**With this you should have a clean and organized workflow!** 🚀
