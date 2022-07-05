import React, { useContext, useState } from "react"
import { useSelector } from "react-redux"
import { selectUserProfile } from "../redux/profileSlice"
import { useFirestore } from "../hooks/useFirestore"
import { useNavigate } from "react-router-dom"
import Logo from "../components/Logo"
import Select from "../components/Select"
import styled from "styled-components"
import { size } from "../layout/theme"
import { ThemeContext } from "styled-components"
import { PageWrapper, MidWrapper, DivWrapper, Title, SubTitle, FormInput, Button, Text, Divider } from "../layout/styles"
import AddMore from "../components/AddMore"
import { handleButtonState } from "../helper"

const CustomMidWrapper = styled(MidWrapper)`
  gap: ${size.s}rem;
`

const AddBusiness = () => {
  const { colors } = useContext(ThemeContext)
  const { user } = useSelector(selectUserProfile)
  const navigate = useNavigate()
  const { addDocument, response } = useFirestore("business")

  const [name, setName] = useState("")
  const [type, setType] = useState("")
  const [accts, setAccts] = useState([
    { id: 1, acctName: "" },
    { id: 2, acctName: "" },
  ])

  const businessType = [
    { value: "", text: "Select type of business" },
    { value: "enterprise", text: "Sole Proprietorship" },
    { value: "partnership", text: "Partnership" },
    { value: "limited", text: "Limited Liability Company" },
    { value: "plc", text: "Public Liability Company" },
    { value: "ngo", text: "Non-Profit Organization" },
  ]

  const buttonCondition = name.length > 0 && type.length > 0

  const handleAcctChange = (e, id) => {
    setAccts(accts.map((acc) => (acc.id === id ? { ...acc, ...{ id, acctName: e.target.value } } : acc)))
  }

  const handleAddMore = () => {
    setAccts([...accts, { id: accts.length + 1, acctName: "" }])
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const business = { uid: user.uid, name, type, accts }
    await addDocument(business)
    if (!response.error) {
      navigate("/dashboard")
    }
    console.log(business)
  }

  return (
    <PageWrapper>
      <CustomMidWrapper>
        <form onSubmit={handleSubmit}>
          <DivWrapper bottom={3}>
            <Logo />
          </DivWrapper>
          <DivWrapper bottom={size.xxs}>
            <Title> Create a business or organization. </Title>
            <SubTitle>You need to add a business or organization to your account</SubTitle>
          </DivWrapper>
          <Divider gap={size.m} />
          <DivWrapper gap={size.xxs} left={size.m} right={size.m}>
            <SubTitle> Details of Business </SubTitle>
            <FormInput
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
              placeholder="Name of business"
              required
            />
            <Select onChange={(e) => setType(e.target.value)} value={type} data={businessType} />
          </DivWrapper>
          <Divider gap={size.m} />
          <DivWrapper gap={size.xxs} left={size.m} right={size.m}>
            <SubTitle>Add Your Financial Accounts </SubTitle>
            <Text align="center" size={size.xxxs} color={colors.secondary}>
              For example, Cash accounts, bank accounts
            </Text>
            {accts.map((acct, i) => {
              return (
                <DivWrapper key={acct.id}>
                  <Text align="left" left={size.xxs} size={size.xxxs} color={colors.secondary}>
                    Account {acct.id}:
                  </Text>
                  <DivWrapper direction="row">
                    <FormInput
                      onChange={(e) => handleAcctChange(e, acct.id)}
                      value={acct.acctName}
                      type="text"
                      placeholder="e.g. Bank or Cash account"
                    />
                    {accts.length - 1 === i && <AddMore onClick={handleAddMore} size={0.7} />}
                  </DivWrapper>
                </DivWrapper>
              )
            })}
          </DivWrapper>
          <Divider gap={size.m} />
          <DivWrapper gap={size.xxs} left={size.m} right={size.m}>
            {handleButtonState(response.isPending, "Loading", "Add business", buttonCondition)}
          </DivWrapper>
        </form>
      </CustomMidWrapper>
    </PageWrapper>
  )
}

export default AddBusiness
