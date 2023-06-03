import React, { useState } from "react"
import { useProfileQuery } from "@services/profile-slice2"
import { useAccountsQuery } from "@services/account-slice"
import { getCategoryChartData } from "@utils/charts-util"

import { format, subDays } from "date-fns"

import { DivWrapper, DateInput, SplitDiv } from "@layout/styles"
import { ButtonState, ReportsTable } from "@components"
import { formatCategory } from "@utils"

export const FinancialProfitAndLossReport = (props) => {
  const { data } = useProfileQuery()
  const { data: accounts } = useAccountsQuery(props.selectedBusinessId)
  const { business } = data

  const todayDate = format(new Date("2022/06/30"), "yyyy-MM-dd")
  const thirtyDaysAgo = format(
    subDays(new Date("2022/06/30"), 30),
    "yyyy-MM-dd"
  )

  const transactionCategories = business[props.selectedBusinessId].categories
  const categories = formatCategory(transactionCategories)

  const [startDate, setStartDate] = useState(thirtyDaysAgo)
  const [endDate, setEndDate] = useState(todayDate)
  const [dailyCategoryData, setDailyCategoryData] = useState()

  const [showCategories] = useState(
    categories.map((category) => category.value)
  )

  const buttonConditionPL = startDate && endDate

  const handlePL = () => {
    const { resultForCategory } = getCategoryChartData(
      accounts,
      transactionCategories,
      showCategories,
      startDate,
      endDate
    )
    setDailyCategoryData(resultForCategory)
  }

  return (
    <DivWrapper gap={2}>
      <SplitDiv minWidth={120} gap={1} top={1}>
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
        <ButtonState
          size="small"
          loading={false}
          condition={buttonConditionPL}
          loadingText=""
          onClick={handlePL}
        >
          Apply
        </ButtonState>
      </SplitDiv>

      <DivWrapper>
        {dailyCategoryData && transactionCategories && (
          <ReportsTable
            data={dailyCategoryData}
            categories={transactionCategories}
          />
        )}
      </DivWrapper>
    </DivWrapper>
  )
}
