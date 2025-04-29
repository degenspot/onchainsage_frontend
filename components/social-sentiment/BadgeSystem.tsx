"use client"

import React from "react"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface BadgeSystemProps {
  getBadgeColor: (badge: string) => string
}

export default function BadgeSystem({ getBadgeColor }: BadgeSystemProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Badge System</CardTitle>
        <CardDescription>How to earn reputation badges in the community</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Badge className={getBadgeColor("Bronze")}>Bronze</Badge>
              <div>
                <p className="font-medium">Bronze Trader</p>
                <p className="text-sm text-muted-foreground">5+ successful calls with 60%+ success rate</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge className={getBadgeColor("Silver")}>Silver</Badge>
              <div>
                <p className="font-medium">Silver Trader</p>
                <p className="text-sm text-muted-foreground">15+ successful calls with 70%+ success rate</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge className={getBadgeColor("Gold")}>Gold</Badge>
              <div>
                <p className="font-medium">Gold Trader</p>
                <p className="text-sm text-muted-foreground">30+ successful calls with 75%+ success rate</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge className={getBadgeColor("Diamond")}>Diamond</Badge>
              <div>
                <p className="font-medium">Diamond Trader</p>
                <p className="text-sm text-muted-foreground">50+ successful calls with 80%+ success rate</p>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Badge className={getBadgeColor("Verified")}>Verified</Badge>
              <div>
                <p className="font-medium">Verified Trader</p>
                <p className="text-sm text-muted-foreground">Connected wallet with verified trading history</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge className={getBadgeColor("OG")}>OG</Badge>
              <div>
                <p className="font-medium">OG Trader</p>
                <p className="text-sm text-muted-foreground">Member for 1+ year with consistent performance</p>
              </div>
            </div>
            <div className="mt-6">
              <p className="font-medium mb-2">Your Progress to Next Badge</p>
              <div className="w-full bg-muted rounded-full h-2.5 overflow-hidden">
                <div className="h-2.5 rounded-full bg-primary" style={{ width: "65%" }}></div>
              </div>
              <p className="text-xs mt-1">10 more successful calls needed for Gold Badge</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
