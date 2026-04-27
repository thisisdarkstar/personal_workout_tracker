import { FileText, Save } from 'lucide-react'
import { useState } from 'react'

export default function DailyNotes({ currentWeek, currentDay, notes, saveNote, getNoteKey }) {
  const key = getNoteKey(currentWeek, currentDay)
  const existingNote = notes[key] || ''
  const [note, setNote] = useState(existingNote)
  const [isEditing, setIsEditing] = useState(false)

  const handleSave = () => {
    saveNote(currentWeek, currentDay, note)
    setIsEditing(false)
  }

  return (
    <div className="bg-boxing-panel rounded-2xl p-4 mb-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-yellow-500" />
          <h3 className="text-white font-semibold">Daily Notes</h3>
        </div>
        {existingNote && !isEditing && (
          <button onClick={() => setIsEditing(true)} className="text-xs text-gray-400 hover:text-white">
            Edit
          </button>
        )}
      </div>

      {isEditing ? (
        <div className="space-y-3">
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Quick note: cheat meal, missed workout, feeling tired, PR achieved..."
            className="w-full h-24 px-3 py-2 bg-boxing-dark rounded-xl text-white text-sm placeholder-gray-500 resize-none focus:outline-none focus:ring-1 focus:ring-boxing-neon"
            autoFocus
          />
          <div className="flex gap-2">
            <button
              onClick={() => { setNote(existingNote); setIsEditing(false) }}
              className="flex-1 py-2 bg-boxing-ring text-gray-400 rounded-lg text-sm font-medium"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex-1 py-2 bg-boxing-neon text-boxing-dark rounded-lg text-sm font-medium flex items-center justify-center gap-1"
            >
              <Save className="w-4 h-4" />
              Save
            </button>
          </div>
        </div>
      ) : existingNote ? (
        <div
          onClick={() => setIsEditing(true)}
          className="p-3 bg-boxing-dark rounded-xl cursor-pointer hover:bg-boxing-dark/80 transition"
        >
          <p className="text-gray-300 text-sm whitespace-pre-wrap">{existingNote}</p>
        </div>
      ) : (
        <button
          onClick={() => setIsEditing(true)}
          className="w-full p-4 bg-boxing-dark rounded-xl text-gray-500 text-sm text-left hover:bg-boxing-dark/80 transition"
        >
          + Add a note (cheat day, missed exercise, progress...)
        </button>
      )}
    </div>
  )
}
