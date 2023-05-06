// NEEDED - Error handling if useeffect data fails
//- NEEDED --maybe a useEffect to load lastAcctData into state

import React, { useState, useContext, useReducer } from "react"
import { useNavigate } from "react-router-dom"

import { useProfileQuery } from "../../services/profile-slice2"
import { useAddAccountsMutation } from "../../services/account-slice"
import MonoConnect from "@mono.co/connect.js"
import { MonoSync } from "../../backend/mono-sync"

import { useDocument } from "../../hooks/useDocument"
import { useFirestore } from "../../hooks/useFirestore"

import { addYears, format, isBefore } from "date-fns"
import { textSorter, reconcileAccts, LIVE_PUBLIC_KEY } from "../../helper"
import { syncModalMessages } from "../../helper/default-data"
import shortid from "shortid"

//
import styled, { ThemeContext } from "styled-components"
import { size } from "../../layout/theme"

import {
	PageWrapper,
	UserWrapper,
	DivWrapper,
	Text,
	DateInput,
	Title,
	SubTitle,
	LoadingIcon,
	Button,
} from "../../layout/styles"

import Select from "../../components/select"
import Modal from "../../components/modal"
import ButtonState from "../../components/button-state"

import carpaddyData from "../../helper/carpaddy.json"

export const CustomText = styled(Text)`
	background-color: ${({ theme }) => theme.colors.gray100};
	border-radius: 100px;
	padding: ${size.xxs}rem ${size.xs}rem;
	box-sizing: border-box;
`

export const SyncFromOpenBank = () => {
	const { colors } = useContext(ThemeContext)
	const navigate = useNavigate()
	const { addDocumentWithId, updateDocument, response } =
		useFirestore("accounts")
	const updateBusiness = useFirestore("business")

	const {
		data: { user, business, selectedBusinessId, lastAcctData },
	} = useProfileQuery()
	const [addAccounts, { isLoading }] = useAddAccountsMutation()

	const { document } = useDocument("accounts", selectedBusinessId)
	const syncModalMessage = syncModalMessages(colors)
	const dateNow = new Date()
	const oneYearBackwards = addYears(dateNow, -1).toDateString()

	const [startDate, setStartDate] = useState("")
	const [endDate, setEndDate] = useState(format(dateNow, "yyyy-MM-dd"))
	const [syncDate, setSyncDate] = useState(format(dateNow, "yyyy-MM-dd"))
	const [selectedAccount, setSelectedAccount] = useState("")

	const initialState = {
		status: false,
		mssg: {},
	}

	//for test purposes, to be removed
	const handleUploadFromComputer = () => {
		const transformedData = carpaddyData.map((data) => {
			const id = shortid.generate()
			data.id = id
			data.acctName = selectedAccount
			data.categoryId = ""
			return data
		})

		addAccounts({ selectedBusinessId, accts: transformedData })
	}

	const reducer = (state, action) => {
		switch (action.type) {
			case "PROCESSING_DATA":
				return { ...state, mssg: action.payload, status: true }
			case "ERROR":
				return { ...state, mssg: action.payload, status: true }
			case "CLEAR_MODAL":
				return { ...state, ...initialState }
			default:
				return state
		}
	}

	const [state, dispatch] = useReducer(reducer, initialState)

	const buttonCondition = selectedAccount

	const getBusinessAccts = business[selectedBusinessId].accts
	const [businessAccts] = getBusinessAccts.filter(
		(businessAcct) => businessAcct.id === selectedAccount
	)
	const transactionCategories = business[selectedBusinessId].categories

	const bankAccounts = textSorter(
		[...business[selectedBusinessId].accts],
		"asc",
		"acctName"
	).map((acct) => ({
		value: acct.id,
		label: acct.acctName,
	}))

	const sortedBankAccounts = [
		{ value: "", label: "Select account" },
		...bankAccounts,
	]

	//
	const handleStartDateChange = (e) => {
		if (isBefore(new Date(e.target.value), new Date(oneYearBackwards))) {
			setStartDate(format(new Date(oneYearBackwards), "yyyy-MM-dd"))
		} else {
			if (isBefore(new Date(e.target.value), new Date(endDate))) {
				setStartDate(format(new Date(e.target.value), "yyyy-MM-dd"))
			} else {
				setStartDate(format(new Date(endDate), "yyyy-MM-dd"))
			}
		}
	}

	const handleEndDateChange = (e) => {
		if (isBefore(new Date(e.target.value), new Date(startDate))) {
			setEndDate(format(new Date(startDate), "yyyy-MM-dd"))
		} else {
			if (new Date(e.target.value) < dateNow) {
				setEndDate(e.target.value)
			} else {
				setEndDate(format(dateNow, "yyyy-MM-dd"))
			}
		}
	}

	const handleSyncDateChange = (e) => {
		if (new Date(e.target.value) > new Date(lastAcctData.date)) {
			setSyncDate(e.target.value)
		} else {
			setSyncDate(format(new Date(lastAcctData.date), "yyyy-MM-dd"))
		}
	}

	//connect account and get code
	const monoConnect = React.useMemo(() => {
		const monoInstance = new MonoConnect({
			onClose: () => console.log("Widget closed"),
			onLoad: () => console.log("Widget loaded successfully"),
			onSuccess: async ({ code }) => {
				// add code for actions to be taken
				const transactions = MonoSync(code, selectedAccount)
				dispatch({ type: "PROCESSING_DATA", payload: syncModalMessage.adding })

				const incomingAccounts = transactions.data.reduce(
					(acc, item, index) => {
						const id = shortid.generate()
						if (index === transactions.data.length - 1) {
							item.lastAcct = true
							updateBusiness.updateDocument(selectedBusinessId, {
								...{ lastAcctData: item },
							})
						}
						item.acctName = selectedAccount
						item.categoryId = ""
						acc[id] = item

						return acc
					},
					{}
				)

				// add data into 'accounts' document
				const hasLastAcctData = document
				if (!hasLastAcctData) {
					await addDocumentWithId(selectedBusinessId, { ...incomingAccounts })
				} else {
					const updatedAccts = {
						...document[selectedAccount],
						...incomingAccounts,
					}
					await updateDocument(selectedBusinessId, { ...updatedAccts })
				}
				if (!response.error) {
					// 1. update modal with syncModal.reconciling
					dispatch({
						type: "PROCESSING_DATA",
						payload: syncModalMessage.reconciling,
					})
					// 2. reconcile accts
					const reconciledAccts = reconcileAccts(
						transactionCategories,
						incomingAccounts
					)
					await updateDocument(selectedBusinessId, { ...reconciledAccts })
					// 3. then navigate to '/reconcile' after
					navigate("/reconcile")
				} else {
					dispatch({ type: "ERROR", payload: syncModalMessage.error })
				}

				//end of code of actions
			},
			key: LIVE_PUBLIC_KEY,
		})

		monoInstance.setup()

		return monoInstance
	}, [])

	return (
		<>
			<PageWrapper>
				<UserWrapper>
					<DivWrapper bottom={size.xl}>
						<Title> Import financial records </Title>
						<SubTitle> Sync your financial records from your bank. </SubTitle>
					</DivWrapper>
					<DivWrapper gap={2}>
						<Select
							options={sortedBankAccounts}
							onChange={(e) => setSelectedAccount(e.target.value)}
							value={selectedAccount}
						/>
						{businessAccts && !lastAcctData ? (
							<>
								<DivWrapper>
									<Text left={1} color={colors.gray600} size={0.8}>
										{`Sync from `}
										{!lastAcctData && (
											<>
												{` as far back as `}
												<Text bold> {` ${oneYearBackwards}`} </Text>
											</>
										)}
										:
									</Text>
									<DateInput
										type="date"
										value={startDate}
										onChange={handleStartDateChange}
									/>
								</DivWrapper>
								<DivWrapper>
									<Text left={1} color={colors.gray600} size={0.8}>
										{`Sync up till: `}
									</Text>
									<DateInput
										type="date"
										value={endDate}
										onChange={handleEndDateChange}
									/>
								</DivWrapper>
							</>
						) : (
							<DivWrapper bottom={2}>
								<Text color={colors.gray600} size={0.8}>
									{`Sync `}
									{businessAccts && lastAcctData && (
										<>
											{` from last date `}
											<Text bold>
												{new Date(lastAcctData.date).toDateString()}
											</Text>
										</>
									)}
									{` up till: `}
								</Text>
								<DateInput
									type="date"
									value={syncDate}
									onChange={handleSyncDateChange}
								/>
							</DivWrapper>
						)}
						<ButtonState
							loading={false}
							condition={buttonCondition}
							onClick={() => monoConnect.open()}
						>
							Sync data
						</ButtonState>
						<ButtonState
							loading={isLoading}
							condition={buttonCondition}
							onClick={handleUploadFromComputer}
						>
							Upload from Computer
						</ButtonState>
					</DivWrapper>
				</UserWrapper>
			</PageWrapper>
			{state.status && (
				<Modal
					title={state.mssg.title}
					handleClose={() => dispatch({ type: "CLEAR_MODAL" })}
				>
					<DivWrapper align="center" gap={2}>
						{state.mssg.title !== syncModalMessage.error.title && (
							<Text color={colors.gray300}>
								<LoadingIcon size={80} />
							</Text>
						)}
						{state.mssg.text}
					</DivWrapper>
				</Modal>
			)}
		</>
	)
}
