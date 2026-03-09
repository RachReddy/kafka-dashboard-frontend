import { useEffect, useRef } from 'react'
import * as signalR from '@microsoft/signalr'

const BACKEND_URL = (import.meta.env.VITE_BACKEND_URL ?? 'http://localhost:5218') + '/hub'

export function useSignalR(handlers) {
  const connectionRef = useRef(null)

  useEffect(() => {
    const connection = new signalR.HubConnectionBuilder()
      .withUrl(BACKEND_URL)
      .withAutomaticReconnect()
      .build()

    // Register all event handlers passed in
    Object.entries(handlers).forEach(([event, handler]) => {
      connection.on(event, handler)
    })

    connection.start().catch(err => console.error('SignalR connection error:', err))

    connectionRef.current = connection

    return () => { connection.stop() }
  }, [])

  return connectionRef
}
