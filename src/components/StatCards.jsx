export default function StatCards({ stats }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

      {/* Total Volume */}
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-blue-600/20 to-blue-900/10 p-6">
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full -translate-y-1/2 translate-x-1/2" />
        <p className="text-blue-400 text-xs font-semibold uppercase tracking-widest mb-2">Total Volume</p>
        <p className="text-3xl font-bold text-white">
          ${stats.totalAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </p>
        <p className="text-gray-500 text-sm mt-2">{stats.totalCount.toLocaleString()} transactions</p>
        <div className="mt-4 h-1 bg-white/5 rounded-full">
          <div className="h-1 bg-blue-500 rounded-full w-3/4" />
        </div>
      </div>

      {/* Success Rate */}
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-emerald-600/20 to-emerald-900/10 p-6">
        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full -translate-y-1/2 translate-x-1/2" />
        <p className="text-emerald-400 text-xs font-semibold uppercase tracking-widest mb-2">Success Rate</p>
        <p className="text-3xl font-bold text-white">{stats.successRate}%</p>
        <p className="text-gray-500 text-sm mt-2">of all transactions</p>
        <div className="mt-4 h-1 bg-white/5 rounded-full">
          <div
            className="h-1 bg-emerald-500 rounded-full transition-all duration-700"
            style={{ width: `${stats.successRate}%` }}
          />
        </div>
      </div>

      {/* Failures */}
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-red-600/20 to-red-900/10 p-6">
        <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-full -translate-y-1/2 translate-x-1/2" />
        <p className="text-red-400 text-xs font-semibold uppercase tracking-widest mb-2">Failures</p>
        <p className="text-3xl font-bold text-white">{stats.failureCount.toLocaleString()}</p>
        <p className="text-gray-500 text-sm mt-2">failed transactions</p>
        <div className="mt-4 h-1 bg-white/5 rounded-full">
          <div
            className="h-1 bg-red-500 rounded-full transition-all duration-700"
            style={{ width: stats.totalCount > 0 ? `${(stats.failureCount / stats.totalCount) * 100}%` : '0%' }}
          />
        </div>
      </div>

    </div>
  )
}
