export default function AnomalyAlerts({ alerts }) {
  if (alerts.length === 0) return null

  return (
    <div className="rounded-2xl border border-red-500/30 bg-red-500/5 p-5">
      <div className="flex items-center gap-2 mb-4">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
        </span>
        <p className="text-xs font-semibold uppercase tracking-widest text-red-400">Anomaly Alerts</p>
      </div>

      <div className="flex flex-col gap-2">
        {alerts.map((alert, i) => (
          <div
            key={i}
            className="flex items-start gap-3 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3"
          >
            <span className="text-lg mt-0.5">🚨</span>
            <div className="flex-1 min-w-0">
              <p className="text-red-200 text-sm font-medium">{alert.message}</p>
              <p className="text-red-500 text-xs mt-0.5">{new Date(alert.time).toLocaleTimeString()}</p>
            </div>
            <span className="text-xs text-red-500 border border-red-500/30 rounded-full px-2 py-0.5 shrink-0">
              Fraud Risk
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
