//this gets the categories from state, gets all transactions
// and sort/filter based on date values then plot line chart

import React, { useState, useEffect } from "react"
import { getCategoryChartData } from "@utils/charts-util"
import { formatCategory } from "@utils"
import { format, subDays } from "date-fns"
import { useOutletContext } from "react-router-dom"

import { DivWrapper, SplitDiv, DateInput, GraphWrapper } from "@layout/styles"
import { LineChart } from "@components/charts"

export const VisualCategoryReport = () => {
  const { selectedBusinessId, business, accounts, transactionCategories } =
    useOutletContext()

  const todayDate = format(new Date("2022/06/30"), "yyyy-MM-dd")
  const thirtyDaysAgo = format(
    subDays(new Date("2022/06/30"), 30),
    "yyyy-MM-dd"
  )

  //
  const [startDate, setStartDate] = useState(thirtyDaysAgo)
  const [endDate, setEndDate] = useState(todayDate)
  const [chartData, setChartData] = useState()

  const categories = formatCategory(transactionCategories)
  const [showCategories] = useState(
    categories.map((category) => category.value)
  )

  //get the chart data and load once component loads
  useEffect(() => {
    const { cumulativeResultForCategory } = getCategoryChartData(
      accounts,
      business[selectedBusinessId].categories,
      showCategories,
      startDate,
      endDate
    )
    setChartData(cumulativeResultForCategory)

    return () => {
      setChartData(null)
    }
  }, [
    accounts,
    showCategories,
    startDate,
    endDate,
    business,
    selectedBusinessId,
  ])

  return (
    <>
      <DivWrapper bottom={2}>
        <SplitDiv minWidth={120} gap={1} top={2}>
          <DateInput
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            size="small"
          />
          <DateInput
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            size="small"
          />
        </SplitDiv>
        <DivWrapper top={1}>
          <GraphWrapper top={1}>
            {/* {dailyCategoryData && <LineChart data={dailyCategoryData} />}
						<Divider /> */}

            {chartData && <LineChart data={chartData} />}
          </GraphWrapper>
        </DivWrapper>
      </DivWrapper>
    </>
  )
}
