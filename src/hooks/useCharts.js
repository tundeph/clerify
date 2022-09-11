import { useState } from "react"
import { format, addDays, differenceInDays } from "date-fns"
import { returnColorOptions } from "../helper/defaultData"

export const useCharts = () => {
  let labelArray = []
  let labelArrayforMOM = ["Wk 1", "Wk 2", "Wk 3", "Wk 4", "Wk 5"]
  const initialData = { labels: labelArray, datasets: [] }

  const [isPending, setIsPending] = useState(false)
  const [dailyCategoryData, setDailyCategoryData] = useState(initialData)
  const [combinedCashflowData, setCombinedCashflowData] = useState(initialData)
  const [dailyCashflowData, setDailyCashflowData] = useState(initialData)
  const [MOMData, setMOMData] = useState({ labels: labelArrayforMOM, datasets: [] })

  const returnDate = (dateValue) => {
    return new Date(dateValue)
  }

  const returnRawData = (datas, startDate, endDate) => {
    const numberOfDays = differenceInDays(new Date(endDate), new Date(startDate))
    for (let counter = 0; counter <= numberOfDays; counter++) {
      const added = format(addDays(new Date(startDate), counter), "MMM d")
      labelArray.push(added)
    }

    //get date object
    const final = Array.from(Array(numberOfDays).keys(), (x) => 0)

    let dailyCategory = {}
    let inflow = [...final]
    let outflow = [...final]

    if (!datas) {
      const initialData = {
        labels: labelArray,
        datasets: [],
      }
      return initialData
    }

    Object.entries(datas)
      .filter((data) => {
        return (
          returnDate(data[1].date) >= returnDate(startDate) &&
          returnDate(data[1].date) <= returnDate(endDate) &&
          data[1].categoryId
        )
      })
      .sort((a, b) => returnDate(a[1].date) - returnDate(b[1].date))
      .forEach((item) => {
        let currentKey = differenceInDays(new Date(item[1].date), new Date(startDate))
        //dailyCashflow
        if (item[1].type === "credit") {
          inflow[currentKey] = item[1].amount
        } else if (item[1].type === "debit") {
          outflow[currentKey] = item[1].amount
        }

        //dailyCategory
        if (!dailyCategory[item[1].categoryId]) {
          dailyCategory[item[1].categoryId] = [...final]
          dailyCategory[[item[1].categoryId]][currentKey] += item[1].amount / 100
        } else {
          dailyCategory[[item[1].categoryId]][currentKey] += item[1].amount / 100
        }
      })

    return { dailyCategory, dailyCashflow: { inflow, outflow } }
  }

  const getMOMData = (datas, categories, filteredCategories, firstMonth, secondMonth) => {
    const firstMonthStartDate = `${firstMonth}-01`
    const firstMonthEndDate = `${firstMonth}-31`
    const secondMonthStartDate = `${secondMonth}-01`
    const secondMonthEndDate = `${secondMonth}-31`

    setIsPending(true)
    const firstData = returnRawData(datas, firstMonthStartDate, firstMonthEndDate)
    const secondData = returnRawData(datas, secondMonthStartDate, secondMonthEndDate)

    //format for MOM cashflow
    const resultForMOMCategory = { labels: [], datasets: [] }

    const returnData = (data, date) => {
      let obj = {}
      const d = date.split("-")
      const monthLabel = format(new Date(d[0], d[1], d[2]), "MMM yyyy")

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
          let formattedData = []
          for (let counter = 0; counter < 5; counter++) {
            let figure = 0
            for (let i = counter * 7; i < (counter + 1) * 7; i++) {
              if (i < currentData[1].length) {
                figure += currentData[1][i]
              }
            }
            formattedData.push(figure)
          }

          obj = {
            label: monthLabel,
            data: formattedData,
            backgroundColor: returnColorOptions(),
          }
        }
      })

      return obj
    }

    resultForMOMCategory.datasets[0] = returnData(firstData.dailyCategory, firstMonthStartDate)
    resultForMOMCategory.datasets[1] = returnData(secondData.dailyCategory, secondMonthStartDate)
    resultForMOMCategory.labels = labelArrayforMOM

    setMOMData(resultForMOMCategory)
    setIsPending(false)
  }

  //
  const getCashflowData = (datas, startDate, endDate) => {
    let { dailyCashflow } = returnRawData(datas, startDate, endDate)
    let resultForDailyCashflow = {}
    setIsPending(true)

    const emptyTransactions = [0, 0]
    const dayLabel = Array.from(Array(30).keys(), (x) => x + 1)

    if (!datas) {
      dailyCashflow = {
        inflow: emptyTransactions,
        outflow: emptyTransactions,
      }
    }

    //format for MOM cashflow
    const inflowMonthly = dailyCashflow.inflow.reduce((previous, current) => previous + current, 0)
    const outflowMonthly = dailyCashflow.outflow.reduce(
      (previous, current) => previous + current,
      0
    )

    const inflowDaily = dailyCashflow.inflow.map((selected) => selected / 100)
    const outflowDaily = dailyCashflow.outflow.map((selected) => selected / 100)

    resultForDailyCashflow = {
      labels: dayLabel,
      datasets: [
        {
          label: "Inflow",
          data: inflowDaily,
          backgroundColor: returnColorOptions(),
        },
        {
          label: "Outflow",
          data: outflowDaily,
          backgroundColor: returnColorOptions(),
        },
      ],
    }

    const resultForMonthlyCashflow = {
      labels: ["Inflow", "Outflow"],
      datasets: [
        {
          label: "# of Votes", ////check this label
          data: [inflowMonthly / 100, outflowMonthly / 100],
          backgroundColor: ["#afb42b", "#ffcc80"],
          // borderColor: ["#dcedc8", "#ffcc80"],
          borderWidth: 0.5,
          hoverOffset: 10,
          hoverBackgroundColor: ["#afb42b", "#ffcc80"],
        },
      ],
    }

    setCombinedCashflowData(resultForMonthlyCashflow)
    setDailyCashflowData(resultForDailyCashflow)
    setIsPending(false)
  }

  //
  const getData = (datas, categories, filteredCategories, startDate, endDate) => {
    let dailyCategory = {}
    setIsPending(true)

    const numberOfDays = differenceInDays(new Date(endDate), new Date(startDate))
    for (let counter = 0; counter <= numberOfDays; counter++) {
      const added = format(addDays(new Date(startDate), counter), "MMM d")
      labelArray.push(added)
    }

    //get date object
    const final = Array.from(Array(labelArray.length).keys(), (x) => 0)

    if (!datas) {
      const initialData = {
        labels: labelArray,
        datasets: [],
      }
      return initialData
    }

    Object.entries(datas)
      .filter((data) => {
        return (
          returnDate(data[1].date) >= returnDate(startDate) &&
          returnDate(data[1].date) <= returnDate(endDate) &&
          data[1].categoryId
        )
      })
      .sort((a, b) => returnDate(a[1].date) - returnDate(b[1].date))
      .forEach((item) => {
        //dailyCategory
        let currentKey = differenceInDays(new Date(item[1].date), new Date(startDate))
        if (!dailyCategory[item[1].categoryId]) {
          dailyCategory[item[1].categoryId] = [...final]
          dailyCategory[[item[1].categoryId]][currentKey] += item[1].amount / 100
        } else {
          dailyCategory[[item[1].categoryId]][currentKey] += item[1].amount / 100
        }

        //format in chart.js data form
        const resultForCategory = { labels: [], datasets: [] }
        Object.entries(dailyCategory).forEach((currentData) => {
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

        setDailyCategoryData(resultForCategory)
      })

    setIsPending(false)
  }

  return {
    isPending,
    getData,
    dailyCategoryData,
    getCashflowData,
    combinedCashflowData,
    dailyCashflowData,
    getMOMData,
    MOMData,
    returnRawData,
  }
}
