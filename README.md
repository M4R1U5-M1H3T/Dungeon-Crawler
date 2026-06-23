# ⚔️ Syntax Sorcerer
**Dungeon Crawler · Python Edition**

Syntax Sorcerer is an educational web-based RPG for Romanian high school students (classes 9–11) learning Python. Players navigate a dungeon, battle algorithmic monsters, and unlock magical doors by answering Python coding challenges — all aligned to the official MEN curriculum.

---

## 🎮 Game Features

**Educational Combat System** — defeat enemies by correctly answering multiple-choice and write-code Python questions tailored to your grade.

**Write-Code Challenges** — type actual Python expressions or snippets. A server-side fuzzy-match validator (Levenshtein ≥ 80%) checks answers without exposing them to the client.

**Risk & Reward Mechanics:**
- Build an answer **Streak** to multiply damage and score
- Spend Mana (MP) to cast powerful spells
- Pay Gold or Score to reveal hints
- Try to flee (10% success rate, disabled against Bosses)

**RPG Progression** — gain XP, level up, collect gold, spend it in the Dungeon Shop (potions, mana crystals, XP tomes, max HP upgrades).

**Session Persistence** — progress is saved to `sessionStorage`; refreshing the page resumes exactly where you left off.

**Romanian Grading** — final score is converted to a grade on the 1–10 Romanian scale.

---

## 📚 Grade & Curriculum Support

The game covers all three years of Romanian high school Python Informatics, switchable via a dropdown in the top-right corner. Selecting a new grade resets the dungeon to the matching floors and question pool.

**Clasa a 9-a — Bazele Python**
Variabile & Tipuri · Operatori · Condiționale · Bucle · Șiruri · Liste · Funcții · Dicționare · Tupluri

**Clasa a 10-a — Structuri de Date & Algoritmi**
Tablouri 1D · Matrici 2D · Sortare · Căutare Binară · Interclasare · Fișiere Text

**Clasa a 11-a — Algoritmi Avansați & OOP**
Recursivitate · Backtracking · Stive & Cozi · Programare Orientată pe Obiecte

Each grade has its own dungeon (4 floors, 10–13 enemies) with ~110 questions.

---

## 🗺️ Chapter Explorer

On the main menu, every chapter name is a clickable chip that opens a panel with three options:

- **📖 Învață** — full lesson screen with theory, syntax, worked examples and common pitfalls from the MEN curriculum, with accordion sections and navigation between chapters
- **🎯 Quiz rapid** — start a full dungeon game filtered to that single chapter
- **✓ Quiz personalizat** — select multiple chapters and start a game covering exactly those topics

After a game ends, the results screen detects chapters where accuracy was low and offers direct links to study them or run a targeted practice quiz.

---

## 🏗️ Architecture

```
Dungeon-Crawler/
├── backend/
│   ├── server.js              # Express entry point (port 3001)
│   ├── data/
│   │   ├── challenges.js      # 330 questions tagged by grade + topic
│   │   └── dungeon.js         # Grade-keyed floors & enemies {9:{…}, 10:{…}, 11:{…}}
│   ├── services/
│   │   └── validator.js       # Levenshtein fuzzy-match for write answers
│   └── routes/
│       ├── challenges.js      # GET /api/challenges/random · POST /api/validate
│       └── dungeon.js         # GET /api/dungeon · GET /api/enemies
│
└── frontend/
    ├── vite.config.js         # Proxies /api → localhost:3001 in dev
    └── src/
        ├── App.jsx            # Grade state, dungeon fetch, session restore
        ├── Game.jsx           # Async handlers, screen router
        ├── api/gameApi.js     # fetch wrappers (grade + topic filtering)
        ├── data/
        │   └── chapterContent.js  # Curriculum learn content for all chapters
        ├── entities/          # Player & EnemyInstance classes
        ├── services/          # CombatService, ProgressionService
        ├── game/
        │   ├── gameReducer.js # useReducer — all game actions + per-topic stats
        │   └── initialState.js
        └── components/
            ├── screens/       # 12 screens (Menu, Learn, Combat, Door, Shop, …)
            └── ui/            # HUD, ProgressBar, ChallengeWidget, WriteWidget
```

### API Endpoints

| Method | Path | Query params | Description |
|--------|------|--------------|-------------|
| `GET` | `/api/dungeon` | `grade` | Floor definitions for the selected grade |
| `GET` | `/api/enemies` | `grade` | Enemy definitions for the selected grade |
| `GET` | `/api/challenges/random` | `grade`, `topic`, `topics`, `maxDiff`, `type`, `excludeIds` | Random challenge (answer stripped, options shuffled) |
| `POST` | `/api/validate` | — | `{challengeId, answer}` → `{correct, explanation, correctAnswer?}` |

---

## 🚀 Running the Project

**Prerequisites:** Node.js 18+, npm

```bash
# Backend (port 3001)
cd backend
npm install
npm start

# Frontend (port 5173)
cd frontend
npm install
npm run dev
```

Open **http://localhost:5173**. Vite proxies all `/api` requests to the backend automatically.

**Production build:**
```bash
cd frontend && npm run build   # output in frontend/dist/
```
Serve `dist/` with any static file server, pointing `/api` at the backend.

---

## 📄 See Also

[FUTURE_IMPROVEMENTS.md](./FUTURE_IMPROVEMENTS.md) — planned features and long-term vision.
