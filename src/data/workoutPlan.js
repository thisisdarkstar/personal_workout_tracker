export const PHASES = {
  1: { name: 'Phase 1', weeks: 'Weeks 1–4', color: '#00ff88' },
  2: { name: 'Phase 2', weeks: 'Weeks 5–8', color: '#ffaa00' },
  3: { name: 'Phase 3', weeks: 'Weeks 9–12', color: '#ff3366' },
}

export const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

export const DAY_TYPES = [
  { type: 'strength', label: 'Strength + Core', icon: '💪' },
  { type: 'boxing', label: 'Boxing + Cardio', icon: '🥊' },
  { type: 'strength', label: 'Strength', icon: '💪' },
  { type: 'boxing', label: 'Boxing + Conditioning', icon: '🥊' },
  { type: 'mixed', label: 'Mixed (Light + Skills)', icon: '⚡' },
  { type: 'activeRest', label: 'Active Rest (Walk/Stretch)', icon: '🚶' },
  { type: 'fullRest', label: 'Full Rest', icon: '😴' },
]

export const WORKOUT_PLANS = {
  1: {
    strength: {
      title: 'Strength + Core',
      exercises: [
        { name: 'Push-ups', sets: 3, reps: '8–12', completed: false },
        { name: 'Squats', sets: 3, reps: '12–15', completed: false },
        { name: 'Incline Push-ups', sets: 2, reps: '10', completed: false },
        { name: 'Plank', sets: 3, reps: '20–30 sec', completed: false },
        { name: 'Glute Bridge', sets: 3, reps: '12', completed: false },
      ],
    },
    boxing: {
      title: 'Boxing + Cardio',
      exercises: [
        { name: 'Shadowboxing', duration: '10 min', completed: false },
        { name: 'Heavy Bag', duration: '3 rounds × 2 min', completed: false },
        { name: 'Focus: Jab, Cross, Guard', duration: '', completed: false },
        { name: 'Walk/Jog', duration: '20–30 min', completed: false },
      ],
    },
    mixed: {
      title: 'Mixed (Light + Skills)',
      exercises: [
        { name: 'Light Squats', sets: 2, reps: '10', completed: false },
        { name: 'Push-ups', sets: 2, reps: '8', completed: false },
        { name: 'Shadowboxing', duration: '10 min', completed: false },
        { name: 'Stretching', duration: '10 min', completed: false },
      ],
    },
    activeRest: {
      title: 'Active Rest',
      exercises: [
        { name: 'Walk', duration: '30 min', completed: false },
        { name: 'Stretching', duration: '15 min', completed: false },
      ],
    },
    fullRest: {
      title: 'Full Rest',
      exercises: [
        { name: 'Rest & Recovery', duration: '', completed: false },
      ],
    },
  },
  2: {
    strength: {
      title: 'Strength + Core',
      exercises: [
        { name: 'Push-ups', sets: 4, reps: '12–15', completed: false },
        { name: 'Squats', sets: 4, reps: '15–20', completed: false },
        { name: 'Lunges', sets: 3, reps: '10/leg', completed: false },
        { name: 'Plank', sets: 3, reps: '40 sec', completed: false },
        { name: 'Mountain Climbers', sets: 3, reps: '20', completed: false },
      ],
    },
    boxing: {
      title: 'Boxing + Cardio',
      exercises: [
        { name: 'Shadowboxing', duration: '12–15 min', completed: false },
        { name: 'Heavy Bag', duration: '4–5 rounds × 2–3 min', completed: false },
        { name: 'Focus: Jab–Cross, Basic Slips', duration: '', completed: false },
        { name: 'HIIT', duration: '20s fast / 40s slow × 10', completed: false },
      ],
    },
    mixed: {
      title: 'Mixed (Light + Skills)',
      exercises: [
        { name: 'Squats', sets: 3, reps: '12', completed: false },
        { name: 'Push-ups', sets: 3, reps: '10', completed: false },
        { name: 'Shadowboxing', duration: '12 min', completed: false },
        { name: 'Footwork Drills', duration: '10 min', completed: false },
      ],
    },
    activeRest: {
      title: 'Active Rest',
      exercises: [
        { name: 'Walk/Jog', duration: '30 min', completed: false },
        { name: 'Yoga/Stretch', duration: '20 min', completed: false },
      ],
    },
    fullRest: {
      title: 'Full Rest',
      exercises: [
        { name: 'Rest & Recovery', duration: '', completed: false },
      ],
    },
  },
  3: {
    strength: {
      title: 'Strength + Core',
      exercises: [
        { name: 'Push-ups', sets: 4, reps: '15–20', completed: false },
        { name: 'Squats', sets: 4, reps: '20', completed: false },
        { name: 'Bulgarian Split Squat', sets: 3, reps: '8/leg', completed: false },
        { name: 'Plank', sets: 3, reps: '60 sec', completed: false },
        { name: 'Leg Raises', sets: 3, reps: '12', completed: false },
      ],
    },
    boxing: {
      title: 'Boxing + Conditioning',
      exercises: [
        { name: 'Shadowboxing', duration: '15–20 min', completed: false },
        { name: 'Heavy Bag', duration: '5–6 rounds', completed: false },
        { name: 'Footwork + 3–4 punch combos', duration: '', completed: false },
        { name: 'HIIT', duration: '2×/week', completed: false },
        { name: 'Skipping Rope', duration: 'Optional', completed: false },
      ],
    },
    mixed: {
      title: 'Mixed (Skills + Light)',
      exercises: [
        { name: 'Squats', sets: 3, reps: '15', completed: false },
        { name: 'Push-ups', sets: 3, reps: '12', completed: false },
        { name: 'Shadowboxing', duration: '15 min', completed: false },
        { name: 'Combo Practice', duration: '10 min', completed: false },
      ],
    },
    activeRest: {
      title: 'Active Rest',
      exercises: [
        { name: 'Light Walk', duration: '30 min', completed: false },
        { name: 'Full Body Stretch', duration: '20 min', completed: false },
      ],
    },
    fullRest: {
      title: 'Full Rest',
      exercises: [
        { name: 'Rest & Recovery', duration: '', completed: false },
      ],
    },
  },
}

export const DIET_PLANS = {
  meals: [
    { id: 'morning', label: 'Morning', icon: '🌅', items: ['Warm water'] },
    { id: 'breakfast', label: 'Breakfast', icon: '🍳', items: ['Milk (1 glass)', 'Oats / Poha / 2 Roti', 'Chana / Sprouts'] },
    { id: 'lunch', label: 'Lunch', icon: '🍛', items: ['2–3 Roti or Rice', 'Dal', 'Vegetables', 'Salad', 'Dahi (1 bowl)'] },
    { id: 'preWorkout', label: 'Pre-Workout', icon: '🍌', items: ['Banana OR Roasted Chana'] },
    { id: 'postWorkout', label: 'Post-Workout', icon: '🥛', items: ['Milk + Roasted Chana', 'OR Paneer (50–100g)'] },
    { id: 'dinner', label: 'Dinner', icon: '🌙', items: ['2 Roti', 'Dal / Paneer / Soya Chunks', 'Vegetables', 'Dahi (optional)'] },
    { id: 'extras', label: 'Extras', icon: '🥗', items: ['Fruit', 'Buttermilk'] },
  ],
  targets: {
    calories: { min: 1600, max: 1800, unit: 'kcal/day' },
    protein: { min: 70, max: 90, unit: 'g/day' },
    water: { min: 2.5, max: 3, unit: 'L/day' },
    sleep: { min: 7, unit: 'hrs/night' },
  },
}

export function getPhase(week) {
  if (week <= 4) return 1
  if (week <= 8) return 2
  return 3
}

export function getDayType(dayIndex) {
  return DAY_TYPES[dayIndex].type
}

export function getWorkoutForDay(week, dayIndex) {
  const phase = getPhase(week)
  const dayType = getDayType(dayIndex)
  const template = WORKOUT_PLANS[phase][dayType]
  return {
    ...template,
    phase,
    dayType: DAY_TYPES[dayIndex].label,
  }
}