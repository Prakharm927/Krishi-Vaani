"use client"

import { Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  type ChartData,
} from "chart.js"

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

interface PriceChartProps {
  data: ChartData<"line">
}

export default function PriceChart({ data }: PriceChartProps) {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
      },
      tooltip: {
        callbacks: {
          label: (context: any) => `₹${context.parsed.y}/kg`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        min: Math.floor(Math.min(...data.datasets[0].data) * 0.9),
        max: Math.ceil(Math.max(...data.datasets[0].data) * 1.1),
        title: {
          display: true,
          text: "Price (₹/kg)",
        },
        ticks: {
          callback: (value: any) => `₹${value}`,
        },
      },
      x: {
        title: {
          display: true,
          text: "Date",
        },
      },
    },
  }

  return <Line data={data} options={options} />
}
