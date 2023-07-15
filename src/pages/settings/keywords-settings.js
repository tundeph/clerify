// component helps to edit keywords
import React, { useState } from "react"
import styled, { useTheme } from "styled-components"
import { size } from "../../layout/theme"

import { useUpdateBusinessMutation } from "@services/profile-slice2"

import {
  formatCategoryDropDown,
  formatUpdatedCategories,
  replaceCategory,
  deleteKeywordFromCategory,
} from "@utils"

// import all chld components to be used
import {
  DivWrapper,
  SubTitle,
  FormInput,
  KeywordsWrapper,
  Button,
  Text,
} from "../../layout/styles"
import { Select, Keyword, Modal, ButtonState } from "@components"

const CustomKeywordsWrapper = styled(KeywordsWrapper)`
  background-color: ${({ theme }) => theme.colors.gray300};
  border: 1px solid ${({ theme }) => theme.colors.gray600};
`

export const CustomWrapper = styled(DivWrapper)`
  min-height: 300px;
  background-color: ${({ theme }) => theme.colors.gray100};
  border-radius: 15px;
  padding: ${size.xs}rem ${size.xxs}rem;
  box-sizing: border-box;
`

const CustomSplitWrapper = styled(DivWrapper)`
  display: grid;
  grid-template-columns: 1fr 100px;
`

export const KeywordsSettings = (props) => {
  const { colors } = useTheme()
  const [updateBusiness, { isLoading }] = useUpdateBusinessMutation()

  const [category, setCategory] = useState("")
  const [keyword, setKeyword] = useState("")
  const [deleteModal, setDeleteModal] = useState({ status: false, keyword })

  const buttonCondition = category.length > 0 && keyword.trim().length

  const selectedBusinessId = props.selectedBusinessId
  const transactionCategories =
    props.business[props.selectedBusinessId].categories

  const categories = formatCategoryDropDown(transactionCategories)

  // function that handles deleting a keyword from a category
  const handleDeleteKeyword = async (keyword) => {
    const updatedBusiness = deleteKeywordFromCategory(
      selectedBusinessId,
      category,
      keyword,
      props.business
    )

    updateBusiness({
      selectedBusinessId: selectedBusinessId,
      updatedBusiness,
    })
  }

  // function to add keywords to a category
  const handleAddKeyword = async () => {
    if (keyword.trim().length) {
      const updatedCategories = formatUpdatedCategories(
        transactionCategories,
        category,
        keyword,
        ""
      )

      const updatedBusiness = replaceCategory(
        props.selectedBusinessId,
        updatedCategories,
        props.business
      )

      updateBusiness({
        selectedBusinessId: props.selectedBusinessId,
        updatedBusiness,
      })
    }
    setKeyword("")
  }

  return (
    <>
      <DivWrapper gap={size.xs} max="s">
        <SubTitle> Select a category to see the keywords </SubTitle>

        <DivWrapper>
          <Select
            options={categories}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </DivWrapper>

        <CustomWrapper gap={1}>
          <CustomSplitWrapper gap={size.m}>
            <FormInput
              type="text"
              height={size.xl}
              fontSize={size.xxxs}
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Enter keywords to add to this category"
            />
            <ButtonState
              loading={isLoading && keyword}
              loadingText="Loading"
              condition={buttonCondition}
              onClick={handleAddKeyword}
            >
              Add
            </ButtonState>
          </CustomSplitWrapper>
          <CustomKeywordsWrapper top={0.2}>
            {category &&
              transactionCategories
                .filter(
                  (transactionCategory) =>
                    transactionCategory.categoryId === category
                )[0]
                .keywords.toReversed()
                .map((selected, i) => (
                  <Keyword
                    key={i}
                    text={selected.keyword}
                    onClick={() =>
                      setDeleteModal({
                        status: true,
                        keyword: selected.keyword,
                      })
                    }
                  />
                ))}
          </CustomKeywordsWrapper>
        </CustomWrapper>
      </DivWrapper>

      {deleteModal.status && (
        <Modal title="Delete?" handleClose={() => setDeleteModal(false)}>
          <DivWrapper align="center" gap={2}>
            <Text justify="center" color={colors.red}>
              Are you sure you want to delete this keyword?
            </Text>
            <Button onClick={() => handleDeleteKeyword(deleteModal.keyword)}>
              Yes, Delete it
            </Button>
          </DivWrapper>
        </Modal>
      )}
    </>
  )
}
