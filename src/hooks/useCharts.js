import { useState } from "react"
import { format, addDays, differenceInDays } from "date-fns"

const data = {
  labels: [],
  datasets: [
    {
      label: "Dataset 1",
      data: [100, 200, 50, 600, 400, 20, 800],
      borderColor: "rgb(255, 99, 132)",
      //  backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Dataset 2",
      data: [10, 2000, 500, 60, 40, 200, 80],
      borderColor: "rgb(53, 162, 235)",
      // backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
}

export const useCharts = (startDate, endDate) => {
  const [isPending, setIsPending] = useState(false)
  const [dailyCategoryObjects, setDailyCategoryObjects] = useState(data)

  let labelArray = []
  const numberOfDays = differenceInDays(new Date(endDate), new Date(startDate))
  for (let counter = 0; counter <= numberOfDays; counter++) {
    const added = format(addDays(new Date(startDate), counter), "MMM d")
    labelArray.push(added)
  }
  const [dailyCategoryData, setDailyCategoryData] = useState({ labels: labelArray, datasets: [] })
  //   setDailyCategoryData({ labels: labelArray, datasets: [] })

  const getChartLabels = () => {
    setIsPending(true)
    setDailyCategoryObjects({ ...dailyCategoryObjects, ...{ labels: labelArray } })
    setIsPending(false)
  }

  const returnDate = (dateValue) => {
    return new Date(dateValue)
  }

  const getData = (datas, categories, filteredCategories) => {
    let dailyCashflow = {}
    let dailyCategory = {}

    //get date object
    const final = Object.keys(labelArray).map((label) => 0)

    Object.entries(datas)
      .filter((data) => {
        return returnDate(data[1].date) >= returnDate(startDate) && returnDate(data[1].date) <= returnDate(endDate)
      })
      .sort((a, b) => returnDate(a[1].date) - returnDate(b[1].date))
      .map((item) => {
        //dailyCategory
        let currentKey = differenceInDays(new Date(item[1].date), new Date(startDate))
        if (!dailyCategory[item[1].categoryId]) {
          dailyCategory[item[1].categoryId] = [...final]
          dailyCategory[[item[1].categoryId]][currentKey] += item[1].amount / 100
        } else {
          dailyCategory[[item[1].categoryId]][currentKey] += item[1].amount / 100
        }

        const generateRgb = () => {
          let result = "rgb("
          for (let counter = 0; counter < 3; counter++) {
            const number = Math.floor(Math.random() * (255 - 100 + 1) + 100)
            counter !== 2 ? (result += `${number},`) : (result += `${number})`)
          }
          return result
        }

        //format in chart.js data form
        const result = { labels: [], datasets: [] }
        Object.entries(dailyCategory).forEach((currentData) => {
          if (filteredCategories.includes(currentData[0])) {
            const title = categories.filter((currentCategory) => currentCategory.categoryId === currentData[0])[0].title
            const obj = {
              label: title,
              data: currentData[1],
              borderColor: generateRgb(),
            }
            result.datasets.push(obj)
            result.labels = labelArray
          }
        }, [])

        //weekly

        //monthly
        setDailyCategoryData(result)
      })
  }

  return { isPending, getChartLabels, dailyCategoryObjects, getData, dailyCategoryData }
}
