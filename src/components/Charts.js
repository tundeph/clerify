import React from "react"
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js"
import { Line } from "react-chartjs-2"

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

  //   const data = {
  //     labels,
  //     datasets: [
  //       {
  //         label: "Dataset 1",
  //         data: [100, 200, 50, 600, 400, 20, 800],
  //         borderColor: "rgb(255, 99, 132)",
  //         backgroundColor: "rgba(255, 99, 132, 0.5)",
  //       },
  //       {
  //         label: "Dataset 2",
  //         data: [10, 2000, 500, 60, 40, 200, 80],
  //         borderColor: "rgb(53, 162, 235)",
  //         // backgroundColor: "rgba(53, 162, 235, 0.5)",
  //       },
  //     ],
  //   }

  return <Line options={options} data={data} />
}