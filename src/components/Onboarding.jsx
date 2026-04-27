import { useState } from 'react'
import { Calendar, Target, ChevronRight } from 'lucide-react'

export default function Onboarding({ onComplete }) {
  const today = new Date().toISOString().split('T')[0]
  const [startDate, setStartDate] = useState(today)
  const [goal, setGoal] = useState('')

  const handleStart = () => {
    onComplete(startDate, goal)
  }

  return (
    <div className="min-h-screen bg-boxing-dark flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">🥊</div>
          <h1 className="text-3xl font-bold text-white mb-1">12-Week Boxing Plan</h1>
          <p className="text-gray-400 text-sm">Build strength, improve technique, peak in 12 weeks.</p>
        </div>

        {/* Phase preview */}
        <div className="grid grid-cols-3 gap-2 mb-8">
          {[
            { name: 'Phase 1', focus: 'Foundation', color: '#00ff88', weeks: 'Wks 1–4' },
            { name: 'Phase 2', focus: 'Build',       color: '#ffaa00', weeks: 'Wks 5–8' },
            { name: 'Phase 3', focus: 'Peak',        color: '#ff3366', weeks: 'Wks 9–12' },
          ].map(p => (
            <div key={p.name} className="bg-boxing-panel rounded-xl p-3 text-center">
              <div className="w-2 h-2 rounded-full mx-auto mb-1" style={{ backgroundColor: p.color }} />
              <div className="text-white text-xs font-bold">{p.name}</div>
              <div className="text-gray-500 text-[10px]">{p.focus}</div>
              <div className="text-gray-600 text-[10px]">{p.weeks}</div>
            </div>
          ))}
        </div>

        {/* Start date */}
        <div className="bg-boxing-panel rounded-2xl p-4 mb-4">
          <div className="flex items-center gap-2 mb-3">
            <Calendar className="w-4 h-4 text-boxing-neon" />
            <span className="text-white font-semibold text-sm">When are you starting?</span>
          </div>
          <input
            type="date"
            value={startDate}
            onChange={e => setStartDate(e.target.value)}
            className="w-full bg-boxing-dark text-white px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-boxing-neon"
          />
          <p className="text-gray-500 text-xs mt-2">
            This sets your week/day tracking. You can start today or schedule ahead.
          </p>
        </div>

        {/* Goal */}
        <div className="bg-boxing-panel rounded-2xl p-4 mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Target className="w-4 h-4 text-boxing-accent" />
            <span className="text-white font-semibold text-sm">Your goal (optional)</span>
          </div>
          <input
            type="text"
            value={goal}
            onChange={e => setGoal(e.target.value)}
            placeholder="e.g. Lose 5kg, get match-fit, build a habit..."
            className="w-full bg-boxing-dark text-white placeholder-gray-500 px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-boxing-accent"
          />
        </div>

        <button
          onClick={handleStart}
          className="w-full py-4 bg-boxing-neon text-boxing-dark font-bold rounded-xl flex items-center justify-center gap-2 active:scale-[0.99] transition"
        >
          Start Training
          <ChevronRight className="w-5 h-5" />
        </button>

        <p className="text-center text-gray-600 text-xs mt-4">
          All data is saved locally on this device.
        </p>
      </div>
    </div>
  )
}
