// custom chart component used in the app
import React, { memo } from "react"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"
import { Line, Pie, Bar } from "react-chartjs-2"

export const LineChart = memo(({ data }) => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  )

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          boxWidth: 5,
          boxHeight: 5,
        },
      },
    },
    elements: {
      line: {
        borderWidth: 2,
      },
      point: {
        pointStyle: "circle",
        radius: 0,
        borderWidth: 0,
      },
    },
  }

  return <Line options={options} data={data} />
})

export const PieChart = memo(({ data }) => {
  ChartJS.register(ArcElement, Tooltip, Legend)

  const options = {
    cutout: "50%",
    radius: "70%",
    plugins: {
      legend: {
        position: "bottom",
        labels: { boxWidth: 10, boxHeight: 10 },
      },
    },
  }

  return <Pie options={options} data={data} />
})

export const BarChart = memo(({ data }) => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  )

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
        labels: { boxWidth: 8, boxHeight: 8 },
      },
    },
  }

  return <Bar options={options} data={data} />
})
