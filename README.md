# Personal Workout Tracker

A 12-week boxing + calisthenics PWA with progressive overload, diet tracking, water intake, daily notes, performance logging, and progress analytics.

## Features

### Training

- **12-Week Program** — 3 phases (Foundation, Build, Peak), each with weekly progressive overload
- **5 Day Types** — Strength, Boxing, Mixed, Active Rest, Full Rest
- **Warm-up & Cool-down** — Included in every training day
- **Boxing Curriculum** — Builds from jab/cross/guard → slips/rolls → full combos + defense across phases
- **Workout Timer** — Built-in countdown and HIIT interval timer for timed exercises
- **Performance Log** — Log reps/notes per exercise to track personal bests

### Diet

- **Training vs Rest Day Diet** — Different meal plans and calorie targets based on day type
- **Meal Checklist** — Morning through dinner with pre/post-workout meals on training days
- **Daily Targets** — Calories, protein, water, and sleep goals shown per day type

### Tracking

- **Water Tracker** — Glass-based tracker with customisable daily target
- **Daily Notes** — Journal entries per day with full history view
- **Weekly Review** — Sunday check-in with 1–5 rating and reflection
- **Streak Counter** — Consecutive active training days (skips rest days)
- **Progress Dashboard** — Weekly bar chart, phase progress bars, overall completion rate
- **Completion Dots** — Day strip shows which days have logged activity

### App

- **Onboarding** — Set your start date and goal on first launch
- **Phase Milestone Banner** — Celebrates entering Phase 2 and Phase 3
- **Calendar Navigation** — Jump to any week/day in the program
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

All data is stored in browser localStorage under the key `boxer-12week-plan`. No backend, no account needed. Clearing site data will reset all progress.
