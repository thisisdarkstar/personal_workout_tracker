import { Minus, CheckCircle, Settings } from 'lucide-react'
import { useState } from 'react'

export default function WaterTracker({
  currentWeek, currentDay, waterData, addWater, removeWater,
  getWaterKey, waterTarget = 12, onTargetChange,
}) {
  const key = getWaterKey(currentWeek, currentDay)
  const currentGlasses = waterData[key] || 0
  const progress = Math.min(100, (currentGlasses / waterTarget) * 100)
  const totalMl = currentGlasses * 250
  const isGoalHit = currentGlasses >= waterTarget

  const [showSettings, setShowSettings] = useState(false)
  const [customTarget, setCustomTarget] = useState(waterTarget)

  const handleAdd = (amount) => {
    for (let i = 0; i < amount; i++) {
      if (currentGlasses + i < waterTarget) addWater(currentWeek, currentDay)
    }
  }

  const saveTarget = () => {
    if (onTargetChange) onTargetChange(customTarget)
    setShowSettings(false)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-gray-400 text-sm">{currentGlasses}/{waterTarget} glasses</span>
          {isGoalHit && <CheckCircle className="w-5 h-5 text-boxing-neon" />}
        </div>
        <button
          onClick={() => setShowSettings(!showSettings)}
          className="p-2 rounded-full bg-boxing-ring text-gray-400 hover:text-white transition"
        >
          <Settings className="w-4 h-4" />
        </button>
      </div>

      {showSettings && (
        <div className="bg-boxing-dark rounded-xl p-3 space-y-3">
          <div className="text-sm text-gray-400">Daily Target (glasses)</div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCustomTarget(Math.max(1, customTarget - 1))}
              className="w-10 h-10 rounded-full bg-boxing-ring text-white"
            >
              -
            </button>
            <input
              type="number"
              value={customTarget}
              onChange={(e) => setCustomTarget(Math.max(1, Math.min(20, parseInt(e.target.value) || 1)))}
              className="flex-1 bg-boxing-ring text-white text-center py-2 rounded-lg"
            />
            <button
              onClick={() => setCustomTarget(Math.min(20, customTarget + 1))}
              className="w-10 h-10 rounded-full bg-boxing-ring text-white"
            >
              +
            </button>
          </div>
          <button
            onClick={saveTarget}
            className="w-full py-2 bg-boxing-neon text-boxing-dark rounded-lg font-medium"
          >
            Save Target
          </button>
        </div>
      )}

      <div className="flex items-center justify-center gap-8 py-2">
        <div className="text-center">
          <div className="text-3xl font-bold text-white">{currentGlasses}</div>
          <div className="text-xs text-gray-500">glasses</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-400">{(totalMl / 1000).toFixed(1)}L</div>
          <div className="text-xs text-gray-500">of {(waterTarget * 0.25).toFixed(1)}L goal</div>
        </div>
      </div>

      <div className="w-full bg-boxing-ring rounded-full h-3">
        <div
          className={`h-3 rounded-full transition-all duration-300 ${isGoalHit ? 'bg-boxing-neon' : 'bg-blue-500'}`}
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="flex items-center justify-center gap-2 flex-wrap">
        <button
          onClick={() => removeWater(currentWeek, currentDay)}
          disabled={currentGlasses === 0}
          className="w-14 h-14 rounded-full bg-boxing-ring flex items-center justify-center text-gray-400 disabled:opacity-25 hover:bg-boxing-dark transition"
        >
          <Minus className="w-6 h-6" />
        </button>

        {[1, 2, 3, 4].map(i => (
          <button
            key={i}
            onClick={() => handleAdd(i)}
            disabled={currentGlasses >= waterTarget}
            className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold disabled:opacity-25 hover:bg-blue-500 transition"
          >
            +{i}
          </button>
        ))}
      </div>

      {isGoalHit && (
        <div className="text-center text-boxing-neon text-sm font-medium">
          Goal reached! Great hydration today!
        </div>
      )}
    </div>
  )
}
