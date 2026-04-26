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
  settings: {
    waterTarget: 12,
  },
}

function getDayOfWeek(date) {
  return (date.getDay() + 6) % 7
}

export function useStorage() {
  const [data, setData] = useState(() => {
    if (typeof window === 'undefined') return DEFAULT_DATA
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      try {
        return JSON.parse(stored)
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
    
    const weekNum = Math.floor(diffDays / 7) + 1
    const dayNum = (today.getDay() + 6) % 7
    
    const week = Math.max(1, Math.min(12, weekNum))
    const day = Math.max(0, Math.min(6, dayNum))
    
    return { week, day, diffDays, isToday: diffDays >= 0, startDate: data.startDate }
  }, [data.startDate])

  const jumpToToday = useCallback(() => {
    const { week, day } = getWeekInfo()
    setData(prev => ({
      ...prev,
      currentWeek: week,
      currentDay: day,
    }))
  }, [getWeekInfo])

  const setStartDate = useCallback((dateStr) => {
    setData(prev => ({ ...prev, startDate: dateStr }))
  }, [])

  const updateData = useCallback((updates) => {
    setData(prev => ({ ...prev, ...updates }))
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
      if (glasses[key] > 0) {
        glasses[key] = Math.max(0, glasses[key] - 1)
      }
      return { ...prev, waterGlasses: glasses }
    })
  }, [])

  const setWater = useCallback((week, dayIndex, count) => {
    const key = `${week}-${dayIndex}`
    setData(prev => {
      const glasses = { ...prev.waterGlasses }
      glasses[key] = Math.max(0, count)
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

  const setWaterTarget = useCallback((target) => {
    setData(prev => ({
      ...prev,
      settings: { ...prev.settings, waterTarget: target }
    }))
  }, [])

  const getWaterTarget = useCallback(() => {
    return data.settings?.waterTarget || 12
  }, [data.settings])

  const resetProgress = useCallback(() => {
    setData(DEFAULT_DATA)
  }, [])

  return {
    data,
    getWeekInfo,
    jumpToToday,
    setStartDate,
    updateData,
    setCurrentWeek,
    setCurrentDay,
    toggleWorkout,
    toggleMeal,
    getWorkoutKey,
    getMealKey,
    addWater,
    removeWater,
    setWater,
    getWaterKey,
    saveNote,
    getNoteKey,
    setWaterTarget,
    getWaterTarget,
    resetProgress,
  }
}

export function getProgressStats(data) {
  const totalWorkouts = Object.keys(data.completedWorkouts).length
  const totalMeals = Object.keys(data.completedMeals).length
  const weekKey = `${data.currentWeek}-${data.currentDay}-`

  const currentWeekWorkouts = Object.keys(data.completedWorkouts).filter(k => 
    k.startsWith(`${data.currentWeek}-`)
  ).length

  const currentWeekMeals = Object.keys(data.completedMeals).filter(k => 
    k.startsWith(`${data.currentWeek}-`)
  ).length

  const weekComplete = Math.min(100, Math.round(((currentWeekWorkouts / 5) + (currentWeekMeals / 7)) * 50))

  const streak = Math.floor(totalWorkouts / 5)

  return {
    totalWorkouts,
    totalMeals,
    currentWeekWorkouts,
    currentWeekMeals,
    weekComplete,
    streak,
  }
}