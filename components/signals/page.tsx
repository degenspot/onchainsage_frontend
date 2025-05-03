"use client"

import { useEffect } from "react"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import SignalFilters from "./signal-filters"
import SignalStats from "@/components/signals/signal-stats"
import HighConfidenceSignals from "@/components/signals/high-confidence-signals"
import AllTradingSignals from "@/components/signals/all-trading-signals"
import { mockWebSocketService } from "@/lib/mock-websocket"
import { useSignalStore } from "@/lib/store"
import { Card } from "@/components/ui/card"

export default function () {
  const { isLoading } = useSignalStore()

  useEffect(() => {
    // Connect to mock WebSocket service when component mounts
    mockWebSocketService.connect()

    // Disconnect when component unmounts
    return () => {
      mockWebSocketService.disconnect()
    }
  }, [])

  return (
    <div className="min-h-screen bg-white text-black p-6">
      <Tabs defaultValue="signals" className="space-y-6">
        <TabsContent value="signals" className="space-y-6 mt-0">
          <SignalFilters />
          <SignalStats />
          <div className="grid grid-cols-1 gap-6">
            <Card className="p-6 border border-gray-200 rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
              <div className="flex flex-col gap-4">
                <div>
                  <h2 className="text-xl font-medium">Recent High Confidence Signals</h2>
                  <p className="text-sm text-gray-400">Latest trading opportunities with high confidence scores</p>
                </div>
                <HighConfidenceSignals />
              </div>
            </Card>
            <AllTradingSignals />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
