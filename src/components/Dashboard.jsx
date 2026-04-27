import { Trophy, Flame, X, Sparkles, Activity } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts'
import { DAYS, PHASES, getPhase, getWorkoutForDay, getPhaseExerciseTotal } from '../data/workoutPlan'
import { calculateStreak } from '../hooks/useStorage'

export default function Dashboard({ data, onClose }) {
  const { currentWeek, currentDay, completedWorkouts, completedMeals, startDate } = data
  const phase = getPhase(currentWeek)
  const phaseData = PHASES[phase]

  const stats = calculateStats(completedWorkouts, completedMeals, currentWeek, currentDay, startDate)

  return (
    <div className="fixed inset-0 bg-boxing-dark z-50 overflow-y-auto">
      <div className="p-4 max-w-lg mx-auto min-h-full">
        <div className="flex items-center justify-between mb-6 pt-safe">
          <div>
            <h2 className="text-2xl font-bold text-white">Progress</h2>
            <p className="text-gray-500">Week {currentWeek} · {phaseData.name} · {phaseData.focus}</p>
          </div>
          <button
            onClick={onClose}
            className="w-11 h-11 rounded-xl bg-boxing-panel flex items-center justify-center text-white hover:bg-boxing-ring transition active:scale-95"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-5">
          <div className="bg-boxing-panel rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-1">
              <Trophy className="w-4 h-4 text-yellow-500" />
              <span className="text-gray-400 text-xs">Streak</span>
            </div>
            <div className="text-3xl font-bold text-boxing-neon">{stats.streak}</div>
            <div className="text-gray-500 text-xs">active days</div>
          </div>

          <div className="bg-boxing-panel rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-1">
              <Activity className="w-4 h-4 text-blue-500" />
              <span className="text-gray-400 text-xs">Today</span>
            </div>
            <div className="text-3xl font-bold text-white">{stats.todayCompletion}%</div>
            <div className="text-gray-500 text-xs">complete</div>
          </div>

          <div className="bg-boxing-panel rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="w-4 h-4 text-boxing-neon" />
              <span className="text-gray-400 text-xs">Exercises</span>
            </div>
            <div className="text-3xl font-bold text-white">{stats.totalWorkouts}</div>
            <div className="text-gray-500 text-xs">logged</div>
          </div>

          <div className="bg-boxing-panel rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-1">
              <Flame className="w-4 h-4 text-boxing-accent" />
              <span className="text-gray-400 text-xs">Meals</span>
            </div>
            <div className="text-3xl font-bold text-white">{stats.totalMeals}</div>
            <div className="text-gray-500 text-xs">logged</div>
          </div>
        </div>

        {/* Weekly bar chart */}
        <div className="bg-boxing-panel rounded-2xl p-4 mb-4">
          <div className="flex items-center gap-2 mb-4">
            <Activity className="w-5 h-5 text-boxing-neon" />
            <h3 className="text-white font-semibold">This Week</h3>
          </div>
          <div className="h-44 -mx-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.weeklyData} barSize={20}>
                <XAxis
                  dataKey="day"
                  tick={{ fill: '#666', fontSize: 11 }}
                  axisLine={{ stroke: '#333' }}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: '#666', fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                  domain={[0, 100]}
                />
                <Tooltip
                  contentStyle={{ background: '#252525', border: 'none', borderRadius: '8px', color: '#fff' }}
                  cursor={{ fill: '#333' }}
                  formatter={(v) => [`${v}%`, 'Completion']}
                />
                <Bar dataKey="completion" fill="#00ff88" radius={[4, 4, 0, 0]} name="%" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Phase progress */}
        <div className="bg-boxing-panel rounded-2xl p-4 mb-4">
          <h3 className="text-white font-semibold mb-4">Phase Progress</h3>
          <div className="space-y-4">
            {[1, 2, 3].map((p) => {
              const ps = stats.phaseProgress[p]
              const isActive = phase === p
              return (
                <div key={p} className={`${isActive ? 'bg-boxing-dark/30' : ''} p-3 rounded-xl`}>
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <span className="text-sm font-bold" style={{ color: PHASES[p].color }}>
                        {PHASES[p].name}
                      </span>
                      <span className="text-gray-600 text-xs ml-2">{PHASES[p].focus}</span>
                    </div>
                    <span className="text-gray-400 text-sm">{ps.completed}/{ps.total}</span>
                  </div>
                  <div className="w-full bg-boxing-ring rounded-full h-2.5">
                    <div
                      className="h-2.5 rounded-full transition-all duration-500"
                      style={{ width: `${ps.percentage}%`, backgroundColor: PHASES[p].color }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Summary */}
        <div className="bg-boxing-panel rounded-2xl p-4 mb-6">
          <h3 className="text-white font-semibold mb-4">Summary</h3>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Phase</span>
              <span className="font-bold" style={{ color: phaseData.color }}>{phaseData.name}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Week</span>
              <span className="text-white font-bold">{currentWeek}/12</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Remaining</span>
              <span className="text-white">{12 - currentWeek} wks</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Completion</span>
              <span className="text-boxing-neon font-bold">{stats.overallRate}%</span>
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-4 bg-boxing-neon text-boxing-dark font-bold rounded-xl mb-8 active:scale-[0.99] transition"
        >
          Continue Training
        </button>
      </div>
    </div>
  )
}

function calculateStats(workouts, meals, currentWeek, currentDay, startDate) {
  const streak = calculateStreak(workouts, startDate)
  const totalWorkouts = Object.keys(workouts).length
  const totalMeals = Object.keys(meals).length

  // Today's completion uses actual exercise count
  const todayExerciseTotal = getWorkoutForDay(currentWeek, currentDay).exercises.length
  const todayDone = Object.keys(workouts).filter(k => k.startsWith(`${currentWeek}-${currentDay}-`)).length
  const todayCompletion = todayExerciseTotal > 0
    ? Math.min(100, Math.round((todayDone / todayExerciseTotal) * 100))
    : 0

  // Weekly chart — use actual exercise count per day
  const weeklyData = DAYS.map((day, dayIndex) => {
    const exerciseTotal = getWorkoutForDay(currentWeek, dayIndex).exercises.length
    const done = Object.keys(workouts).filter(k => k.startsWith(`${currentWeek}-${dayIndex}-`)).length
    return {
      day: day.slice(0, 2),
      completion: exerciseTotal > 0 ? Math.min(100, Math.round((done / exerciseTotal) * 100)) : 0,
    }
  })

  // Phase progress using real exercise totals
  const phaseProgress = {}
  for (let p = 1; p <= 3; p++) {
    const total = getPhaseExerciseTotal(p)
    const startWeek = (p - 1) * 4 + 1
    const endWeek = p * 4
    let completed = 0
    for (let w = startWeek; w <= endWeek; w++) {
      completed += Object.keys(workouts).filter(k => k.startsWith(`${w}-`)).length
    }
    phaseProgress[p] = {
      completed: Math.min(total, completed),
      total,
      percentage: Math.min(100, Math.round((completed / total) * 100)),
    }
  }

  // Overall rate = exercises completed vs total exercises for weeks elapsed
  let totalPossible = 0
  for (let w = 1; w <= currentWeek; w++) {
    for (let d = 0; d < 7; d++) {
      totalPossible += getWorkoutForDay(w, d).exercises.length
    }
  }
  const overallRate = totalPossible > 0
    ? Math.min(100, Math.round((totalWorkouts / totalPossible) * 100))
    : 0

  return { streak, todayCompletion, totalWorkouts, totalMeals, weeklyData, phaseProgress, overallRate }
}
