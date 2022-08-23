import React, { useContext } from "react"
import { ThemeContext } from "styled-components"
import { size } from "../../layout/theme"
import Select from "../../components/Select"

import { DivWrapper, Text, Divider, KeywordsWrapper, DateInput } from "../../layout/styles"

const FinancialReports = ({ onChange }) => {
  const { colors } = useContext(ThemeContext)
  const categories = [
    { value: "", label: "Select category" },
    { value: "rent", label: "Rent" },
    { value: "marketing", label: "Marketing & Advertising" },
  ]

  return (
    <DivWrapper gap={2}>
      <DivWrapper direction="row" top={2} gap={1}>
        <DivWrapper width={size["4xxl"]}>
          <Select options={categories} />
        </DivWrapper>
        <DivWrapper direction="row" align="center" gap={0.8}>
          <Text left={1} color={colors.gray600} size={0.8}>
            From:
          </Text>
          <DateInput type="date" value="" onChange={onChange} />
        </DivWrapper>
        <DivWrapper direction="row" align="center" gap={0.8}>
          <Text left={1} color={colors.gray600} size={0.8}>
            To:
          </Text>
          <DateInput type="date" value="" onChange={onChange} />
        </DivWrapper>
      </DivWrapper>
      <Divider />
      <KeywordsWrapper></KeywordsWrapper>
    </DivWrapper>
  )
}

export default FinancialReports
