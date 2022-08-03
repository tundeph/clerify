//spool the categories from selector and make their ids their value
//create the date components for users to select date range
//get all transactions and sort/filter based on date values
//get the chart.js graph from my exercise repo
//if number of days is more than 30, monthly chart is spooled, if more then 365 days, yearly chart

import React, { useState, useContext } from "react"
import { useSelector } from "react-redux"
import { selectUserProfile, selectTransactionCategories } from "../../redux/profileSlice"
import { formatCategory } from "../../helper"
import { format, getDaysInMonth } from "date-fns"
import styled, { ThemeContext } from "styled-components"

import Checkbox from "../../components/Checkbox"
import { DivWrapper, SplitDiv, SubTitle, Text, Divider, DateInput } from "../../layout/styles"

import { LineChart } from "../../components/Charts"

const CustomDivWrapper = styled(DivWrapper)`
  flex-wrap: wrap;
`

const CategoryReports = ({ onChange }) => {
  const { colors } = useContext(ThemeContext)
  const { selectedBusinessId } = useSelector(selectUserProfile)
  const transactionCategories = useSelector((state) => selectTransactionCategories(state, selectedBusinessId))
  const categories = formatCategory(transactionCategories)
  const [showCategories, setShowCategories] = useState([])

  const currentMonthAndYear = format(new Date(), "yyyy-MM")
  const totalDaysInMonth = getDaysInMonth(new Date(format(new Date(), "yyyy"), format(new Date(), "M")))
  const [startDate, setStartDate] = useState(`${currentMonthAndYear}-01`)
  const [endDate, setEndDate] = useState(`${currentMonthAndYear}-${totalDaysInMonth}`)

  const handleStartDateChange = () => {}

  const handleEndDateChange = () => {}

  const handleCheckboxChange = (e) => {
    if (showCategories.includes(e.target.value)) {
      const newCategories = showCategories.filter((showcategory) => showcategory !== e.target.value)
      setShowCategories(newCategories)
    } else {
      setShowCategories([...showCategories, e.target.value])
    }
  }
  // console.log("show: ", showCategories)
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
        <DivWrapper>
          <Text left={1} color={colors.gray600} size={0.8}>
            From:
          </Text>
          <DateInput type="date" value={startDate} onChange={handleStartDateChange} />
        </DivWrapper>
        <DivWrapper>
          <Text left={1} color={colors.gray600} size={0.8}>
            To:
          </Text>
          <DateInput type="date" value={endDate} onChange={handleEndDateChange} />
        </DivWrapper>
      </SplitDiv>

      <DivWrapper>
        <LineChart />
      </DivWrapper>
    </DivWrapper>
  )
}

export default CategoryReports
