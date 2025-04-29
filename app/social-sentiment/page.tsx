"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Award,
  Bell,
  ChevronDown,
  Coins,
  LineChart,
  LogOut,
  MessageSquare,
  Moon,
  Search,
  Settings,
  Sun,
  User,
  Wallet,
  Zap,
  Users,
  ThumbsUp,
  ThumbsDown,
  Filter,
  Clock,
  Plus,
  Bookmark,
  RefreshCw,
  ChevronRight,
  MessageCircle,
  UserPlus,
  Trophy,
  Flag,
  X,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { WalletConnect } from "@/components/wallet-connect"
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "@/components/ui/chart"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import RecentTradingCalls from "@/components/social-sentiment/RecentTradingCalls"
import TraderLeaderboard, { Trader } from "@/components/social-sentiment/TraderLeaderboard"
import TopClansList, { TopClan } from "@/components/social-sentiment/TopClansList"
import BadgeSystem from "@/components/social-sentiment/BadgeSystem"
import NewCallModal from "@/components/social-sentiment/NewCallModal"
import type { Call } from "@/components/social-sentiment/RecentTradingCalls"

// Sample user data
const topTraders = [
  {
    id: "1",
    name: "CryptoWhale",
    avatar: "/placeholder.svg?height=40&width=40",
    badges: ["Diamond", "Verified"],
    successRate: 87,
    profitLoss: 342.5,
    followers: 1250,
    calls: 48,
  },
  {
    id: "2",
    name: "AlphaHunter",
    avatar: "/placeholder.svg?height=40&width=40",
    badges: ["Gold", "OG"],
    successRate: 82,
    profitLoss: 278.3,
    followers: 980,
    calls: 36,
  },
  {
    id: "3",
    name: "TokenSage",
    avatar: "/placeholder.svg?height=40&width=40",
    badges: ["Silver"],
    successRate: 76,
    profitLoss: 156.8,
    followers: 720,
    calls: 29,
  },
  {
    id: "4",
    name: "DefiGuru",
    avatar: "/placeholder.svg?height=40&width=40",
    badges: ["Bronze"],
    successRate: 71,
    profitLoss: 98.5,
    followers: 510,
    calls: 22,
  },
  {
    id: "5",
    name: "MoonShot",
    avatar: "/placeholder.svg?height=40&width=40",
    badges: ["Bronze"],
    successRate: 68,
    profitLoss: 76.2,
    followers: 320,
    calls: 18,
  },
]

const topClans = [
  {
    id: "1",
    name: "Alpha Squad",
    avatar: "/placeholder.svg?height=40&width=40",
    members: 24,
    successRate: 84,
    profitLoss: 1250.8,
    activeCalls: 12,
  },
  {
    id: "2",
    name: "Degen Warriors",
    avatar: "/placeholder.svg?height=40&width=40",
    members: 18,
    successRate: 79,
    profitLoss: 980.5,
    activeCalls: 8,
  },
  {
    id: "3",
    name: "Whale Watchers",
    avatar: "/placeholder.svg?height=40&width=40",
    members: 15,
    successRate: 76,
    profitLoss: 820.3,
    activeCalls: 6,
  },
]

const recentCalls: Call[] = [
  {
    id: "1",
    user: {
      name: "CryptoWhale",
      avatar: "/placeholder.svg?height=40&width=40",
      badges: ["Diamond"],
    },
    token: "BTC",
    direction: "long",
    entryPrice: 73500,
    targetPrice: 78000,
    stopLoss: 71000,
    timeframe: "3d",
    confidence: 85,
    upvotes: 124,
    downvotes: 12,
    comments: 38,
    timestamp: "2025-03-21T14:32:45",
    status: "active",
  },
  {
    id: "2",
    user: {
      name: "AlphaHunter",
      avatar: "/placeholder.svg?height=40&width=40",
      badges: ["Gold"],
    },
    token: "ETH",
    direction: "long",
    entryPrice: 4200,
    targetPrice: 4500,
    stopLoss: 4000,
    timeframe: "2d",
    confidence: 78,
    upvotes: 98,
    downvotes: 15,
    comments: 26,
    timestamp: "2025-03-21T13:45:22",
    status: "active",
  },
  {
    id: "3",
    user: {
      name: "TokenSage",
      avatar: "/placeholder.svg?height=40&width=40",
      badges: ["Silver"],
    },
    token: "SOL",
    direction: "short",
    entryPrice: 168,
    targetPrice: 155,
    stopLoss: 175,
    timeframe: "1d",
    confidence: 72,
    upvotes: 65,
    downvotes: 22,
    comments: 18,
    timestamp: "2025-03-21T12:18:37",
    status: "active",
  },
  {
    id: "4",
    user: {
      name: "DefiGuru",
      avatar: "/placeholder.svg?height=40&width=40",
      badges: ["Bronze"],
    },
    token: "AVAX",
    direction: "long",
    entryPrice: 42.5,
    targetPrice: 46.0,
    stopLoss: 40.0,
    timeframe: "4d",
    confidence: 68,
    upvotes: 42,
    downvotes: 18,
    comments: 12,
    timestamp: "2025-03-21T10:05:14",
    status: "active",
  },
]

const performanceData = [
  { month: "Jan", successRate: 65, profitLoss: 120 },
  { month: "Feb", successRate: 70, profitLoss: 150 },
  { month: "Mar", successRate: 68, profitLoss: 140 },
  { month: "Apr", successRate: 72, profitLoss: 180 },
  { month: "May", successRate: 75, profitLoss: 210 },
  { month: "Jun", successRate: 80, profitLoss: 250 },
]

export default function SocialSentimentPage() {
  const [theme, setTheme] = useState<"light" | "dark">("dark")
  const [activeTab, setActiveTab] = useState<"forum" | "clans" | "leaderboard">("forum")

  // Add a new state for the "New Call" modal
  const [showNewCallModal, setShowNewCallModal] = useState(false)
  const [selectedCall, setSelectedCall] = useState<(typeof recentCalls)[0] | null>(null)
  const [filterOption, setFilterOption] = useState("all")

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light"
    setTheme(newTheme)
    document.documentElement.classList.toggle("dark")
  }

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case "Diamond":
        return "bg-blue-500 text-white"
      case "Gold":
        return "bg-yellow-500 text-white"
      case "Silver":
        return "bg-gray-400 text-white"
      case "Bronze":
        return "bg-amber-700 text-white"
      case "Verified":
        return "bg-green-500 text-white"
      case "OG":
        return "bg-purple-500 text-white"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  // Add this function after the getBadgeColor function
  const handleCallAction = (action: "upvote" | "downvote" | "view", call: (typeof recentCalls)[0]) => {
    if (action === "upvote") {
      // In a real app, this would call an API
      console.log("Upvoted call", call.id)
    } else if (action === "downvote") {
      console.log("Downvoted call", call.id)
    } else if (action === "view") {
      setSelectedCall(call)
    }
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-background dark">
        <Sidebar>
          <SidebarHeader>
            <div className="flex items-center gap-2 px-4 py-2">
              <Coins className="h-6 w-6 text-primary" />
              <span className="font-bold text-xl">OnChain Sage</span>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Navigation</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {[
                    { icon: LineChart, label: "Dashboard", href: "/dashboard" },
                    { icon: Zap, label: "Signals", href: "/signals" },
                    { icon: MessageSquare, label: "Social Sentiment", href: "/social-sentiment", active: true },
                    { icon: Wallet, label: "Wallet", href: "/wallet" },
                    { icon: Settings, label: "Settings", href: "/settings" },
                  ].map((item, index) => (
                    <SidebarMenuItem key={index}>
                      <SidebarMenuButton asChild isActive={item.active}>
                        <Link href={item.href}>
                          <item.icon className="h-4 w-4" />
                          <span>{item.label}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter>
            <div className="p-4">
              <WalletConnect />
            </div>
          </SidebarFooter>
        </Sidebar>

        <div className="flex flex-col flex-1 w-full">
          <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background/80 backdrop-blur-sm px-6">
            <SidebarTrigger className="md:hidden" />
            <div className="flex-1">
              <h1 className="text-lg font-semibold">Trading Community</h1>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" size="icon">
                <Bell className="h-4 w-4" />
                <span className="sr-only">Notifications</span>
              </Button>
              <Button variant="outline" size="icon" onClick={toggleTheme}>
                {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                <span className="sr-only">Toggle theme</span>
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-2">
                    <User className="h-4 w-4" />
                    <span className="hidden md:inline-flex">John Doe</span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>

          <main className="flex-1 p-4 md:p-6 overflow-auto">
            <div className="grid gap-4 md:gap-6 w-full">
              {/* Navigation Tabs */}
              <div className="flex flex-wrap items-center justify-between gap-4">
                <Tabs defaultValue="forum" className="w-full" onValueChange={(value) => setActiveTab(value as any)}>
                  <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                    <TabsList>
                      <TabsTrigger value="forum" className="gap-2">
                        <MessageCircle className="h-4 w-4" />
                        <span>Trading Forum</span>
                      </TabsTrigger>
                      <TabsTrigger value="clans" className="gap-2">
                        <Users className="h-4 w-4" />
                        <span>Clans</span>
                      </TabsTrigger>
                      <TabsTrigger value="leaderboard" className="gap-2">
                        <Trophy className="h-4 w-4" />
                        <span>Leaderboard</span>
                      </TabsTrigger>
                    </TabsList>

                    <div className="flex items-center gap-2">
                      <div className="relative w-64">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Search calls, traders, or clans..." className="pl-9" />
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" size="sm" className="gap-2">
                            <Filter className="h-4 w-4" />
                            <span className="hidden sm:inline-flex">Filter</span>
                            <ChevronDown className="h-4 w-4 sm:ml-2" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Filter Calls</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => setFilterOption("all")}>All Calls</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setFilterOption("long")}>Long Positions</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setFilterOption("short")}>Short Positions</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => setFilterOption("high")}>
                            High Confidence (&gt;80%)
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setFilterOption("medium")}>
                            Medium Confidence (60-80%)
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setFilterOption("low")}>
                            Low Confidence (&lt;60%)
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                      <Button className="gap-2" onClick={() => setShowNewCallModal(true)}>
                        <Plus className="h-4 w-4" />
                        <span className="hidden sm:inline-flex">New Call</span>
                      </Button>
                    </div>
                  </div>

                  {/* Trading Forum Tab */}
                  <TabsContent value="forum" className="space-y-4">
                    {/* User Stats */}
                    <Card>
                      <CardHeader className="pb-2">
                        <div className="flex flex-wrap items-center justify-between gap-4">
                          <div>
                            <CardTitle>Your Trading Performance</CardTitle>
                            <CardDescription>Track your call success rate and community standing</CardDescription>
                          </div>
                          <Button variant="outline" size="sm" className="gap-2">
                            <RefreshCw className="h-4 w-4" />
                            <span className="hidden sm:inline-flex">Refresh</span>
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                          <div className="space-y-1 p-3 bg-muted/20 rounded-lg">
                            <p className="text-sm text-muted-foreground">Success Rate</p>
                            <p className="text-2xl font-bold">72%</p>
                            <p className="text-xs text-green-500">+5% this month</p>
                          </div>
                          <div className="space-y-1 p-3 bg-muted/20 rounded-lg">
                            <p className="text-sm text-muted-foreground">Profit/Loss</p>
                            <p className="text-2xl font-bold text-green-500">+$186.50</p>
                            <p className="text-xs">Based on your calls</p>
                          </div>
                          <div className="space-y-1 p-3 bg-muted/20 rounded-lg">
                            <p className="text-sm text-muted-foreground">Reputation</p>
                            <div className="flex items-center gap-2">
                              <Badge className={getBadgeColor("Silver")}>Silver</Badge>
                              <p className="text-xs">5 more successful calls for Gold</p>
                            </div>
                          </div>
                          <div className="space-y-1 p-3 bg-muted/20 rounded-lg">
                            <p className="text-sm text-muted-foreground">Calls Remaining</p>
                            <p className="text-2xl font-bold">3/5</p>
                            <p className="text-xs">Resets in 24h</p>
                          </div>
                        </div>

                        <div className="mt-6 h-[200px]">
                          <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={performanceData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                              <defs>
                                <linearGradient id="colorSuccessRate" x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                                  <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                                </linearGradient>
                                <linearGradient id="colorProfitLoss" x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                                  <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                                </linearGradient>
                              </defs>
                              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                              <YAxis tick={{ fontSize: 12 }} />
                              <CartesianGrid strokeDasharray="3 3" />
                              <Tooltip
                                contentStyle={{
                                  backgroundColor: "rgba(0, 0, 0, 0.8)",
                                  border: "none",
                                  borderRadius: "8px",
                                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                                  color: "#fff",
                                }}
                              />
                              <Legend wrapperStyle={{ paddingTop: 10 }} />
                              <Area
                                type="monotone"
                                dataKey="successRate"
                                name="Success Rate %"
                                stroke="#8884d8"
                                strokeWidth={2}
                                fillOpacity={1}
                                fill="url(#colorSuccessRate)"
                                activeDot={{ r: 6 }}
                              />
                              <Area
                                type="monotone"
                                dataKey="profitLoss"
                                name="Profit/Loss $"
                                stroke="#82ca9d"
                                strokeWidth={2}
                                fillOpacity={1}
                                fill="url(#colorProfitLoss)"
                                activeDot={{ r: 6 }}
                              />
                            </AreaChart>
                          </ResponsiveContainer>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Recent Trading Calls */}
                    <RecentTradingCalls
                      recentCalls={recentCalls}
                      filterOption={filterOption}
                      handleCallAction={handleCallAction}
                      getBadgeColor={getBadgeColor}
                    />
                  </TabsContent>

                  {/* Clans Tab */}
                  <TabsContent value="clans" className="space-y-4">
                    {/* Your Clan */}
                    <Card>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-center">
                          <div>
                            <CardTitle>Your Clan: Alpha Squad</CardTitle>
                            <CardDescription>Performance and activity of your trading clan</CardDescription>
                          </div>
                          <Button variant="outline" size="sm">
                            Manage Clan
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div className="space-y-1">
                            <p className="text-sm text-muted-foreground">Members</p>
                            <p className="text-2xl font-bold">24</p>
                            <p className="text-xs text-green-500">+3 this week</p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm text-muted-foreground">Success Rate</p>
                            <p className="text-2xl font-bold">84%</p>
                            <p className="text-xs text-green-500">+2% this month</p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm text-muted-foreground">Profit/Loss</p>
                            <p className="text-2xl font-bold text-green-500">+$1,250.80</p>
                            <p className="text-xs">Collective performance</p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm text-muted-foreground">Rank</p>
                            <p className="text-2xl font-bold">#1</p>
                            <p className="text-xs">Top performing clan</p>
                          </div>
                        </div>

                        <Separator className="my-4" />

                        <div className="space-y-4">
                          <div className="flex justify-between items-center">
                            <h3 className="font-medium">Recent Clan Activity</h3>
                            <Button variant="ghost" size="sm" className="gap-1">
                              <ChevronRight className="h-4 w-4" />
                              <span>View All</span>
                            </Button>
                          </div>

                          <div className="space-y-2">
                            <div className="flex items-center gap-2 p-2 rounded-md hover:bg-muted/50 transition-all-200">
                              <Avatar className="h-8 w-8">
                                <AvatarFallback>CW</AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <p className="text-sm">
                                  <span className="font-medium">CryptoWhale</span> posted a new BTC long call
                                </p>
                                <p className="text-xs text-muted-foreground">2 hours ago</p>
                              </div>
                              <Button variant="ghost" size="sm">
                                View
                              </Button>
                            </div>

                            <div className="flex items-center gap-2 p-2 rounded-md hover:bg-muted/50 transition-all-200">
                              <Avatar className="h-8 w-8">
                                <AvatarFallback>AH</AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <p className="text-sm">
                                  <span className="font-medium">AlphaHunter</span> earned a Gold badge
                                </p>
                                <p className="text-xs text-muted-foreground">5 hours ago</p>
                              </div>
                              <Button variant="ghost" size="sm">
                                View
                              </Button>
                            </div>

                            <div className="flex items-center gap-2 p-2 rounded-md hover:bg-muted/50 transition-all-200">
                              <Avatar className="h-8 w-8">
                                <AvatarFallback>TS</AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <p className="text-sm">
                                  <span className="font-medium">TokenSage</span> closed a successful SOL trade (+15%)
                                </p>
                                <p className="text-xs text-muted-foreground">8 hours ago</p>
                              </div>
                              <Button variant="ghost" size="sm">
                                View
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Top Clans */}
                    <TopClansList clans={topClans} />
                  </TabsContent>

                  {/* Leaderboard Tab */}
                  <TabsContent value="leaderboard" className="space-y-4">
                    <TraderLeaderboard traders={topTraders} getBadgeColor={getBadgeColor} />
                    <BadgeSystem getBadgeColor={getBadgeColor} />
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </main>
        </div>
      </div>
      {/* New Call Modal */}
      {showNewCallModal && <NewCallModal onClose={() => setShowNewCallModal(false)} />}
      {/* Call Detail Modal */}
      {selectedCall && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-3xl max-h-[90vh] overflow-auto">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={selectedCall.user.avatar || "/placeholder.svg"} alt={selectedCall.user.name} />
                    <AvatarFallback>{selectedCall.user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-bold">
                        {selectedCall.token} {selectedCall.direction.toUpperCase()}
                      </h3>
                      <Badge variant={selectedCall.direction === "long" ? "default" : "destructive"}>
                        {selectedCall.direction.toUpperCase()}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Posted by <span className="font-medium">{selectedCall.user.name}</span> •{" "}
                      {new Date(selectedCall.timestamp).toLocaleString()}
                    </p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setSelectedCall(null)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-3 bg-muted/20 rounded-lg">
                  <p className="text-sm text-muted-foreground">Entry Price</p>
                  <p className="text-xl font-bold">${selectedCall.entryPrice.toLocaleString()}</p>
                </div>
                <div className="p-3 bg-muted/20 rounded-lg">
                  <p className="text-sm text-muted-foreground">Target Price</p>
                  <p className="text-xl font-bold">${selectedCall.targetPrice.toLocaleString()}</p>
                </div>
                <div className="p-3 bg-muted/20 rounded-lg">
                  <p className="text-sm text-muted-foreground">Stop Loss</p>
                  <p className="text-xl font-bold">${selectedCall.stopLoss.toLocaleString()}</p>
                </div>
                <div className="p-3 bg-muted/20 rounded-lg">
                  <p className="text-sm text-muted-foreground">Timeframe</p>
                  <p className="text-xl font-bold">{selectedCall.timeframe}</p>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Confidence Level</h4>
                <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                  <div
                    className={`h-3 rounded-full ${
                      selectedCall.confidence > 80
                        ? "bg-green-500"
                        : selectedCall.confidence > 60
                          ? "bg-yellow-500"
                          : "bg-red-500"
                    }`}
                    style={{ width: `${selectedCall.confidence}%` }}
                  ></div>
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-xs">Low</span>
                  <span className="text-xs font-medium">{selectedCall.confidence}%</span>
                  <span className="text-xs">High</span>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Rationale</h4>
                <p className="text-sm">
                  Bitcoin is showing strong bullish momentum with increasing social sentiment and on-chain activity.
                  Whale accumulation has been detected in the last 24 hours, and the technical indicators suggest a
                  continuation of the uptrend. The RSI is not yet overbought, and the MACD shows a bullish crossover.
                  Additionally, the recent ETF inflows have been positive, and the market sentiment is improving after
                  the recent consolidation phase.
                </p>
              </div>

              <Separator />

              <div>
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-medium">Community Feedback</h4>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-1 hover:bg-green-500/10 hover:text-green-500"
                      onClick={() => console.log("Upvoted call", selectedCall.id)}
                    >
                      <ThumbsUp className="h-4 w-4" />
                      <span>{selectedCall.upvotes}</span>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-1 hover:bg-red-500/10 hover:text-red-500"
                      onClick={() => console.log("Downvoted call", selectedCall.id)}
                    >
                      <ThumbsDown className="h-4 w-4" />
                      <span>{selectedCall.downvotes}</span>
                    </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium">JohnDoe</p>
                        <Badge className={getBadgeColor("Bronze")}>Bronze</Badge>
                        <p className="text-xs text-muted-foreground">2 hours ago</p>
                      </div>
                      <p className="text-sm mt-1">
                        Great call! I've been watching BTC closely and agree with your analysis. The whale accumulation
                        is a strong signal.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>TS</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium">TokenSage</p>
                        <Badge className={getBadgeColor("Silver")}>Silver</Badge>
                        <p className="text-xs text-muted-foreground">1 hour ago</p>
                      </div>
                      <p className="text-sm mt-1">
                        I'm a bit concerned about the resistance at $74K. What makes you confident we'll break through?
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 flex gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>ME</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <Textarea placeholder="Add your comment..." className="min-h-[80px]" />
                      <Button className="mt-2">Post Comment</Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" className="gap-2">
                <Flag className="h-4 w-4" />
                <span>Report</span>
              </Button>
              <Button variant="outline" className="gap-2">
                <Bookmark className="h-4 w-4" />
                <span>Save</span>
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </SidebarProvider>
  )
}
