import { FileText, ChevronRight } from 'lucide-react'
import { DAYS } from '../data/workoutPlan'

export default function NotesHistory({ dailyNotes, getNoteKey, currentWeek, currentDay, onSelectNote }) {
  const notes = []

  Object.keys(dailyNotes).forEach(key => {
    const [week, day] = key.split('-').map(Number)
    const note = dailyNotes[key]
    if (note && note.trim()) {
      notes.push({ week, day, note: note.trim(), key })
    }
  })

  notes.sort((a, b) => {
    if (a.week !== b.week) return b.week - a.week
    return b.day - a.day
  })

  if (notes.length === 0) {
    return (
      <div className="bg-boxing-panel rounded-2xl p-6 text-center">
        <FileText className="w-12 h-12 text-gray-600 mx-auto mb-3" />
        <p className="text-gray-500">No notes yet</p>
        <p className="text-gray-600 text-sm mt-1">Tap a day and add a note to see it here</p>
      </div>
    )
  }

  return (
    <div className="bg-boxing-panel rounded-2xl p-4 mb-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white font-semibold">All Notes ({notes.length})</h3>
      </div>

      <div className="space-y-2 max-h-80 overflow-y-auto">
        {notes.map(({ week, day, note, key }) => {
          const isCurrent = week === currentWeek && day === currentDay
          return (
            <button
              key={key}
              onClick={() => onSelectNote(week, day)}
              className={`w-full p-3 rounded-xl text-left transition active:scale-[0.99] ${
                isCurrent 
                  ? 'bg-boxing-neon/20 border border-boxing-neon/30' 
                  : 'bg-boxing-dark hover:bg-boxing-dark/80'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className={`text-sm font-medium ${isCurrent ? 'text-boxing-neon' : 'text-yellow-500'}`}>
                  Week {week} • {DAYS[day]}
                </span>
                <ChevronRight className="w-4 h-4 text-gray-600" />
              </div>
              <p className="text-gray-400 text-sm line-clamp-2">{note}</p>
            </button>
          )
        })}
      </div>
    </div>
  )
}