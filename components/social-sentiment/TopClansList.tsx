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
import { Button } from "@/components/ui/button"
import { Flag, UserPlus } from "lucide-react"

export interface TopClan {
  id: string
  name: string
  avatar: string
  members: number
  successRate: number
  profitLoss: number
  activeCalls: number
}

interface TopClansListProps {
  clans: TopClan[]
}

export default function TopClansList({ clans }: TopClansListProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Trading Clans</CardTitle>
        <CardDescription>Most successful trading communities</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {clans.map((clan, index) => (
            <div
              key={clan.id}
              className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
            >
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary/10 text-primary font-bold">
                  {index + 1}
                </div>
                <Avatar>
                  <AvatarImage src={clan.avatar || "/placeholder.svg"} alt={clan.name} />
                  <AvatarFallback>{clan.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{clan.name}</p>
                  <p className="text-xs text-muted-foreground">{clan.members} members</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-8">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Success Rate</p>
                  <p className="font-medium">{clan.successRate}%</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Profit/Loss</p>
                  <p className="font-medium text-green-500">+${clan.profitLoss.toLocaleString()}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Active Calls</p>
                  <p className="font-medium">{clan.activeCalls}</p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                View Clan
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" className="gap-2">
          <Flag className="h-4 w-4" />
          <span>Discover Clans</span>
        </Button>
        <Button className="gap-2">
          <UserPlus className="h-4 w-4" />
          <span>Create Clan</span>
        </Button>
      </CardFooter>
    </Card>
  )
}
