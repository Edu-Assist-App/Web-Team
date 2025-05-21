"use client"

import { useEffect, useRef } from "react"

export function ActivityChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    // Sample data for the chart
    const data = [30, 45, 25, 40, 35, 20, 45, 30, 25, 15]
    const maxValue = Math.max(...data)

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw bars
    const barWidth = (canvas.width - 40) / data.length
    const barSpacing = 8
    const maxBarHeight = canvas.height - 60

    data.forEach((value, index) => {
      const barHeight = (value / maxValue) * maxBarHeight
      const x = 20 + index * (barWidth + barSpacing)
      const y = canvas.height - 30 - barHeight

      // Draw bar
      ctx.fillStyle = "#4F00C1"
      ctx.beginPath()
      ctx.roundRect(x, y, barWidth - barSpacing, barHeight, 4)
      ctx.fill()
    })
  }, [])

  return (
    <div className="bg-white rounded-lg border p-6">
      <div className="mb-2">
        <h3 className="text-xl font-bold">40</h3>
        <p className="text-sm text-gray-500">Hours spent</p>
      </div>
      <canvas ref={canvasRef} className="w-full h-[150px]"></canvas>
    </div>
  )
}
