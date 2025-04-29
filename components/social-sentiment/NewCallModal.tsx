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
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Button } from "@/components/ui/button"

interface NewCallModalProps {
  onClose: () => void
}

export default function NewCallModal({ onClose }: NewCallModalProps) {
  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>Create New Trading Call</CardTitle>
          <CardDescription>Share your trading insight with the community</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="token">Token</Label>
              <Input id="token" placeholder="BTC" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="direction">Direction</Label>
              <Select defaultValue="long">
                <SelectTrigger>
                  <SelectValue placeholder="Select direction" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="long">Long</SelectItem>
                  <SelectItem value="short">Short</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="entry-price">Entry Price</Label>
              <Input id="entry-price" placeholder="0.00" type="number" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="target-price">Target Price</Label>
              <Input id="target-price" placeholder="0.00" type="number" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="stop-loss">Stop Loss</Label>
              <Input id="stop-loss" placeholder="0.00" type="number" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="timeframe">Timeframe</Label>
              <Select defaultValue="1d">
                <SelectTrigger>
                  <SelectValue placeholder="Select timeframe" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1d">1 Day</SelectItem>
                  <SelectItem value="3d">3 Days</SelectItem>
                  <SelectItem value="1w">1 Week</SelectItem>
                  <SelectItem value="2w">2 Weeks</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="confidence">Confidence (%)</Label>
              <Input id="confidence" placeholder="75" type="number" min="1" max="100" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="rationale">Rationale</Label>
            <Textarea id="rationale" placeholder="Explain your trading thesis..." className="min-h-[100px]" />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={onClose}>
            Post Trading Call
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
