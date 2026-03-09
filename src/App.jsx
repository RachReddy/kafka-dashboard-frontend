import { useState } from 'react'
import { useSignalR } from './hooks/useSignalR'
import StatCards from './components/StatCards'
import LiveFeed from './components/LiveFeed'
import AnomalyAlerts from './components/AnomalyAlerts'
import ActivityBar from './components/ActivityBar'

const MAX_FEED = 50
const BACKEND = import.meta.env.VITE_BACKEND_URL ?? 'http://localhost:5218'

export default function App() {
  const [transactions, setTransactions] = useState([])
  const [stats, setStats] = useState({ totalAmount: 0, totalCount: 0, successRate: 0, failureCount: 0 })
  const [alerts, setAlerts] = useState([])
  const [connected, setConnected] = useState(false)
  const [activity, setActivity] = useState([])
  const [running, setRunning] = useState(false)

  useSignalR({
    Connected: () => setConnected(true),
    NewTransaction: (tx) => {
      setTransactions(prev => [tx, ...prev].slice(0, MAX_FEED))
      setActivity(prev => [...prev, tx.status].slice(-30))
    },
    StatsUpdated: (s) => {
      setStats({
        totalAmount:  s.totalAmount,
        totalCount:   s.totalCount,
        successRate:  s.successRate,
        failureCount: s.failureCount,
      })
    },
    AnomalyDetected: (alert) => {
      setAlerts(prev => [alert, ...prev].slice(0, 5))
    }
  })

  async function toggleProducer() {
    const endpoint = running ? '/producer/stop' : '/producer/start'
    await fetch(`${BACKEND}${endpoint}`, { method: 'POST' })
    setRunning(prev => !prev)
  }

  return (
    <div className="min-h-screen bg-[#0f1117] text-white">

      {/* Header */}
      <div className="border-b border-white/10 bg-[#0f1117]/80 backdrop-blur sticky top-0 z-10">
        <div className="px-6 py-6 grid grid-cols-3 items-center">

          {/* Left — invisible mirror */}
          <div className="flex items-center gap-3 opacity-0 pointer-events-none">
            <div className="text-xs">000 events</div>
            <div className="px-3 py-1.5 text-xs">Live</div>
          </div>

          {/* Center — title + button together */}
          <div className="flex flex-col items-center gap-2">
            <h1 className="text-xl font-bold tracking-tight">Transaction Dashboard</h1>
            <button
              onClick={toggleProducer}
              className={`px-5 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                running
                  ? 'bg-red-500/10 border-red-500/30 text-red-400 hover:bg-red-500/20'
                  : 'bg-blue-500/10 border-blue-500/30 text-blue-400 hover:bg-blue-500/20 animate-pulse'
              }`}
            >
              {running ? '⏹ Stop simulation' : '▶ Click to start the board'}
            </button>
          </div>

          {/* Right — events count + live badge */}
          <div className="flex items-center gap-3 justify-end">
            {stats.totalCount > 0 && (
              <div className="text-xs text-gray-500">{stats.totalCount} events</div>
            )}
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border ${
              connected
                ? 'bg-green-500/10 border-green-500/30 text-green-400'
                : 'bg-red-500/10 border-red-500/30 text-red-400'
            }`}>
              <span className={`w-1.5 h-1.5 rounded-full ${connected ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`} />
              {connected ? 'Live' : 'Connecting...'}
            </div>
          </div>

        </div>
      </div>

      <div className="px-6 py-8 space-y-6">

        {/* Intro banner */}
        <div className="rounded-2xl border border-blue-500/20 bg-blue-500/5 px-6 py-5 flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="text-3xl">📡</div>
          <div>
            <p className="text-white font-semibold text-sm mb-1">What is this?</p>
            <p className="text-gray-400 text-sm leading-relaxed">
              A live view of payments as they happen. Every transaction flows through{' '}
              <span className="text-white font-medium">Apache Kafka</span> (used by Uber, Netflix and LinkedIn)
              and shows up here in real time. No refresh needed.
            </p>
          </div>
        </div>

        {/* How it works */}
        <p className="text-center text-sm font-semibold text-gray-400 uppercase tracking-widest">How it works</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 flex gap-4 items-start">
            <span className="text-2xl">1️⃣</span>
            <div>
              <p className="text-white text-sm font-semibold mb-1">Payment is made</p>
              <p className="text-gray-500 text-xs leading-relaxed">
                A payment is simulated every 2 seconds, just like a real user checking out.
              </p>
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 flex gap-4 items-start">
            <span className="text-2xl">2️⃣</span>
            <div>
              <p className="text-white text-sm font-semibold mb-1">Kafka picks it up</p>
              <p className="text-gray-500 text-xs leading-relaxed">
                Kafka instantly passes the payment to multiple services at once, with no data loss.
              </p>
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 flex gap-4 items-start">
            <span className="text-2xl">3️⃣</span>
            <div>
              <p className="text-white text-sm font-semibold mb-1">Dashboard updates</p>
              <p className="text-gray-500 text-xs leading-relaxed">
                Stats and alerts update live. Anything suspicious triggers an anomaly alert right away.
              </p>
            </div>
          </div>
        </div>

        {/* Stat Cards */}
        <StatCards stats={stats} />

        {/* Activity Bar */}
        <ActivityBar activity={activity} />

        {/* Anomaly Alerts */}
        <AnomalyAlerts alerts={alerts} />

        {/* Live Feed */}
        <LiveFeed transactions={transactions} />

        {/* Footer */}
        <p className="text-center text-gray-700 text-xs pb-4">
          Built with Apache Kafka · ASP.NET Core · SignalR · React
        </p>

      </div>
    </div>
  )
}
