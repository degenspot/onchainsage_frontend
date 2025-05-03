import type { Signal } from "./store"

export const generateMockSignals = (): Signal[] => {
  const tokens = [
    { token: "BTC", pair: "BTC/USDT", basePrice: 73500 },
    { token: "ETH", pair: "ETH/USDT", basePrice: 4200 },
    { token: "SOL", pair: "SOL/USDT", basePrice: 168 },
    { token: "AVAX", pair: "AVAX/USDT", basePrice: 42.5 },
    { token: "MATIC", pair: "MATIC/USDT", basePrice: 0.86 },
    { token: "LINK", pair: "LINK/USDT", basePrice: 18.75 },
    { token: "DOT", pair: "DOT/USDT", basePrice: 8.95 },
    { token: "ADA", pair: "ADA/USDT", basePrice: 0.45 },
    { token: "XRP", pair: "XRP/USDT", basePrice: 0.62 },
    { token: "DOGE", pair: "DOGE/USDT", basePrice: 0.15 },
  ]

  const confidences: Array<Signal["confidence"]> = ["High", "Emerging", "Risky"]
  const descriptions = [
    "Bitcoin showing strong bullish momentum with increasing social sentiment and on-chain data. Whales accumulation detected in the last 24 hours.",
    "Ethereum breaking key resistance levels with increasing DeFi TVL. Strong buy signal based on technical and social indicators.",
    "Solana experiencing rapid growth in NFT volume and developer activity. Technical indicators show continuation of uptrend.",
    "Increasing volume with bullish divergence on RSI. Support level holding strong with potential breakout.",
    "Bearish pattern forming with decreasing volume. Consider taking profits or setting tight stop-loss.",
    "Consolidation phase with accumulation signals. Watch for breakout above resistance level.",
    "Strong support at current levels with increasing institutional interest. Long-term bullish outlook.",
    "Short-term correction expected after recent rally. Wait for confirmation of trend reversal.",
    "Neutral market conditions with low volatility. Range-bound trading expected in the near term.",
  ]

  const now = new Date()

  return tokens.map((tokenInfo, index) => {
    const changePercent = (Math.random() * 10 - (index % 3 === 0 ? 2 : 0)).toFixed(1)
    const isPositive = Number.parseFloat(changePercent) >= 0
    const sentimentValue = Math.floor(isPositive ? 65 + Math.random() * 25 : 35 + Math.random() * 30)
    const confidence = index < 3 ? "High" : index < 7 ? "Emerging" : "Risky"

    // Create a time in the past few minutes
    const pastTime = new Date(now.getTime() - (index * 2 + Math.floor(Math.random() * 5)) * 60000)
    const hours = pastTime.getHours().toString().padStart(2, "0")
    const minutes = pastTime.getMinutes().toString().padStart(2, "0")
    const seconds = pastTime.getSeconds().toString().padStart(2, "0")
    const timeString = `${hours}:${minutes}:${seconds}`

    return {
      id: `signal-${index}`,
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
      timestamp: pastTime.getTime(),
      description: descriptions[index % descriptions.length],
    }
  })
}

export const getSignalStats = (signals: Signal[]) => {
  const total = signals.length
  const highConfidence = signals.filter((s) => s.confidence === "High").length
  const emerging = signals.filter((s) => s.confidence === "Emerging").length
  const risky = signals.filter((s) => s.confidence === "Risky").length

  return { total, highConfidence, emerging, risky }
}
