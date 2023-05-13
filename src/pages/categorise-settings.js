import React, { useState, useContext } from "react"
import { ThemeContext } from "styled-components"
import shortid from "shortid"
import { useFirestore } from "../hooks/useFirestore"
import { useDocument } from "../hooks/useDocument"
import { useSelector, useDispatch } from "react-redux"
import {
	selectUserProfile,
	updateBusinessCategory,
	selectTransactionCategories,
} from "../services/profile-slice"
import { businessCategories } from "../helper/default-data"

import { size } from "../layout/theme"
import {
	DivWrapper,
	SubTitle,
	FormInput,
	Text,
	Divider,
	KeywordsWrapper,
	Button,
} from "../layout/styles"
import Select from "../components/select"
import Keyword from "../components/keyword"
import Modal from "../components/modal"
import ButtonState from "../components/button-state"
import RadioButton from "../components/radio-button"
import SectionDivider from "../components/section-divider"

export const CategoriseSettings = () => {
	const { colors } = useContext(ThemeContext)
	const { updateDocument, response } = useFirestore("business")
	const { selectedBusinessId } = useSelector(selectUserProfile)
	const transactionCategories = useSelector((state) =>
		selectTransactionCategories(state, selectedBusinessId)
	)
	const { document } = useDocument("business", selectedBusinessId)

	const dispatch = useDispatch()

	//
	const [customCategory, setCustomCategory] = useState("")
	const [standardCategory, setStandardCategory] = useState("")
	const [errorModal, setErrorModal] = useState(false)
	const [transactionType, setTransactionType] = useState("")
	const [deleteModal, setDeleteModal] = useState({
		status: false,
		category: "",
	})
	const buttonCondition =
		(standardCategory || customCategory.length > 1) && transactionType

	const handleDeleteCategory = async (categoryId) => {
		setDeleteModal({ ...deleteModal, status: false })
		const filteredCategories = document.categories.filter(
			(category) => category.categoryId !== categoryId
		)
		await updateDocument(selectedBusinessId, { categories: filteredCategories })
		dispatch(
			updateBusinessCategory({ data: filteredCategories, selectedBusinessId })
		)
	}

	const handleAddCategory = async (e) => {
		e.preventDefault()

		if (standardCategory || customCategory) {
			const standardCategoryExist = document.categories.some(
				(selectedCategory) => selectedCategory.title === standardCategory
			)
			const customCategoryExist = document.categories.some(
				(selectedCategory) => selectedCategory.title === customCategory
			)
			let data = []
			if (!standardCategoryExist && standardCategory !== "") {
				const categoryId = shortid.generate()
				data.push({
					categoryId,
					type: transactionType,
					title: standardCategory,
					keywords: [],
				})
			}
			if (!customCategoryExist && customCategory !== "") {
				const categoryId = shortid.generate()
				data.push({
					categoryId,
					type: transactionType,
					title: customCategory,
					keywords: [],
				})
			}
			await updateDocument(selectedBusinessId, {
				categories: [...document.categories, ...data],
			})
		}
		setCustomCategory("")
		setStandardCategory("")
	}

	const handleSetStandardCategory = (e) => {
		setStandardCategory(e.target.value)
		setCustomCategory("")
	}

	const handleSetCustomCategory = (e) => {
		setCustomCategory(e.target.value)
		setStandardCategory("")
	}

	return (
		<>
			<DivWrapper bottom={size.s}>
				<SubTitle> Add customized or standard transaction categories </SubTitle>
			</DivWrapper>
			<form onSubmit={handleAddCategory}>
				<DivWrapper direction="column" gap={2} bottom={5}>
					<DivWrapper>
						<Text left={1} color={colors.gray600} size={size.xxs}>
							Choose
						</Text>
						<Select
							options={businessCategories}
							height={size.xl}
							bgColor={colors.gray100}
							fontSize={size.xxxs}
							value={standardCategory}
							onChange={handleSetStandardCategory}
						/>
					</DivWrapper>
					<SectionDivider> OR </SectionDivider>
					<DivWrapper>
						<Text left={1} color={colors.gray600} size={size.xxs}>
							Add
						</Text>
						<FormInput
							type="text"
							value={customCategory}
							onChange={handleSetCustomCategory}
							height={size.xl}
							fontSize={size.xxxs}
							placeholder="Enter a custom category"
						/>
					</DivWrapper>

					<DivWrapper direction="row" justify="space-between" align="center">
						<Text left={1}> What type of transaction is it? </Text>
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
						loading={response.isPending && (customCategory || standardCategory)}
						loadingText="Loading"
						condition={buttonCondition}
					>
						Add
					</ButtonState>
					{/* </HalfDiv> */}
				</DivWrapper>
			</form>
			<Divider />
			<KeywordsWrapper top={0.2}>
				{transactionCategories.length > 0 &&
					transactionCategories.map((category) => (
						<Keyword
							key={category.categoryId}
							text={category.title}
							onClick={() =>
								setDeleteModal({ status: true, category: category.categoryId })
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
					title="Are you sure?"
					handleClose={() => setDeleteModal({ ...deleteModal, status: false })}
				>
					<DivWrapper align="center" gap={2}>
						<Text justify="center" color={colors.red}>
							You are about to permanently delete this category and all
							associated keywords (for sorting) connected to it
						</Text>
						<Button onClick={() => handleDeleteCategory(deleteModal.category)}>
							Yes, Delete it
						</Button>
					</DivWrapper>
				</Modal>
			)}
		</>
	)
}
