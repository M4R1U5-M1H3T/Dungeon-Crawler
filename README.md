# ⚔️ Syntax Sorcerer
**Dungeon Crawler · Python Edition**

Syntax Sorcerer is an educational web-based RPG designed to help 9th-grade students master Python programming. Players navigate a dungeon, battle algorithmic monsters, and unlock magical doors by answering Python coding challenges.

---

## 🎮 Game Features

* **Educational Combat System:** Defeat enemies like the *Bug Goblin* or the *Logic Witch* by correctly answering multiple-choice Python questions.
* **Write-Code Challenges (Sala Scriptorilor):** Type actual Python code to defeat bosses and unlock special doors. Features a smart "fuzzy-matching" validator that awards full points for 80% accurate answers (to forgive minor typos).
* **Risk & Reward Mechanics:** 
  * Build an answer **Streak** to multiply your attack damage and score.
  * Spend Mana (MP) to cast powerful spells.
  * Pay Gold (💰) or Score to reveal hints.
  * Try to flee (🏃) with a 20% success rate (disabled against Bosses!).
* **RPG Progression:** Gain XP, level up to increase Max HP/MP, and collect gold to spend in the Dungeon Shop.
* **Dungeon Shop (🛒):** Buy Health Potions, Mana Crystals, Wisdom Tomes (XP), or HP Amulets.

---

## 📚 Curriculum Scope
The game covers the standard Romanian 9th-grade Informatics curriculum for Python, including:
* Variabile & Tipuri de date
* Operatori logici și matematici
* Instrucțiuni condiționale (`if/elif/else`)
* Bucle (`for`, `while`)
* Șiruri de caractere (Strings)
* Liste, Dicționare și Tupluri
* Funcții

---

## 🛠️ Architecture & File Structure

The project is built using Vanilla HTML, CSS, and JavaScript, strictly following a **Layered Architecture** and the **Single Responsibility Principle (SRP)**.
```text
/syntax-sorcerer
│
├── index.html                 # Main entry point linking all assets
├── css/
│   └── style.css              # Custom styling, CRT scanlines, and CSS animations
│
└── js/
    ├── data-challenges.js     # [Layer 1] ChallengeRepository (MC & Write questions)
    ├── data-dungeon.js        # [Layer 1] EnemyRepository & Dungeon floors/rooms
    ├── entities.js            # [Layer 2] Domain Entities (Player, EnemyInstance)
    ├── services.js            # [Layer 3] Business Logic (Combat math, String similarity validation)
    ├── state.js               # [Layer 4] GameState (Tracks HP, MP, current room, logs)
    ├── renderer.js            # [Layer 5] View Layer (Generates HTML for active screens)
    └── controller.js          # [Layer 6] Orchestrator (Handles DOM events and routes logic)