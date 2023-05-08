import React from "react"
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

export const LineChart = ({ data }) => {
  ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
        labels: { boxWidth: 10, boxHeight: 2 },
      },
      title: {
        display: true,
        // text: "Chart.js Line Chart",
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
}

export const PieChart = ({ data }) => {
  ChartJS.register(ArcElement, Tooltip, Legend)

  const options = {
    cutout: "50%",
    radius: "70%",
    plugins: {
      legend: {
        position: "bottom",
        labels: { boxWidth: 10, boxHeight: 4 },
      },
    },
  }

  return <Pie options={options} data={data} />
}

export const BarChart = ({ data }) => {
  ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
        labels: { boxWidth: 10, boxHeight: 4 },
      },
      title: {
        display: true,
        // text: 'Chart.js Bar Chart',
      },
    },
  }

  return <Bar options={options} data={data} />
}
