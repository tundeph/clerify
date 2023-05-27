import React, { useState, useContext } from "react"
import { ThemeContext } from "styled-components"
import shortid from "shortid"
import {
  useProfileQuery,
  useUpdateBusinessMutation,
} from "../../services/profile-slice2"
import { handleButtonState } from "../../helper"
import { size } from "../../layout/theme"

import { Text, DivWrapper, Form } from "../../layout/styles"

import AddAccountForm from "../add-business/add-account-form"
import { lensPath, over } from "ramda"

export const AddAccount = () => {
  const { colors } = useContext(ThemeContext)
  const {
    data: { business, selectedBusinessId },
  } = useProfileQuery()
  const [updateBusiness, { error, isLoading }] = useUpdateBusinessMutation()

  const firstId = shortid.generate()
  const initialState = [{ id: firstId, acctName: "" }]
  const [newAccts, setNewAccts] = useState(initialState)

  const buttonCondition = newAccts.every((acct) => acct.acctName.length > 2)

  const handleAcctChange = (e, id) => {
    setNewAccts(
      newAccts.map((acc) =>
        acc.id === id ? { ...acc, ...{ id, acctName: e.target.value } } : acc
      )
    )
  }

  const handleDeleteForm = (e) => {
    e.preventDefault()
    const filteredAccts = newAccts.filter((acct) => acct.id !== e.target.value)
    setNewAccts(filteredAccts)
  }

  const handleAddMore = (e) => {
    e.preventDefault()
    const id = shortid.generate()
    setNewAccts([...newAccts, { id, acctName: "" }])
  }

  const handleSubmit = async (e, selectedBusinessId, business) => {
    e.preventDefault()

    // merges new accts into the business object
    const acctsLens = lensPath([selectedBusinessId, "accts"])
    const updatedBusiness = over(
      acctsLens,
      (accts) => accts.concat(newAccts),
      business
    )
    // writes the updated business to db
    await updateBusiness({ selectedBusinessId, updatedBusiness })
    if (!error) {
      setNewAccts(initialState)
    }
  }

  return (
    <Form onSubmit={(e) => handleSubmit(e, selectedBusinessId, business)}>
      <DivWrapper gap={size.xs} max="xs">
        Add new financial account
        <AddAccountForm
          accts={newAccts}
          align="left"
          title=""
          description="Enter an account name, for example, name of a bank account "
          onChange={handleAcctChange}
          onAddMoreClick={handleAddMore}
          onDeleteFormClick={handleDeleteForm}
        />
        {handleButtonState(
          isLoading,
          "Loading",
          "Add account",
          buttonCondition
        )}
      </DivWrapper>
      {error && <Text color={colors.red}>{error}</Text>}
    </Form>
  )
}
