import React, { useState, useContext } from "react"
import styled, { ThemeContext } from "styled-components"
import { useFirestore } from "../hooks/useFirestore"
import { useDocument } from "../hooks/useDocument"
import { useSelector, useDispatch } from "react-redux"
import { selectUserProfile, updateBusinessCategory } from "../redux/profileSlice"
import { businessCategories } from "../helper/defaultData"

import { size } from "../layout/theme"
import {
  PageWrapper,
  UserWrapper,
  DivWrapper,
  Title,
  SubTitle,
  FormInput,
  Text,
  Divider,
  KeywordsWrapper,
  Button,
} from "../layout/styles"
import Select from "../components/Select"
import Keyword from "../components/Keyword"
import Modal from "../components/Modal"
import ButtonState from "../components/ButtonState"

const HalfDiv = styled(DivWrapper)`
  width: 50%;
`

const Categorise = () => {
  const { colors } = useContext(ThemeContext)
  const { updateDocument, response } = useFirestore("business")
  const { user, selectedBusinessId } = useSelector(selectUserProfile)
  const { document, error } = useDocument("business", selectedBusinessId)
  const dispatch = useDispatch()

  //
  const [customCategory, setCustomCategory] = useState("")
  const [standardCategory, setStandardCategory] = useState("")
  const [errorModal, setErrorModal] = useState(false)
  const [deleteModal, setDeleteModal] = useState({ status: false })

  const buttonCondition = standardCategory || customCategory.length > 1

  const handleDeleteCategory = async (category, document) => {
    setDeleteModal(true)
    delete document.categories[category]
    await updateDocument(selectedBusinessId, { categories: document.categories })
    dispatch(updateBusinessCategory({ data: { ...document.categories }, selectedBusinessId }))
  }

  const handleAddCategory = async (e) => {
    e.preventDefault()
    const data = {}
    if (standardCategory && !document.categories[standardCategory]) {
      data[standardCategory] = []
    }
    if (customCategory && !document.categories[customCategory]) {
      data[customCategory] = []
    }
    // console.log({ ...document.categories, ...data })

    if (Object.keys(data).length > 0) {
      await updateDocument(selectedBusinessId, { categories: { ...document.categories, ...data } })
      setCustomCategory("")
    } else {
      setErrorModal(true)
    }

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
                  data={businessCategories}
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
                  placeholder="Enter a custom category"
                />

                <ButtonState loading={response.isPending} loadingText="Loading" condition={buttonCondition}>
                  Add
                </ButtonState>
              </HalfDiv>
            </DivWrapper>
          </form>
          <Divider />
          <KeywordsWrapper top={0.2}>
            {Object.keys(user.business[selectedBusinessId].categories).map((category, i) => (
              <Keyword key={i} text={category} onClick={() => setDeleteModal({ status: true, category, document })} />
            ))}
          </KeywordsWrapper>
        </UserWrapper>
      </PageWrapper>
      {errorModal && (
        <Modal title="Error" handleClose={() => setErrorModal(false)}>
          <Text justify="center" color={colors.red}>
            This category already exists and cannot be overwritten
          </Text>
        </Modal>
      )}

      {deleteModal.status && (
        <Modal title="Are you sure?" handleClose={() => setDeleteModal({ status: false })}>
          <DivWrapper align="center" gap={2}>
            <Text justify="center" color={colors.red}>
              You are about to permanently delete this category and all associated keywords (for sorting) connected to it
            </Text>
            <Button onClick={() => handleDeleteCategory(deleteModal.category, deleteModal.document)}> Yes, Delete it </Button>
          </DivWrapper>
        </Modal>
      )}
    </>
  )
}

export default Categorise
