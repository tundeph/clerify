import React, { useState, useContext } from "react"
import { ThemeContext } from "styled-components"
import { map, prop, applySpec, prepend, pipe, reject, propEq } from "ramda"
import { useGetUsersQuery, useDeleteUserMutation } from "@services/users-slice"

import { DivWrapper, Text, Button } from "@layout/styles"
import { Select, ButtonState, Modal } from "@components"

//convert the users array to the array for the select doropdown
const usersDropDown = (data, email) =>
  pipe(
    reject(propEq(email, "email")),
    map(
      applySpec({
        label: prop("email"),
        value: prop("email"),
      })
    ),
    prepend({ label: "Select a user", value: "" })
  )(data)

export const DeleteUserAccount = (props) => {
  const { data } = useGetUsersQuery(props.selectedBusinessId)
  const { colors } = useContext(ThemeContext)

  const [deleteUser, result] = useDeleteUserMutation()
  const [userToDelete, setUserToDelete] = useState("")
  const [deleteModal, setDeleteModal] = useState({ obj: {}, status: false })

  const handleSubmit = (val) => {
    setDeleteModal((value) => ({ ...value, status: false }))
    deleteUser({
      selectedBusinessId: val.obj.selectedBusinessId,
      email: userToDelete,
      users: data,
    })
  }

  const openModal = (e, selectedBusinessId) => {
    e.preventDefault()
    setDeleteModal({ obj: { e, selectedBusinessId }, status: true })
  }

  return (
    <>
      <DivWrapper>
        <DivWrapper bottom={1}>
          <Text> Delete a user from this business </Text>
        </DivWrapper>
        {data ? (
          <>
            <DivWrapper gap={2} max="xs">
              <Select
                options={usersDropDown(data, props.user.email)}
                label=""
                onChange={(e) => setUserToDelete(e.target.value)}
                value={userToDelete}
              />

              <ButtonState
                loading={result.isPending}
                loadingText="Loading"
                condition={userToDelete}
                onClick={(e) => openModal(e, props.selectedBusinessId)}
              >
                Delete
              </ButtonState>
            </DivWrapper>
          </>
        ) : null}
      </DivWrapper>

      {deleteModal.status && (
        <Modal
          title="Are you sure?"
          handleClose={() => setDeleteModal({ ...deleteModal, status: false })}
          noBgClose
        >
          <DivWrapper align="center" gap={2}>
            <Text justify="center" color={colors.red}>
              Are you sure you want to delete this user
            </Text>
            <Button onClick={() => handleSubmit(deleteModal)}>
              Yes, delete
            </Button>
          </DivWrapper>
        </Modal>
      )}
    </>
  )
}
