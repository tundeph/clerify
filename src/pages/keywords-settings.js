import React, { useState, useContext } from "react"
import styled, { ThemeContext } from "styled-components"
import { size } from "../layout/theme"
import { useSelector } from "react-redux"
import {
	selectUserProfile,
	selectTransactionCategories,
} from "../services/profile-slice"
import { useFirestore } from "../hooks/useFirestore"
import { useDocument } from "../hooks/useDocument"
import { formatCategoryDropDown, formatUpdatedCategories } from "../helper"

import {
	DivWrapper,
	SubTitle,
	FormInput,
	KeywordsWrapper,
	Button,
	Text,
} from "../layout/styles"
import Select from "../components/select"
import Keyword from "../components/keyword"
import Modal from "../components/modal"
import ButtonState from "../components/button-state"

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

export const KeywordsSettings = () => {
	const [category, setCategory] = useState("")
	const [keyword, setKeyword] = useState("")
	const [deleteModal, setDeleteModal] = useState({ status: false, keyword })

	const buttonCondition = category.length > 0 && keyword.trim().length

	const { colors } = useContext(ThemeContext)
	const { selectedBusinessId } = useSelector(selectUserProfile)
	const transactionCategories = useSelector((state) =>
		selectTransactionCategories(state, selectedBusinessId)
	)

	const { document } = useDocument("business", selectedBusinessId)
	const { updateDocument, response } = useFirestore("business")

	const categories = formatCategoryDropDown(transactionCategories)

	const handleDeleteKeyword = async (keyword) => {
		const filteredCategories = document.categories.reduce((acc, item) => {
			if (item.categoryId === category) {
				const newKeywords = item.keywords.filter(
					(selected) => selected.keyword !== keyword
				)
				item.keywords = newKeywords
				acc.push(item)
			} else {
				acc.push(item)
			}
			return acc
		}, [])

		await updateDocument(selectedBusinessId, { categories: filteredCategories })
		setDeleteModal((deleteModal) => ({ ...deleteModal, ...{ status: false } }))
	}

	const handleAddKeyword = async () => {
		if (keyword.trim().length) {
			const updatedCategories = formatUpdatedCategories(
				document.categories,
				category,
				keyword,
				""
			)
			await updateDocument(selectedBusinessId, {
				categories: updatedCategories,
			})
		}
		setKeyword("")
	}

	return (
		<>
			<DivWrapper bottom={size.m}>
				<SubTitle> Edit keywords for sorting your transactions </SubTitle>
			</DivWrapper>
			<DivWrapper bottom={size.m}>
				<Select
					options={categories}
					value={category}
					onChange={(e) => setCategory(e.target.value)}
				/>
			</DivWrapper>

			<CustomWrapper bottom={size.m} gap={1}>
				<CustomSplitWrapper gap={size.m}>
					<FormInput
						type="text"
						height={size.xl}
						fontSize={size.xxxs}
						value={keyword}
						onChange={(e) => setKeyword(e.target.value)}
						placeholder="Add keyword under current category"
					/>
					<ButtonState
						loading={response.isPending && keyword}
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
							.keywords.map((selected, i) => (
								<Keyword
									key={i}
									text={selected.keyword}
									onClick={() =>
										setDeleteModal({ status: true, keyword: selected.keyword })
									}
								/>
							))}
				</CustomKeywordsWrapper>
			</CustomWrapper>

			{deleteModal.status && (
				<Modal title="Delete?" handleClose={() => setDeleteModal(false)}>
					<DivWrapper align="center" gap={2}>
						<Text justify="center" color={colors.red}>
							Are you sure you want to delete this keyword?
						</Text>
						<Button onClick={() => handleDeleteKeyword(deleteModal.keyword)}>
							{" "}
							Yes, Delete it{" "}
						</Button>
					</DivWrapper>
				</Modal>
			)}
		</>
	)
}
