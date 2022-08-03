import React, { useContext, useState } from "react"
import { useSelector } from "react-redux"
import { selectUserProfile } from "../redux/profileSlice"
import { useFirestore } from "../hooks/useFirestore"
import { useNavigate } from "react-router-dom"
import shortid from "shortid"
import Logo from "../components/Logo"
import Select from "../components/Select"
import styled from "styled-components"
import { size } from "../layout/theme"
import { ThemeContext } from "styled-components"
import { PageWrapper, MidWrapper, DivWrapper, Title, SubTitle, FormInput, Button, Text, Divider } from "../layout/styles"
import AddMore from "../components/AddMore"
import { handleButtonState } from "../helper"
import { businessType, businessCategories } from "../helper/defaultData"

const CustomMidWrapper = styled(MidWrapper)`
  gap: ${size.s}rem;
`

const AddBusiness = () => {
  const { colors } = useContext(ThemeContext)
  const { user } = useSelector(selectUserProfile)
  const navigate = useNavigate()
  const { addDocument, response } = useFirestore("business")
  const defaultBusinessCategories = businessCategories.reduce((acc, item) => {
    if (item.value !== "") {
      const categoryId = shortid.generate()
      acc.push({ categoryId: categoryId, title: item.value, keywords: [] })
    }
    return acc
  }, [])

  const firstId = shortid.generate()
  const secondId = shortid.generate()
  const [name, setName] = useState("")
  const [type, setType] = useState("")
  const [accts, setAccts] = useState([
    { id: firstId, acctName: "" },
    { id: secondId, acctName: "" },
  ])

  const buttonCondition = name.length > 0 && type.length > 0

  const handleAcctChange = (e, id) => {
    setAccts(accts.map((acc) => (acc.id === id ? { ...acc, ...{ id, acctName: e.target.value } } : acc)))
  }

  const handleAddMore = () => {
    const id = shortid.generate()
    setAccts([...accts, { id, acctName: "" }])
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const business = { uid: user.uid, name, type, accts, categories: defaultBusinessCategories }
    await addDocument(business)
    if (!response.error) {
      navigate("/dashboard")
    }
    // console.log(business)
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
