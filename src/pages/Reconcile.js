import React, { useContext } from "react"
import styled, { ThemeContext } from "styled-components"

import { size } from "../layout/theme"
import {
  PageWrapper,
  UserWrapper,
  DivWrapper,
  Title,
  SubTitle,
  CalendarIcon,
  DebitIcon,
  Text,
  Button,
  ArrowForwardIcon,
} from "../layout/styles"

import Select from "../components/Select"

export const GrayWrapper = styled(DivWrapper)`
  background-color: ${({ theme }) => theme.colors.gray100};
  border-radius: 15px;
  padding: ${size.l}rem ${size.l}rem;
  box-sizing: border-box;
`

export const CustomDivWrapper = styled(DivWrapper)`
  gap: ${size.xxxs}rem;
  height: 160px;
  box-shadow: 2px 2px 2px ${({ theme }) => theme.colors.gray300};
  background-color: ${({ theme }) => theme.colors.reverse};
  border-radius: 15px;
  padding: ${size.xs}rem ${size.xxs}rem;
  box-sizing: border-box;
  overflow-y: scroll;
`

const CustomButton = styled(Button)`
  padding: ${size.s}rem ${size.s}rem;
`

const Reconcile = () => {
  const { colors } = useContext(ThemeContext)

  const categories = [
    { value: "", text: "Select category" },
    { value: "rent", text: "Rent" },
    { value: "marketing", text: "Marketing & Advertising" },
  ]

  return (
    <>
      <PageWrapper>
        <UserWrapper>
          <DivWrapper bottom={size.xs}>
            <Title> Reconcile records </Title>
            <SubTitle> Reconcile your data by uploading them.</SubTitle>
          </DivWrapper>
          <GrayWrapper gap={3}>
            <DivWrapper direction="row" justify="space-between">
              <DivWrapper direction="row">
                <Text size={size.xxxs} color={colors.gray600}>
                  <CalendarIcon /> 13/02/2022
                </Text>
              </DivWrapper>
              <DivWrapper direction="row">
                <Text size={size.xxxs} color={colors.red}>
                  DEBIT <DebitIcon />
                </Text>
              </DivWrapper>
            </DivWrapper>

            <CustomDivWrapper align="center">
              <Text size={size.m} color={colors.red}>
                N191,000.00
              </Text>
              <Text color={colors.gray600}>
                Transfer to Tayo for staff Uniforms
              </Text>
            </CustomDivWrapper>

            <DivWrapper direction="row" gap={1}>
              <Select data={categories} />
              <CustomButton>
                Next <ArrowForwardIcon />
              </CustomButton>
            </DivWrapper>
          </GrayWrapper>
        </UserWrapper>
      </PageWrapper>
    </>
  )
}

export default Reconcile
