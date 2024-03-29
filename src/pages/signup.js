// handles the signup function of a new user
import React, { useState } from "react"
import { useSignup } from "../hooks/useSignup"
import { handleButtonState } from "../helper"

import { Logo } from "@components"
import styled, { useTheme } from "styled-components"
import { Link } from "react-router-dom"

import { screenSizes } from "../helper"

import {
  PageWrapper,
  MidWrapper,
  DivWrapper,
  Title,
  SubTitle,
  FormInput,
  Text,
  PasswordInput,
  UnderFormText,
  Card,
} from "../layout/styles"

const CustomMidWrapper = styled(MidWrapper)`
  gap: 1.5rem;
  max-width: ${screenSizes.s};
`

export const Signup = () => {
  const { colors } = useTheme()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { signup, isPending, error } = useSignup()

  // condition to make the button active or otherwise
  const buttonCondition =
    name.length > 2 && email.length > 5 && password.length > 5

  // function to create a new user
  const handleSubmit = async (e) => {
    e.preventDefault()
    const editedEmail = email.trim().toLowerCase()
    signup(editedEmail, password, name)
  }

  return (
    <PageWrapper>
      <CustomMidWrapper>
        <form onSubmit={handleSubmit}>
          <DivWrapper bottom={3}>
            <Logo />
          </DivWrapper>
          <Card padding="36">
            <DivWrapper bottom={1}>
              <Title> Sign up</Title>
              <SubTitle> Create an account today </SubTitle>
            </DivWrapper>
            <DivWrapper gap={1}>
              <FormInput
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <FormInput
                type="text"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <PasswordInput
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </DivWrapper>
            <DivWrapper top={3} bottom={1}>
              {handleButtonState(
                isPending,
                "Loading",
                "Create account",
                buttonCondition
              )}
            </DivWrapper>
            <UnderFormText>
              Already have an account? <Link to="/signin"> Log in </Link>
            </UnderFormText>
            {error && <Text color={colors.red}>{error}</Text>}
          </Card>
        </form>
      </CustomMidWrapper>
    </PageWrapper>
  )
}
