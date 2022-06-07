import React from "react"
import Logo from "../components/Logo"
import styled from "styled-components"
import { size } from "../layout/theme"
import { Link } from "react-router-dom"
import {
  PageWrapper,
  MidWrapper,
  DivWrapper,
  Title,
  SubTitle,
  FormInput,
  Button,
  Text,
} from "../layout/styles"

const CustomMidWrapper = styled(MidWrapper)`
  gap: 1.5rem;
`
const PasswordInput = styled(FormInput)`
  &::placeholder {
    letter-spacing: 0px;
  }
  letter-spacing: ${size.xxs}rem;
`

const CustomText = styled(Text)`
  margin-top: 0.8rem;
  margin-right: 1rem;
  font-size: 0.8rem;
  text-align: right;
  color: ${({ theme }) => theme.colors.secondary};
`

const Signin = () => {
  return (
    <PageWrapper>
      <CustomMidWrapper>
        <DivWrapper bottom={3}>
          <Logo />
        </DivWrapper>
        <DivWrapper bottom={1}>
          <Title> Welcome back! </Title>
          <SubTitle> Login with your email and password </SubTitle>
        </DivWrapper>
        <FormInput type="text" placeholder="Email address" />
        <DivWrapper>
          <PasswordInput type="password" placeholder="Password" />
          <CustomText>Forgot password? Reset </CustomText>
        </DivWrapper>
        <DivWrapper top={0.2}>
          <Button> Login </Button>
          <CustomText>
            Don’t have an account? <Link to="/signup"> Sign Up </Link>
          </CustomText>
        </DivWrapper>
      </CustomMidWrapper>
    </PageWrapper>
  )
}

export default Signin
