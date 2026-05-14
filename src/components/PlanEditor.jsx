import { useState } from 'react'
import { X, Plus, Trash2, Save, RotateCcw, ChevronDown, ChevronUp, Edit2, Check, Layers, Target, UtensilsCrossed, Dumbbell } from 'lucide-react'
import { DEFAULT_PHASES, DEFAULT_DAY_TYPES, DEFAULT_SETTINGS, DEFAULT_DIET, DEFAULT_WORKOUT_PLANS } from '../data/defaults'

const PLAN_STORAGE_KEY = 'custom-workout-plan'
const SETTINGS_STORAGE_KEY = 'app-settings'

function loadData(key, fallback) {
  try {
    const s = localStorage.getItem(key)
    return s ? JSON.parse(s) : fallback
  } catch { return fallback }
}

function saveData(key, data) {
  localStorage.setItem(key, JSON.stringify(data))
}

function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj))
}

export default function PlanEditor({ onClose }) {
  const [activeTab, setActiveTab] = useState('workouts')
  const [plan, setPlan] = useState(() => loadData(PLAN_STORAGE_KEY, null) || { phases: DEFAULT_PHASES, dayTypes: DEFAULT_DAY_TYPES, workouts: DEFAULT_WORKOUT_PLANS, diet: DEFAULT_DIET })
  const [settings, setSettings] = useState(() => loadData(SETTINGS_STORAGE_KEY, DEFAULT_SETTINGS))
  const [hasChanges, setHasChanges] = useState(false)
  const [expandedPhases, setExpandedPhases] = useState({})
  const [expandedDayType, setExpandedDayType] = useState(null)
  const [editMode, setEditMode] = useState(null)

  const markChanged = () => setHasChanges(true)

  const handleSave = () => {
    saveData(PLAN_STORAGE_KEY, plan)
    saveData(SETTINGS_STORAGE_KEY, settings)
    setHasChanges(false)
    onClose()
  }

  const handleReset = () => {
    if (confirm('Reset everything to defaults? This cannot be undone.')) {
      setPlan({ phases: DEFAULT_PHASES, dayTypes: DEFAULT_DAY_TYPES, workouts: DEFAULT_WORKOUT_PLANS, diet: DEFAULT_DIET })
      setSettings(DEFAULT_SETTINGS)
      localStorage.removeItem(PLAN_STORAGE_KEY)
      localStorage.removeItem(SETTINGS_STORAGE_KEY)
      markChanged()
    }
  }

  return (
    <div className="fixed inset-0 bg-black/95 z-[100] flex flex-col">
      <div className="flex items-center justify-between p-4 bg-boxing-panel border-b border-boxing-ring">
        <div>
          <h2 className="text-white font-bold text-lg">Plan Editor</h2>
          <p className="text-gray-500 text-xs">Edit workouts, diet, phases & goals</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={handleReset} className="p-2 rounded-lg bg-boxing-ring text-gray-400 hover:text-red-400 transition" title="Reset to default">
            <RotateCcw className="w-5 h-5" />
          </button>
          <button onClick={onClose} className="p-2 rounded-lg bg-boxing-ring text-gray-400 hover:text-white transition">
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="flex border-b border-boxing-ring bg-boxing-panel">
        {[
          { id: 'workouts', icon: Dumbbell, label: 'Workouts' },
          { id: 'diet', icon: UtensilsCrossed, label: 'Diet' },
          { id: 'phases', icon: Layers, label: 'Phases' },
          { id: 'goals', icon: Target, label: 'Goals' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex items-center justify-center gap-1.5 py-3 text-xs font-medium transition ${
              activeTab === tab.id ? 'text-boxing-neon border-b-2 border-boxing-neon' : 'text-gray-500'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto">
        {activeTab === 'workouts' && (
          <WorkoutTab plan={plan} setPlan={setPlan} markChanged={markChanged} expandedPhases={expandedPhases} setExpandedPhases={setExpandedPhases} expandedDayType={expandedDayType} setExpandedDayType={setExpandedDayType} />
        )}
        {activeTab === 'diet' && (
          <DietTab plan={plan} setPlan={setPlan} markChanged={markChanged} />
        )}
        {activeTab === 'phases' && (
          <PhasesTab plan={plan} setPlan={setPlan} markChanged={markChanged} totalWeeks={settings.totalWeeks} />
        )}
        {activeTab === 'goals' && (
          <GoalsTab settings={settings} setSettings={setSettings} markChanged={markChanged} />
        )}
      </div>

      <div className="p-4 bg-boxing-panel border-t border-boxing-ring">
        <div className="flex gap-3">
          <button onClick={onClose} className="flex-1 py-3 bg-boxing-ring text-gray-400 rounded-xl font-medium">Cancel</button>
          <button
            onClick={handleSave}
            disabled={!hasChanges}
            className={`flex-1 py-3 rounded-xl font-medium flex items-center justify-center gap-2 transition ${
              hasChanges ? 'bg-boxing-neon text-boxing-dark' : 'bg-boxing-ring text-gray-600 cursor-not-allowed'
            }`}
          >
            <Save className="w-4 h-4" />
            Save All
          </button>
        </div>
      </div>
    </div>
  )
}

function WorkoutTab({ plan, setPlan, markChanged, expandedPhases, setExpandedPhases, expandedDayType, setExpandedDayType }) {
  const phases = Object.keys(plan.workouts || {}).map(Number).sort((a, b) => a - b)

  const togglePhase = (p) => setExpandedPhases(prev => ({ ...prev, [p]: !prev[p] }))

  const addExercise = (phase, dayType) => {
    setPlan(prev => {
      const next = deepClone(prev)
      next.workouts[phase][dayType].exercises.push({ name: '', sets: null, reps: '', duration: '' })
      return next
    })
    markChanged()
  }

  const removeExercise = (phase, dayType, idx) => {
    setPlan(prev => {
      const next = deepClone(prev)
      next.workouts[phase][dayType].exercises.splice(idx, 1)
      return next
    })
    markChanged()
  }

  const updateExercise = (phase, dayType, idx, field, value) => {
    setPlan(prev => {
      const next = deepClone(prev)
      const ex = next.workouts[phase][dayType].exercises[idx]
      if (field === 'isTimed') {
        if (value) {
          ex.duration = ex.duration || '30 sec'
          ex.reps = ''
          ex.sets = null
        } else {
          ex.reps = ex.reps || ''
          ex.sets = ex.sets || 3
          ex.duration = ''
        }
      } else {
        ex[field] = value
      }
      return next
    })
    markChanged()
  }

  const updateDayTitle = (phase, dayType, title) => {
    setPlan(prev => {
      const next = deepClone(prev)
      next.workouts[phase][dayType].title = title
      return next
    })
    markChanged()
  }

  return (
    <div className="p-4 space-y-3">
      {phases.map(phase => (
        <div key={phase} className="bg-boxing-panel rounded-2xl overflow-hidden">
          <button onClick={() => togglePhase(phase)} className="w-full flex items-center justify-between p-4 text-left">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: plan.phases[phase]?.color || '#fff' }} />
              <span className="text-white font-bold">{plan.phases[phase]?.name || `Phase ${phase}`}</span>
              <span className="text-gray-500 text-xs">({plan.phases[phase]?.weeks})</span>
            </div>
            {expandedPhases[phase] ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
          </button>

          {expandedPhases[phase] && (
            <div className="p-4 pt-0 space-y-2">
              {plan.dayTypes.map(dt => {
                const dayPlan = plan.workouts[phase]?.[dt.type]
                if (!dayPlan) return null
                return (
                  <div key={dt.type} className="bg-boxing-dark rounded-xl overflow-hidden">
                    <button
                      onClick={() => setExpandedDayType(expandedDayType === `${phase}-${dt.type}` ? null : `${phase}-${dt.type}`)}
                      className="w-full flex items-center justify-between p-3 text-left"
                    >
                      <div className="flex items-center gap-2">
                        <span>{dt.icon}</span>
                        <span className="text-white text-sm font-medium">{dt.label}</span>
                      </div>
                      {expandedDayType === `${phase}-${dt.type}` ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                    </button>

                    {expandedDayType === `${phase}-${dt.type}` && (
                      <div className="p-3 pt-0 space-y-3">
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-500">Title:</span>
                          <input
                            type="text"
                            value={dayPlan.title}
                            onChange={e => updateDayTitle(phase, dt.type, e.target.value)}
                            className="flex-1 px-3 py-1.5 bg-boxing-ring rounded-lg text-white text-sm"
                          />
                        </div>

                        <div className="flex flex-wrap gap-1.5">
                          {dayPlan.exercises.map((ex, idx) => {
                            const dashIdx = ex.name.indexOf(' - ')
                            const exTitle = dashIdx >= 0 ? ex.name.slice(0, dashIdx) : ex.name
                            const exDetail = dashIdx >= 0 ? ex.name.slice(dashIdx + 3) : ''
                            const buildName = (t, d) => d.trim() ? `${t} - ${d}` : t
                            return (
                            <div key={idx} className="w-full flex items-center gap-2 bg-boxing-ring rounded-lg p-2">
                              <div className="flex-1 min-w-0 space-y-1.5">
                                <input
                                  type="text"
                                  value={exTitle}
                                  onChange={e => updateExercise(phase, dt.type, idx, 'name', buildName(e.target.value, exDetail))}
                                  placeholder="Exercise name"
                                  className="w-full px-2 py-1 bg-boxing-dark rounded text-white text-sm placeholder-gray-600"
                                />
                                <input
                                  type="text"
                                  value={exDetail}
                                  onChange={e => updateExercise(phase, dt.type, idx, 'name', buildName(exTitle, e.target.value))}
                                  placeholder="Detail / instructions (optional)"
                                  className="w-full px-2 py-0.5 bg-boxing-dark rounded text-gray-400 text-xs placeholder-gray-600"
                                />
                                <div className="flex gap-2 items-center">
                                  <label className="flex items-center gap-1 text-xs text-gray-500">
                                    <input
                                      type="checkbox"
                                      checked={ex.sets != null}
                                      onChange={e => updateExercise(phase, dt.type, idx, 'isTimed', !e.target.checked)}
                                      className="w-3 h-3"
                                    />
                                    Sets
                                    <input type="number" value={ex.sets || ''} onChange={e => updateExercise(phase, dt.type, idx, 'sets', e.target.value ? parseInt(e.target.value) : null)} disabled={!ex.sets} placeholder="3" className="w-12 px-1.5 py-0.5 bg-boxing-dark rounded text-white text-xs text-center" />
                                  </label>
                                  {ex.sets != null && <input type="text" value={ex.reps} onChange={e => updateExercise(phase, dt.type, idx, 'reps', e.target.value)} placeholder="reps" className="flex-1 px-2 py-0.5 bg-boxing-dark rounded text-white text-xs" />}
                                  {ex.sets == null && <input type="text" value={ex.duration || ''} onChange={e => updateExercise(phase, dt.type, idx, 'duration', e.target.value)} placeholder="duration" className="flex-1 px-2 py-0.5 bg-boxing-dark rounded text-white text-xs" />}
                                </div>
                              </div>
                              <button onClick={() => removeExercise(phase, dt.type, idx)} className="p-1.5 text-red-400/60 hover:text-red-400 shrink-0">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                            )
                          })}
                        </div>

                        <button onClick={() => addExercise(phase, dt.type)} className="w-full py-2 border border-dashed border-gray-700 rounded-lg text-gray-500 text-xs hover:text-green-400 hover:border-green-400 transition flex items-center justify-center gap-1">
                          <Plus className="w-3.5 h-3.5" /> Add Exercise
                        </button>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

function DietTab({ plan, setPlan, markChanged }) {
  const { diet } = plan

  const updateMealItem = (dayType, mealId, itemIdx, value) => {
    setPlan(prev => {
      const next = deepClone(prev)
      const meal = next.diet[dayType].meals.find(m => m.id === mealId)
      if (meal) meal.items[itemIdx] = value
      return next
    })
    markChanged()
  }

  const addMealItem = (dayType, mealId) => {
    setPlan(prev => {
      const next = deepClone(prev)
      const meal = next.diet[dayType].meals.find(m => m.id === mealId)
      if (meal) meal.items.push('')
      return next
    })
    markChanged()
  }

  const removeMealItem = (dayType, mealId, idx) => {
    setPlan(prev => {
      const next = deepClone(prev)
      const meal = next.diet[dayType].meals.find(m => m.id === mealId)
      if (meal) meal.items.splice(idx, 1)
      return next
    })
    markChanged()
  }

  const updateTarget = (dayType, key, subKey, value) => {
    setPlan(prev => {
      const next = deepClone(prev)
      if (!next.diet[dayType].targets[key]) next.diet[dayType].targets[key] = {}
      next.diet[dayType].targets[key][subKey] = value
      return next
    })
    markChanged()
  }

  return (
    <div className="p-4 space-y-4">
      {['training', 'rest'].map(dt => (
        <div key={dt} className="bg-boxing-panel rounded-2xl overflow-hidden">
          <div className="p-4 border-b border-boxing-ring">
            <span className="text-boxing-neon font-semibold">{diet[dt]?.label || dt}</span>
          </div>

          <div className="p-4 space-y-4">
            {diet[dt]?.meals.map(meal => (
              <div key={meal.id} className="bg-boxing-dark rounded-xl p-3">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-white text-sm font-medium flex items-center gap-2">
                    <span>{meal.icon}</span>
                    {meal.label}
                  </span>
                </div>
                <div className="space-y-1.5">
                  {meal.items.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={item}
                        onChange={e => updateMealItem(dt, meal.id, idx, e.target.value)}
                        className="flex-1 px-3 py-2 bg-boxing-ring rounded-lg text-white text-sm placeholder-gray-600"
                        placeholder="Add item..."
                      />
                      <button onClick={() => removeMealItem(dt, meal.id, idx)} className="p-1.5 text-red-400/60 hover:text-red-400 shrink-0">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  <button onClick={() => addMealItem(dt, meal.id)} className="w-full py-1.5 border border-dashed border-gray-700 rounded-lg text-gray-500 text-xs hover:text-green-400 hover:border-green-400 transition flex items-center justify-center gap-1">
                    <Plus className="w-3.5 h-3.5" /> Add Item
                  </button>
                </div>
              </div>
            ))}

            <div className="bg-boxing-dark rounded-xl p-3">
              <div className="text-gray-400 text-xs font-medium mb-3">Daily Targets</div>
              <div className="grid grid-cols-2 gap-3">
                {Object.entries(diet[dt]?.targets || {}).map(([key, val]) => (
                  <div key={key} className="space-y-1">
                    <label className="text-gray-500 text-xs capitalize">{key}</label>
                    <div className="flex items-center gap-1">
                      <input type="number" value={val.min || ''} onChange={e => updateTarget(dt, key, 'min', parseFloat(e.target.value) || 0)} placeholder="min" className="w-full px-2 py-1.5 bg-boxing-ring rounded text-white text-sm" />
                      <span className="text-gray-500 text-xs">-</span>
                      <input type="number" value={val.max || ''} onChange={e => updateTarget(dt, key, 'max', parseFloat(e.target.value) || 0)} placeholder="max" className="w-full px-2 py-1.5 bg-boxing-ring rounded text-white text-sm" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

function PhasesTab({ plan, setPlan, markChanged, totalWeeks }) {
  const phases = Object.entries(plan.phases || {})

  const updatePhase = (num, field, value) => {
    setPlan(prev => {
      const next = deepClone(prev)
      if (!next.phases[num]) next.phases[num] = {}
      next.phases[num][field] = value
      return next
    })
    markChanged()
  }

  return (
    <div className="p-4 space-y-3">
      <div className="bg-boxing-panel rounded-2xl p-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-gray-400 text-xs">Total Program Duration</span>
          <span className="text-boxing-neon font-bold">{totalWeeks} weeks</span>
        </div>
      </div>

      {phases.map(([num, ph]) => (
        <div key={num} className="bg-boxing-panel rounded-2xl p-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-4 h-4 rounded-full" style={{ backgroundColor: ph.color || '#fff' }} />
            <input
              type="text"
              value={ph.name}
              onChange={e => updatePhase(Number(num), 'name', e.target.value)}
              className="flex-1 px-3 py-2 bg-boxing-dark rounded-lg text-white font-bold text-sm"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-gray-500 text-xs">Weeks</label>
              <input type="text" value={ph.weeks} onChange={e => updatePhase(Number(num), 'weeks', e.target.value)} className="w-full px-3 py-2 bg-boxing-dark rounded-lg text-white text-sm" />
            </div>
            <div className="space-y-1">
              <label className="text-gray-500 text-xs">Focus</label>
              <input type="text" value={ph.focus} onChange={e => updatePhase(Number(num), 'focus', e.target.value)} className="w-full px-3 py-2 bg-boxing-dark rounded-lg text-white text-sm" />
            </div>
            <div className="space-y-1">
              <label className="text-gray-500 text-xs">Color</label>
              <input type="color" value={ph.color} onChange={e => updatePhase(Number(num), 'color', e.target.value)} className="w-full h-10 bg-boxing-dark rounded-lg cursor-pointer" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

function GoalsTab({ settings, setSettings, markChanged }) {
  const updateGoal = (key, value) => {
    setSettings(prev => ({ ...prev, goals: { ...prev.goals, [key]: value } }))
    markChanged()
  }

  const updateSetting = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }))
    markChanged()
  }

  return (
    <div className="p-4 space-y-4">
      <div className="bg-boxing-panel rounded-2xl p-4">
        <h3 className="text-white font-semibold mb-4">Daily Targets</h3>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="text-gray-500 text-xs">Total Weeks</label>
            <input type="number" value={settings.totalWeeks} onChange={e => updateSetting('totalWeeks', parseInt(e.target.value) || 16)} className="w-full px-3 py-2 bg-boxing-dark rounded-lg text-white text-sm" />
          </div>
          <div className="space-y-1">
            <label className="text-gray-500 text-xs">Water Glasses</label>
            <input type="number" value={settings.waterTarget} onChange={e => updateSetting('waterTarget', parseInt(e.target.value) || 12)} className="w-full px-3 py-2 bg-boxing-dark rounded-lg text-white text-sm" />
          </div>
        </div>
      </div>

      <div className="bg-boxing-panel rounded-2xl p-4">
        <h3 className="text-white font-semibold mb-4">Personal Goals</h3>
        <div className="space-y-3">
          {['weight', 'bodyfat', 'endurance', 'strength'].map(key => (
            <div key={key} className="space-y-1">
              <label className="text-gray-500 text-xs capitalize">{key}</label>
              <input type="text" value={settings.goals[key] || ''} onChange={e => updateGoal(key, e.target.value)} placeholder={`e.g. ${key === 'weight' ? '70kg' : key === 'bodyfat' ? '12%' : 'Improve ' + key}`} className="w-full px-3 py-2 bg-boxing-dark rounded-lg text-white text-sm placeholder-gray-600" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function getCustomPlan() {
  return loadData(PLAN_STORAGE_KEY, null)
}

export function getSettings() {
  return loadData(SETTINGS_STORAGE_KEY, DEFAULT_SETTINGS)
}