// this file is to sign authorised users into the app
import React, { useState, useContext } from "react"
import { handleButtonState } from "../../helper"
import { useLogin } from "../../hooks/useLogin"
import { screenSizes } from "../../helper"

//styles and components for the page are imported here
import { Logo, Modal } from "@components"
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
  Card,
} from "@layout/styles"

const CustomMidWrapper = styled(MidWrapper)`
  gap: 1.5rem;
  max-width: ${screenSizes.s};
`

export const Signin = () => {
  const { error, isPending, login, resetPassword } = useLogin()
  const { colors } = useContext(ThemeContext)

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [resetModal, setResetModal] = useState({ status: false, text: "" })

  // the buttonCondition keeps the login button disabled until condition is met
  const buttonCondition = email.length > 5 && password.length > 5
  const buttonPending = isPending & buttonCondition

  //function to reset password if usr forgets
  const handleResetPassword = (e) => {
    e.preventDefault()

    let text = email.length
      ? `A link to reset your password has been sent to ${email}`
      : "Enter an email in the email address field"

    if (email.length) {
      resetPassword(email)
      if (error) {
        text = `There's an error while trying to send the password reset link to ${email}. Click the Reset link again`
      }
    }

    setResetModal({ status: true, text })
  }

  //function to log user into their account
  const handleLogin = async (e) => {
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
            <Card padding="36">
              <DivWrapper bottom={1}>
                <Title> Welcome back! </Title>
                <SubTitle> Login with your email and password </SubTitle>
              </DivWrapper>
              <DivWrapper gap={1}>
                <FormInput
                  data-testid="email"
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <DivWrapper>
                  <PasswordInput
                    data-testid="password"
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
            </Card>
          </form>
        </CustomMidWrapper>
      </PageWrapper>

      {resetModal.status && (
        <Modal
          title="Reset Password"
          handleClose={() => setResetModal({ staus: false, text: "" })}
        >
          <DivWrapper align="center" gap={2}>
            <Text justify="center" color={colors.red}>
              {resetModal.text}
            </Text>
          </DivWrapper>
        </Modal>
      )}
    </>
  )
}
