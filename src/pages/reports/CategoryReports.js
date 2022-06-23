import React, { useContext } from "react"
import { ThemeContext } from "styled-components"
import { size } from "../../layout/theme"

import Checkbox from "../../components/Checkbox"

import {
  DivWrapper,
  SubTitle,
  Text,
  Divider,
  HalfDiv,
  DateInput,
} from "../../layout/styles"

const CategoryReports = ({ onChange }) => {
  const { colors } = useContext(ThemeContext)
  return (
    <DivWrapper>
      <SubTitle>
        Select the categories you want to generate reports for.
      </SubTitle>
      <DivWrapper direction="row" top={2} bottom={3} gap={3}>
        <Checkbox id="ad">
          <Text size={0.9} color={colors.gray600}>
            Advertising
          </Text>
        </Checkbox>
        <Checkbox id="sales">
          <Text size={0.9} color={colors.gray600}>
            Sales
          </Text>
        </Checkbox>
      </DivWrapper>

      <Divider />

      <DivWrapper direction="row" top={2} gap={4}>
        <HalfDiv gap={size.xxxs}>
          <Text left={1} color={colors.gray600} size={0.8}>
            From:
          </Text>
          <DateInput type="date" value="2022-01-05" onChange={onChange} />
        </HalfDiv>
        <HalfDiv gap={size.xxxs}>
          <Text left={1} color={colors.gray600} size={0.8}>
            To:
          </Text>
          <DateInput type="date" value="" onChange={onChange} />
        </HalfDiv>
      </DivWrapper>
    </DivWrapper>
  )
}

export default CategoryReports
