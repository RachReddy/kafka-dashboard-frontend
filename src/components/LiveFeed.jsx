export default function LiveFeed({ transactions }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden">

      {/* Table header */}
      <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">Live Transactions</p>
          {transactions.length > 0 && (
            <span className="text-xs bg-white/10 text-gray-400 rounded-full px-2 py-0.5">
              {transactions.length}
            </span>
          )}
        </div>
        <span className="text-xs text-gray-600">auto-updating</span>
      </div>

      {/* Column labels */}
      {transactions.length > 0 && (
        <div className="grid grid-cols-5 px-6 py-2 text-xs font-medium text-gray-600 uppercase tracking-wider border-b border-white/5">
          <span>Status</span>
          <span>User</span>
          <span>Merchant</span>
          <span>Region</span>
          <span className="text-right">Amount</span>
        </div>
      )}

      {/* Rows */}
      <div className="overflow-y-auto max-h-[460px] divide-y divide-white/5">

        {transactions.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 gap-3 text-gray-600">
            <span className="text-3xl">📡</span>
            <p className="text-sm">Waiting for transactions...</p>
          </div>
        )}

        {transactions.map((tx, i) => (
          <div
            key={tx.id}
            className={`grid grid-cols-5 items-center px-6 py-3.5 hover:bg-white/5 transition-colors text-sm
              ${i === 0 ? 'bg-white/5' : ''}`}
          >
            {/* Status badge */}
            <span className={`inline-flex items-center gap-1.5 w-fit px-2.5 py-1 rounded-full text-xs font-semibold ${
              tx.status === 'SUCCESS'
                ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20'
                : 'bg-red-500/15 text-red-400 border border-red-500/20'
            }`}>
              {tx.status === 'SUCCESS' ? '✓' : '✕'} {tx.status}
            </span>

            {/* User */}
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center text-xs font-bold shrink-0">
                {tx.user?.[0]?.toUpperCase()}
              </div>
              <span className="text-gray-300 font-medium">{tx.user}</span>
            </div>

            {/* Merchant */}
            <span className="text-gray-400">{tx.merchant}</span>

            {/* Region */}
            <span className="text-gray-500 text-xs font-mono bg-white/5 w-fit px-2 py-0.5 rounded">
              {tx.region}
            </span>

            {/* Amount */}
            <span className={`text-right font-semibold tabular-nums ${
              tx.status === 'SUCCESS' ? 'text-white' : 'text-red-400/70 line-through'
            }`}>
              ${tx.amount?.toFixed(2)}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
