import React from "react"
import styled from "styled-components"
import { size } from "../layout/theme"
import {
  PageWrapper,
  UserWrapper,
  DivWrapper,
  Title,
  SubTitle,
  FormInput,
  KeywordsWrapper,
} from "../layout/styles"
import Select from "../components/Select"
import Keyword from "../components/Keyword"

const CustomKeyWordsWrapper = styled(KeywordsWrapper)`
  background-color: ${({ theme }) => theme.colors.gray300};
  border: 1px solid ${({ theme }) => theme.colors.gray600};
`

export const CustomWrapper = styled(DivWrapper)`
  min-height: 300px;
  background-color: ${({ theme }) => theme.colors.gray100};
  border-radius: 15px;
  padding: ${size.xs}rem ${size.xxs}rem;
  box-sizing: border-box;
`

const KeywordsEdit = () => {
  const categories = [
    { value: "", text: "Select standard categories" },
    { value: "rent", text: "Rent" },
    { value: "marketing", text: "Marketing & Advertising" },
  ]

  const handleClick = (text) => {
    console.log(text)
  }
  return (
    <>
      <PageWrapper>
        <UserWrapper>
          <DivWrapper bottom={size.m}>
            <Title> Keywords </Title>
            <SubTitle> Edit income and expense keywords </SubTitle>
          </DivWrapper>
          <DivWrapper bottom={size.m}>
            <Select data={categories} />
          </DivWrapper>

          <CustomWrapper bottom={size.m} gap={1}>
            <FormInput
              type="text"
              height={size.xl}
              fontSize={size.xxxs}
              placeholder="Type a custom category name"
            />

            <CustomKeyWordsWrapper top={0.2}>
              <Keyword text="Rent" onClick={handleClick} />
              <Keyword text="Marketing & Advertising" onClick={handleClick} />
            </CustomKeyWordsWrapper>
          </CustomWrapper>
        </UserWrapper>
      </PageWrapper>
    </>
  )
}

export default KeywordsEdit
