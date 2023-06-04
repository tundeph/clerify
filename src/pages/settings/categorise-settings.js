import React, { useState } from "react"
import { useTheme } from "styled-components"
import shortid from "shortid"

import { useUpdateBusinessMutation } from "@services/profile-slice2"
import { addCategoryData, updateCategoryTitle } from "@utils"

import { size } from "@layout/theme"
import {
  DivWrapper,
  SubTitle,
  FormInput,
  Text,
  KeywordsWrapper,
  Button,
  Label,
  CustomEditIcon,
} from "@layout/styles"

import {
  Keyword,
  Modal,
  ButtonState,
  RadioButton,
  SectionDivider,
} from "@components"

export const CategoriseSettings = (props) => {
  const { colors } = useTheme()
  const [updateBusiness, { isLoading }] = useUpdateBusinessMutation()

  const selectedBusinessId = props.selectedBusinessId
  const business = props.business
  const categories = business[selectedBusinessId].categories

  //
  const [customCategory, setCustomCategory] = useState("")
  const [errorModal, setErrorModal] = useState(false)
  const [transactionType, setTransactionType] = useState("")
  const [deleteModal, setDeleteModal] = useState({
    status: false,
    categoryId: "",
    title: "",
  })
  const buttonCondition = customCategory.length > 1 && transactionType

  const handleEditCategory = async (data) => {
    setDeleteModal({ ...deleteModal, status: false })

    const updatedBusiness = updateCategoryTitle(
      selectedBusinessId,
      business,
      data.categoryId,
      data.title
    )

    updateBusiness({
      selectedBusinessId: selectedBusinessId,
      updatedBusiness,
    })
  }

  const handleAddCategory = async (e) => {
    e.preventDefault()

    const customCategoryExist = business[selectedBusinessId].categories.some(
      (selectedCategory) =>
        selectedCategory.title.toLowerCase() === customCategory.toLowerCase()
    )

    if (!customCategoryExist) {
      const categoryId = shortid.generate()
      const data = {
        categoryId,
        type: transactionType,
        title: customCategory,
        keywords: [],
      }

      const updatedBusiness = addCategoryData(
        selectedBusinessId,
        business,
        data
      )

      updateBusiness({
        selectedBusinessId,
        updatedBusiness,
      })

      setCustomCategory("")
      setTransactionType("")
    } else {
      setErrorModal(true)
    }
  }

  return (
    <>
      <DivWrapper>Add customized transaction categories</DivWrapper>
      <form onSubmit={handleAddCategory}>
        <DivWrapper direction="column" gap={1.5} bottom={3} max="s">
          <DivWrapper>
            <FormInput
              type="text"
              value={customCategory}
              onChange={(e) => setCustomCategory(e.target.value)}
              height={size.xl}
              placeholder="Enter a custom category name"
            />
          </DivWrapper>

          <DivWrapper direction="row" justify="space-between" align="center">
            <Label> What type of transaction is it? </Label>
            <DivWrapper direction="row" gap={1}>
              <RadioButton
                labelText="Inflow"
                value="credit"
                checked={transactionType === "credit"}
                onChange={() => setTransactionType("credit")}
              />
              <RadioButton
                labelText="Outflow"
                value="debit"
                checked={transactionType === "debit"}
                onChange={() => setTransactionType("debit")}
              />
            </DivWrapper>
          </DivWrapper>
          <ButtonState
            loading={isLoading && customCategory}
            loadingText="Loading"
            condition={buttonCondition}
          >
            Add
          </ButtonState>
        </DivWrapper>
      </form>

      <SectionDivider> OR </SectionDivider>

      <SubTitle> Edit category names </SubTitle>
      <KeywordsWrapper top={0.2}>
        {categories.length > 0 &&
          categories.toReversed().map((category) => (
            <Keyword
              key={category.categoryId}
              text={category.title}
              Icon={CustomEditIcon}
              onClick={() =>
                setDeleteModal({
                  status: true,
                  title: category.title,
                  categoryId: category.categoryId,
                })
              }
            />
          ))}
      </KeywordsWrapper>

      {errorModal && (
        <Modal title="Error" handleClose={() => setErrorModal(false)}>
          <Text justify="center" color={colors.red}>
            This category already exists and cannot be overwritten
          </Text>
        </Modal>
      )}

      {deleteModal.status && (
        <Modal
          title="Edit category name "
          handleClose={() => setDeleteModal({ ...deleteModal, status: false })}
          noBgClose
        >
          <DivWrapper gap={1}>
            <Label>Edit the name of the category</Label>
            <FormInput
              type="text"
              value={deleteModal.title}
              onChange={(e) =>
                setDeleteModal({ ...deleteModal, title: e.target.value })
              }
              height={size.xl}
            />
            <Button onClick={() => handleEditCategory(deleteModal)}>
              Save
            </Button>
          </DivWrapper>
        </Modal>
      )}
    </>
  )
}
