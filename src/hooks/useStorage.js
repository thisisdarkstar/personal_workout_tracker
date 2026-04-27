import { useState, useEffect, useCallback } from 'react'

const STORAGE_KEY = 'boxer-12week-plan'

const DEFAULT_DATA = {
  startDate: new Date().toISOString().split('T')[0],
  currentWeek: 1,
  currentDay: 0,
  completedWorkouts: {},
  completedMeals: {},
  dailyLogs: {},
  waterGlasses: {},
  dailyNotes: {},
  weeklyReviews: {},
  onboardingComplete: false,
  settings: {
    waterTarget: 12,
  },
}

export function useStorage() {
  const [data, setData] = useState(() => {
    if (typeof window === 'undefined') return DEFAULT_DATA
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        return { ...DEFAULT_DATA, ...parsed, settings: { ...DEFAULT_DATA.settings, ...parsed.settings } }
      } catch {
        return DEFAULT_DATA
      }
    }
    return DEFAULT_DATA
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  }, [data])

  const getWeekInfo = useCallback(() => {
    const start = new Date(data.startDate)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    start.setHours(0, 0, 0, 0)

    const diffTime = today.getTime() - start.getTime()
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

    const todayWeek = Math.max(1, Math.min(12, Math.floor(diffDays / 7) + 1))
    const todayDay = (today.getDay() + 6) % 7

    return {
      week: todayWeek,
      day: todayDay,
      todayWeek,
      todayDay,
      diffDays,
      planStarted: diffDays >= 0,
      startDate: data.startDate,
    }
  }, [data.startDate])

  const jumpToToday = useCallback(() => {
    const { todayWeek, todayDay } = getWeekInfo()
    setData(prev => ({ ...prev, currentWeek: todayWeek, currentDay: todayDay }))
  }, [getWeekInfo])

  const completeOnboarding = useCallback((dateStr, goal = '') => {
    setData(prev => ({
      ...prev,
      startDate: dateStr,
      goal,
      onboardingComplete: true,
    }))
  }, [])

  const setCurrentWeek = useCallback((week) => {
    setData(prev => ({ ...prev, currentWeek: week }))
  }, [])

  const setCurrentDay = useCallback((day) => {
    setData(prev => ({ ...prev, currentDay: day }))
  }, [])

  const toggleWorkout = useCallback((week, dayIndex, exerciseName) => {
    const key = `${week}-${dayIndex}-${exerciseName}`
    setData(prev => {
      const completed = { ...prev.completedWorkouts }
      if (completed[key]) {
        delete completed[key]
      } else {
        completed[key] = new Date().toISOString()
      }
      return { ...prev, completedWorkouts: completed }
    })
  }, [])

  const toggleMeal = useCallback((week, dayIndex, mealId, item) => {
    const key = `${week}-${dayIndex}-${mealId}-${item}`
    setData(prev => {
      const completed = { ...prev.completedMeals }
      if (completed[key]) {
        delete completed[key]
      } else {
        completed[key] = new Date().toISOString()
      }
      return { ...prev, completedMeals: completed }
    })
  }, [])

  const getWorkoutKey = useCallback((week, dayIndex, exerciseName) => {
    return `${week}-${dayIndex}-${exerciseName}`
  }, [])

  const getMealKey = useCallback((week, dayIndex, mealId, item) => {
    return `${week}-${dayIndex}-${mealId}-${item}`
  }, [])

  const addWater = useCallback((week, dayIndex) => {
    const key = `${week}-${dayIndex}`
    setData(prev => {
      const glasses = { ...prev.waterGlasses }
      glasses[key] = (glasses[key] || 0) + 1
      return { ...prev, waterGlasses: glasses }
    })
  }, [])

  const removeWater = useCallback((week, dayIndex) => {
    const key = `${week}-${dayIndex}`
    setData(prev => {
      const glasses = { ...prev.waterGlasses }
      glasses[key] = Math.max(0, (glasses[key] || 0) - 1)
      return { ...prev, waterGlasses: glasses }
    })
  }, [])

  const getWaterKey = useCallback((week, dayIndex) => {
    return `${week}-${dayIndex}`
  }, [])

  const saveNote = useCallback((week, dayIndex, note) => {
    const key = `${week}-${dayIndex}`
    setData(prev => {
      const notes = { ...prev.dailyNotes }
      if (note.trim()) {
        notes[key] = note.trim()
      } else {
        delete notes[key]
      }
      return { ...prev, dailyNotes: notes }
    })
  }, [])

  const getNoteKey = useCallback((week, dayIndex) => {
    return `${week}-${dayIndex}`
  }, [])

  const saveExerciseLog = useCallback((week, dayIndex, exerciseName, note) => {
    const key = `${week}-${dayIndex}-${exerciseName}`
    setData(prev => {
      const logs = { ...prev.dailyLogs }
      if (note.trim()) {
        logs[key] = { note: note.trim(), timestamp: new Date().toISOString() }
      } else {
        delete logs[key]
      }
      return { ...prev, dailyLogs: logs }
    })
  }, [])

  const getExerciseLogKey = useCallback((week, dayIndex, exerciseName) => {
    return `${week}-${dayIndex}-${exerciseName}`
  }, [])

  const saveWeeklyReview = useCallback((week, rating, reflection) => {
    setData(prev => ({
      ...prev,
      weeklyReviews: {
        ...prev.weeklyReviews,
        [week]: { rating, reflection, timestamp: new Date().toISOString() },
      },
    }))
  }, [])

  const setWaterTarget = useCallback((target) => {
    setData(prev => ({
      ...prev,
      settings: { ...prev.settings, waterTarget: target },
    }))
  }, [])

  return {
    data,
    getWeekInfo,
    jumpToToday,
    completeOnboarding,
    setCurrentWeek,
    setCurrentDay,
    toggleWorkout,
    toggleMeal,
    getWorkoutKey,
    getMealKey,
    addWater,
    removeWater,
    getWaterKey,
    saveNote,
    getNoteKey,
    saveExerciseLog,
    getExerciseLogKey,
    saveWeeklyReview,
    setWaterTarget,
  }
}

function hasActivityOnDay(completedWorkouts, week, dayOfWeek) {
  return Object.keys(completedWorkouts).some(k => k.startsWith(`${week}-${dayOfWeek}-`))
}

export function calculateStreak(completedWorkouts, startDate) {
  const start = new Date(startDate)
  start.setHours(0, 0, 0, 0)
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  let streak = 0
  const checkDate = new Date(today)

  while (checkDate >= start) {
    const dayOfWeek = (checkDate.getDay() + 6) % 7

    // Full rest (Sunday) skipped — doesn't break or add to streak
    if (dayOfWeek === 6) {
      checkDate.setDate(checkDate.getDate() - 1)
      continue
    }

    const diffDays = Math.floor((checkDate.getTime() - start.getTime()) / 86400000)
    const week = Math.min(12, Math.floor(diffDays / 7) + 1)

    if (hasActivityOnDay(completedWorkouts, week, dayOfWeek)) {
      streak++
      checkDate.setDate(checkDate.getDate() - 1)
    } else if (checkDate.getTime() === today.getTime()) {
      // Today not logged yet — don't penalise, just step back
      checkDate.setDate(checkDate.getDate() - 1)
    } else {
      break
    }
  }

  return streak
}

export function getProgressStats(data) {
  const { completedWorkouts, completedMeals, currentWeek, currentDay, startDate } = data

  const streak = calculateStreak(completedWorkouts, startDate)

  const currentDayWorkouts = Object.keys(completedWorkouts).filter(k =>
    k.startsWith(`${currentWeek}-${currentDay}-`)
  ).length

  const currentWeekWorkouts = Object.keys(completedWorkouts).filter(k =>
    k.startsWith(`${currentWeek}-`)
  ).length

  const currentWeekMeals = Object.keys(completedMeals).filter(k =>
    k.startsWith(`${currentWeek}-`)
  ).length

  const weekComplete = Math.min(100, Math.round(
    ((currentWeekWorkouts + currentWeekMeals) / Math.max(1, currentWeek * 7)) * 50
  ))

  return {
    streak,
    currentDayWorkouts,
    currentWeekWorkouts,
    currentWeekMeals,
    weekComplete,
    totalWorkouts: Object.keys(completedWorkouts).length,
    totalMeals: Object.keys(completedMeals).length,
  }
}
