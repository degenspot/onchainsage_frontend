import { create } from "zustand"
import { devtools } from "zustand/middleware"

export type SignalConfidence = "High" | "Emerging" | "Risky"

export interface Signal {
  id: string
  token: string
  pair: string
  price: string
  numericPrice: number
  change: string
  numericChange: number
  sentiment: string
  numericSentiment: number
  confidence: SignalConfidence
  time: string
  timestamp: number
  description?: string
}

export type SortField = "token" | "price" | "change" | "sentiment" | "time"
export type SortDirection = "asc" | "desc"
export type ConfidenceLevel = "All Levels" | "High" | "Emerging" | "Risky"
export type TimeRange = "24H" | "48H" | "7D" | "30D"

interface SignalState {
  signals: Signal[]
  filteredSignals: Signal[]
  activeTab: "all" | "high" | "emerging" | "risky"
  confidenceLevel: ConfidenceLevel
  timeRange: TimeRange
  searchQuery: string
  sortField: SortField
  sortDirection: SortDirection
  isLoading: boolean

  // Actions
  setSignals: (signals: Signal[]) => void
  addSignal: (signal: Signal) => void
  updateSignal: (id: string, signal: Partial<Signal>) => void
  setActiveTab: (tab: "all" | "high" | "emerging" | "risky") => void
  setConfidenceLevel: (level: ConfidenceLevel) => void
  setTimeRange: (range: TimeRange) => void
  setSearchQuery: (query: string) => void
  setSortField: (field: SortField) => void
  setSortDirection: (direction: SortDirection) => void
  toggleSortDirection: () => void
  setIsLoading: (isLoading: boolean) => void
  refreshData: () => void
}

export const useSignalStore = create<SignalState>()(
  devtools(
    (set, get) => ({
      signals: [],
      filteredSignals: [],
      activeTab: "all",
      confidenceLevel: "All Levels",
      timeRange: "24H",
      searchQuery: "",
      sortField: "time",
      sortDirection: "desc",
      isLoading: true,

      setSignals: (signals) => {
        set({ signals })
        get().refreshData()
      },

      addSignal: (signal) => {
        set((state) => ({
          signals: [signal, ...state.signals],
        }))
        get().refreshData()
      },

      updateSignal: (id, updatedSignal) => {
        set((state) => ({
          signals: state.signals.map((signal) => (signal.id === id ? { ...signal, ...updatedSignal } : signal)),
        }))
        get().refreshData()
      },

      setActiveTab: (activeTab) => {
        set({ activeTab })
        get().refreshData()
      },

      setConfidenceLevel: (confidenceLevel) => {
        set({ confidenceLevel })
        get().refreshData()
      },

      setTimeRange: (timeRange) => {
        set({ timeRange })
        get().refreshData()
      },

      setSearchQuery: (searchQuery) => {
        set({ searchQuery })
        get().refreshData()
      },

      setSortField: (sortField) => {
        set({ sortField })
        get().refreshData()
      },

      setSortDirection: (sortDirection) => {
        set({ sortDirection })
        get().refreshData()
      },

      toggleSortDirection: () => {
        set((state) => ({
          sortDirection: state.sortDirection === "asc" ? "desc" : "asc",
        }))
        get().refreshData()
      },

      setIsLoading: (isLoading) => {
        set({ isLoading })
      },

      refreshData: () => {
        const { signals, activeTab, confidenceLevel, searchQuery, sortField, sortDirection } = get()

        // Filter by tab
        let filtered = [...signals]
        if (activeTab !== "all") {
          const confidenceMap = {
            high: "High",
            emerging: "Emerging",
            risky: "Risky",
          } as const

          filtered = filtered.filter((signal) => signal.confidence === confidenceMap[activeTab])
        }

        // Filter by confidence level if not "All Levels"
        if (confidenceLevel !== "All Levels") {
          filtered = filtered.filter((signal) => signal.confidence === confidenceLevel)
        }

        // Filter by search query
        if (searchQuery) {
          const query = searchQuery.toLowerCase()
          filtered = filtered.filter(
            (signal) => signal.token.toLowerCase().includes(query) || signal.pair.toLowerCase().includes(query),
          )
        }

        // Sort data
        filtered.sort((a, b) => {
          let comparison = 0

          switch (sortField) {
            case "token":
              comparison = a.token.localeCompare(b.token)
              break
            case "price":
              comparison = a.numericPrice - b.numericPrice
              break
            case "change":
              comparison = a.numericChange - b.numericChange
              break
            case "sentiment":
              comparison = a.numericSentiment - b.numericSentiment
              break
            case "time":
              comparison = a.timestamp - b.timestamp
              break
          }

          return sortDirection === "asc" ? comparison : -comparison
        })

        set({ filteredSignals: filtered })
      },
    }),
    { name: "signal-store" },
  ),
)
