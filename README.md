# ⚔️ Syntax Sorcerer
**Dungeon Crawler · Python Edition**

Syntax Sorcerer is an educational web-based RPG designed to help 9th-grade students master Python programming. Players navigate a dungeon, battle algorithmic monsters, and unlock magical doors by answering Python coding challenges.

---

## 🎮 Game Features

* **Educational Combat System:** Defeat enemies like the *Bug Goblin* or the *Logic Witch* by correctly answering multiple-choice Python questions.
* **Write-Code Challenges (Sala Scriptorilor):** Type actual Python code to defeat bosses and unlock special doors. Features a smart "fuzzy-matching" validator (Levenshtein ≥ 80%) that runs **server-side** to keep answers hidden from the client.
* **Risk & Reward Mechanics:**
  * Build an answer **Streak** to multiply attack damage and score.
  * Spend Mana (MP) to cast powerful spells.
  * Pay Gold (💰) or Score to reveal hints.
  * Try to flee (🏃) with a 20% success rate (disabled against Bosses!).
* **RPG Progression:** Gain XP, level up to increase Max HP/MP, and collect gold to spend in the Dungeon Shop.
* **Dungeon Shop (🛒):** Buy Health Potions, Mana Crystals, Wisdom Tomes (XP), or HP Amulets.

---

## 📚 Curriculum Scope
The game covers the standard Romanian 9th-grade Informatics curriculum for Python:
* Variabile & Tipuri de date
* Operatori logici și matematici
* Instrucțiuni condiționale (`if/elif/else`)
* Bucle (`for`, `while`)
* Șiruri de caractere (Strings)
* Liste, Dicționare și Tupluri
* Funcții

---

## 🏗️ Architecture

The project is split into a **React frontend** and a **Node.js/Express backend**.

```
Dungeon-Crawler/
├── backend/               # Node.js + Express API server
│   ├── server.js          # Entry point (port 3001)
│   ├── data/
│   │   ├── challenges.js  # ~80 Python quiz questions (answers stored server-side)
│   │   └── dungeon.js     # 4 floors, 13 enemies
│   ├── services/
│   │   └── validator.js   # Levenshtein fuzzy-match for write answers
│   └── routes/
│       ├── challenges.js  # GET /api/challenges/random · POST /api/validate
│       └── dungeon.js     # GET /api/dungeon · GET /api/enemies
│
└── frontend/              # React + Vite SPA
    ├── index.html
    ├── vite.config.js     # Proxies /api → localhost:3001 in dev
    └── src/
        ├── App.jsx        # Loads backend data, boots reducer
        ├── Game.jsx       # Async action handlers (fetch challenge, validate answer)
        ├── api/           # Typed fetch wrappers
        ├── entities/      # Player & EnemyInstance classes
        ├── services/      # Pure combat math (CombatService, ProgressionService)
        ├── game/          # useReducer state (gameReducer + initialState)
        └── components/
            ├── screens/   # One component per game screen (11 screens)
            └── ui/        # HUD, ProgressBar, ChallengeWidget, ChallengeWriteWidget
```

### API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/api/dungeon` | All 4 floor definitions |
| `GET` | `/api/enemies` | All 13 enemy definitions |
| `GET` | `/api/challenges/random` | Random challenge (answer stripped, options shuffled) |
| `POST` | `/api/validate` | `{challengeId, answer}` → `{correct, explanation, correctAnswer?}` |

---

## 🚀 Running the Project

### Prerequisites
- Node.js 18+
- npm

### 1. Start the Backend
```bash
cd backend
npm install
npm start        # Runs on http://localhost:3001
# or for dev with auto-reload:
npm run dev
```

### 2. Start the Frontend
```bash
cd frontend
npm install
npm run dev      # Runs on http://localhost:5173
```

Open **http://localhost:5173** in your browser. The Vite dev server proxies all `/api` requests to the backend automatically.

### Production Build
```bash
cd frontend
npm run build    # Output in frontend/dist/
```
Serve `dist/` with any static file server, pointing `/api` at the backend.
