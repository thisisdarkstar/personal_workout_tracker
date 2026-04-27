import { useState, useEffect, useRef } from 'react'
import { X, Play, Pause, RotateCcw, Timer } from 'lucide-react'

function parseDurationToSeconds(str) {
  if (!str) return null
  const min = str.match(/(\d+)\s*min/)
  const sec = str.match(/(\d+)\s*sec/)
  if (min) return parseInt(min[1]) * 60
  if (sec) return parseInt(sec[1])
  return null
}

function parseHIIT(str) {
  const m = str.match(/(\d+)\s*sec\s*work\s*\/\s*(\d+)\s*sec\s*rest/)
  if (m) return { work: parseInt(m[1]), rest: parseInt(m[2]) }
  return null
}

export default function WorkoutTimer({ exercise, onClose }) {
  const duration = parseDurationToSeconds(exercise.duration)
  const hiit = parseHIIT(exercise.duration || '')

  if (hiit) {
    return <HIITTimer hiit={hiit} onClose={onClose} />
  }

  return <CountdownTimer exercise={exercise} totalSeconds={duration || 60} onClose={onClose} />
}

function CountdownTimer({ exercise, totalSeconds, onClose }) {
  const [secondsLeft, setSecondsLeft] = useState(totalSeconds)
  const [running, setRunning] = useState(false)
  const [done, setDone] = useState(false)
  const intervalRef = useRef(null)

  useEffect(() => {
    if (running && secondsLeft > 0) {
      intervalRef.current = setInterval(() => {
        setSecondsLeft(s => {
          if (s <= 1) { setRunning(false); setDone(true); return 0 }
          return s - 1
        })
      }, 1000)
    } else {
      clearInterval(intervalRef.current)
    }
    return () => clearInterval(intervalRef.current)
  }, [running])

  const reset = () => { setSecondsLeft(totalSeconds); setRunning(false); setDone(false) }
  const mm = String(Math.floor(secondsLeft / 60)).padStart(2, '0')
  const ss = String(secondsLeft % 60).padStart(2, '0')
  const pct = ((totalSeconds - secondsLeft) / totalSeconds) * 100

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-boxing-panel w-full max-w-sm rounded-3xl p-6" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Timer className="w-5 h-5 text-blue-400" />
            <h3 className="text-white font-semibold text-sm truncate max-w-[200px]">{exercise.name}</h3>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-boxing-ring flex items-center justify-center text-gray-400">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="relative flex items-center justify-center mb-6">
          <svg className="w-40 h-40 -rotate-90" viewBox="0 0 120 120">
            <circle cx="60" cy="60" r="54" fill="none" stroke="#2a2a2a" strokeWidth="8" />
            <circle
              cx="60" cy="60" r="54" fill="none"
              stroke={done ? '#00ff88' : '#3b82f6'}
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 54}`}
              strokeDashoffset={`${2 * Math.PI * 54 * (1 - pct / 100)}`}
              className="transition-all duration-1000"
            />
          </svg>
          <div className="absolute text-center">
            <div className="text-4xl font-bold text-white tabular-nums">{mm}:{ss}</div>
            {done && <div className="text-boxing-neon text-sm font-bold">Done!</div>}
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={reset}
            className="w-14 h-14 rounded-full bg-boxing-ring flex items-center justify-center text-gray-400 hover:text-white transition"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
          <button
            onClick={() => setRunning(!running)}
            className={`flex-1 h-14 rounded-full flex items-center justify-center gap-2 font-bold transition ${
              running ? 'bg-red-500 text-white' : 'bg-blue-500 text-white'
            }`}
          >
            {running ? <><Pause className="w-5 h-5" /> Pause</> : <><Play className="w-5 h-5" /> Start</>}
          </button>
        </div>
      </div>
    </div>
  )
}

function HIITTimer({ hiit, onClose }) {
  const [phase, setPhase] = useState('work')
  const [secondsLeft, setSecondsLeft] = useState(hiit.work)
  const [running, setRunning] = useState(false)
  const intervalRef = useRef(null)

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setSecondsLeft(s => {
          if (s <= 1) {
            setPhase(p => {
              const next = p === 'work' ? 'rest' : 'work'
              setSecondsLeft(next === 'work' ? hiit.work : hiit.rest)
              return next
            })
            return phase === 'work' ? hiit.rest : hiit.work
          }
          return s - 1
        })
      }, 1000)
    } else {
      clearInterval(intervalRef.current)
    }
    return () => clearInterval(intervalRef.current)
  }, [running, phase])

  const total = phase === 'work' ? hiit.work : hiit.rest
  const pct = ((total - secondsLeft) / total) * 100
  const isWork = phase === 'work'
  const ss = String(secondsLeft % 60).padStart(2, '0')
  const mm = String(Math.floor(secondsLeft / 60)).padStart(2, '0')

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-boxing-panel w-full max-w-sm rounded-3xl p-6" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white font-semibold text-sm">HIIT Timer</h3>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-boxing-ring flex items-center justify-center text-gray-400">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div
          className={`text-center py-3 px-4 rounded-xl mb-4 font-bold text-lg transition ${
            isWork ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'
          }`}
        >
          {isWork ? '🥊 WORK' : '😮‍💨 REST'}
        </div>

        <div className="relative flex items-center justify-center mb-6">
          <svg className="w-40 h-40 -rotate-90" viewBox="0 0 120 120">
            <circle cx="60" cy="60" r="54" fill="none" stroke="#2a2a2a" strokeWidth="8" />
            <circle
              cx="60" cy="60" r="54" fill="none"
              stroke={isWork ? '#ef4444' : '#22c55e'}
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 54}`}
              strokeDashoffset={`${2 * Math.PI * 54 * (1 - pct / 100)}`}
              className="transition-all duration-1000"
            />
          </svg>
          <div className="absolute text-4xl font-bold text-white tabular-nums">{mm}:{ss}</div>
        </div>

        <button
          onClick={() => setRunning(!running)}
          className={`w-full h-14 rounded-full flex items-center justify-center gap-2 font-bold transition ${
            running ? 'bg-red-500 text-white' : 'bg-boxing-neon text-boxing-dark'
          }`}
        >
          {running ? <><Pause className="w-5 h-5" /> Pause</> : <><Play className="w-5 h-5" /> Start</>}
        </button>
      </div>
    </div>
  )
}
