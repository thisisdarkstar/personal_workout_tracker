import { Dumbbell, Clock, CheckCircle2, Bed, Zap } from 'lucide-react'

export default function WorkoutChecklist({ workout, completed, onToggle, getWorkoutKey, currentWeek, currentDay }) {
  const isRestDay = workout.exercises.length <= 1
  const completedCount = workout.exercises.filter(e => completed[getWorkoutKey(currentWeek, currentDay, e.name)]).length
  const totalCount = workout.exercises.length
  const progress = totalCount > 0 ? (completedCount / totalCount) * 100 : 0
  const allDone = completedCount === totalCount && totalCount > 0

  const handleQuickComplete = () => {
    if (isRestDay && !allDone) {
      workout.exercises.forEach(exercise => {
        if (!completed[getWorkoutKey(currentWeek, currentDay, exercise.name)]) {
          onToggle(currentWeek, currentDay, exercise.name)
        }
      })
    }
  }

  return (
    <div className="bg-boxing-panel rounded-2xl p-4 mb-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          {isRestDay ? <Bed className="w-5 h-5 text-purple-500" /> : <Dumbbell className="w-5 h-5 text-boxing-neon" />}
          <h3 className="text-white font-semibold">{workout.title}</h3>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-gray-400 text-sm font-medium">{completedCount}/{totalCount}</span>
          <CheckCircle2 className={`w-5 h-5 ${allDone ? 'text-boxing-neon' : 'text-gray-600'}`} />
        </div>
      </div>

      <div className="w-full bg-boxing-ring rounded-full h-2 mb-4">
        <div 
          className="bg-boxing-neon h-2 rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      {isRestDay && !allDone && (
        <button
          onClick={handleQuickComplete}
          className="w-full mb-4 py-3 bg-purple-500/20 text-purple-400 rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-purple-500/30 transition"
        >
          <Zap className="w-4 h-4" />
          Mark Rest Day Complete
        </button>
      )}

      <div className="space-y-3">
        {workout.exercises.map((exercise, index) => {
          const key = getWorkoutKey(currentWeek, currentDay, exercise.name)
          const isCompleted = completed[key]

          return (
            <label
              key={index}
              className={`flex items-start gap-3 p-4 rounded-xl cursor-pointer transition active:scale-[0.99] ${
                isCompleted 
                  ? 'bg-boxing-neon/10 border border-boxing-neon/30' 
                  : 'bg-boxing-ring hover:bg-boxing-dark'
              }`}
            >
              <input
                type="checkbox"
                checked={!!isCompleted}
                onChange={() => onToggle(currentWeek, currentDay, exercise.name)}
                className="checkbox-neon mt-0.5"
              />
              <div className="flex-1 min-w-0">
                <div className={`font-semibold ${isCompleted ? 'text-boxing-neon line-through' : 'text-white'}`}>
                  {exercise.name}
                </div>
                <div className="text-gray-500 text-sm flex items-center gap-3 mt-1">
                  {exercise.sets && (
                    <span className="flex items-center gap-1">
                      <Dumbbell className="w-3.5 h-3.5" />
                      <span className="font-medium">{exercise.sets} × {exercise.reps}</span>
                    </span>
                  )}
                  {exercise.duration && (
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span className="font-medium">{exercise.duration}</span>
                    </span>
                  )}
                </div>
              </div>
            </label>
          )
        })}
      </div>
    </div>
  )
}