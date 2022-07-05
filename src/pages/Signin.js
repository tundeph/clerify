import React, { useState, useContext } from "react"
import { useLogin } from "../hooks/useLogin"
import { handleButtonState } from "../helper"

//styles
import Logo from "../components/Logo"
import styled, { ThemeContext } from "styled-components"
import { Link } from "react-router-dom"
import { PageWrapper, MidWrapper, DivWrapper, Title, SubTitle, FormInput, Text, PasswordInput } from "../layout/styles"

const CustomMidWrapper = styled(MidWrapper)`
  gap: 1.5rem;
`

const CustomText = styled(Text)`
  margin-top: 0.8rem;
  margin-right: 1rem;
  font-size: 0.8rem;
  text-align: right;
  color: ${({ theme }) => theme.colors.secondary};
`

const Signin = () => {
  const { colors } = useContext(ThemeContext)
  const { error, isPending, login } = useLogin()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const buttonCondition = email.length > 5 && password.length > 5

  const handleLogin = (e) => {
    e.preventDefault()
    login(email, password)
  }

  return (
    <PageWrapper>
      <CustomMidWrapper>
        <form onSubmit={handleLogin}>
          <DivWrapper bottom={3}>
            <Logo />
          </DivWrapper>
          <DivWrapper bottom={1}>
            <Title> Welcome back! </Title>
            <SubTitle> Login with your email and password </SubTitle>
          </DivWrapper>
          <DivWrapper gap={1}>
            <FormInput type="text" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} />
            <DivWrapper>
              <PasswordInput
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <CustomText>Forgot password? Reset </CustomText>
            </DivWrapper>
          </DivWrapper>
          <DivWrapper top={0.2}>
            {handleButtonState(isPending, "Loading", "Login", buttonCondition)}
            {/* <Button> Login </Button> */}
            <CustomText>
              Don’t have an account? <Link to="/signup"> Sign Up </Link>
            </CustomText>
          </DivWrapper>
          {error && <Text color={colors.red}>{error}</Text>}
        </form>
      </CustomMidWrapper>
    </PageWrapper>
  )
}

export default Signin
