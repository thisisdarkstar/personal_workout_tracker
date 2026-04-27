import { useState } from 'react'
import { Star, CheckCircle } from 'lucide-react'

export default function WeeklyReview({ week, reviews, onSave }) {
  const existing = reviews[week]
  const [rating, setRating] = useState(existing?.rating || 0)
  const [reflection, setReflection] = useState(existing?.reflection || '')
  const [submitted, setSubmitted] = useState(!!existing)
  const [editing, setEditing] = useState(false)

  const handleSave = () => {
    if (rating === 0) return
    onSave(week, rating, reflection)
    setSubmitted(true)
    setEditing(false)
  }

  if (submitted && !editing) {
    return (
      <div className="bg-boxing-panel rounded-2xl p-4 mb-4 border border-boxing-neon/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-boxing-neon" />
            <span className="text-white font-semibold">Week {week} Review</span>
          </div>
          <button onClick={() => setEditing(true)} className="text-xs text-gray-400 hover:text-white">
            Edit
          </button>
        </div>
        <div className="flex gap-1 mt-2 mb-1">
          {[1, 2, 3, 4, 5].map(i => (
            <Star
              key={i}
              className={`w-5 h-5 ${i <= existing.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}`}
            />
          ))}
        </div>
        {existing.reflection && (
          <p className="text-gray-400 text-sm italic">"{existing.reflection}"</p>
        )}
      </div>
    )
  }

  return (
    <div className="bg-boxing-panel rounded-2xl p-4 mb-4 border border-yellow-500/30">
      <div className="flex items-center gap-2 mb-3">
        <Star className="w-5 h-5 text-yellow-400" />
        <span className="text-white font-semibold">Week {week} Review</span>
        <span className="text-xs text-gray-500 ml-auto">Sunday check-in</span>
      </div>

      <p className="text-gray-400 text-sm mb-3">How did this week go overall?</p>

      <div className="flex gap-2 mb-4">
        {[1, 2, 3, 4, 5].map(i => (
          <button
            key={i}
            onClick={() => setRating(i)}
            className="flex-1 py-3 rounded-xl transition active:scale-95"
            style={{
              background: i <= rating ? '#facc15' : '#2a2a2a',
              color: i <= rating ? '#0a0a0a' : '#666',
            }}
          >
            <div className="text-center">
              <div className="text-lg">{['😔', '😐', '🙂', '💪', '🔥'][i - 1]}</div>
              <div className="text-xs font-bold">{i}</div>
            </div>
          </button>
        ))}
      </div>

      <textarea
        value={reflection}
        onChange={e => setReflection(e.target.value)}
        placeholder="Any highlights, struggles, or notes for next week..."
        className="w-full h-20 px-3 py-2 bg-boxing-dark rounded-xl text-white text-sm placeholder-gray-500 resize-none focus:outline-none focus:ring-1 focus:ring-yellow-400 mb-3"
      />

      <button
        onClick={handleSave}
        disabled={rating === 0}
        className="w-full py-3 bg-yellow-500 text-boxing-dark font-bold rounded-xl disabled:opacity-40 transition active:scale-[0.99]"
      >
        Save Week {week} Review
      </button>
    </div>
  )
}
