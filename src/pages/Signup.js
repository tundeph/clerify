import React from "react"
import Logo from "../components/Logo"
import styled from "styled-components"
import { size } from "../layout/theme"
import {
  PageWrapper,
  MidWrapper,
  DivWrapper,
  Title,
  SubTitle,
  FormInput,
  Button,
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

const Signup = () => {
  return (
    <PageWrapper>
      <CustomMidWrapper>
        <DivWrapper bottom={3}>
          <Logo />
        </DivWrapper>
        <DivWrapper bottom={1}>
          <Title> Sign up</Title>
          <SubTitle> Create an account today </SubTitle>
        </DivWrapper>
        <FormInput type="text" placeholder="Email address" />
        <PasswordInput type="password" placeholder="Password" />
        <DivWrapper top={1}>
          <Button>Create account</Button>
        </DivWrapper>
      </CustomMidWrapper>
    </PageWrapper>
  )
}

export default Signup
