// load transactions with useeffect
//sort only transactions with no categoryId
// create a state for array index starting from 0
// create a state array for credit
// create a state array for debit
// show array [arrayindex]
//after user clicks NEXT update state array for credit or debit with keyword
//loop through array, if transaction is debit, check if its keyword exist in debit vice versa
// if it does not exist, update array index
//NEED: Change dropdown for keywords to checkboxes component, adn investigate adding array to keywords in db and state

import React, { useState, useEffect, useContext } from "react"
import styled, { ThemeContext } from "styled-components"
import { clone } from "ramda"
import { useDocument } from "../hooks/useDocument"
import {
	useProfileQuery,
	useUpdateCategoriesMutation,
} from "@services/profile-slice2"
import {
	useAccountsQuery,
	useUpdateAccountsMutation,
} from "@services/account-slice"
import { useFirestore } from "../hooks/useFirestore"
import { db } from "../firebase/config"
import {
	formatCategoryDropDown,
	formatKeywordsDropDown,
	formatUpdatedCategories,
	reconcileAccts,
	currencyFormatter,
} from "../helper"

import { size } from "../layout/theme"
import {
	PageWrapper,
	UserWrapper,
	DivWrapper,
	Title,
	SubTitle,
	CalendarIcon,
	DebitIcon,
	CreditIcon,
	Text,
	ArrowForwardIcon,
	BouncingCabinetIcon,
	GrayWrapper,
	Card,
	Divider,
	Button,
} from "../layout/styles"

import Select from "../components/select"
import ButtonState from "../components/button-state"
import NoTransactions from "../components/no-transactions"

export const CustomDivWrapper = styled(Card)`
	gap: ${size.xxxs}rem;
	height: 160px;
`

const CustomButton = styled(ButtonState)`
	padding: ${size.s}rem ${size.s}rem;
`

export const CategoriseTransaction = () => {
	const {
		data: { user, business, selectedBusinessId },
	} = useProfileQuery()
	const { data: transactions } = useAccountsQuery(selectedBusinessId)
	const [updateAccounts, { isLoading: accountsLoading }] =
		useUpdateAccountsMutation()

	let sorted = []

	if (transactions) {
		sorted = Object.entries(transactions).filter(
			(transaction) => transaction[1].categoryId.trim() === ""
		)
	}
	const [
		updateCategories,
		{ isLoading: categoryLoading, error: categoryError },
	] = useUpdateCategoriesMutation()
	console.log("categoryError", categoryError)
	const { colors } = useContext(ThemeContext)
	const [category, setCategory] = useState()
	const [chosenKeyword, setChosenKeyword] = useState()

	const [isPending, setIsPending] = useState(false)
	const [index, setIndex] = useState(0)
	const [loading, setLoading] = useState(true)
	const [chosenThirdParty, setChosenThirdParty] = useState("")
	const [categorizedQty, setCategorizedQty] = useState(1)
	const [showIntro, setShowIntro] = useState(true)
	const noToCategorize = sorted.length < 5 ? sorted.length : 5

	const buttonCondition = category && category
	const showReconcileButton =
		index > 0 && (index >= sorted.length || categorizedQty === noToCategorize)

	const transactionCategories = business[selectedBusinessId].categories
	const categoriesForDropDown = formatCategoryDropDown(transactionCategories)
	const transactionsDb = useFirestore("accounts")
	const businessDb = useFirestore("business")
	const getTransactionsDoc = useDocument("accounts", selectedBusinessId)
	const getBusinessDoc = useDocument("business", selectedBusinessId)

	const handleReconcile = async () => {
		setIsPending(true)
		//do reconciliation

		// const reconciledAccts = reconcileAccts(
		// 	transactionCategories,
		// 	getTransactionsDoc.document
		// )
		const reconciledAccts = reconcileAccts(
			transactionCategories,
			clone(transactions)
		)
		setIndex(0)
		//update transactions db
		// await transactionsDb.updateDocument(selectedBusinessId, reconciledAccts)
		updateAccounts({ selectedBusinessId, reconciledAccts })

		setCategorizedQty(0)
		setIsPending(false)
		// dispatch(getTransactions({ data: reconciled }))
	}

	const handleCategorise = async () => {
		setCategorizedQty((categorizedQty) => categorizedQty + 1)
		setIsPending(true)

		//update categories with keyword
		const categories = clone(business[selectedBusinessId].categories)
		const updatedCategories = formatUpdatedCategories(
			categories,
			category,
			chosenKeyword,
			chosenThirdParty
		)
		//update function from rtkquery
		updateCategories({ selectedBusinessId, updatedCategories })

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
					{/* the page first shows a summary of transactions to be reconciled */}
					{showIntro && sorted.length > 0 && (
						<Card>
							<Text size={size.xs} bold>
								{`Well, you still have ${sorted.length}  uncategorized transactions`}
							</Text>

							<Text size={size.xxs} bottom={1}>
								You can reconcile all your transactions by categorising few of
								them and then allowing the app to do the rest for you
							</Text>
							<Divider />
							<Text bottom={1}>
								Would you like to manually categorize some of your transactions
								now?
							</Text>
							<Button onClick={() => setShowIntro(!showIntro)}>
								Categorize now
							</Button>
						</Card>
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
													<CalendarIcon /> {sorted[index][1].date}
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
														sorted[index][1].type === "credit"
															? colors.green
															: colors.red
													}
												>
													{sorted[index][1].type === "credit" ? (
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
													sorted[index][1].type === "credit"
														? colors.green
														: colors.red
												}
											>
												{currencyFormatter(sorted[index][1].amount / 100)}
											</Text>
											<Text color={colors.gray600}>
												{" "}
												{sorted[index][1].remarks}{" "}
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
												options={formatKeywordsDropDown(
													sorted[index][1].remarks
												)}
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
												Do you want to add a compulsory{" "}
												<Text bold>
													third-party{" "}
													{sorted[index][1].type === "credit"
														? `(sender)`
														: `(receiver)`}{" "}
												</Text>{" "}
												for this type of transaction?
											</Text>
											<Select
												options={formatKeywordsDropDown(
													sorted[index][1].remarks
												)}
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
								<DivWrapper align="center" gap={2}>
									<Text color={colors.gray300}>
										<BouncingCabinetIcon size={80} />
									</Text>
									<Text align="center">
										Click the button below to reconcile your transactions{" "}
									</Text>
									<ButtonState
										loading={isPending}
										condition={true}
										loadingText=""
										onClick={() => handleReconcile()}
									>
										Reconcile
									</ButtonState>
								</DivWrapper>
							)}
						</GrayWrapper>
					)}

					{!loading && !transactions && (
						<GrayWrapper>
							<NoTransactions />
						</GrayWrapper>
					)}
				</UserWrapper>
			</PageWrapper>
		</>
	)
}
