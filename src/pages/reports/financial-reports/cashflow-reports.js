import React, { useState } from "react"
import * as R from "ramda"
import { useProfileQuery } from "@services/profile-slice2"
import { useAccountsQuery } from "@services/account-slice"
import { getCashflowChartData } from "@utils/charts-util"

import { format, subDays } from "date-fns"
import { size } from "@layout/theme"

import { DivWrapper, DateInput, SplitDiv, Text, Divider } from "@layout/styles"
import { ButtonState } from "@components"
import { formatCategory, currencyFormatter } from "@utils"

const titles = ["Date", "Inflow", "Outflow", "Balance"]

const convertCashflowData = (data) => {
  let balance = 0
  return data.labels.reduce((acc, item, index) => {
    balance =
      balance + data.datasets[0].data[index] - data.datasets[1].data[index]

    if (
      (typeof data.datasets[0].data[index] === "number" &&
        data.datasets[0].data[index] !== 0) ||
      (typeof data.datasets[1].data[index] === "number" &&
        data.datasets[1].data[index] !== 0)
    ) {
      acc.push({
        label: data.labels[index],
        inflow: data.datasets[0].data[index],
        outflow: data.datasets[1].data[index],
        balance: balance,
      })
    }
    return acc
  }, [])
}

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

  const buttonConditionPL = startDate && endDate

  const handlePL = () => {
    const { resultForDailyCashflow } = getCashflowChartData(
      accounts,
      startDate,
      endDate
    )

    setDailyCashflowData(convertCashflowData(resultForDailyCashflow))
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
            {dailyCashflowData.map((data, index) => (
              <SplitDiv key={index} minWidth={100} gap={1} top={size.xxs}>
                <Text size={size.xxxs}>{data.label}</Text>
                <Text size={size.xxxs}>{currencyFormatter(data.inflow)}</Text>
                <Text size={size.xxxs}>{currencyFormatter(data.outflow)}</Text>
                <Text size={size.xxxs}>{currencyFormatter(data.balance)}</Text>
              </SplitDiv>
            ))}
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
