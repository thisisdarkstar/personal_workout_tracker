import { useState, useEffect } from 'react'
import { Dumbbell, Utensils, BarChart3, Flame, CheckCircle, Droplets, FileText, X } from 'lucide-react'
import DayNavigator from './components/DayNavigator'
import WorkoutChecklist from './components/WorkoutChecklist'
import DietChecklist from './components/DietChecklist'
import WaterTracker from './components/WaterTracker'
import DailyNotes from './components/DailyNotes'
import NotesHistory from './components/NotesHistory'
import Dashboard from './components/Dashboard'
import WeeklyReview from './components/WeeklyReview'
import Onboarding from './components/Onboarding'
import { useStorage, getProgressStats } from './hooks/useStorage'
import { getWorkoutForDay, PHASES, getPhase, isRestDayIndex } from './data/workoutPlan'

export default function App() {
  const [showDashboard, setShowDashboard] = useState(false)
  const [activeTab, setActiveTab] = useState('workout')
  const [showWater, setShowWater] = useState(false)
  const [showNotes, setShowNotes] = useState(false)
  const [notesMode, setNotesMode] = useState('editor')
  const [phaseBanner, setPhaseBanner] = useState(null)

  const {
    data, getWeekInfo, jumpToToday, setCurrentWeek, setCurrentDay,
    toggleWorkout, toggleMeal, getWorkoutKey, getMealKey, addWater,
    removeWater, getWaterKey, saveNote, getNoteKey,
    saveExerciseLog, getExerciseLogKey,
    saveWeeklyReview, setWaterTarget, completeOnboarding,
  } = useStorage()

  const {
    currentWeek, currentDay, completedWorkouts, completedMeals,
    waterGlasses = {}, dailyNotes = {}, weeklyReviews = {},
    onboardingComplete,
  } = data

  const weekInfo = getWeekInfo()
  const isViewingToday = currentWeek === weekInfo.todayWeek && currentDay === weekInfo.todayDay
  const phase = getPhase(currentWeek)
  const phaseData = PHASES[phase]
  const workout = getWorkoutForDay(currentWeek, currentDay)
  const stats = getProgressStats(data)
  const waterKey = getWaterKey(currentWeek, currentDay)
  const waterCount = waterGlasses[waterKey] || 0
  const waterTarget = data.settings?.waterTarget || 12
  const isSunday = currentDay === 6

  useEffect(() => {
    const { todayWeek, todayDay, planStarted } = getWeekInfo()
    if (planStarted && (todayWeek !== currentWeek || todayDay !== currentDay)) {
      setCurrentWeek(todayWeek)
      setCurrentDay(todayDay)
    }
  }, [])

  // Detect phase transitions and show a banner
  useEffect(() => {
    const prevPhase = getPhase(Math.max(1, currentWeek - 1))
    if (phase !== prevPhase && currentDay === 0) {
      setPhaseBanner(phase)
      const t = setTimeout(() => setPhaseBanner(null), 5000)
      return () => clearTimeout(t)
    }
  }, [currentWeek, currentDay])

  if (!onboardingComplete) {
    return <Onboarding onComplete={completeOnboarding} />
  }

  return (
    <div className="min-h-screen bg-boxing-dark flex flex-col">
      {/* Phase milestone banner */}
      {phaseBanner && (
        <div
          className="fixed top-0 inset-x-0 z-50 flex items-center justify-center p-3 text-sm font-bold text-boxing-dark animate-bounce"
          style={{ backgroundColor: PHASES[phaseBanner].color }}
        >
          🎉 {PHASES[phaseBanner].name} unlocked — {PHASES[phaseBanner].focus}!
          <button onClick={() => setPhaseBanner(null)} className="ml-3 opacity-60 hover:opacity-100">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      <header className="sticky top-0 z-40 bg-boxing-dark/95 backdrop-blur border-b border-boxing-ring">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🥊</span>
              <div>
                <h1 className="text-white font-bold">12-Week Plan</h1>
                <p className="text-gray-500 text-xs">
                  <span style={{ color: phaseData.color }}>{phaseData.name}</span>
                  <span className="ml-1 text-gray-600">· Week {currentWeek}/12</span>
                </p>
              </div>
            </div>
            <button
              onClick={jumpToToday}
              disabled={isViewingToday}
              className={`px-3 py-2 rounded-lg text-sm font-medium ${isViewingToday ? 'text-gray-500' : 'text-boxing-neon'}`}
            >
              {isViewingToday ? 'Today' : 'Go Today'}
            </button>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <div className="flex justify-between mb-1">
                <span className="text-xs text-gray-500">Progress</span>
                <span className="text-xs font-medium" style={{ color: phaseData.color }}>
                  {Math.round((currentWeek / 12) * 100)}%
                </span>
              </div>
              <div className="w-full bg-boxing-ring rounded-full h-2">
                <div
                  className="h-2 rounded-full transition-all duration-500"
                  style={{ width: `${(currentWeek / 12) * 100}%`, backgroundColor: phaseData.color }}
                />
              </div>
            </div>
            <div className="flex items-center gap-1 px-3 py-1.5 bg-boxing-panel rounded-lg">
              <Flame className="w-4 h-4 text-orange-500" />
              <span className="text-sm font-bold text-orange-500">{stats.streak || 0}</span>
            </div>
            <div className="flex items-center gap-1 px-3 py-1.5 bg-boxing-panel rounded-lg">
              <CheckCircle className="w-4 h-4 text-boxing-neon" />
              <span className="text-sm font-bold text-boxing-neon">{stats.weekComplete || 0}%</span>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 px-3 pt-4 pb-28 overflow-y-auto">
        <DayNavigator
          currentWeek={currentWeek}
          currentDay={currentDay}
          onWeekChange={setCurrentWeek}
          onDayChange={setCurrentDay}
          weekInfo={weekInfo}
          startDate={data.startDate}
          completedWorkouts={completedWorkouts}
        />

        {/* Weekly review prompt on Sunday */}
        {isSunday && (
          <WeeklyReview
            week={currentWeek}
            reviews={weeklyReviews}
            onSave={saveWeeklyReview}
          />
        )}

        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setActiveTab('workout')}
            className={`flex-1 py-3 rounded-xl font-semibold text-sm transition ${activeTab === 'workout' ? 'bg-boxing-neon text-boxing-dark' : 'bg-boxing-panel text-gray-400'}`}
          >
            Workout
          </button>
          <button
            onClick={() => setActiveTab('diet')}
            className={`flex-1 py-3 rounded-xl font-semibold text-sm transition ${activeTab === 'diet' ? 'bg-boxing-accent text-white' : 'bg-boxing-panel text-gray-400'}`}
          >
            {isRestDayIndex(currentDay) ? 'Diet (Rest)' : 'Diet (Training)'}
          </button>
        </div>

        {activeTab === 'workout' ? (
          <WorkoutChecklist
            workout={workout}
            completed={completedWorkouts}
            onToggle={toggleWorkout}
            getWorkoutKey={getWorkoutKey}
            currentWeek={currentWeek}
            currentDay={currentDay}
            exerciseLogs={data.dailyLogs}
            onLogExercise={saveExerciseLog}
            getLogKey={getExerciseLogKey}
          />
        ) : (
          <DietChecklist
            currentWeek={currentWeek}
            currentDay={currentDay}
            completed={completedMeals}
            onToggle={toggleMeal}
            getMealKey={getMealKey}
          />
        )}
      </main>

      {/* Floating action buttons */}
      <div className="fixed bottom-28 right-4 flex flex-col gap-3 z-30">
        <button
          onClick={() => { setShowWater(!showWater); setShowNotes(false) }}
          className="w-14 h-14 rounded-full bg-blue-500 text-white flex flex-col items-center justify-center shadow-lg active:scale-95 transition"
        >
          <Droplets className="w-6 h-6" />
          <span className="text-xs font-bold">{waterCount}</span>
        </button>
        <button
          onClick={() => { setShowNotes(!showNotes); setShowWater(false) }}
          className="w-14 h-14 rounded-full bg-yellow-500 text-white flex flex-col items-center justify-center shadow-lg active:scale-95 transition"
        >
          <FileText className="w-6 h-6" />
          <span className="text-xs">Notes</span>
        </button>
      </div>

      {/* Water modal */}
      {showWater && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowWater(false)}>
          <div className="bg-boxing-panel w-full max-w-sm rounded-3xl p-5" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-semibold flex items-center gap-2">
                <Droplets className="w-5 h-5 text-blue-500" />Water
              </h3>
              <button onClick={() => setShowWater(false)} className="w-10 h-10 rounded-full bg-boxing-ring flex items-center justify-center text-gray-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <WaterTracker
              currentWeek={currentWeek}
              currentDay={currentDay}
              waterData={waterGlasses}
              addWater={addWater}
              removeWater={removeWater}
              getWaterKey={getWaterKey}
              waterTarget={waterTarget}
              onTargetChange={setWaterTarget}
            />
          </div>
        </div>
      )}

      {/* Notes modal */}
      {showNotes && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowNotes(false)}>
          <div className="bg-boxing-panel w-full max-w-sm rounded-3xl p-5" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-semibold flex items-center gap-2">
                <FileText className="w-5 h-5 text-yellow-500" />Notes
              </h3>
              <button onClick={() => setShowNotes(false)} className="w-10 h-10 rounded-full bg-boxing-ring flex items-center justify-center text-gray-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex gap-2 mb-3">
              <button
                onClick={() => setNotesMode('editor')}
                className={`flex-1 py-2 rounded-lg text-sm ${notesMode === 'editor' ? 'bg-boxing-neon text-boxing-dark' : 'bg-boxing-ring text-gray-400'}`}
              >
                Today's Note
              </button>
              <button
                onClick={() => setNotesMode('history')}
                className={`flex-1 py-2 rounded-lg text-sm ${notesMode === 'history' ? 'bg-boxing-neon text-boxing-dark' : 'bg-boxing-ring text-gray-400'}`}
              >
                All Notes
              </button>
            </div>
            {notesMode === 'history' ? (
              <NotesHistory
                dailyNotes={dailyNotes}
                getNoteKey={getNoteKey}
                currentWeek={currentWeek}
                currentDay={currentDay}
                onSelectNote={(w, d) => { setCurrentWeek(w); setCurrentDay(d); setNotesMode('editor') }}
              />
            ) : (
              <DailyNotes
                currentWeek={currentWeek}
                currentDay={currentDay}
                notes={dailyNotes}
                saveNote={saveNote}
                getNoteKey={getNoteKey}
              />
            )}
          </div>
        </div>
      )}

      <nav className="fixed bottom-0 left-0 right-0 bg-boxing-panel/98 backdrop-blur border-t border-boxing-ring">
        <div className="flex justify-around h-20 pt-3 pb-6">
          <button
            onClick={() => setActiveTab('workout')}
            className={`flex flex-col items-center ${activeTab === 'workout' ? 'text-boxing-neon' : 'text-gray-500'}`}
          >
            <Dumbbell className="w-6 h-6" /><span className="text-xs">Workout</span>
          </button>
          <button
            onClick={() => setActiveTab('diet')}
            className={`flex flex-col items-center ${activeTab === 'diet' ? 'text-boxing-accent' : 'text-gray-500'}`}
          >
            <Utensils className="w-6 h-6" /><span className="text-xs">Diet</span>
          </button>
          <button
            onClick={() => setShowDashboard(true)}
            className="flex flex-col items-center text-gray-500"
          >
            <BarChart3 className="w-6 h-6" /><span className="text-xs">Stats</span>
          </button>
        </div>
      </nav>

      {showDashboard && <Dashboard data={data} onClose={() => setShowDashboard(false)} />}
    </div>
  )
}
