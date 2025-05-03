"use client"

import { ExternalLink, Filter, ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useSignalStore, type SortField } from "@/lib/store"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Card } from "@/components/ui/card"

export default function AllTradingSignals() {
  const {
    filteredSignals,
    activeTab,
    sortField,
    sortDirection,
    setActiveTab,
    setSortField,
    toggleSortDirection,
    isLoading,
  } = useSignalStore()

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      toggleSortDirection()
    } else {
      setSortField(field)
    }
  }

  const getSortIcon = (field: SortField) => {
    if (sortField === field) {
      return <ArrowUpDown className={`w-4 h-4 ml-1 ${sortField === field ? "opacity-100" : "opacity-50"}`} />
    }
    return null
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-medium">All Trading Signals</h2>
          <p className="text-sm text-gray-500">Complete list of trading signals based on AI analysis</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="border-gray-200 bg-transparent text-black hover:bg-gray-100">
            <ExternalLink className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" size="sm" className="border-gray-200 bg-transparent text-black hover:bg-gray-100">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
        </div>
      </div>

      <Card className="border border-gray-200 rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.08)] overflow-hidden">
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)} className="space-y-0">
          <TabsList className="bg-white border-b border-gray-200 p-1 rounded-t-lg rounded-b-none w-full justify-start">
            <TabsTrigger value="all" className="data-[state=active]:bg-gray-100">
              All Signals
            </TabsTrigger>
            <TabsTrigger value="high" className="data-[state=active]:bg-gray-100">
              High Confidence
            </TabsTrigger>
            <TabsTrigger value="emerging" className="data-[state=active]:bg-gray-100">
              Emerging
            </TabsTrigger>
            <TabsTrigger value="risky" className="data-[state=active]:bg-gray-100">
              Risky
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-0 mt-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th
                      className="text-left py-3 px-4 text-sm font-medium text-gray-500 cursor-pointer"
                      onClick={() => handleSort("token")}
                    >
                      <div className="flex items-center">
                        Token
                        {getSortIcon("token")}
                      </div>
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Pair</th>
                    <th
                      className="text-left py-3 px-4 text-sm font-medium text-gray-500 cursor-pointer"
                      onClick={() => handleSort("price")}
                    >
                      <div className="flex items-center">
                        Price
                        {getSortIcon("price")}
                      </div>
                    </th>
                    <th
                      className="text-left py-3 px-4 text-sm font-medium text-gray-500 cursor-pointer"
                      onClick={() => handleSort("change")}
                    >
                      <div className="flex items-center">
                        24h Change
                        {getSortIcon("change")}
                      </div>
                    </th>
                    <th
                      className="text-left py-3 px-4 text-sm font-medium text-gray-500 cursor-pointer"
                      onClick={() => handleSort("sentiment")}
                    >
                      <div className="flex items-center">
                        Sentiment
                        {getSortIcon("sentiment")}
                      </div>
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Confidence</th>
                    <th
                      className="text-left py-3 px-4 text-sm font-medium text-gray-500 cursor-pointer"
                      onClick={() => handleSort("time")}
                    >
                      <div className="flex items-center">
                        Time
                        {getSortIcon("time")}
                      </div>
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Action</th>
                  </tr>
                </thead>
                <tbody className={isLoading ? "opacity-50" : ""}>
                  {filteredSignals.map((signal) => (
                    <tr key={signal.id} className="border-b border-gray-200">
                      <td className="py-3 px-4">{signal.token}</td>
                      <td className="py-3 px-4 text-gray-500">{signal.pair}</td>
                      <td className="py-3 px-4">{signal.price}</td>
                      <td className={`py-3 px-4 ${signal.numericChange >= 0 ? "text-green-500" : "text-red-500"}`}>
                        {signal.change}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-1.5 bg-gray-700 rounded-full overflow-hidden">
                            <div
                              className={`h-full ${Number.parseInt(signal.sentiment) >= 70 ? "bg-green-500" : Number.parseInt(signal.sentiment) >= 50 ? "bg-yellow-500" : "bg-red-500"}`}
                              style={{ width: signal.sentiment }}
                            ></div>
                          </div>
                          <span>{signal.sentiment}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-1 text-xs rounded ${
                            signal.confidence === "High"
                              ? "bg-gray-100"
                              : signal.confidence === "Emerging"
                                ? "bg-yellow-900/30"
                                : "bg-red-900/30"
                          }`}
                        >
                          {signal.confidence}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-gray-500">{signal.time}</td>
                      <td className="py-3 px-4">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="link" size="sm" className="text-xs text-gray-500 hover:text-black p-0">
                              View Details
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="bg-white border-gray-200 text-black shadow-lg">
                            <DialogHeader>
                              <DialogTitle className="text-lg font-semibold">{signal.token} Signal Details</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4 mt-4">
                              <div className="flex justify-between">
                                <span className="text-gray-500">Pair:</span>
                                <span>{signal.pair}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-500">Price:</span>
                                <span>{signal.price}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-500">24h Change:</span>
                                <span className={signal.numericChange >= 0 ? "text-green-500" : "text-red-500"}>
                                  {signal.change}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-500">Sentiment:</span>
                                <span>{signal.sentiment}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-500">Confidence:</span>
                                <span>{signal.confidence}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-500">Time:</span>
                                <span>{signal.time}</span>
                              </div>
                              <div className="pt-2 border-t border-gray-200">
                                <span className="text-gray-500">Analysis:</span>
                                <p className="mt-2 text-sm">{signal.description}</p>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>

          <TabsContent value="high" className="mt-0">
            {/* High confidence signals content - handled by the filteredSignals */}
          </TabsContent>

          <TabsContent value="emerging" className="mt-0">
            {/* Emerging signals content - handled by the filteredSignals */}
          </TabsContent>

          <TabsContent value="risky" className="mt-0">
            {/* Risky signals content - handled by the filteredSignals */}
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  )
}
