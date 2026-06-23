# 🚀 Future Improvements

Ideas and features planned for future versions of Syntax Sorcerer. None of these are implemented yet — this document is a living roadmap.

---

## 🤖 AI-Powered Feedback & Adaptive Learning

Instead of only showing right/wrong, an AI layer could analyse a student's answer patterns over time and generate personalised feedback:

- Identify recurring misconceptions (e.g. "You often confuse `==` with `=` in conditionals")
- Detect which *sub-skills* within a chapter are strong vs. weak (e.g. good at slicing, weak at string methods)
- Dynamically adjust question difficulty and topic frequency based on recent performance — a student who keeps getting recursion questions right should see harder ones sooner
- Generate short natural-language explanations tailored to the specific mistake made, not just the generic one stored with the question
- Weekly / session summary: "This week you improved most in Funcții but still struggle with Dicționare — here are 3 targeted exercises"

This would likely be powered by a lightweight LLM call server-side, with student history stored in a proper database (see Accounts below).

---

## 🎨 App Icon & Tab Icon (Favicon)

- A proper favicon (`.ico` / `32×32 png`) so the browser tab shows a sword or dungeon icon instead of the default
- A full app icon set (192×192, 512×512) for PWA / "Add to Home Screen" support on mobile
- An Open Graph image for link previews when the URL is shared

---

## 👤 Accounts: Pupils & Teachers

Two account types with different capabilities:

**Elev (Pupil)**
- Persistent progress across devices and sessions (not just `sessionStorage`)
- Personal history: questions answered, accuracy per topic, score over time, grade progression
- Badges and achievements (e.g. "Perfect streak on Recursivitate", "Finished all grade 10 floors")
- View their own weak/strong chapters from a profile dashboard

**Profesor (Teacher)**
- Full access to the same learning tools as pupils — see *Teacher as Learner* below
- Create and manage groups of pupils
- View aggregate reports: how is the whole class performing on Backtracking? Which question do most students get wrong?
- Assign specific chapters or custom quizzes as homework with a deadline
- Set assessments: a timed, locked quiz from a chosen set of topics that pupils complete once
- Flag questions as incorrect or suggest new ones

Authentication could be handled via a simple email/password system or via school SSO (Google Workspace for Education is common in Romanian schools).

---

## 👩‍🏫 Teacher as Learner

The new Romanian Python curriculum (introduced rapidly without a proper adaptation period for many teachers) means a significant number of teachers are themselves learning Python concepts for the first time, particularly grade 10–11 material (sorting algorithms, backtracking, OOP).

Syntax Sorcerer can support teachers directly:

- Teachers get access to the same Chapter Learn screens and quizzes as pupils, with no stigma — framed as "Professional Development mode"
- A dedicated teacher learning path could cover pedagogical angles: not just *what* the concept is, but *how to explain it* and *common student mistakes to watch for*
- Teacher-only discussion threads under each chapter: share tips, alternative explanations, or classroom-tested analogies with other teachers
- Progress tracking separate from their teacher dashboard, so their personal learning doesn't mix with their pupils' data

---

## 👥 Groups & Collaborative Features

**Student Groups**
- A teacher creates a group (e.g. "9A — Informatică intensiv") and shares an invite code
- Group leaderboard: friendly competition within the class
- Group quiz sessions: everyone answers the same question simultaneously, results shown live (like Kahoot but curriculum-aligned)
- Group progress report: teacher sees at a glance which topics the whole group needs more work on

**Teacher Learning Groups**
- Teachers from different schools can form study groups around specific curriculum chapters
- Share annotations on the Learn screens (sticky-note style comments visible to group members)
- Schedule group quiz sessions to learn together

**Homework & Assessments**
- Teacher assigns "Complete grade 10 > Sortare quiz before Friday"
- System locks the assignment to a single attempt, records the result, and adds it to the teacher's grade book
- Pupils receive an in-app notification when a new assignment is posted

---

## 💻 Problems Section with On-Site Corrector

A companion section (separate from the dungeon game) modelled on sites like [pbinfo.ro](https://www.pbinfo.ro) but focused entirely on the new Python curriculum:

- A library of full programming problems, each tagged by grade, chapter, and difficulty
- An in-browser code editor (Monaco or CodeMirror) where students write complete Python solutions
- Server-side execution in a sandboxed Python environment (Docker or similar) with test cases — the corrector runs the student's code against hidden inputs and shows which tests pass/fail
- Problems are categorised by the same chapters as the dungeon game, so a student who struggles with Backtracking in the dungeon can immediately jump to a full problem on the same topic
- Teachers can write and submit new problems; a moderation queue ensures quality
- Integration with accounts: solving problems earns XP that feeds into the same progression system as the dungeon game

**Technical note:** Safe server-side code execution requires careful sandboxing (resource limits, no network access, timeout enforcement). This is non-trivial but well-established — existing open-source judges (e.g. Judge0) could be adapted.

---

## Other Small Ideas

- **Dark / light theme toggle** — currently only dark mode
- **Mobile layout improvements** — the game is playable on mobile but not optimised for it
- **Sound effects & music** — optional audio feedback (correct answer chime, combat sounds, dungeon ambience)
- **Offline / PWA support** — cache the app shell and question bank so the game works without internet
- **Export results as PDF** — teacher can export a class report or a pupil can export their progress summary
- **Localisation** — the UI is in Romanian; an English version would make the project useful internationally
