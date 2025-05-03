import { type Signal, useSignalStore } from "./store"
import { generateMockSignals } from "./mock-data"

class MockWebSocketService {
  private signals: Signal[]
  private updateInterval: NodeJS.Timeout | null = null
  private newSignalInterval: NodeJS.Timeout | null = null
  private subscribers: Set<() => void> = new Set()

  constructor() {
    this.signals = generateMockSignals()
  }

  public connect(): void {
    console.log("Connecting to mock WebSocket service...")

    // Initialize the store with initial data
    useSignalStore.getState().setSignals(this.signals)
    useSignalStore.getState().setIsLoading(false)

    // Simulate price and sentiment updates every few seconds
    this.updateInterval = setInterval(() => {
      this.updateRandomSignals()
    }, 5000)

    // Simulate new signals coming in occasionally
    this.newSignalInterval = setInterval(() => {
      this.addNewSignal()
    }, 30000)
  }

  public disconnect(): void {
    console.log("Disconnecting from mock WebSocket service...")

    if (this.updateInterval) {
      clearInterval(this.updateInterval)
      this.updateInterval = null
    }

    if (this.newSignalInterval) {
      clearInterval(this.newSignalInterval)
      this.newSignalInterval = null
    }
  }

  private updateRandomSignals(): void {
    // Update 1-3 random signals
    const updateCount = Math.floor(Math.random() * 3) + 1
    const signalCount = this.signals.length

    for (let i = 0; i < updateCount; i++) {
      const randomIndex = Math.floor(Math.random() * signalCount)
      const signal = this.signals[randomIndex]

      // Update price (small random change)
      const priceChange = signal.numericPrice * (Math.random() * 0.02 - 0.01)
      const newPrice = signal.numericPrice + priceChange

      // Update change percentage
      const newChangeValue = Number.parseFloat(signal.numericChange.toFixed(1)) + (Math.random() * 0.6 - 0.3)
      const newChange = `${newChangeValue >= 0 ? "+" : ""}${newChangeValue.toFixed(1)}%`

      // Update sentiment (small random change)
      const sentimentChange = Math.floor(Math.random() * 5) - 2
      const newSentimentValue = Math.max(0, Math.min(100, Number.parseInt(signal.sentiment) + sentimentChange))

      // Update timestamp
      const now = new Date()
      const hours = now.getHours().toString().padStart(2, "0")
      const minutes = now.getMinutes().toString().padStart(2, "0")
      const seconds = now.getSeconds().toString().padStart(2, "0")
      const timeString = `${hours}:${minutes}:${seconds}`

      const updatedSignal: Partial<Signal> = {
        price:
          newPrice < 1
            ? `$${newPrice.toFixed(2)}`
            : `$${newPrice.toLocaleString(undefined, { maximumFractionDigits: 0 })}`,
        numericPrice: newPrice,
        change: newChange,
        numericChange: newChangeValue,
        sentiment: `${newSentimentValue}%`,
        numericSentiment: newSentimentValue,
        time: timeString,
        timestamp: now.getTime(),
      }

      // Update the signal in our local array
      this.signals[randomIndex] = { ...signal, ...updatedSignal }

      // Update the signal in the store
      useSignalStore.getState().updateSignal(signal.id, updatedSignal)
    }
  }

  private addNewSignal(): void {
    const tokens = [
      { token: "BNB", pair: "BNB/USDT", basePrice: 580 },
      { token: "XLM", pair: "XLM/USDT", basePrice: 0.12 },
      { token: "UNI", pair: "UNI/USDT", basePrice: 10.45 },
      { token: "ATOM", pair: "ATOM/USDT", basePrice: 8.75 },
      { token: "AAVE", pair: "AAVE/USDT", basePrice: 92.5 },
    ]

    const randomTokenIndex = Math.floor(Math.random() * tokens.length)
    const tokenInfo = tokens[randomTokenIndex]

    const changePercent = (Math.random() * 8 - 2).toFixed(1)
    const isPositive = Number.parseFloat(changePercent) >= 0
    const sentimentValue = Math.floor(isPositive ? 60 + Math.random() * 30 : 30 + Math.random() * 40)
    const confidences: Array<Signal["confidence"]> = ["High", "Emerging", "Risky"]
    const confidence = confidences[Math.floor(Math.random() * confidences.length)]

    const now = new Date()
    const hours = now.getHours().toString().padStart(2, "0")
    const minutes = now.getMinutes().toString().padStart(2, "0")
    const seconds = now.getSeconds().toString().padStart(2, "0")
    const timeString = `${hours}:${minutes}:${seconds}`

    const descriptions = [
      "Strong buy signal with increasing volume and positive social sentiment.",
      "Breaking key resistance level with bullish momentum indicators.",
      "Potential reversal pattern forming, watch for confirmation.",
      "Consolidation phase with accumulation signals from large wallets.",
      "Bearish divergence on RSI, consider taking profits.",
    ]

    const newSignal: Signal = {
      id: `signal-new-${Date.now()}`,
      token: tokenInfo.token,
      pair: tokenInfo.pair,
      price:
        tokenInfo.basePrice < 1 ? `$${tokenInfo.basePrice.toFixed(2)}` : `$${tokenInfo.basePrice.toLocaleString()}`,
      numericPrice: tokenInfo.basePrice,
      change: `${isPositive ? "+" : ""}${changePercent}%`,
      numericChange: Number.parseFloat(changePercent),
      sentiment: `${sentimentValue}%`,
      numericSentiment: sentimentValue,
      confidence,
      time: timeString,
      timestamp: now.getTime(),
      description: descriptions[Math.floor(Math.random() * descriptions.length)],
    }

    // Add to our local array
    this.signals.unshift(newSignal)

    // Add to the store
    useSignalStore.getState().addSignal(newSignal)
  }

  public subscribe(callback: () => void): () => void {
    this.subscribers.add(callback)
    return () => {
      this.subscribers.delete(callback)
    }
  }
}

// Singleton instance
export const mockWebSocketService = new MockWebSocketService()
