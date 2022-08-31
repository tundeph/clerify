import React, { useState, useContext } from "react"
import { useLogin } from "../hooks/useLogin"
import { handleButtonState } from "../helper"

//styles
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
import Modal from "../components/Modal"

const CustomMidWrapper = styled(MidWrapper)`
  gap: 1.5rem;
`

const Signin = () => {
  const { colors } = useContext(ThemeContext)
  const { error, isPending, login, resetPassword } = useLogin()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [resetModal, setResetModal] = useState({ status: false, text: "" })

  const buttonCondition = email.length > 5 && password.length > 5
  const buttonPending = isPending && buttonCondition

  const handleResetPassword = (e) => {
    e.preventDefault()

    let text = email.length
      ? `A link to reset your password has been sent to ${email}`
      : "Enter an email in the email address field"

    if (email.length) {
      console.log("here", email)
      resetPassword(email)
      if (error) {
        text = `There's an error while trying to send the password reset link to ${email}. Click the Reset link again`
      }
    }

    setResetModal({ status: true, text })
  }

  const handleLogin = (e) => {
    e.preventDefault()
    login(email, password)
  }

  return (
    <>
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
              <FormInput
                type="text"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <DivWrapper>
                <PasswordInput
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <UnderFormText>
                  Forgot password?{" "}
                  <Link to="" onClick={handleResetPassword}>
                    Reset it
                  </Link>
                </UnderFormText>
              </DivWrapper>
            </DivWrapper>
            <DivWrapper top={0.2}>
              {handleButtonState(buttonPending, "", "Login", buttonCondition)}

              <UnderFormText>
                Don’t have an account? <Link to="/signup"> Sign Up </Link>
              </UnderFormText>
            </DivWrapper>
            {error && <Text color={colors.red}>{error}</Text>}
          </form>
        </CustomMidWrapper>
      </PageWrapper>

      {resetModal.status && (
        <Modal title="Reset Password" handleClose={() => setResetModal({ staus: false, text: "" })}>
          <DivWrapper align="center" gap={2}>
            <Text justify="center" color={colors.red}>
              {resetModal.text}
            </Text>
            {/* <Button onClick={() => setResetModal(false)}> Send email</Button> */}
          </DivWrapper>
        </Modal>
      )}
    </>
  )
}

export default Signin
