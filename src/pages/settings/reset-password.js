// component for resetting password
import React, { useState } from "react"
import { size } from "@layout/theme"
import { useLogin } from "../../hooks/useLogin"

import {
  PageWrapper,
  UserWrapper,
  DivWrapper,
  Title,
  Divider,
  FormInput,
  Text,
  Label,
} from "@layout/styles"

import { Modal, ButtonState } from "@components"

export const ResetPassword = () => {
  const { resetPassword } = useLogin()

  const [email, setEmail] = useState("")
  const [modalOpen, setModalOpen] = useState(false)

  const buttonCondition = email.length > 3

  const handleReset = (e) => {
    e.preventDefault()
    resetPassword(email)
    setEmail("")
    setModalOpen(true)
  }

  return (
    <>
      <PageWrapper>
        <UserWrapper>
          <DivWrapper bottom={size.xxxs}>
            <Title> Reset Password </Title>
          </DivWrapper>
          <Divider />
          <form onSubmit={handleReset}>
            <DivWrapper gap={2} max="xs">
              <Label>
                Enter your email address below and check the email for a link to
                reset your password
              </Label>
              <FormInput
                type="email"
                placeholder="Enter their email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <ButtonState
                size="small"
                loading={false}
                condition={buttonCondition}
                loadingText=""
              >
                Send reset link
              </ButtonState>
            </DivWrapper>
          </form>
        </UserWrapper>
      </PageWrapper>

      {modalOpen && (
        <Modal
          title="Email reset link sent"
          handleClose={() => setModalOpen(false)}
        >
          <Text justify="center">
            Please check your email (and also spam folder) to find the reset
            link
          </Text>
        </Modal>
      )}
    </>
  )
}
