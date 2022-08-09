//spool the categories from selector and make their ids their value
//create the date components for users to select date range
//get all transactions and sort/filter based on date values
//get the chart.js graph from my exercise repo
//if number of days is more than 30, monthly chart is spooled, if more then 365 days, yearly chart

import React, { useState, useEffect, useContext } from "react"
import { useSelector, useDispatch } from "react-redux"
import { selectUserProfile, selectTransactionCategories } from "../../redux/profileSlice"
import { getTransactions, selectUserTransactions } from "../../redux/accountSlice"
import { useDocument } from "../../hooks/useDocument"
import { formatCategory } from "../../helper"
import { size } from "../../layout/theme"
import { format, subDays } from "date-fns"
import styled, { ThemeContext } from "styled-components"
import { useCharts } from "../../hooks/useCharts"

import Checkbox from "../../components/Checkbox"
import { DivWrapper, SplitDiv, SubTitle, Text, Divider, DateInput, Button } from "../../layout/styles"
import { LineChart } from "../../components/Charts"

const CustomDivWrapper = styled(DivWrapper)`
  flex-wrap: wrap;
`

export const GraphWrapper = styled(DivWrapper)`
  min-height: 400px;
  background-color: ${({ theme }) => theme.colors.reverse};
  border-radius: 15px;
  padding: ${size.xs}rem ${size.xxs}rem;
  box-sizing: border-box;
  border: 1px solid ${({ theme }) => theme.colors.gray300};
`

const CategoryReports = ({ onChange }) => {
  const { colors } = useContext(ThemeContext)
  const dispatch = useDispatch()
  const todayDate = format(new Date(), "yyyy-MM-dd")
  const thirtyDaysAgo = format(subDays(new Date(), 30), "yyyy-MM-dd")
  const [startDate, setStartDate] = useState(thirtyDaysAgo)
  const [endDate, setEndDate] = useState(todayDate)

  //

  const { getChartLabels, dailyCategoryObjects, getData, dailyCategoryData } = useCharts(startDate, endDate)
  const { selectedBusinessId } = useSelector(selectUserProfile)
  const transactionCategories = useSelector((state) => selectTransactionCategories(state, selectedBusinessId))
  const categories = formatCategory(transactionCategories)
  const getTransactionsDoc = useDocument("accounts", selectedBusinessId)
  // dispatch(getTransactions({ data: getTransactionsDoc.document }))
  // const transactions = useSelector(selectUserTransactions)
  const [showCategories, setShowCategories] = useState(categories.map((category) => category.value))

  useEffect(() => {
    getChartLabels()
  }, [])

  //
  const handlePlotChart = () => {
    //setChartLabels(getChartLabels(startDate, endDate))
    // console.log(format(new Date(startDate), "yyyy/MM/dd"))
    getChartLabels(startDate, endDate)
    getData(getTransactionsDoc.document, transactionCategories, showCategories)
  }

  const handleCheckboxChange = (e) => {
    if (showCategories.includes(e.target.value)) {
      const newCategories = showCategories.filter((showcategory) => showcategory !== e.target.value)
      setShowCategories(newCategories)
    } else {
      setShowCategories([...showCategories, e.target.value])
    }
  }

  return (
    <DivWrapper>
      <SubTitle>Select the categories you want to generate reports for.</SubTitle>
      <CustomDivWrapper direction="row" top={1} bottom={2} gap={0.5}>
        {categories &&
          categories
            .filter((category) => category.value)
            .map((category) => (
              <Checkbox
                key={category.value}
                id={category.value}
                value={category.value}
                name="categories"
                checked={showCategories.includes(category.value)}
                onChange={handleCheckboxChange}
              >
                <Text size={0.7}>{category.text}</Text>
              </Checkbox>
            ))}
      </CustomDivWrapper>

      <Divider />

      <SplitDiv minWidth={200} gap={1} top={1}>
        <DateInput type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} size="small" />
        <DateInput type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} size="small" />
        <Button size="small" onClick={handlePlotChart}>
          Apply
        </Button>
      </SplitDiv>

      <GraphWrapper top={3} align="center">
        {dailyCategoryData && (
          <>
            <LineChart data={dailyCategoryData} />
            <SubTitle> Category Reports </SubTitle>
          </>
        )}
      </GraphWrapper>
    </DivWrapper>
  )
}

export default CategoryReports
