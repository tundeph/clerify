// load transactions
//sort only transactions with no categoryId
// create a state for array index starting from 0
//after user clicks NEXT update state array for credit or debit with keyword
//loop through array, if transaction is debit, check if its keyword exist in debit vice versa
// if it does not exist, update array index

import React, { useState, useContext } from "react"
import styled, { ThemeContext } from "styled-components"
import { clone } from "ramda"

import {
	useProfileQuery,
	useUpdateBusinessMutation,
} from "@services/profile-slice2"
import {
	useAccountsQuery,
	useUpdateAccountsMutation,
} from "@services/account-slice"

import {
	formatCategoryDropDown,
	formatKeywordsDropDown,
	formatUpdatedCategories,
	reconcileAccts,
	currencyFormatter,
} from "../../helper"

import { size } from "../../layout/theme"
import {
	PageWrapper,
	UserWrapper,
	DivWrapper,
	Title,
	CalendarIcon,
	DebitIcon,
	CreditIcon,
	Text,
	ArrowForwardIcon,
	GrayWrapper,
	Card,
} from "../../layout/styles"

import Select from "@components/select"
import ButtonState from "@components/button-state"
import NoTransactions from "@components/no-transactions"

import CategoriseIntro from "./categorise-intro"
import ReconcileCard from "./reconcile-card"

export const CustomDivWrapper = styled(Card)`
	gap: ${size.xxxs}rem;
	height: 160px;
`

const CustomButton = styled(ButtonState)`
	padding: ${size.s}rem ${size.s}rem;
`

export const CategoriseTransaction = () => {
	//gets transactions from the redux app state
	const {
		data: { business, selectedBusinessId },
	} = useProfileQuery()
	const { data: transactions, isLoading: getAccountsLoading } =
		useAccountsQuery(selectedBusinessId)
	const [updateAccounts] = useUpdateAccountsMutation()

	let sorted = []

	// this filters for only uncategorized transactions
	if (transactions) {
		sorted = transactions.filter(
			(transaction) => transaction.categoryId.trim() === ""
		)
	}
	const [updateBusiness] = useUpdateBusinessMutation()

	const { colors } = useContext(ThemeContext)
	const [category, setCategory] = useState()
	const [chosenKeyword, setChosenKeyword] = useState()

	const [isPending, setIsPending] = useState(false)
	const [index, setIndex] = useState(0)

	const [chosenThirdParty, setChosenThirdParty] = useState("")
	const [categorizedQty, setCategorizedQty] = useState(1)
	const [showIntro, setShowIntro] = useState(true)
	const noToCategorize = sorted.length < 5 ? sorted.length : 5

	const buttonCondition = category && category
	const showReconcileButton =
		index > 0 && (index >= sorted.length || categorizedQty > noToCategorize)

	const transactionCategories = business[selectedBusinessId].categories
	const categoriesForDropDown = formatCategoryDropDown(transactionCategories)

	const handleReconcile = async () => {
		setIsPending(true)

		const reconciledAccts = reconcileAccts(
			transactionCategories,
			clone(transactions)
		)
		setIndex(0)

		updateAccounts({ selectedBusinessId, reconciledAccts })
		setCategorizedQty(1)
		setIsPending(false)
	}

	const handleCategorise = async () => {
		setCategorizedQty((categorizedQty) => categorizedQty + 1)
		setIsPending(true)

		//update categories with keyword
		const updatedBusiness = clone(business)
		const updatedCategories = formatUpdatedCategories(
			updatedBusiness[selectedBusinessId].categories,
			category,
			chosenKeyword,
			chosenThirdParty
		)

		updatedBusiness[selectedBusinessId].categories = updatedCategories

		//update function from rtkquery to update db
		updateBusiness({ selectedBusinessId, updatedBusiness })

		if (index <= sorted.length) {
			setIndex(index + 1)
		}
		setChosenKeyword("")
		setChosenThirdParty("")
		setCategory("")
		setIsPending(false)
	}

	return (
		<>
			<PageWrapper>
				<UserWrapper>
					<DivWrapper bottom={size.xs}>
						<Title> Reconcile records </Title>
					</DivWrapper>
					{/* introcard  shows a summary of transactions to be reconciled */}
					{showIntro && sorted.length > 0 && (
						<CategoriseIntro
							sorted={sorted}
							onClick={() => setShowIntro(!showIntro)}
						/>
					)}
					{/* when Categorize now button is clicked and there are uncategorized transactions, the trnsactions show one after another */}
					{!showIntro && sorted.length > 0 && (
						<GrayWrapper gap={1.5}>
							{sorted &&
								index < sorted.length &&
								categorizedQty <= noToCategorize && (
									<>
										<DivWrapper direction="row" justify="space-between">
											<DivWrapper direction="row">
												<Text size={size.xxxs} color={colors.gray600}>
													<CalendarIcon /> {sorted[index].date}
												</Text>
											</DivWrapper>
											<DivWrapper direction="row">
												<Text size={size.xxxs} color={colors.gray600}>
													{`${categorizedQty} of ${noToCategorize}`}
												</Text>
											</DivWrapper>
											<DivWrapper direction="row">
												<Text
													size={size.xxxs}
													color={
														sorted[index].type === "credit"
															? colors.green
															: colors.red
													}
												>
													{sorted[index].type === "credit" ? (
														<>
															CREDIT <CreditIcon />
														</>
													) : (
														<>
															DEBIT <DebitIcon />
														</>
													)}
												</Text>
											</DivWrapper>
										</DivWrapper>

										<CustomDivWrapper align="center">
											<Text
												size={size.m}
												color={
													sorted[index].type === "credit"
														? colors.green
														: colors.red
												}
											>
												{currencyFormatter(sorted[index].amount / 100)}
											</Text>
											<Text color={colors.gray600}>
												{sorted[index].remarks}
											</Text>
										</CustomDivWrapper>
										{/* <ReactSelect options={formatKeywordsDropDown(sorted[index][1].remarks)} /> */}
										<DivWrapper>
											<Text
												bottom={size["4xs"]}
												color={colors.gray600}
												size={0.8}
											>
												Select a <Text bold> unique keyword or phrase </Text> to
												identify similar transactions
											</Text>
											<Select
												options={formatKeywordsDropDown(sorted[index].remarks)}
												value={chosenKeyword}
												onChange={(e) => setChosenKeyword(e.target.value)}
											/>
										</DivWrapper>

										<DivWrapper>
											<Text
												bottom={size["4xs"]}
												color={colors.gray600}
												size={0.8}
											>
												Do you want to add a compulsory
												<Text bold>
													third-party
													{sorted[index].type === "credit"
														? `(sender)`
														: `(receiver)`}
												</Text>{" "}
												for this type of transaction?
											</Text>
											<Select
												options={formatKeywordsDropDown(sorted[index].remarks)}
												value={chosenThirdParty}
												onChange={(e) => setChosenThirdParty(e.target.value)}
											/>
										</DivWrapper>

										<DivWrapper direction="row" gap={1}>
											<Select
												options={categoriesForDropDown}
												value={category}
												onChange={(e) => setCategory(e.target.value)}
											/>
											<CustomButton
												loading={isPending}
												loadingText=""
												condition={true}
												onClick={() => handleCategorise()}
											>
												{!buttonCondition ? "Skip" : "Next"}{" "}
												<ArrowForwardIcon />
											</CustomButton>
										</DivWrapper>
									</>
								)}
							{sorted.length === 0 && !isPending && <NoTransactions />}
							{showReconcileButton && (
								<ReconcileCard
									isPending={isPending}
									onClick={() => handleReconcile()}
								/>
							)}
						</GrayWrapper>
					)}

					{!getAccountsLoading && !transactions && (
						<GrayWrapper>
							<NoTransactions />
						</GrayWrapper>
					)}
				</UserWrapper>
			</PageWrapper>
		</>
	)
}
