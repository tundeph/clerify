import React, { useState, useContext } from "react"
import { useSignup } from "../hooks/useSignup"
import { handleButtonState } from "../helper"

import Logo from "../components/Logo"
import styled, { ThemeContext } from "styled-components"
import { Link } from "react-router-dom"

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
} from "../layout/styles"

const CustomMidWrapper = styled(MidWrapper)`
  gap: 1.5rem;
`

const Signup = () => {
  const { colors } = useContext(ThemeContext)

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { signup, isPending, error } = useSignup()

  const buttonCondition = name.length > 2 && email.length > 5 && password.length > 5

  const handleSubmit = async (e) => {
    e.preventDefault()
    signup(email, password, name)
  }

  return (
    <PageWrapper>
      <CustomMidWrapper>
        <form onSubmit={handleSubmit}>
          <DivWrapper bottom={3}>
            <Logo />
          </DivWrapper>
          <DivWrapper bottom={1}>
            <Title> Sign up</Title>
            <SubTitle> Create an account today </SubTitle>
          </DivWrapper>
          <DivWrapper gap={1}>
            <FormInput type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
            <FormInput type="text" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} />
            <PasswordInput
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </DivWrapper>
          <DivWrapper top={3} bottom={1}>
            {handleButtonState(isPending, "Loading", "Create account", buttonCondition)}
          </DivWrapper>
          <UnderFormText>
            Already have an account? <Link to="/signin"> Log in </Link>
          </UnderFormText>
          {error && <Text color={colors.red}>{error}</Text>}
        </form>
      </CustomMidWrapper>
    </PageWrapper>
  )
}

export default Signup
