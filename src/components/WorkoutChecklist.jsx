import { Dumbbell, Clock, CheckCircle2, Bed, Zap, Timer, PenLine } from 'lucide-react'
import { useState } from 'react'
import WorkoutTimer from './WorkoutTimer'

export default function WorkoutChecklist({
  workout, completed, onToggle, getWorkoutKey,
  currentWeek, currentDay,
  exerciseLogs = {}, onLogExercise, getLogKey,
}) {
  const isRestDay = workout.exercises.length <= 1 && workout.exercises[0]?.name === 'Rest & Recovery'
  const completedCount = workout.exercises.filter(e => completed[getWorkoutKey(currentWeek, currentDay, e.name)]).length
  const totalCount = workout.exercises.length
  const progress = totalCount > 0 ? (completedCount / totalCount) * 100 : 0
  const allDone = completedCount === totalCount && totalCount > 0

  const [timerExercise, setTimerExercise] = useState(null)
  const [expandedLog, setExpandedLog] = useState(null)

  const handleQuickComplete = () => {
    workout.exercises.forEach(exercise => {
      if (!completed[getWorkoutKey(currentWeek, currentDay, exercise.name)]) {
        onToggle(currentWeek, currentDay, exercise.name)
      }
    })
  }

  return (
    <div className="bg-boxing-panel rounded-2xl p-4 mb-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          {isRestDay ? <Bed className="w-5 h-5 text-purple-500" /> : <Dumbbell className="w-5 h-5 text-boxing-neon" />}
          <div>
            <h3 className="text-white font-semibold">{workout.title}</h3>
            {workout.weekInPhase && !isRestDay && (
              <p className="text-gray-500 text-xs">Week {workout.weekInPhase} of Phase</p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-gray-400 text-sm font-medium">{completedCount}/{totalCount}</span>
          <CheckCircle2 className={`w-5 h-5 ${allDone ? 'text-boxing-neon' : 'text-gray-600'}`} />
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-boxing-ring rounded-full h-2 mb-4">
        <div
          className="bg-boxing-neon h-2 rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Completion celebration */}
      {allDone && !isRestDay && (
        <div className="mb-4 p-3 bg-boxing-neon/10 border border-boxing-neon/30 rounded-xl text-center">
          <div className="text-boxing-neon font-bold">Session Complete!</div>
          <div className="text-gray-400 text-xs mt-0.5">Great work — rest up and recover.</div>
        </div>
      )}

      {/* Rest day quick-complete */}
      {isRestDay && !allDone && (
        <button
          onClick={handleQuickComplete}
          className="w-full mb-4 py-3 bg-purple-500/20 text-purple-400 rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-purple-500/30 transition"
        >
          <Zap className="w-4 h-4" />
          Mark Rest Day Complete
        </button>
      )}

      {/* Exercise list */}
      <div className="space-y-2">
        {workout.exercises.map((exercise, index) => {
          const key = getWorkoutKey(currentWeek, currentDay, exercise.name)
          const isCompleted = completed[key]
          const logKey = getLogKey ? getLogKey(currentWeek, currentDay, exercise.name) : null
          const existingLog = logKey && exerciseLogs[logKey]
          const isLogOpen = expandedLog === exercise.name
          const hasDuration = !!exercise.duration

          return (
            <div key={index}>
              <div
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
                <div
                  className="flex-1 min-w-0"
                  onClick={() => onToggle(currentWeek, currentDay, exercise.name)}
                >
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
                  {existingLog && (
                    <div className="mt-1 text-xs text-yellow-400 italic truncate">
                      "{existingLog.note}"
                    </div>
                  )}
                </div>

                {/* Action buttons */}
                <div className="flex gap-1 ml-1 shrink-0">
                  {hasDuration && (
                    <button
                      onClick={(e) => { e.stopPropagation(); setTimerExercise(exercise) }}
                      className="w-8 h-8 rounded-lg bg-boxing-dark/60 flex items-center justify-center text-gray-400 hover:text-blue-400 transition"
                      title="Start timer"
                    >
                      <Timer className="w-4 h-4" />
                    </button>
                  )}
                  {onLogExercise && (
                    <button
                      onClick={(e) => { e.stopPropagation(); setExpandedLog(isLogOpen ? null : exercise.name) }}
                      className={`w-8 h-8 rounded-lg bg-boxing-dark/60 flex items-center justify-center transition ${
                        existingLog ? 'text-yellow-400' : 'text-gray-400 hover:text-yellow-400'
                      }`}
                      title="Log performance"
                    >
                      <PenLine className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* Inline performance log */}
              {isLogOpen && onLogExercise && (
                <ExerciseLog
                  exerciseName={exercise.name}
                  existingNote={existingLog?.note || ''}
                  onSave={(note) => {
                    onLogExercise(currentWeek, currentDay, exercise.name, note)
                    setExpandedLog(null)
                  }}
                  onCancel={() => setExpandedLog(null)}
                />
              )}
            </div>
          )
        })}
      </div>

      {/* Timer modal */}
      {timerExercise && (
        <WorkoutTimer
          exercise={timerExercise}
          onClose={() => setTimerExercise(null)}
        />
      )}
    </div>
  )
}

function ExerciseLog({ exerciseName, existingNote, onSave, onCancel }) {
  const [note, setNote] = useState(existingNote)

  return (
    <div className="mx-1 mb-2 p-3 bg-boxing-dark rounded-b-xl border-t border-boxing-ring space-y-2">
      <div className="text-xs text-gray-500">Performance log for {exerciseName}</div>
      <textarea
        value={note}
        onChange={e => setNote(e.target.value)}
        placeholder="e.g. Did 18 reps, felt strong / struggled with form on last set"
        className="w-full h-16 px-3 py-2 bg-boxing-ring rounded-xl text-white text-sm placeholder-gray-500 resize-none focus:outline-none focus:ring-1 focus:ring-yellow-400"
        autoFocus
      />
      <div className="flex gap-2">
        <button onClick={onCancel} className="flex-1 py-2 bg-boxing-ring text-gray-400 rounded-lg text-sm">
          Cancel
        </button>
        <button
          onClick={() => onSave(note)}
          className="flex-1 py-2 bg-yellow-500 text-boxing-dark rounded-lg text-sm font-medium"
        >
          Save Log
        </button>
      </div>
    </div>
  )
}
