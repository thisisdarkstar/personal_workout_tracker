# Personal Workout Tracker

A 16-week boxing + calisthenics PWA with progressive overload, diet tracking, water intake, daily notes, performance logging, and a full plan editor.

## Features

### Training Program

- **16-Week Program** — 4 phases (Foundation + Fat Loss, Work Capacity, Strength + Conditioning, Athletic Peak), each 4 weeks with weekly progressive overload
- **7 Day Types** — Upper Strength, Boxing Conditioning, Lower Body + Core, Boxing Skills + HIIT, Full Body Calisthenics, Zone 2 + Mobility, Full Rest
- **Warm-up on Every Training Day** — Every session begins with a labeled warm-up block; no day goes straight into the main work
- **Cool-down on Every Training Day** — Every session ends with a structured stretch and breathing protocol
- **Beginner-Ready Instructions** — Every exercise name contains the full how-to (no YouTube, no guessing). Example: *"Shadowboxing — Jab left fist straight forward + Cross right fist across + Step forward + Step backward, keep hands up by chin at all times, flow continuously"*
- **Set Tracking** — + / − buttons to log completed sets per exercise; progress bar reflects partial set completion
- **Workout Timer** — Built-in countdown and HIIT interval timer for timed exercises
- **Performance Log** — Log reps/notes per exercise each session to track personal bests

### Boxing Curriculum

Builds progressively across phases:
- Phase 1: Jab-Cross, guard, basic footwork, slips
- Phase 2: Jab-Cross-Hook combos, pivoting, body shots, HIIT rounds
- Phase 3: Power combos, head movement, full defense sequences
- Phase 4: Full combination chains with exits, peak conditioning rounds

### Diet

- **Training vs Rest Day Plans** — Separate meal plans and calorie/protein targets based on day type
- **Meal Checklist** — Morning through dinner with pre-workout meal on training days
- **Daily Targets** — Calories, protein, water, and sleep goals shown per day type

### Tracking

- **Water Tracker** — Glass-based tracker with customisable daily target
- **Daily Notes** — Journal entries per day with full history view
- **Weekly Review** — Sunday check-in with 1–5 rating and reflection
- **Streak Counter** — Consecutive active training days (rest days skipped)
- **Progress Dashboard** — Weekly bar chart, phase progress bars, overall completion rate
- **Completion Dots** — Day strip shows which days have logged activity

### App

- **Onboarding** — Set your start date and goal on first launch
- **Phase Milestone Banner** — Celebrates phase transitions
- **Calendar Navigation** — Jump to any week/day in the program
- **Plan Editor** — Fully customise phases, workout exercises, diet meals, and personal goals. Changes are saved to localStorage and override the built-in defaults. Reset button restores the original 16-week plan
- **PWA** — Installable on mobile, works offline

## Tech Stack

- React + Vite
- Tailwind CSS (dark/neon boxing theme)
- Recharts (progress dashboard)
- localStorage (no account required)
- Mobile-first, PWA-ready

## Getting Started

```bash
npm install
npm run dev
```

Open <http://localhost:5200>

## Build

```bash
npm run build
```

## Data

All progress is stored in `localStorage` under the key `boxer-12week-plan`. No backend or account needed. Clearing site data resets all progress.

Custom plan edits (from Plan Editor) are stored separately under `custom-workout-plan` and `app-settings`. Resetting in the Plan Editor clears those keys and restores the built-in 16-week defaults without affecting logged progress.
