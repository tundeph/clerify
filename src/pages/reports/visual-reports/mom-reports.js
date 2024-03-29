// this helps to render the month on month reports
import React, { useState, useMemo } from "react"
import { format, subDays } from "date-fns"

import { useOutletContext } from "react-router-dom"
import { getMOMChartData } from "@utils/charts-util"
import { formatCategoryDropDown } from "@utils"

import {
  DivWrapper,
  SplitDiv,
  Text,
  DateInput,
  GraphWrapper,
} from "@layout/styles"
import { Select, BarChart } from "@components"

const todayDate = format(new Date("2022/06/30"), "yyyy-MM")
const thirtyDaysAgo = format(subDays(new Date("2022/06/30"), 30), "yyyy-MM")

export const VisualMomReport = () => {
  const { accounts, transactionCategories } = useOutletContext()

  const [firstMonth, setFirstMonth] = useState(thirtyDaysAgo)
  const [secondMonth, setSecondMonth] = useState(todayDate)
  const [MOMCategory, setMOMCategory] = useState("")

  // get the month on month data
  const chartData = useMemo(
    () => getMOMChartData(accounts, MOMCategory, firstMonth, secondMonth),
    [accounts, MOMCategory, firstMonth, secondMonth]
  )

  const categoriesDropDown = formatCategoryDropDown(transactionCategories)

  return (
    <DivWrapper bottom={2}>
      <Text bold size={1}>
        Month-on-Month (MOM) Reports
      </Text>
      <SplitDiv minWidth={120} gap={1} top={2}>
        <DateInput
          type="month"
          value={firstMonth}
          onChange={(e) => setFirstMonth(e.target.value)}
          size="small"
        />
        <DateInput
          type="month"
          value={secondMonth}
          onChange={(e) => setSecondMonth(e.target.value)}
          size="small"
        />
        <Select
          options={categoriesDropDown}
          onChange={(e) => setMOMCategory(e.target.value)}
          value={MOMCategory}
          size="small"
        />
      </SplitDiv>
      <DivWrapper top={1}>
        <GraphWrapper top={1}>
          {chartData && <BarChart data={chartData} />}
        </GraphWrapper>
      </DivWrapper>
    </DivWrapper>
  )
}
