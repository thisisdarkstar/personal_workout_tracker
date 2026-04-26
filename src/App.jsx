import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Dumbbell, Utensils, BarChart3, Target, Flame, CheckCircle, Droplets, FileText, X } from 'lucide-react'
import DayNavigator from './components/DayNavigator'
import WorkoutChecklist from './components/WorkoutChecklist'
import DietChecklist from './components/DietChecklist'
import WaterTracker from './components/WaterTracker'
import DailyNotes from './components/DailyNotes'
import NotesHistory from './components/NotesHistory'
import Dashboard from './components/Dashboard'
import { useStorage, getProgressStats } from './hooks/useStorage'
import { getWorkoutForDay, PHASES, getPhase } from './data/workoutPlan'

export default function App() {
  const [showDashboard, setShowDashboard] = useState(false)
  const [activeTab, setActiveTab] = useState('workout')
  const [showWater, setShowWater] = useState(false)
  const [showNotes, setShowNotes] = useState(false)
  const [notesMode, setNotesMode] = useState('editor')

  const { 
    data, getWeekInfo, jumpToToday, setCurrentWeek, setCurrentDay, 
    toggleWorkout, toggleMeal, getWorkoutKey, getMealKey, addWater, 
    removeWater, getWaterKey, saveNote, getNoteKey
  } = useStorage()

  const { currentWeek, currentDay, completedWorkouts, completedMeals, waterGlasses = {}, dailyNotes = {} } = data

  useEffect(() => {
    const { week, day, isToday } = getWeekInfo()
    if (isToday && (week !== currentWeek || day !== currentDay)) {
      setCurrentWeek(week)
      setCurrentDay(day)
    }
  }, [])

  const weekInfo = getWeekInfo()
  const phase = getPhase(currentWeek)
  const phaseData = PHASES[phase]
  const workout = getWorkoutForDay(currentWeek, currentDay)
  const stats = getProgressStats(data)
  const waterKey = getWaterKey(currentWeek, currentDay)
  const waterCount = waterGlasses[waterKey] || 0

  return (
    <div className="min-h-screen bg-boxing-dark flex flex-col">
      <header className="sticky top-0 z-40 bg-boxing-dark/95 backdrop-blur border-b border-boxing-ring">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🥊</span>
              <div>
                <h1 className="text-white font-bold">12-Week Plan</h1>
                <p className="text-gray-500 text-xs">
                  <span style={{ color: phaseData.color }}>{phaseData.name}</span>
                </p>
              </div>
            </div>
            <button onClick={jumpToToday} disabled={weekInfo.isToday} className={`px-3 py-2 rounded-lg text-sm ${weekInfo.isToday ? 'text-gray-500' : 'text-boxing-neon'}`}>
              {weekInfo.isToday ? 'Today' : 'Go Today'}
            </button>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <div className="flex justify-between mb-1">
                <span className="text-xs text-gray-500">Progress</span>
                <span className="text-xs font-medium" style={{ color: phaseData.color }}>Week {currentWeek}/12</span>
              </div>
              <div className="w-full bg-boxing-ring rounded-full h-2">
                <div className="h-2 rounded-full" style={{ width: `${(currentWeek/12)*100}%`, backgroundColor: phaseData.color }} />
              </div>
            </div>
            <div className="flex items-center gap-1 px-3 py-1.5 bg-boxing-panel rounded-lg">
              <Flame className="w-4 h-4 text-orange-500" />
              <span className="text-sm font-bold text-orange-500">{stats.streak||0}</span>
            </div>
            <div className="flex items-center gap-1 px-3 py-1.5 bg-boxing-panel rounded-lg">
              <CheckCircle className="w-4 h-4 text-boxing-neon" />
              <span className="text-sm font-bold text-boxing-neon">{stats.weekComplete||0}%</span>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 px-3 pt-4 pb-28 overflow-y-auto">
        <DayNavigator currentWeek={currentWeek} currentDay={currentDay} onWeekChange={setCurrentWeek} onDayChange={setCurrentDay} weekInfo={weekInfo} startDate={data.startDate} />

        <div className="flex gap-2 mb-4">
          <button onClick={() => setActiveTab('workout')} className={`flex-1 py-3 rounded-xl font-semibold text-sm ${activeTab === 'workout' ? 'bg-boxing-neon text-boxing-dark' : 'bg-boxing-panel text-gray-400'}`}>
            Workout
          </button>
          <button onClick={() => setActiveTab('diet')} className={`flex-1 py-3 rounded-xl font-semibold text-sm ${activeTab === 'diet' ? 'bg-boxing-accent text-white' : 'bg-boxing-panel text-gray-400'}`}>
            Diet
          </button>
        </div>

        {activeTab === 'workout' ? (
          <WorkoutChecklist workout={workout} completed={completedWorkouts} onToggle={toggleWorkout} getWorkoutKey={getWorkoutKey} currentWeek={currentWeek} currentDay={currentDay} />
        ) : (
          <DietChecklist currentWeek={currentWeek} currentDay={currentDay} completed={completedMeals} onToggle={toggleMeal} getMealKey={getMealKey} />
        )}

        <div className="flex justify-between py-4 gap-2">
          <button onClick={() => { if(currentDay>0) setCurrentDay(currentDay-1); else if(currentWeek>1){setCurrentWeek(currentWeek-1); setCurrentDay(6)} }} disabled={currentWeek===1&&currentDay===0} className="flex-1 py-3 bg-boxing-panel rounded-xl text-gray-400 disabled:opacity-25">
            Prev
          </button>
          <button onClick={() => { if(currentDay<6) setCurrentDay(currentDay+1); else if(currentWeek<12){setCurrentWeek(currentWeek+1); setCurrentDay(0)} }} disabled={currentWeek===12&&currentDay===6} className="flex-1 py-3 bg-boxing-panel rounded-xl text-gray-400 disabled:opacity-25">
            Next
          </button>
        </div>
      </main>

      <div className="fixed bottom-20 right-4 flex flex-col gap-3 z-30">
        <button onClick={() => { setShowWater(!showWater); setShowNotes(false); }} className="w-14 h-14 rounded-full bg-blue-500 text-white flex flex-col items-center justify-center shadow-lg">
          <Droplets className="w-6 h-6" />
          <span className="text-xs font-bold">{waterCount}</span>
        </button>
        <button onClick={() => { setShowNotes(!showNotes); setShowWater(false); }} className="w-14 h-14 rounded-full bg-yellow-500 text-white flex flex-col items-center justify-center shadow-lg">
          <FileText className="w-6 h-6" />
          <span className="text-xs">Notes</span>
        </button>
      </div>

      {showWater && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowWater(false)}>
          <div className="bg-boxing-panel w-full max-w-sm rounded-3xl p-5" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-semibold flex items-center gap-2"><Droplets className="w-5 h-5 text-blue-500" />Water</h3>
              <button onClick={() => setShowWater(false)} className="w-10 h-10 rounded-full bg-boxing-ring flex items-center justify-center text-gray-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <WaterTracker currentWeek={currentWeek} currentDay={currentDay} waterData={waterGlasses} addWater={addWater} removeWater={removeWater} getWaterKey={getWaterKey} />
          </div>
        </div>
      )}

      {showNotes && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowNotes(false)}>
          <div className="bg-boxing-panel w-full max-w-sm rounded-3xl p-5" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-semibold flex items-center gap-2"><FileText className="w-5 h-5 text-yellow-500" />Notes</h3>
              <button onClick={() => setShowNotes(false)} className="w-10 h-10 rounded-full bg-boxing-ring flex items-center justify-center text-gray-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex gap-2 mb-3">
              <button onClick={() => setNotesMode('editor')} className={`flex-1 py-2 rounded-lg text-sm ${notesMode === 'editor' ? 'bg-boxing-neon text-boxing-dark' : 'bg-boxing-ring text-gray-400'}`}>Today's Note</button>
              <button onClick={() => setNotesMode('history')} className={`flex-1 py-2 rounded-lg text-sm ${notesMode === 'history' ? 'bg-boxing-neon text-boxing-dark' : 'bg-boxing-ring text-gray-400'}`}>All Notes</button>
            </div>
            {notesMode === 'history' ? (
              <NotesHistory dailyNotes={dailyNotes} getNoteKey={getNoteKey} currentWeek={currentWeek} currentDay={currentDay} onSelectNote={(w,d) => { setCurrentWeek(w); setCurrentDay(d); setNotesMode('editor') }} />
            ) : (
              <DailyNotes currentWeek={currentWeek} currentDay={currentDay} notes={dailyNotes} saveNote={saveNote} getNoteKey={getNoteKey} />
            )}
          </div>
        </div>
      )}

      <nav className="fixed bottom-0 left-0 right-0 bg-boxing-panel/98 backdrop-blur border-t border-boxing-ring">
        <div className="flex justify-around h-20 pt-3 pb-6">
          <button onClick={() => setActiveTab('workout')} className={`flex flex-col items-center ${activeTab==='workout'?'text-boxing-neon':'text-gray-500'}`}>
            <Dumbbell className="w-6 h-6" /><span className="text-xs">Workout</span>
          </button>
          <button onClick={() => setActiveTab('diet')} className={`flex flex-col items-center ${activeTab==='diet'?'text-boxing-accent':'text-gray-500'}`}>
            <Utensils className="w-6 h-6" /><span className="text-xs">Diet</span>
          </button>
          <button onClick={() => setShowDashboard(true)} className="flex flex-col items-center text-gray-500">
            <BarChart3 className="w-6 h-6" /><span className="text-xs">Stats</span>
          </button>
        </div>
      </nav>

      {showDashboard && <Dashboard data={data} onClose={() => setShowDashboard(false)} />}
    </div>
  )
}