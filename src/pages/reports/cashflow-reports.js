//spool the categories from selector and make their ids their value
//create the date components for users to select date range
//get all transactions and sort/filter based on date values
//get the chart.js graph from my exercise repo
//if number of days is more than 30, monthly chart is spooled, if more then 365 days, yearly chart

import React, { useState, useEffect } from "react"
import { useProfileQuery } from "@services/profile-slice2"
import { useOutletContext } from "react-router-dom"
import { getCashflowChartData } from "../../hooks/charts-util"

// import { useSelector } from "react-redux"
// import {
// 	selectUserProfile,
// 	selectTransactionCategories,
// } from "../../services/profile-slice"
import { useDocument } from "../../hooks/useDocument"
import { formatCategory, formatCategoryDropDown } from "../../helper"
import { format, subDays } from "date-fns"
import { renderCharts } from "../../hooks/useCharts"
import { db } from "../../firebase/config"

import Select from "../../components/select"
import {
	DivWrapper,
	SplitDiv,
	Text,
	Divider,
	DateInput,
	Button,
	GraphWrapper,
	PageWrapper,
	UserWrapper,
} from "../../layout/styles"
import { LineChart, PieChart, BarChart } from "../../components/charts"
import ButtonState from "../../components/button-state"

export const CashflowReports = () => {
	const {
		data: { selectedBusinessId },
	} = useProfileQuery()

	const todayDate = format(new Date("2022/06/30"), "yyyy-MM-dd")
	const thirtyDaysAgo = format(
		subDays(new Date("2022/06/30"), 30),
		"yyyy-MM-dd"
	)

	//
	const [cashflowStartDate, setCashflowStartDate] = useState(thirtyDaysAgo)
	const [cashflowEndDate, setCashflowEndDate] = useState(todayDate)

	const { getCashflowData, combinedCashflowData, accounts } = useOutletContext()
	console.log("combinedCashflowData", combinedCashflowData)
	let dd

	if (accounts) {
		dd = getCashflowChartData(accounts, cashflowStartDate, cashflowEndDate)
		console.log("dd", dd)
	}
	const {
		getData,
		dailyCategoryData,
		// getCashflowData,
		// combinedCashflowData,
		getMOMData,
		MOMData,
	} = renderCharts()
	// const { selectedBusinessId } = useSelector(selectUserProfile)
	// const transactionCategories = useSelector((state) =>
	// selectTransactionCategories(state, selectedBusinessId)
	// )
	// const categories = formatCategory(transactionCategories)
	const getTransactionsDoc = useDocument("accounts", selectedBusinessId)
	// const [showCategories] = useState(
	// 	categories.map((category) => category.value)
	// )
	// const categoriesDropDown = formatCategoryDropDown(transactionCategories)

	// useEffect(() => {
	// 	db.collection("accounts")
	// 		.doc(selectedBusinessId)
	// 		.onSnapshot(
	// 			(snapshot) => {
	// 				if (snapshot.data()) {
	// 					getData(
	// 						snapshot.data(),
	// 						transactionCategories,
	// 						showCategories,
	// 						cashflowStartDate,
	// 						cashflowEndDate
	// 					)
	// 				}
	// 			},
	// 			(err) => {
	// 				console.log(err.message)
	// 			}
	// 		)
	// }, [])
	useEffect(() => {
		getCashflowData(getTransactionsDoc.document, thirtyDaysAgo, todayDate)
	}, [])
	const handleCashflowChart = () => {
		getCashflowData(
			getTransactionsDoc.document,
			cashflowStartDate,
			cashflowEndDate
		)
	}

	return (
		<>
			<DivWrapper bottom={2}>
				<SplitDiv minWidth={120} gap={1}>
					<DateInput
						type="date"
						value={cashflowStartDate}
						onChange={(e) => setCashflowStartDate(e.target.value)}
						size="small"
					/>
					<DateInput
						type="date"
						value={cashflowEndDate}
						onChange={(e) => setCashflowEndDate(e.target.value)}
						size="small"
					/>
					<Button size="small" onClick={handleCashflowChart}>
						Apply
					</Button>
				</SplitDiv>
				<DivWrapper top={1}>
					<GraphWrapper top={1}>
						{dd ? <PieChart data={dd} /> : null}
					</GraphWrapper>
					<GraphWrapper top={1}>
						{combinedCashflowData && <PieChart data={combinedCashflowData} />}
					</GraphWrapper>
				</DivWrapper>
			</DivWrapper>
		</>
	)
}
