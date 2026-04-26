import { Utensils, CheckCircle2, Wheat, Flame, Droplets, Moon, Apple } from 'lucide-react'
import { DIET_PLANS } from '../data/workoutPlan'

export default function DietChecklist({ currentWeek, currentDay, completed, onToggle, getMealKey }) {
  const { meals, targets } = DIET_PLANS

  return (
    <div className="bg-boxing-panel rounded-2xl p-4 mb-4">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <Utensils className="w-5 h-5 text-boxing-accent" />
          <h3 className="text-white font-semibold">Diet Plan</h3>
        </div>
        <span className="text-gray-500 text-sm">Daily</span>
      </div>

      <div className="space-y-5">
        {meals.map((meal) => {
          const completedItems = meal.items.filter(item => 
            completed[getMealKey(currentWeek, currentDay, meal.id, item)]
          ).length
          const isFullyCompleted = completedItems === meal.items.length

          return (
            <div key={meal.id} className="space-y-2.5">
              <div className="flex items-center gap-2">
                <span className="text-xl">{meal.icon}</span>
                <span className={`font-semibold ${isFullyCompleted ? 'text-boxing-accent' : 'text-white'}`}>
                  {meal.label}
                </span>
                {isFullyCompleted && (
                  <CheckCircle2 className="w-4 h-4 text-boxing-accent" />
                )}
              </div>
              <div className="ml-7 space-y-2">
                {meal.items.map((item) => {
                  const key = getMealKey(currentWeek, currentDay, meal.id, item)
                  const isCompleted = completed[key]

                  return (
                    <label
                      key={item}
                      className="flex items-center gap-3 cursor-pointer group py-2 px-3 rounded-lg hover:bg-boxing-ring/50 transition"
                    >
                      <input
                        type="checkbox"
                        checked={!!isCompleted}
                        onChange={() => onToggle(currentWeek, currentDay, meal.id, item)}
                        className="checkbox-neon accent-checkbox"
                      />
                      <span className={`text-sm font-medium ${isCompleted ? 'text-boxing-accent line-through' : 'text-gray-400 group-hover:text-gray-300'}`}>
                        {item}
                      </span>
                    </label>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>

      <div className="mt-6 pt-5 border-t border-boxing-ring">
        <div className="flex items-center gap-2 mb-4">
          <Apple className="w-4 h-4 text-green-500" />
          <span className="text-white font-semibold text-sm">Daily Targets</span>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-boxing-ring rounded-xl p-3 flex items-center gap-3">
            <Flame className="w-5 h-5 text-orange-500" />
            <div>
              <div className="text-gray-500 text-xs">Calories</div>
              <div className="text-white text-base font-bold">{targets.calories.min}-{targets.calories.max}</div>
            </div>
          </div>
          <div className="bg-boxing-ring rounded-xl p-3 flex items-center gap-3">
            <Apple className="w-5 h-5 text-green-500" />
            <div>
              <div className="text-gray-500 text-xs">Protein</div>
              <div className="text-white text-base font-bold">{targets.protein.min}-{targets.protein.max}g</div>
            </div>
          </div>
          <div className="bg-boxing-ring rounded-xl p-3 flex items-center gap-3">
            <Droplets className="w-5 h-5 text-blue-500" />
            <div>
              <div className="text-gray-500 text-xs">Water</div>
              <div className="text-white text-base font-bold">{targets.water.min}-{targets.water.max}L</div>
            </div>
          </div>
          <div className="bg-boxing-ring rounded-xl p-3 flex items-center gap-3">
            <Moon className="w-5 h-5 text-purple-500" />
            <div>
              <div className="text-gray-500 text-xs">Sleep</div>
              <div className="text-white text-base font-bold">{targets.sleep.min}+ hrs</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}