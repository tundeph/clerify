import React, { useState, useContext } from "react"
import { useSignup } from "../hooks/useSignup"

import Logo from "../components/Logo"
import styled, { ThemeContext } from "styled-components"
import { size } from "../layout/theme"
import {
  PageWrapper,
  MidWrapper,
  DivWrapper,
  Title,
  SubTitle,
  FormInput,
  Button,
  DisabledButton,
  Text,
  LoadingIcon,
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
  const { colors } = useContext(ThemeContext)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { signup, isPending, error } = useSignup()

  const handleButtonState = (loading, name, email, password) => {
    if (loading) {
      return (
        <DisabledButton>
          Loading <LoadingIcon />
        </DisabledButton>
      )
    } else {
      if (name.length > 2 && email.length > 5 && password.length > 5) {
        return <Button>Create account</Button>
      } else {
        return <DisabledButton color={colors.gray300}>Create account</DisabledButton>
      }
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(name, email, password)
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
            {handleButtonState(isPending, name, email, password)}
          </DivWrapper>
          {error && <Text color={colors.red}>{error}</Text>}
        </form>
      </CustomMidWrapper>
    </PageWrapper>
  )
}

export default Signup
