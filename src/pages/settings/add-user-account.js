// this connects a new email address to a business so when the user logs in they can
// access the business. These additional users may have lower permission level, like user-level instead of admin

import React, { useState, useContext } from "react"
import { useProfileQuery } from "@services/profile-slice2"
import { useAddUsersMutation } from "@services/users-slice"
import { handleButtonState } from "@utils"

import { ThemeContext } from "styled-components"

import { DivWrapper, FormInput, Text } from "@layout/styles"
import { Select, Modal } from "@components"

export const AddUserAccount = () => {
  const {
    data: { selectedBusinessId },
  } = useProfileQuery()

  const [updateUsers, result] = useAddUsersMutation()
  const { colors } = useContext(ThemeContext)

  const [permission, setPermission] = useState("")
  const [email, setEmail] = useState("")
  const [modalOpen, setModalOpen] = useState(false)

  const permissions = [
    { value: "", label: "Select an option" },
    { value: "user", label: "user" },
    { value: "admin", label: "admin" },
  ]

  const buttonCondition = email.length > 5 && permission

  const handleSubmit = async (e) => {
    e.preventDefault()
    const editedEmail = email.trim().toLowerCase()
    updateUsers({ selectedBusinessId, email: editedEmail, permission })
    setModalOpen(true)
    setEmail("")
    setPermission("")
  }

  return (
    <>
      <DivWrapper max="xs">
        <form onSubmit={handleSubmit}>
          <DivWrapper bottom={1}>
            <Text> Add another user to this business </Text>
          </DivWrapper>
          <DivWrapper gap={1}>
            <FormInput
              type="text"
              placeholder="Enter their email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Select
              options={permissions}
              label="Permission-level"
              onChange={(e) => setPermission(e.target.value)}
              value={permission}
            />
          </DivWrapper>
          <DivWrapper top={3} bottom={1}>
            {handleButtonState(
              result.isPending,
              "Loading",
              "Add user",
              buttonCondition
            )}
          </DivWrapper>
          {result.error && <Text color={colors.red}>{result.error}</Text>}
        </form>
      </DivWrapper>
      {modalOpen && (
        <Modal title="User added" handleClose={() => setModalOpen(false)}>
          <Text justify="center">
            A new user has been added to your account
          </Text>
        </Modal>
      )}
    </>
  )
}
