"use client"

import { useSignalStore } from "@/lib/store"
import { getSignalStats } from "@/lib/mock-data"
import { Card } from "@/components/ui/card"

export default function SignalStats() {
  const { signals } = useSignalStore()
  const stats = getSignalStats(signals)

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {/* Total Signals Card */}
      <Card className="p-4 border border-gray-200 rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
        <div className="space-y-1">
          <div className="text-sm text-gray-500">Total Signals</div>
          <div className="text-2xl font-semibold">{stats.total}</div>
          <div className="text-xs text-gray-500">Updated 5 minutes ago</div>
        </div>
      </Card>

      {/* High Confidence Card */}
      <Card className="p-4 border border-gray-200 rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
        <div className="space-y-1">
          <div className="text-sm text-gray-500">High Confidence</div>
          <div className="text-2xl font-semibold">{stats.highConfidence}</div>
          <div className="text-xs text-gray-500">Updated 5 minutes ago</div>
        </div>
      </Card>

      {/* Emerging Trends Card */}
      <Card className="p-4 border border-gray-200 rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
        <div className="space-y-1">
          <div className="text-sm text-gray-500">Emerging Trends</div>
          <div className="text-2xl font-semibold">{stats.emerging}</div>
          <div className="text-xs text-gray-500">Updated 5 minutes ago</div>
        </div>
      </Card>

      {/* Risky Signals Card */}
      <Card className="p-4 border border-gray-200 rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
        <div className="space-y-1">
          <div className="text-sm text-gray-500">Risky Signals</div>
          <div className="text-2xl font-semibold">{stats.risky}</div>
          <div className="text-xs text-gray-500">Updated 5 minutes ago</div>
        </div>
      </Card>
    </div>
  )
}
