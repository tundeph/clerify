import { format, addDays, differenceInDays } from "date-fns"
import { returnColorOptions } from "./default-data"
import * as R from "ramda"

// return label array of dates from start date to end date

const returnLabelArray = (numberOfDays, startDate) => {
  const labelArray = []
  for (let counter = 0; counter <= numberOfDays; counter++) {
    const added = format(addDays(new Date(startDate), counter), "dd-M")
    labelArray.push(added)
  }

  return labelArray
}

// helper function that adds all the figures in the data array of the datasets
// to give cumulative figures
const returnCumulativeCategoryData = (data) =>
  R.over(
    R.lensProp("datasets"),
    R.map((dataset) => {
      const updatedData = R.scan(R.add, 0, dataset.data)
      return R.assoc("data", updatedData, dataset)
    })
  )(data)

const returnDate = (dateValue) => {
  return new Date(dateValue)
}

// helper function for the getMOMdata method
const returnMOMData = (data, filteredCategories, date) => {
  let obj = {}
  let formattedData = []

  const monthLabel = format(new Date(date), "MMM yyyy")

  if (Object.keys(data).length === 0) {
    obj = {
      label: monthLabel,
      data: [0, 0, 0, 0, 0],
      backgroundColor: returnColorOptions(),
    }

    return obj
  }

  Object.entries(data).forEach((currentData) => {
    if (filteredCategories.includes(currentData[0])) {
      for (let counter = 0; counter < 5; counter++) {
        let figure = 0
        for (let i = counter * 7; i < (counter + 1) * 7; i++) {
          if (i < currentData[1].length) {
            figure += currentData[1][i]
          }
        }
        formattedData.push(figure)
      }
    }
  })

  obj = {
    label: monthLabel,
    data: formattedData,
    backgroundColor: returnColorOptions(),
  }

  return obj
}

// helper function for the getting the rawData method
const returnRawData = (datas, startDate, endDate) => {
  let labelArray = []
  let dailyCategory = {}
  let inflow
  let outflow

  const numberOfDays = differenceInDays(new Date(endDate), new Date(startDate))

  if (numberOfDays < 1 || !datas) {
    return { dailyCategory, dailyCashflow: { inflow, outflow } }
  }

  for (let counter = 0; counter <= numberOfDays; counter++) {
    const added = format(addDays(new Date(startDate), counter), "MMM d")
    labelArray.push(added)
  }

  //get date object
  const final = Array.from(Array(numberOfDays).keys(), (x) => 0)

  inflow = [...final]
  outflow = [...final]

  // filter data that are within the date and have categoryId
  datas
    .filter((data) => {
      return (
        returnDate(data.date) >= returnDate(startDate) &&
        returnDate(data.date) <= returnDate(endDate) &&
        data.categoryId
      )
    })
    .sort((a, b) => returnDate(a.date) - returnDate(b.date))
    .forEach((item) => {
      let currentKey = differenceInDays(
        new Date(item.date),
        new Date(startDate)
      )

      //dailyCashflow
      if (item.type === "credit") {
        inflow[currentKey] += item.amount
      } else if (item.type === "debit") {
        outflow[currentKey] += item.amount
      }

      //dailyCategory
      //if a categoryId does not exist, set the object for that categoryId
      if (!dailyCategory[item.categoryId]) {
        dailyCategory[item.categoryId] = [...final]
        // add the amount of the transaction inside the categoryId.currentKey
        dailyCategory[[item.categoryId]][currentKey] = item.amount / 100
      } else {
        // add the amount of the transaction inside the categoryId.currentKey
        dailyCategory[[item.categoryId]][currentKey] = item.amount / 100
      }
    })

  return { dailyCategory, dailyCashflow: { inflow, outflow } }
}

//
export const getCategoryChartData = (
  datas,
  categories,
  filteredCategories,
  startDate,
  endDate
) => {
  let labelArray = []

  if (startDate && endDate) {
    let { dailyCategory } = returnRawData(datas, startDate, endDate)

    //calculate number of days between start and end date
    const numberOfDays = differenceInDays(
      new Date(endDate),
      new Date(startDate)
    )

    labelArray = returnLabelArray(numberOfDays, startDate)

    // create the array for the chart labels
    // for (let counter = 0; counter <= numberOfDays; counter++) {
    //   const added = format(addDays(new Date(startDate), counter), "dd-M")
    //   labelArray.push(added)
    // }

    const resultForCategory = { labels: labelArray, datasets: [] }

    if (
      !datas ||
      !categories ||
      !filteredCategories ||
      !startDate ||
      !endDate
    ) {
      return resultForCategory
    } else {
      //format the sorted dailyCategory data for chart.js
      Object.entries(dailyCategory).forEach((currentData) => {
        // check that filteredCategories has a category
        // this is used to make the chart responsive so that we can filter categories to be
        // shown from the user interface. currentData[0] returns categoryId
        if (filteredCategories.includes(currentData[0])) {
          const title = categories.filter(
            (currentCategory) => currentCategory.categoryId === currentData[0]
          )[0].title
          const obj = {
            label: title,
            data: currentData[1],
            borderColor: returnColorOptions(),
            tension: 0.2,
          }
          resultForCategory.datasets.push(obj)
          resultForCategory.labels = labelArray
        }
      })

      // transform the data array to generate to cumulative chart data fro comparisons
      const cumulativeDataSets = resultForCategory.datasets.map((result) => {
        return result.data.reduce((acc, item, index) => {
          if (index === 0) {
            acc.push(item)
          } else {
            // let newtot =
            acc.push(acc[index - 1] + item)
          }
          return acc
        }, [])
      })

      const cumulativeResultForCategory =
        returnCumulativeCategoryData(resultForCategory)

      //return results
      return { resultForCategory, cumulativeResultForCategory }
    }
  } else {
    const emptyResult = { labels: [], datasets: [] }
    return {
      resultForCategory: emptyResult,
      cumulativeResultForCategory: emptyResult,
    }
  }
}

//
export const getCashflowChartData = (datas, startDate, endDate) => {
  const { dailyCashflow } = returnRawData(datas, startDate, endDate)
  const numberOfDays = differenceInDays(new Date(endDate), new Date(startDate))

  // create the array for the chart labels
  // const dayLabel = Array.from(Array(numberOfDays).keys(), (x) => x + 1)

  const dayLabel = returnLabelArray(numberOfDays, startDate)

  //initially define empty data for charts
  const resultForDailyCashflow = {
    labels: dayLabel,
    datasets: [
      {
        label: "Inflow",
        data: [],
        backgroundColor: returnColorOptions(),
      },
      {
        label: "Outflow",
        data: [],
        backgroundColor: returnColorOptions(),
      },
    ],
  }

  const resultForMonthlyCashflow = {
    labels: ["Inflow", "Outflow"],
    datasets: [
      {
        label: "Cashflow",
        data: [0, 0],
        backgroundColor: ["#228f3f", "#1d52a8"],
        borderWidth: 0.5,
        hoverOffset: 10,
        hoverBackgroundColor: ["#2aa149", "#2762c2"],
      },
    ],
  }

  // if there is no transaction data or start date is higher than end date, return empty objects
  if (!datas || !dailyCashflow || numberOfDays < 1) {
    return { resultForMonthlyCashflow, resultForDailyCashflow }
  }

  //calculate monthly cashflow from transactions
  const inflowMonthly = dailyCashflow.inflow.reduce(
    (previous, current) => previous + current,
    0
  )
  const outflowMonthly = dailyCashflow.outflow.reduce(
    (previous, current) => previous + current,
    0
  )

  //calculate daily cashflow from transactions
  const inflowDaily = dailyCashflow.inflow.map((selected) => selected / 100)
  const outflowDaily = dailyCashflow.outflow.map((selected) => selected / 100)

  //this formats object data for daily cashflow chart
  resultForDailyCashflow.datasets[0].data = inflowDaily
  resultForDailyCashflow.datasets[1].data = outflowDaily

  //this formats object data for monthly cashflow chart
  resultForMonthlyCashflow.datasets[0].data = [
    inflowMonthly / 100,
    outflowMonthly / 100,
  ]

  return { resultForMonthlyCashflow, resultForDailyCashflow }
}

//
export const getMOMChartData = (
  datas,
  filteredCategories,
  firstMonth,
  secondMonth
) => {
  let labelArrayforMOM = ["Wk 1", "Wk 2", "Wk 3", "Wk 4", "Wk 5"]

  const firstMonthStartDate = `${firstMonth}-01`
  const firstMonthEndDate = `${firstMonth}-31`
  const secondMonthStartDate = `${secondMonth}-01`
  const secondMonthEndDate = `${secondMonth}-31`

  const firstData = returnRawData(datas, firstMonthStartDate, firstMonthEndDate)
  const secondData = returnRawData(
    datas,
    secondMonthStartDate,
    secondMonthEndDate
  )

  //format for MOM cashflow
  const resultForMOMCategory = { labels: [], datasets: [] }

  resultForMOMCategory.datasets[0] = returnMOMData(
    firstData.dailyCategory,
    filteredCategories,
    firstMonth
  )
  resultForMOMCategory.datasets[1] = returnMOMData(
    secondData.dailyCategory,
    filteredCategories,
    secondMonth
  )
  resultForMOMCategory.labels = labelArrayforMOM

  return resultForMOMCategory
}
