// component to add business to a user's account
import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  useProfileQuery,
  useAddBusinessMutation,
} from "@services/profile-slice2"

import shortid from "shortid"
import { Logo } from "@components"
import styled from "styled-components"
import { size } from "@layout/theme"

import {
  PageWrapper,
  MidWrapper,
  DivWrapper,
  Title,
  SubTitle,
  Form,
  Divider,
} from "@layout/styles"

import AddBusinessForm from "./add-business-form"
import { handleButtonState } from "@utils"
import { businessType, businessCategories } from "@utils/default-data"
import AddAccountForm from "./add-account-form"

const CustomMidWrapper = styled(MidWrapper)`
  gap: ${size.s}rem;
  min-width: 500px;
`

export const AddBusiness = () => {
  // get all the profile and business data from the db
  const {
    data: { user, selectedBusinessId },
  } = useProfileQuery()
  const [addBusiness, { isError, isLoading }] = useAddBusinessMutation()

  const navigate = useNavigate()

  // function that sets default business category added by the user
  const defaultBusinessCategories = businessCategories.reduce((acc, item) => {
    if (item.value !== "") {
      const categoryId = shortid.generate()
      acc.push({
        categoryId: categoryId,
        title: item.value,
        keywords: [],
        type: item.type,
      })
    }
    return acc
  }, [])

  const firstId = shortid.generate()
  const [name, setName] = useState("")
  const [type, setType] = useState("")
  const [accts, setAccts] = useState([
    { id: firstId, acctName: "", syncId: "" },
  ])

  const buttonCondition = name.length > 0 && type.length > 0

  const handleAcctChange = (e, id) => {
    setAccts(
      accts.map((acc) =>
        acc.id === id ? { ...acc, ...{ id, acctName: e.target.value } } : acc
      )
    )
  }

  const handleDeleteForm = (e) => {
    e.preventDefault()
    const filteredAccts = accts.filter((acct) => acct.id !== e.target.value)
    setAccts(filteredAccts)
  }

  const handleAddMore = (e) => {
    e.preventDefault()
    const id = shortid.generate()
    setAccts([...accts, { id, acctName: "", syncId: "" }])
  }

  // function to handle addition of a business to a user's account
  const handleSubmit = async (e) => {
    e.preventDefault()
    const filteredAccts = accts.filter((acct) => acct.acctName.trim() !== "")
    const business = {
      users: [{ email: user.email, permission: "admin" }],
      name,
      type,
      accts: filteredAccts,
      categories: defaultBusinessCategories,
      selected: true,
    }
    addBusiness({ selectedBusinessId, business })
    // await addDocument(business)
    if (isError) {
      navigate("/")
    }
  }

  return (
    <PageWrapper>
      <CustomMidWrapper>
        <DivWrapper bottom={3}>
          <Logo />
        </DivWrapper>
        <DivWrapper bottom={size.xxs}>
          <Title> Create a business or organization. </Title>
          <SubTitle>
            You need to add a business or organization to your account
          </SubTitle>
        </DivWrapper>
        <Divider gap={size.m} />
        <Form onSubmit={handleSubmit}>
          <AddBusinessForm
            name={name}
            setName={setName}
            type={type}
            setType={setType}
            businessType={businessType}
          />
          <Divider gap={size.m} />
          <AddAccountForm
            accts={accts}
            align="center"
            title="Add financial account"
            description="For example, different bank accounts"
            onChange={handleAcctChange}
            onAddMoreClick={handleAddMore}
            onDeleteFormClick={handleDeleteForm}
          />

          <Divider gap={size.m} />
          <DivWrapper gap={size.xxs}>
            {handleButtonState(
              isLoading,
              "Loading",
              "Add business",
              buttonCondition
            )}
          </DivWrapper>
        </Form>
      </CustomMidWrapper>
    </PageWrapper>
  )
}
