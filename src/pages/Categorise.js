import React, { useState, useContext } from "react"
import styled, { ThemeContext } from "styled-components"
import { useFirestore } from "../hooks/useFirestore"
import { useDocument } from "../hooks/useDocument"
import { useSelector } from "react-redux"
import { selectUserProfile } from "../redux/profileSlice"

import { size } from "../layout/theme"
import {
  PageWrapper,
  UserWrapper,
  DivWrapper,
  Title,
  SubTitle,
  FormInput,
  Button,
  Divider,
  KeywordsWrapper,
} from "../layout/styles"
import Select from "../components/Select"
import Keyword from "../components/Keyword"

const HalfDiv = styled(DivWrapper)`
  width: 50%;
`

const Categorise = () => {
  const { colors } = useContext(ThemeContext)
  const { updateDocument } = useFirestore("business")
  const { user, selectedBusinessId } = useSelector(selectUserProfile)
  const { document, error } = useDocument("business", selectedBusinessId)
  // console.log("document", document)
  const [customCategory, setCustomCategory] = useState("")
  const [standardCategory, setStandardCategory] = useState("")

  const categories = [
    { value: "", text: "Select standard categories" },
    { value: "Rent", text: "Rent" },
    { value: "Marketing & Advertising", text: "Marketing & Advertising" },
  ]

  const handleClick = (text) => {
    console.log(text)
  }

  const handleAddCategory = async (e) => {
    e.preventDefault()
    const data = {}
    if (standardCategory) {
      data[standardCategory] = []
    }
    if (customCategory) {
      data[customCategory] = []
    }
    console.log({ ...document.categories, ...data })

    await updateDocument(selectedBusinessId, { categories: { ...document.categories, ...data } })
    setCustomCategory("")
    setStandardCategory("")
  }

  return (
    <>
      <PageWrapper>
        <UserWrapper>
          <DivWrapper bottom={size.xl}>
            <Title> Categorise </Title>
            <SubTitle> Customize income and expense categories </SubTitle>
          </DivWrapper>
          <form onSubmit={handleAddCategory}>
            <DivWrapper direction="row" gap={4} bottom={5}>
              <HalfDiv gap={size.xs}>
                <Title color={colors.secondary}> Choose </Title>
                <Select
                  data={categories}
                  height={size.xl}
                  bgColor={colors.gray100}
                  fontSize={size.xxxs}
                  value={standardCategory}
                  onChange={(e) => setStandardCategory(e.target.value)}
                />
              </HalfDiv>
              <HalfDiv gap={size.xs}>
                <Title color={colors.secondary}> Add </Title>
                <FormInput
                  type="text"
                  value={customCategory}
                  onChange={(e) => setCustomCategory(e.target.value)}
                  height={size.xl}
                  fontSize={size.xxxs}
                  placeholder="Type a custom category name"
                />
                <Button type="submit"> Add </Button>
              </HalfDiv>
            </DivWrapper>
          </form>
          <Divider />
          <KeywordsWrapper top={0.2}>
            <Keyword text="Rent" onClick={handleClick} />
            <Keyword text="Marketing & Advertising" onClick={handleClick} />
          </KeywordsWrapper>
        </UserWrapper>
      </PageWrapper>
    </>
  )
}

export default Categorise
