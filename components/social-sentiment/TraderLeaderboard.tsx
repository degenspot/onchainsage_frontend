"use client"

import React from "react"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Award } from "lucide-react"

export interface Trader {
  id: string
  name: string
  avatar: string
  badges: string[]
  successRate: number
  profitLoss: number
  followers: number
  calls: number
}

interface TraderLeaderboardProps {
  traders: Trader[]
  getBadgeColor: (badge: string) => string
}

export default function TraderLeaderboard({
  traders,
  getBadgeColor,
}: TraderLeaderboardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Traders Leaderboard</CardTitle>
        <CardDescription>Ranked by success rate and profit/loss ratio</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {traders.map((trader, index) => (
            <div
              key={trader.id}
              className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
            >
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary/10 text-primary font-bold">
                  {index + 1}
                </div>
                <Avatar>
                  <AvatarImage src={trader.avatar || "/placeholder.svg"} alt={trader.name} />
                  <AvatarFallback>{trader.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-medium">{trader.name}</p>
                    <div className="flex gap-1">
                      {trader.badges.map((badge, i) => (
                        <Badge key={i} className={getBadgeColor(badge)}>
                          {badge}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">{trader.followers} followers</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-8">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Success Rate</p>
                  <p className="font-medium">{trader.successRate}%</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Profit/Loss</p>
                  <p className="font-medium text-green-500">+${trader.profitLoss.toLocaleString()}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Total Calls</p>
                  <p className="font-medium">{trader.calls}</p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                Follow
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex w-full justify-between">
          <div className="flex items-center gap-2">
            <Award className="h-5 w-5 text-primary" />
            <span className="text-sm">Your rank: #18 of 256 traders</span>
          </div>
          <Button variant="outline" size="sm">
            View Full Leaderboard
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
