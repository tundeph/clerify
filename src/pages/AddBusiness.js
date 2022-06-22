import React, { useContext } from "react"
import Logo from "../components/Logo"
import Select from "../components/Select"
import styled from "styled-components"
import { size } from "../layout/theme"
import { Link } from "react-router-dom"
import { ThemeContext } from "styled-components"
import {
  PageWrapper,
  MidWrapper,
  DivWrapper,
  Title,
  SubTitle,
  FormInput,
  Button,
  Text,
  Divider,
} from "../layout/styles"
import AddMore from "../components/AddMore"

const CustomMidWrapper = styled(MidWrapper)`
  gap: ${size.s}rem;
`

const AddBusiness = () => {
  const { colors } = useContext(ThemeContext)

  const businessType = [
    { value: "", text: "Select type of business" },
    { value: "private", text: "Private Business" },
    { value: "ngo", text: "Non-profit Organization" },
  ]

  return (
    <PageWrapper>
      <CustomMidWrapper>
        <DivWrapper bottom={3}>
          <Logo />
        </DivWrapper>
        <DivWrapper bottom={size.xxs}>
          <Title> Create a business or organization. </Title>
          <SubTitle>
            You need to add a business or organization to your account
          </SubTitle>
        </DivWrapper>
        <Divider gap={size.m} />
        <DivWrapper gap={size.xxs} left={size.m} right={size.m}>
          <SubTitle> Details of Business </SubTitle>
          <FormInput type="text" placeholder="Name of business" />
          <Select data={businessType} />
        </DivWrapper>
        <Divider gap={size.m} />
        <DivWrapper gap={size.xxs} left={size.m} right={size.m}>
          <SubTitle>Add Your Financial Accounts </SubTitle>
          <Text align="center" size={size.xxxs} color={colors.secondary}>
            For example, Cash accounts, bank accounts
          </Text>
          <DivWrapper>
            <Text
              align="left"
              left={size.xxs}
              size={size.xxxs}
              color={colors.secondary}
            >
              Account 1:
            </Text>
            <FormInput type="text" placeholder="For example, Cash Account" />
          </DivWrapper>
          <DivWrapper>
            <Text
              align="left"
              left={size.xxs}
              size={size.xxxs}
              color={colors.secondary}
            >
              Account 2:
            </Text>
            <DivWrapper direction="row">
              <FormInput type="text" placeholder="For example, Bank Account " />{" "}
              <AddMore size={0.7} />
            </DivWrapper>
          </DivWrapper>
        </DivWrapper>
        <Divider gap={size.m} />
        <DivWrapper gap={size.xxs} left={size.m} right={size.m}>
          <Button> Add business </Button>
          <Text align="center" size={size.xxxs} color={colors.secondary}>
            Don’t have an account? <Link to="/signup"> Sign Up </Link>
          </Text>
        </DivWrapper>
      </CustomMidWrapper>
    </PageWrapper>
  )
}

export default AddBusiness
