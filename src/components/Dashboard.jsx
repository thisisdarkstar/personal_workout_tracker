import { Trophy, Flame, CheckCircle, X, Sparkles, Activity } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, RadialBarChart, RadialBar, Legend } from 'recharts'
import { DAYS, PHASES, getPhase } from '../data/workoutPlan'

export default function Dashboard({ data, onClose }) {
  const { currentWeek, completedWorkouts, completedMeals } = data
  const phase = getPhase(currentWeek)
  const phaseData = PHASES[phase]

  const stats = calculateStats(completedWorkouts, completedMeals, currentWeek)

  return (
    <div className="fixed inset-0 bg-boxing-dark z-50 overflow-y-auto">
      <div className="p-4 max-w-lg mx-auto min-h-full">
        <div className="flex items-center justify-between mb-6 pt-safe">
          <div>
            <h2 className="text-2xl font-bold text-white">Progress</h2>
            <p className="text-gray-500">Week {currentWeek} • {phaseData.name}</p>
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
            <div className="text-gray-500 text-xs">days</div>
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
              <span className="text-gray-400 text-xs">Workouts</span>
            </div>
            <div className="text-3xl font-bold text-white">{stats.totalWorkouts}</div>
          </div>

          <div className="bg-boxing-panel rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-1">
              <Flame className="w-4 h-4 text-boxing-accent" />
              <span className="text-gray-400 text-xs">Meals</span>
            </div>
            <div className="text-3xl font-bold text-white">{stats.totalMeals}</div>
          </div>
        </div>

        <div className="bg-boxing-panel rounded-2xl p-4 mb-4">
          <div className="flex items-center gap-2 mb-4">
            <Activity className="w-5 h-5 text-boxing-neon" />
            <h3 className="text-white font-semibold">Weekly Progress</h3>
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
                  contentStyle={{ 
                    background: '#252525', 
                    border: 'none', 
                    borderRadius: '8px',
                    color: '#fff'
                  }}
                  cursor={{ fill: '#333' }}
                />
                <Bar 
                  dataKey="completion" 
                  fill="#00ff88" 
                  radius={[4, 4, 0, 0]}
                  name="%"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-boxing-panel rounded-2xl p-4 mb-4">
          <h3 className="text-white font-semibold mb-4">Phase Progress</h3>
          <div className="space-y-4">
            {[1, 2, 3].map((p) => {
              const phaseStats = stats.phaseProgress[p]
              const isActive = phase === p
              return (
                <div key={p} className={`${isActive ? 'bg-boxing-dark/30' : ''} p-3 rounded-xl`}>
                  <div className="flex items-center justify-between mb-2">
                    <span 
                      className="text-sm font-bold"
                      style={{ color: PHASES[p].color }}
                    >
                      {PHASES[p].name}
                    </span>
                    <span className="text-gray-400 text-sm">
                      {phaseStats.completed}/{phaseStats.total}
                    </span>
                  </div>
                  <div className="w-full bg-boxing-ring rounded-full h-2.5">
                    <div 
                      className="h-2.5 rounded-full transition-all duration-500"
                      style={{ 
                        width: `${phaseStats.percentage}%`,
                        backgroundColor: PHASES[p].color 
                      }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

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
              <span className="text-gray-400">Rate</span>
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

function calculateStats(workouts, meals, currentWeek) {
  const totalWorkouts = Object.keys(workouts).length
  const totalMeals = Object.keys(meals).length

  const streak = totalWorkouts > 0 ? Math.floor(totalWorkouts / 5) : 0

  const todayWorkouts = Object.keys(workouts).filter(k => k.startsWith(`${currentWeek}-`)).length
  const todayMeals = Object.keys(meals).filter(k => k.startsWith(`${currentWeek}-`)).length
  const todayCompletion = Math.min(100, Math.round(((todayWorkouts / 5) + (todayMeals / 7)) * 50))

  const weeklyData = DAYS.map((day, dayIndex) => {
    const dayW = Object.keys(workouts).filter(k => k.startsWith(`${currentWeek}-${dayIndex}-`)).length
    const dayM = Object.keys(meals).filter(k => k.startsWith(`${currentWeek}-${dayIndex}-`)).length
    return {
      day: day.slice(0, 2),
      completion: Math.round(((dayW / 3) + (dayM / 4)) * 50),
    }
  })

  const phaseProgress = { 1: { completed: 0, total: 28 }, 2: { completed: 0, total: 28 }, 3: { completed: 0, total: 28 } }
  Object.keys(workouts).forEach(key => {
    const week = parseInt(key.split('-')[0])
    const p = week <= 4 ? 1 : week <= 8 ? 2 : 3
    phaseProgress[p].completed++
  })
  Object.keys(phaseProgress).forEach(p => {
    phaseProgress[p].percentage = Math.round((phaseProgress[p].completed / phaseProgress[p].total) * 100)
  })

  const overallRate = currentWeek > 0 ? Math.round(((totalWorkouts / (currentWeek * 5)) + (totalMeals / (currentWeek * 7))) * 50) : 0

  return {
    streak,
    todayCompletion,
    totalWorkouts,
    totalMeals,
    weeklyData,
    phaseProgress,
    overallRate,
  }
}