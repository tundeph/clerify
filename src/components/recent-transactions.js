// component that renders recent transactions on dashboard
import React from "react"
import styled from "styled-components"
import { currencyFormatter } from "../helper"

import { Text, Divider } from "../layout/styles"

const CustomDivWrapper = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: 100px 1fr;
  grid-template-rows: repeat(1, 50px);
  align-items: center;
  vertical-align: middle;
  grid-gap: 3px;
  box-sizing: border-box;
`

const CustomText = styled(Text)`
  white-space: nowrap;
  overflow: hidden;
`

export const RecentTransactions = ({ data }) => {
  const numOfTransactions = 5

  return (
    <>
      {Object.entries(data)
        .sort((a, b) => new Date(a[1].date) - new Date(b[1].date))
        .slice(0, numOfTransactions)
        .map((raw, index) => (
          <React.Fragment key={index}>
            <CustomDivWrapper>
              <Text size={0.8}>{currencyFormatter(raw[1].amount / 100)} </Text>
              <CustomText size={0.8}>{raw[1].remarks} </CustomText>
            </CustomDivWrapper>
            {index < numOfTransactions - 1 ? <Divider /> : null}
          </React.Fragment>
        ))}
    </>
  )
}
