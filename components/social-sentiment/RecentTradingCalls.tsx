"use client"

import React from "react"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, RefreshCw, MessageCircle, Bookmark, ThumbsUp, ThumbsDown } from "lucide-react"

export interface Call {
  id: string
  user: { name: string; avatar: string; badges: string[] }
  token: string
  direction: "long" | "short"
  entryPrice: number
  targetPrice: number
  stopLoss: number
  timeframe: string
  confidence: number
  upvotes: number
  downvotes: number
  comments: number
  timestamp: string
  status: string
}

interface RecentTradingCallsProps {
  recentCalls: Call[]
  filterOption: string
  handleCallAction: (action: "upvote" | "downvote" | "view", call: Call) => void
  getBadgeColor: (badge: string) => string
}

export default function RecentTradingCalls({
  recentCalls,
  filterOption,
  handleCallAction,
  getBadgeColor,
}: RecentTradingCallsProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <CardTitle>Recent Trading Calls</CardTitle>
            <CardDescription>Latest trading calls from the community</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Select defaultValue="newest" onValueChange={(value) => console.log("Sort by:", value)}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="popular">Most Popular</SelectItem>
                <SelectItem value="confidence">Highest Confidence</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {recentCalls
          .filter((call) => {
            if (filterOption === "all") return true
            if (filterOption === "long" || filterOption === "short")
              return call.direction === filterOption
            if (filterOption === "high") return call.confidence > 80
            if (filterOption === "medium") return call.confidence >= 60 && call.confidence <= 80
            if (filterOption === "low") return call.confidence < 60
            return true
          })
          .map((call) => (
            <Card
              key={call.id}
              className="transition-all-200 hover:shadow-md border-2 hover:border-primary/20"
            >
              <CardHeader className="pb-2">
                <div className="flex flex-wrap justify-between items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Avatar>
                      <AvatarImage src={call.user.avatar || "/placeholder.svg"} alt={call.user.name} />
                      <AvatarFallback>{call.user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{call.user.name}</span>
                        <div className="flex gap-1">
                          {call.user.badges.map((badge, index) => (
                            <Badge key={index} className={getBadgeColor(badge)}>
                              {badge}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        <Clock className="inline h-3 w-3 mr-1" />
                        {new Date(call.timestamp).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <Badge
                    variant={call.direction === "long" ? "default" : "destructive"}
                    className="animate-pulse"
                  >
                    {call.direction.toUpperCase()}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Token</p>
                    <p className="font-bold">{call.token}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Entry Price</p>
                    <p className="font-medium">${call.entryPrice.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Target Price</p>
                    <p className="font-medium">${call.targetPrice.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Stop Loss</p>
                    <p className="font-medium">${call.stopLoss.toLocaleString()}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Timeframe</p>
                    <p className="font-medium">{call.timeframe}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Confidence</p>
                    <div className="w-full bg-muted rounded-full h-2.5 overflow-hidden">
                      <div
                        className={`h-2.5 rounded-full ${
                          call.confidence > 80
                            ? "bg-green-500"
                            : call.confidence > 60
                            ? "bg-yellow-500"
                            : "bg-red-500"
                        }`}
                        style={{ width: `${call.confidence}%` }}
                      ></div>
                    </div>
                    <span className="text-xs">{call.confidence}%</span>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Status</p>
                    <Badge variant="outline" className="capitalize">
                      {call.status}
                    </Badge>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-wrap justify-between pt-2 gap-4">
                <div className="flex items-center gap-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="gap-1 hover:bg-green-500/10 hover:text-green-500"
                    onClick={() => handleCallAction("upvote", call)}
                  >
                    <ThumbsUp className="h-4 w-4" />
                    <span>{call.upvotes}</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="gap-1 hover:bg-red-500/10 hover:text-red-500"
                    onClick={() => handleCallAction("downvote", call)}
                  >
                    <ThumbsDown className="h-4 w-4" />
                    <span>{call.downvotes}</span>
                  </Button>
                  <Button variant="ghost" size="sm" className="gap-1">
                    <MessageCircle className="h-4 w-4" />
                    <span>{call.comments}</span>
                  </Button>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Bookmark className="h-4 w-4" />
                  </Button>
                  <Button size="sm" onClick={() => handleCallAction("view", call)}>
                    View Details
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button variant="outline" className="gap-2">
          <RefreshCw className="h-4 w-4" />
          <span>Load More</span>
        </Button>
      </CardFooter>
    </Card>
  )
}
