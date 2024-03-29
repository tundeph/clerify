// component that renders when users dont have uncategorized transactions
import React, { useContext } from "react"
import styled, { ThemeContext } from "styled-components"
import { DivWrapper, Text, CheckmarkCircleIcon } from "../layout/styles"

const CustomCheckmarkCircleIcon = styled(CheckmarkCircleIcon)`
  height: 5em;
`

export const NoTransactions = () => {
  const { colors } = useContext(ThemeContext)

  return (
    <DivWrapper color={colors.green} align="center" gap={2}>
      <CustomCheckmarkCircleIcon />
      <Text>You don't have any uncategorised transaction!</Text>
    </DivWrapper>
  )
}
