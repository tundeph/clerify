import React, { useContext } from "react"
import styled, { ThemeContext } from "styled-components"
import { size } from "../layout/theme"
import {
  PageWrapper,
  UserWrapper,
  DivWrapper,
  Title,
  SubTitle,
  FormInput,
  Button,
  Divider,
  KeywordsWrapper,
} from "../layout/styles"
import Select from "../components/Select"
import Keyword from "../components/Keyword"

const HalfDiv = styled(DivWrapper)`
  width: 50%;
`

const Categorise = () => {
  const { colors } = useContext(ThemeContext)

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
          <DivWrapper bottom={size.xl}>
            <Title> Categorise </Title>
            <SubTitle> Customize income and expense categories </SubTitle>
          </DivWrapper>
          <DivWrapper direction="row" gap={4} bottom={5}>
            <HalfDiv gap={size.xs}>
              <Title color={colors.secondary}> Choose </Title>
              <Select
                data={categories}
                height={size.xl}
                bgColor={colors.gray100}
                fontSize={size.xxxs}
              />
            </HalfDiv>
            <HalfDiv gap={size.xs}>
              <Title color={colors.secondary}> Add </Title>
              <FormInput
                type="text"
                height={size.xl}
                fontSize={size.xxxs}
                placeholder="Type a custom category name"
              />
              <Button> Add </Button>
            </HalfDiv>
          </DivWrapper>

          <Divider />
          <KeywordsWrapper top={0.2}>
            <Keyword text="Rent" onClick={handleClick} />
            <Keyword text="Marketing & Advertising" onClick={handleClick} />
          </KeywordsWrapper>
        </UserWrapper>
      </PageWrapper>
    </>
  )
}

export default Categorise
