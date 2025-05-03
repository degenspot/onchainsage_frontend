"use client"

import { ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useSignalStore } from "@/lib/store"
import { Dialog, DialogContent, DialogTitle } from "@radix-ui/react-dialog"
import { DialogTrigger } from "@radix-ui/react-dialog"


export default function HighConfidenceSignals() {
  const { filteredSignals } = useSignalStore()

  // Get only high confidence signals and limit to 3
  const highConfidenceSignals = filteredSignals.filter((signal: { confidence: string }) => signal.confidence === "High").slice(0, 3)

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {highConfidenceSignals.map((signal) => (
        <Card
          key={signal.id}
          className="bg-white border border-gray-200 rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.08)]"
        >
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center w-6 h-6 bg-gray-100 rounded-full">
                  {signal.token.charAt(0)}
                </div>
                <div>
                  <div className="font-medium">{signal.token}</div>
                  <div className="text-xs text-gray-500">{signal.pair}</div>
                </div>
              </div>
              <Button variant="secondary" size="sm" className="text-xs bg-gray-100 hover:bg-gray-200">
                High
              </Button>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between">
                <div className="text-sm text-gray-500">Price</div>
                <div className="font-medium">{signal.price}</div>
              </div>

              <div className="flex justify-between">
                <div className="text-sm text-gray-500">24h Change</div>
                <div className={signal.numericChange >= 0 ? "text-green-500" : "text-red-500"}>{signal.change}</div>
              </div>

              <div className="flex justify-between">
                <div className="text-sm text-gray-500">Sentiment</div>
                <div className="flex items-center gap-2">
                  <div className="w-16 h-1.5 bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${Number.parseInt(signal.sentiment) >= 70 ? "bg-green-500" : Number.parseInt(signal.sentiment) >= 50 ? "bg-yellow-500" : "bg-red-500"}`}
                      style={{ width: signal.sentiment }}
                    ></div>
                  </div>
                  <span>{signal.sentiment}</span>
                </div>
              </div>

              <div className="flex items-center gap-1 text-xs text-gray-500">
                <div className="w-1.5 h-1.5 rounded-full bg-gray-400"></div>
                <span>{signal.time}</span>
              </div>
            </div>

            <div className="flex justify-between mt-4">
              <Button variant="ghost" size="sm" className="text-xs text-gray-500 hover:text-gray-900">
                <ExternalLink className="w-3 h-3 mr-1" />
                Share
              </Button>

              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="secondary" size="sm" className="text-xs bg-gray-100 hover:bg-gray-200">
                    Details
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-white border-gray-200 text-gray-900 shadow-lg">
                  <div>
                    <DialogTitle className="text-lg font-semibold">{signal.token} Signal Details</DialogTitle>
                  </div>
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
                      <span>High</span>
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
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
