import React from "react"
import styled from "styled-components"
import { size } from "../../layout/theme"
import {
  PageWrapper,
  UserWrapper,
  DivWrapper,
  Title,
  Text,
} from "../../layout/styles"

import TabDiv from "../../components/TabDiv"

import CategoryReports from "./CategoryReports"
import FinancialReports from "./FinancialReports"

export const CustomText = styled(Text)`
  background-color: ${({ theme }) => theme.colors.gray100};
  border-radius: 100px;
  padding: ${size.xxs}rem ${size.xs}rem;
  box-sizing: border-box;
`

export const HalfDiv = styled(DivWrapper)`
  width: 50%;
`

const Reports = () => {
  const categories = [
    { value: "", text: "Select account" },
    { value: "gtb", text: "Guarantee Trust Bank" },
    { value: "zenith", text: "Zenith Bank" },
  ]

  const Tab1 = <CategoryReports selectData={categories} />

  const Tab2 = <FinancialReports selectData={categories} />

  const contents = [
    { title: "By Category", data: Tab1 },
    { title: "By Financial Reports", data: Tab2 },
  ]

  const handleClick = (text) => {
    console.log(text)
  }
  return (
    <>
      <PageWrapper>
        <UserWrapper>
          <DivWrapper bottom={size.m}>
            <Title> Reports </Title>
          </DivWrapper>
          <DivWrapper bottom={size.m}>
            <TabDiv contents={contents} />
          </DivWrapper>
        </UserWrapper>
      </PageWrapper>
    </>
  )
}

export default Reports
