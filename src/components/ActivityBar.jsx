// Shows last 30 transactions as coloured bars — green = success, red = failed
export default function ActivityBar({ activity }) {
  if (activity.length === 0) return null

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">
          Transaction Activity <span className="text-gray-600 normal-case font-normal">(last {activity.length})</span>
        </p>
        <div className="flex items-center gap-4 text-xs text-gray-500">
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-emerald-500 inline-block" /> Success</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-red-500 inline-block" /> Failed</span>
        </div>
      </div>
      <div className="flex items-end gap-1 h-10">
        {activity.map((status, i) => (
          <div
            key={i}
            title={status}
            className={`flex-1 rounded-sm transition-all duration-300 ${
              status === 'SUCCESS' ? 'bg-emerald-500/80 h-full' : 'bg-red-500/80 h-1/2'
            }`}
          />
        ))}
        {/* Fill remaining slots with empty bars */}
        {Array.from({ length: Math.max(0, 30 - activity.length) }).map((_, i) => (
          <div key={`empty-${i}`} className="flex-1 rounded-sm bg-white/5 h-full" />
        ))}
      </div>
    </div>
  )
}
