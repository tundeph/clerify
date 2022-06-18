import React, { useContext } from "react"
import styled, { ThemeContext } from "styled-components"
import { size } from "../layout/theme"

import { DivWrapper, HalfDiv, Button, Text, DateInput } from "../layout/styles"

import Select from "../components/Select"
import RadioInput from "../components/RadioInput"

export const CustomText = styled(Text)`
  background-color: ${({ theme }) => theme.colors.gray100};
  border-radius: 100px;
  padding: ${size.xxs}rem ${size.xs}rem;
  box-sizing: border-box;
`

const SyncFromOpenBank = ({ selectData, selectOnChange, onChange }) => {
  const { colors } = useContext(ThemeContext)

  return (
    <form>
      <DivWrapper gap={2}>
        <Select data={selectData} onChange={selectOnChange} />
        <DivWrapper direction="horizontal" gap={3} align="center">
          <HalfDiv>
            <Text size={0.8}>Last date in account data </Text>
          </HalfDiv>
          <HalfDiv>
            <CustomText size={0.8}> January 25, 2022 at 9:03am </CustomText>
          </HalfDiv>
        </DivWrapper>
        <DivWrapper gap={1}>
          <Text>Synchronize data from: </Text>
          <RadioInput name="sync" id="sync3" onChange={onChange}>
            Last date in account data
          </RadioInput>
          <RadioInput name="sync" id="sync2" onChange={onChange}>
            My chosen date
          </RadioInput>
        </DivWrapper>
        <DivWrapper direction="row" gap={4}>
          <HalfDiv gap={size.xxxs}>
            <Text left={1} color={colors.gray600} size={0.8}>
              From:
            </Text>
            <DateInput
              type="datetime-local"
              value="2022-01-05T09:04"
              onChange={onChange}
            />
          </HalfDiv>
          <HalfDiv gap={size.xxxs}>
            <Text left={1} color={colors.gray600} size={0.8}>
              To:
            </Text>
            <DateInput type="datetime-local" value="" onChange={onChange} />
          </HalfDiv>
        </DivWrapper>
        <Button type="submit">Sync data </Button>
      </DivWrapper>
    </form>
  )
}

export default SyncFromOpenBank
