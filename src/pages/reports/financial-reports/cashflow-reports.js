import React, { useState, useEffect } from "react"
import { useProfileQuery } from "@services/profile-slice2"
import { useAccountsQuery } from "@services/account-slice"
import { getCashflowChartData } from "@utils/charts-util"

import { format, subDays } from "date-fns"
import { size } from "@layout/theme"

import { DivWrapper, DateInput, SplitDiv, Text, Divider } from "@layout/styles"
import { ButtonState } from "@components"
import { formatCategory, currencyFormatter } from "@utils"

let cashflowBalance = 0

const titles = ["Date", "Inflow", "Outflow", "Balance"]

const hasOutflowOrInflow = (dailyCashflowData, index) =>
  (typeof dailyCashflowData.datasets[0].data[index] === "number" &&
    dailyCashflowData.datasets[0].data[index] !== 0) ||
  (typeof dailyCashflowData.datasets[1].data[index] === "number" &&
    dailyCashflowData.datasets[1].data[index] !== 0)

export const FinancialCashflowReport = (props) => {
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
  const [dailyCashflowData, setDailyCashflowData] = useState(null)
  const [info, setInfo] = useState("Click the Apply button to see the reports")

  const [showCategories] = useState(
    categories.map((category) => category.value)
  )

  const buttonConditionPL = startDate && endDate

  const handlePL = () => {
    const { resultForDailyCashflow } = getCashflowChartData(
      accounts,
      startDate,
      endDate
    )

    setDailyCashflowData(resultForDailyCashflow)
    setInfo("Sory, No data to show!")
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
        <SplitDiv minWidth={100} gap={1} top={size.xs} bottom={size.xxs}>
          {titles.map((title, index) => (
            <Text key={index} size={size.xxxs} bold>
              {title}
            </Text>
          ))}
        </SplitDiv>
        <Divider />
        {dailyCashflowData ? (
          <>
            {dailyCashflowData.labels.map((label, index) => {
              return hasOutflowOrInflow(dailyCashflowData, index) ? (
                <SplitDiv key={index} minWidth={100} gap={1} top={size.xxs}>
                  <Text size={size.xxxs}>{label}</Text>
                  <Text size={size.xxxs}>
                    {currencyFormatter(
                      dailyCashflowData.datasets[0].data[index]
                    )}
                  </Text>
                  <Text size={size.xxxs}>
                    {currencyFormatter(
                      dailyCashflowData.datasets[1].data[index]
                    )}
                  </Text>
                  <Text size={size.xxxs}>
                    {currencyFormatter(
                      cashflowBalance +
                        dailyCashflowData.datasets[0].data[index] -
                        dailyCashflowData.datasets[1].data[index]
                    )}
                  </Text>
                </SplitDiv>
              ) : null
            })}
          </>
        ) : (
          <Text size={size.xxxs} top={size.xxs}>
            {info}
          </Text>
        )}
      </DivWrapper>
    </DivWrapper>
  )
}
