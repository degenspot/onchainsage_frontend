"use client"

import { ChevronDown, RefreshCw, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useSignalStore, type ConfidenceLevel, type TimeRange } from "@/lib/store"
import { Card } from "@/components/ui/card"

export default function SignalFilters() {
  const {
    confidenceLevel,
    timeRange,
    searchQuery,
    setConfidenceLevel,
    setTimeRange,
    setSearchQuery,
    refreshData,
    setIsLoading,
  } = useSignalStore()

  const handleRefresh = () => {
    setIsLoading(true)
    setTimeout(() => {
      refreshData()
      setIsLoading(false)
    }, 500)
  }

  return (
    <Card className="p-6 border border-gray-200 rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-medium">Signal Filters</h2>
          <Button
            variant="outline"
            size="sm"
            className="text-gray-500 border-gray-200 hover:bg-gray-100"
            onClick={handleRefresh}
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>
        <p className="text-sm text-gray-500">Customize your trading signal view</p>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="space-y-2">
            <label className="text-sm">Confidence Level</label>
            <Select value={confidenceLevel} onValueChange={(value) => setConfidenceLevel(value as ConfidenceLevel)}>
              <SelectTrigger className="border-gray-200 bg-white text-black">
                <SelectValue placeholder="Select confidence level" />
              </SelectTrigger>
              <SelectContent className="bg-white border-gray-200">
                <SelectItem value="All Levels">All Levels</SelectItem>
                <SelectItem value="High">High</SelectItem>
                <SelectItem value="Emerging">Emerging</SelectItem>
                <SelectItem value="Risky">Risky</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm">Time Range</label>
            <div className="flex">
              <Select value={timeRange} onValueChange={(value) => setTimeRange(value as TimeRange)}>
                <SelectTrigger className="border-gray-200 bg-white text-black">
                  <SelectValue placeholder="Select time range" />
                </SelectTrigger>
                <SelectContent className="bg-white border-gray-200">
                  <SelectItem value="24H">24H</SelectItem>
                  <SelectItem value="48H">48H</SelectItem>
                  <SelectItem value="7D">7D</SelectItem>
                  <SelectItem value="30D">30D</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm">Token Search</label>
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search by token..."
                className="pl-9 border-gray-200 bg-white text-black focus:ring-gray-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm">Advanced Filters</label>
            <Button
              variant="outline"
              className="w-full justify-between border-gray-200 bg-white text-black hover:bg-gray-100"
            >
              <span>Advanced Filters</span>
              <ChevronDown className="w-4 h-4 text-gray-500" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  )
}
