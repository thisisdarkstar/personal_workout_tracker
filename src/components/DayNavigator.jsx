import { DAYS, PHASES, getPhase, DAY_TYPES } from '../data/workoutPlan'
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'

export default function DayNavigator({ currentWeek, currentDay, onWeekChange, onDayChange, weekInfo, startDate }) {
  const phase = getPhase(currentWeek)
  const phaseData = PHASES[phase]
  const [showCalendar, setShowCalendar] = useState(false)
  const scrollRef = useRef(null)

  useEffect(() => {
    if (weekInfo?.isToday && scrollRef.current) {
      const todayIndex = weekInfo.day
      const button = scrollRef.current.children[todayIndex]
      if (button) {
        button.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
      }
    }
  }, [currentWeek, weekInfo?.isToday, weekInfo?.day])

  return (
    <>
      <div className="bg-boxing-panel rounded-2xl p-4 mb-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span 
              className="px-3 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase"
              style={{ backgroundColor: phaseData.color, color: '#0a0a0a' }}
            >
              {phaseData.name}
            </span>
            {weekInfo && weekInfo.isToday && (
              <span className="text-xs text-boxing-neon font-medium">Today</span>
            )}
          </div>
          <button
            onClick={() => setShowCalendar(!showCalendar)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition ${
              showCalendar ? 'bg-boxing-neon text-boxing-dark' : 'bg-boxing-ring text-gray-400 hover:text-white'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span className="font-medium">Week {currentWeek}</span>
          </button>
        </div>

        {showCalendar && (
          <CalendarView 
            currentWeek={currentWeek}
            currentDay={currentDay}
            onWeekChange={onWeekChange}
            onDayChange={onDayChange}
            onClose={() => setShowCalendar(false)}
            weekInfo={weekInfo}
            startDate={weekInfo?.startDate}
          />
        )}

        <div className="flex items-center gap-2 mb-4">
          <button
            onClick={() => {
              if (currentWeek > 1) {
                onWeekChange(currentWeek - 1)
                onDayChange(0)
              }
            }}
            disabled={currentWeek === 1}
            className="w-12 h-12 rounded-xl bg-boxing-ring flex items-center justify-center text-white disabled:opacity-25 hover:bg-boxing-dark transition active:scale-95"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <div ref={scrollRef} className="flex-1 flex gap-1.5 overflow-x-auto scrollbar-thin px-1">
            {DAYS.map((day, index) => {
              const isToday = weekInfo && weekInfo.isToday && currentDay === index
              return (
                <button
                  key={index}
                  onClick={() => onDayChange(index)}
                  className={`flex-1 min-w-[44px] h-14 rounded-xl text-sm font-semibold transition-all active:scale-95 ${
                    currentDay === index
                      ? 'bg-boxing-neon text-boxing-dark shadow-lg shadow-boxing-neon/25'
                      : isToday
                        ? 'bg-boxing-neon/20 text-boxing-neon'
                        : 'bg-boxing-ring text-gray-400 hover:bg-boxing-dark'
                  }`}
                >
                  <div className="truncate px-1">{day.slice(0, 2)}</div>
                  <div className={`text-xs ${currentDay === index ? 'text-boxing-dark/70' : 'text-gray-500'}`}>
                    {index + 1}
                  </div>
                </button>
              )
            })}
          </div>

          <button
            onClick={() => {
              if (currentWeek < 12) {
                onWeekChange(currentWeek + 1)
                onDayChange(0)
              }
            }}
            disabled={currentWeek === 12}
            className="w-12 h-12 rounded-xl bg-boxing-ring flex items-center justify-center text-white disabled:opacity-25 hover:bg-boxing-dark transition active:scale-95"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        <div className="text-center">
          <div className="flex items-center justify-center gap-2">
            <span className="text-gray-500 text-sm font-medium">
              Day {currentDay + 1} • {DAYS[currentDay]}
            </span>
            {DAY_TYPES[currentDay].type === 'fullRest' && (
              <span className="px-2 py-0.5 bg-purple-500/20 text-purple-400 text-xs rounded-full">
                Rest
              </span>
            )}
            {DAY_TYPES[currentDay].type === 'activeRest' && (
              <span className="px-2 py-0.5 bg-blue-500/20 text-blue-400 text-xs rounded-full">
                Active Rest
              </span>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

function CalendarView({ currentWeek, currentDay, onWeekChange, onDayChange, onClose, weekInfo, startDate }) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  
  const planStart = startDate ? new Date(startDate) : today
  
  const diffDays = Math.floor((today.getTime() - planStart.getTime()) / (86400000))
  const todayWeek = Math.max(1, Math.min(12, Math.floor(diffDays / 7) + 1))
  const todayDay = (diffDays % 7 + 7) % 7

  const getWeekStart = (weekNum) => {
    const start = new Date(planStart)
    const dayOfWeek = planStart.getDay()
    const daysToSubtract = (dayOfWeek + 6) % 7
    start.setDate(start.getDate() - daysToSubtract + (weekNum - 1) * 7)
    return start
  }

  const getDaysOfWeek = (weekNum) => {
    const start = getWeekStart(weekNum)
    const days = []
    for (let i = 0; i < 7; i++) {
      const d = new Date(start)
      d.setDate(d.getDate() + i)
      days.push(d)
    }
    return days
  }

  const weekDays = getDaysOfWeek(currentWeek)
  const isCurrentWeek = currentWeek === todayWeek
  const isPast = currentWeek < todayWeek

  return (
    <div className="mb-4 p-3 bg-boxing-dark rounded-xl">
      <div className="flex items-center justify-between mb-3">
        <button
          onClick={() => {
            if (currentWeek > 1) {
              onWeekChange(currentWeek - 1)
              onDayChange(0)
            }
          }}
          disabled={currentWeek <= 1}
          className="w-8 h-8 rounded-lg bg-boxing-ring flex items-center justify-center text-gray-400 disabled:opacity-25"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        
        <div className="text-center">
          <div className="text-base font-bold text-white">Week {currentWeek}</div>
          <div className="text-xs text-gray-500">
            {weekDays[0].toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - {weekDays[6].toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
          </div>
        </div>
        
        <button
          onClick={() => {
            if (currentWeek < 12) {
              onWeekChange(currentWeek + 1)
              onDayChange(0)
            }
          }}
          disabled={currentWeek >= 12}
          className="w-8 h-8 rounded-lg bg-boxing-ring flex items-center justify-center text-gray-400 disabled:opacity-25"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-3">
        {weekDays.map((day, idx) => {
          const isToday = day.toDateString() === today.toDateString()
          const dayIndex = (day.getDay() + 6) % 7
          return (
            <button
              key={idx}
              onClick={() => {
                onDayChange(dayIndex)
                const diffDays = Math.floor((day.getTime() - today.getTime()) / (86400000))
                const newWeek = todayWeek + Math.floor(diffDays / 7)
                onWeekChange(Math.max(1, Math.min(12, newWeek)))
                onClose()
              }}
              className={`flex flex-col items-center justify-center p-2 rounded-lg transition ${
                isToday 
                  ? 'bg-boxing-neon text-boxing-dark font-bold' 
                  : 'bg-boxing-ring text-gray-400 hover:bg-boxing-panel'
              }`}
            >
              <div className="text-[10px] opacity-70">
                {DAYS[dayIndex].slice(0, 1)}
              </div>
              <div className="text-sm">{day.getDate()}</div>
            </button>
          )
        })}
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => {
            onWeekChange(todayWeek)
            onDayChange(todayDay)
            onClose()
          }}
          className="flex-1 py-2 text-sm bg-boxing-neon text-boxing-dark font-medium rounded-lg hover:bg-boxing-neon/80 transition"
        >
          Jump to Today
        </button>
      </div>
    </div>
  )
}