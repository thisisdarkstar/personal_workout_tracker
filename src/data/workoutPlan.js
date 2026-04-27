export const PHASES = {
  1: { name: 'Phase 1', weeks: 'Weeks 1-4', color: '#00ff88', focus: 'Foundation' },
  2: { name: 'Phase 2', weeks: 'Weeks 5-8', color: '#ffaa00', focus: 'Build' },
  3: { name: 'Phase 3', weeks: 'Weeks 9-12', color: '#ff3366', focus: 'Peak' },
}

export const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

export const DAY_TYPES = [
  { type: 'strength',   label: 'Strength + Core',         icon: '💪' },
  { type: 'boxing',     label: 'Boxing + Cardio',          icon: '🥊' },
  { type: 'strength',   label: 'Strength',                 icon: '💪' },
  { type: 'boxing',     label: 'Boxing + Conditioning',    icon: '🥊' },
  { type: 'mixed',      label: 'Mixed (Light + Skills)',   icon: '⚡' },
  { type: 'activeRest', label: 'Active Rest (Walk/Stretch)', icon: '🚶' },
  { type: 'fullRest',   label: 'Full Rest',                icon: '😴' },
]

// Internal helpers for building exercise definitions
function s(name, p1, p2, p3, p4) {
  return { name, progression: [p1, p2, p3, p4] }
}
function d(name, d1, d2, d3, d4) {
  return { name, durationProgression: [d1, d2, d3, d4] }
}
function ft(name, duration) {
  return { name, duration }
}

export const WORKOUT_PLANS = {
  1: {
    strength: {
      title: 'Strength + Core',
      exercises: [
        ft('Warm-Up: Jumping Jacks', '5 min'),
        s('Push-ups',
          { sets: 3, reps: '8-12' },
          { sets: 3, reps: '10-14' },
          { sets: 4, reps: '12-15' },
          { sets: 4, reps: '13-16' },
        ),
        s('Squats',
          { sets: 3, reps: '12-15' },
          { sets: 3, reps: '15-18' },
          { sets: 4, reps: '15-18' },
          { sets: 4, reps: '18-20' },
        ),
        s('Incline Push-ups',
          { sets: 2, reps: '10' },
          { sets: 2, reps: '12' },
          { sets: 3, reps: '10' },
          { sets: 3, reps: '12' },
        ),
        d('Plank', '20 sec', '25 sec', '30 sec', '40 sec'),
        s('Glute Bridge',
          { sets: 3, reps: '12' },
          { sets: 3, reps: '14' },
          { sets: 3, reps: '15' },
          { sets: 3, reps: '18' },
        ),
        ft('Cool-Down Stretch', '5 min'),
      ],
    },
    boxing: {
      title: 'Boxing + Cardio',
      exercises: [
        d('Warm-Up: Jump Rope', '3 min', '4 min', '4 min', '5 min'),
        ft('Arm Circles & Shoulder Rolls', '1 min'),
        d('Shadowboxing (Jab, Cross, Guard + Head Movement)', '8 min', '10 min', '10 min', '12 min'),
        d('Heavy Bag — Jab & Cross', '2 rounds x 2 min', '2 rounds x 2 min', '3 rounds x 2 min', '3 rounds x 2 min'),
        ft('Footwork Basics: Step & Pivot Drills', '5 min'),
        d('Walk / Light Jog', '20 min', '22 min', '25 min', '30 min'),
        ft('Cool-Down Stretch', '5 min'),
      ],
    },
    mixed: {
      title: 'Mixed (Light + Skills)',
      exercises: [
        s('Light Squats',
          { sets: 2, reps: '10' },
          { sets: 2, reps: '12' },
          { sets: 2, reps: '12' },
          { sets: 2, reps: '15' },
        ),
        s('Push-ups',
          { sets: 2, reps: '8' },
          { sets: 2, reps: '10' },
          { sets: 2, reps: '10' },
          { sets: 2, reps: '12' },
        ),
        d('Shadowboxing (Technique Focus)', '8 min', '10 min', '10 min', '12 min'),
        ft('Static Stretching', '10 min'),
      ],
    },
    activeRest: {
      title: 'Active Rest',
      exercises: [
        ft('Brisk Walk', '30 min'),
        ft('Full Body Stretching', '15 min'),
      ],
    },
    fullRest: {
      title: 'Full Rest',
      exercises: [
        ft('Rest & Recovery', ''),
      ],
    },
  },

  2: {
    strength: {
      title: 'Strength + Core',
      exercises: [
        ft('Warm-Up: Jumping Jacks / Light Jog', '5 min'),
        s('Push-ups',
          { sets: 4, reps: '12-15' },
          { sets: 4, reps: '14-17' },
          { sets: 4, reps: '15-18' },
          { sets: 4, reps: '17-20' },
        ),
        s('Squats',
          { sets: 4, reps: '15-20' },
          { sets: 4, reps: '18-22' },
          { sets: 4, reps: '20-25' },
          { sets: 4, reps: '22-25' },
        ),
        s('Lunges',
          { sets: 3, reps: '10/leg' },
          { sets: 3, reps: '12/leg' },
          { sets: 3, reps: '12/leg' },
          { sets: 4, reps: '12/leg' },
        ),
        d('Plank', '40 sec', '45 sec', '50 sec', '60 sec'),
        s('Mountain Climbers',
          { sets: 3, reps: '20' },
          { sets: 3, reps: '24' },
          { sets: 3, reps: '25' },
          { sets: 3, reps: '30' },
        ),
        ft('Cool-Down Stretch', '5 min'),
      ],
    },
    boxing: {
      title: 'Boxing + Cardio',
      exercises: [
        d('Warm-Up: Jump Rope', '5 min', '5 min', '6 min', '6 min'),
        ft('Dynamic Stretching & Guard Drills', '2 min'),
        d('Shadowboxing (Jab-Cross, Slips, Roll)', '12 min', '13 min', '14 min', '15 min'),
        d('Heavy Bag — 1-2 Combos + Body Shots', '4 rounds x 2 min', '4 rounds x 2 min', '5 rounds x 2 min', '5 rounds x 3 min'),
        d('HIIT (20 sec work / 40 sec rest)', '8 rounds', '10 rounds', '10 rounds', '12 rounds'),
        ft('Cool-Down Stretch', '5 min'),
      ],
    },
    mixed: {
      title: 'Mixed (Light + Skills)',
      exercises: [
        s('Squats',
          { sets: 3, reps: '12' },
          { sets: 3, reps: '14' },
          { sets: 3, reps: '15' },
          { sets: 3, reps: '15' },
        ),
        s('Push-ups',
          { sets: 3, reps: '10' },
          { sets: 3, reps: '12' },
          { sets: 3, reps: '12' },
          { sets: 3, reps: '14' },
        ),
        d('Shadowboxing (Focus: Defense + Slips)', '12 min', '12 min', '14 min', '15 min'),
        ft('Footwork Drills', '10 min'),
        ft('Static Stretching', '10 min'),
      ],
    },
    activeRest: {
      title: 'Active Rest',
      exercises: [
        ft('Walk / Light Jog', '30 min'),
        ft('Yoga / Full Body Stretch', '20 min'),
      ],
    },
    fullRest: {
      title: 'Full Rest',
      exercises: [
        ft('Rest & Recovery', ''),
      ],
    },
  },

  3: {
    strength: {
      title: 'Strength + Core',
      exercises: [
        ft('Warm-Up: Jump Rope / Dynamic Stretch', '5 min'),
        s('Push-ups',
          { sets: 4, reps: '15-20' },
          { sets: 4, reps: '18-22' },
          { sets: 5, reps: '18-22' },
          { sets: 5, reps: '20-25' },
        ),
        s('Squats',
          { sets: 4, reps: '20' },
          { sets: 4, reps: '22' },
          { sets: 4, reps: '25' },
          { sets: 5, reps: '20' },
        ),
        s('Bulgarian Split Squat',
          { sets: 3, reps: '8/leg' },
          { sets: 3, reps: '10/leg' },
          { sets: 4, reps: '10/leg' },
          { sets: 4, reps: '12/leg' },
        ),
        d('Plank', '60 sec', '70 sec', '75 sec', '90 sec'),
        s('Leg Raises',
          { sets: 3, reps: '12' },
          { sets: 3, reps: '14' },
          { sets: 4, reps: '12' },
          { sets: 4, reps: '15' },
        ),
        ft('Cool-Down Stretch', '8 min'),
      ],
    },
    boxing: {
      title: 'Boxing + Conditioning',
      exercises: [
        d('Warm-Up: Jump Rope', '6 min', '7 min', '8 min', '8 min'),
        ft('Dynamic Stretch & Guard Drills', '2 min'),
        d('Shadowboxing (3-4 Punch Combos + Defense)', '15 min', '16 min', '18 min', '20 min'),
        d('Heavy Bag — Full Combos + Head Movement', '5 rounds x 3 min', '5 rounds x 3 min', '6 rounds x 3 min', '6 rounds x 3 min'),
        d('HIIT (20 sec work / 40 sec rest)', '12 rounds', '14 rounds', '14 rounds', '16 rounds'),
        d('Skipping Rope (finisher)', '5 min', '5 min', '6 min', '8 min'),
        ft('Cool-Down Stretch', '8 min'),
      ],
    },
    mixed: {
      title: 'Mixed (Skills + Light)',
      exercises: [
        s('Squats',
          { sets: 3, reps: '15' },
          { sets: 3, reps: '18' },
          { sets: 4, reps: '15' },
          { sets: 4, reps: '18' },
        ),
        s('Push-ups',
          { sets: 3, reps: '12' },
          { sets: 3, reps: '14' },
          { sets: 3, reps: '15' },
          { sets: 4, reps: '12' },
        ),
        d('Shadowboxing (Combo Flow)', '15 min', '16 min', '18 min', '20 min'),
        d('Combo Practice (1-2-3-4 + Slips)', '10 min', '12 min', '12 min', '15 min'),
        ft('Cool-Down Stretch', '8 min'),
      ],
    },
    activeRest: {
      title: 'Active Rest',
      exercises: [
        ft('Light Walk', '30 min'),
        ft('Full Body Stretch & Foam Roll', '20 min'),
      ],
    },
    fullRest: {
      title: 'Full Rest',
      exercises: [
        ft('Rest & Recovery', ''),
      ],
    },
  },
}

export const DIET_PLANS = {
  training: {
    label: 'Training Day',
    meals: [
      { id: 'morning',     label: 'Morning',                     icon: '🌅', items: ['Warm water (1 glass)'] },
      { id: 'breakfast',   label: 'Breakfast',                   icon: '🍳', items: ['Milk (1 glass)', 'Oats / Poha / 2 Roti / Muri', 'Egg Whites (2) or Chana / Sprouts'] },
      { id: 'midmorning',  label: 'Mid-Morning',                 icon: '🍌', items: ['Banana or Apple'] },
      { id: 'lunch',       label: 'Lunch',                       icon: '🍛', items: ['2-3 Roti or Rice', 'Dal', 'Vegetables', 'Salad', 'Dahi (1 bowl)'] },
      { id: 'preWorkout',  label: 'Pre-Workout (45 min before)', icon: '⚡', items: ['Banana OR Roasted Chana (handful)'] },
      { id: 'postWorkout', label: 'Post-Workout',                icon: '🥛', items: ['Milk + Roasted Chana', 'OR Paneer (50-100g)'] },
      { id: 'dinner',      label: 'Dinner',                      icon: '🌙', items: ['2 Roti or Muri', 'Dal / Paneer / Soya Chunks', 'Vegetables', 'Dahi (optional)'] },
    ],
    targets: {
      calories: { min: 1800, max: 2100, unit: 'kcal/day' },
      protein:  { min: 90,   max: 120,  unit: 'g/day' },
      water:    { min: 3,    max: 3.5,  unit: 'L/day' },
      sleep:    { min: 7,               unit: 'hrs/night' },
    },
  },
  rest: {
    label: 'Rest Day',
    meals: [
      { id: 'morning',   label: 'Morning',        icon: '🌅', items: ['Warm water (1 glass)'] },
      { id: 'breakfast', label: 'Breakfast',      icon: '🍳', items: ['Milk (1 glass)', 'Oats / Poha / 2 Roti', 'Chana / Sprouts'] },
      { id: 'lunch',     label: 'Lunch',          icon: '🍛', items: ['2 Roti or small Rice', 'Dal', 'Vegetables', 'Salad', 'Dahi (1 bowl)'] },
      { id: 'snack',     label: 'Evening Snack',  icon: '🍎', items: ['Fruit (any)', 'Buttermilk'] },
      { id: 'dinner',    label: 'Dinner',         icon: '🌙', items: ['2 Roti', 'Dal / Vegetables', 'Dahi'] },
    ],
    targets: {
      calories: { min: 1500, max: 1700, unit: 'kcal/day' },
      protein:  { min: 70,   max: 90,   unit: 'g/day' },
      water:    { min: 2.5,  max: 3,    unit: 'L/day' },
      sleep:    { min: 8,               unit: 'hrs/night' },
    },
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

export function getWeekInPhase(week) {
  return (week - 1) % 4
}

export function isRestDayIndex(dayIndex) {
  const t = DAY_TYPES[dayIndex].type
  return t === 'fullRest' || t === 'activeRest'
}

export function getDietForDay(dayIndex) {
  return isRestDayIndex(dayIndex) ? DIET_PLANS.rest : DIET_PLANS.training
}

export function getWorkoutForDay(week, dayIndex) {
  const phase = getPhase(week)
  const weekInPhase = getWeekInPhase(week)
  const dayType = getDayType(dayIndex)
  const template = WORKOUT_PLANS[phase][dayType]

  const exercises = template.exercises.map(ex => {
    if (ex.progression) {
      const prog = ex.progression[weekInPhase]
      return { name: ex.name, sets: prog.sets, reps: prog.reps }
    }
    if (ex.durationProgression) {
      return { name: ex.name, duration: ex.durationProgression[weekInPhase] }
    }
    return { name: ex.name, sets: ex.sets, reps: ex.reps, duration: ex.duration }
  })

  return {
    title: template.title,
    exercises,
    phase,
    weekInPhase: weekInPhase + 1,
    dayType: DAY_TYPES[dayIndex].label,
  }
}

export function getExerciseCountForDay(week, dayIndex) {
  return getWorkoutForDay(week, dayIndex).exercises.length
}

export function getPhaseExerciseTotal(phaseNum) {
  let total = 0
  for (let w = (phaseNum - 1) * 4 + 1; w <= phaseNum * 4; w++) {
    for (let dayIdx = 0; dayIdx < 7; dayIdx++) {
      total += getExerciseCountForDay(w, dayIdx)
    }
  }
  return total
}
