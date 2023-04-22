//spool the categories from selector and make their ids their value
//create the date components for users to select date range
//get all transactions and sort/filter based on date values
//get the chart.js graph from my exercise repo
//if number of days is more than 30, monthly chart is spooled, if more then 365 days, yearly chart

import React, { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import {
	selectUserProfile,
	selectTransactionCategories,
} from "../../redux/profileSlice"
import { useDocument } from "../../hooks/useDocument"
import { formatCategory, formatCategoryDropDown } from "../../helper"
import { format, subDays } from "date-fns"
import { useCharts } from "../../hooks/useCharts"
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

const CategoryReports = () => {
	const todayDate = format(new Date("2022/06/30"), "yyyy-MM-dd")
	const thirtyDaysAgo = format(
		subDays(new Date("2022/06/30"), 30),
		"yyyy-MM-dd"
	)
	//
	const [startDate, setStartDate] = useState(thirtyDaysAgo)
	const [endDate, setEndDate] = useState(todayDate)
	//
	const [cashflowStartDate, setCashflowStartDate] = useState(thirtyDaysAgo)
	const [cashflowEndDate, setCashflowEndDate] = useState(todayDate)
	//
	const [firstMonth, setFirstMonth] = useState(thirtyDaysAgo.substring(0, 7))
	const [secondMonth, setSecondMonth] = useState(todayDate.substring(0, 7))
	const [MOMCategory, setMOMCategory] = useState("")

	const buttonConditionMOM = firstMonth && secondMonth && MOMCategory

	const {
		getData,
		dailyCategoryData,
		getCashflowData,
		combinedCashflowData,
		getMOMData,
		MOMData,
	} = useCharts()
	const { selectedBusinessId } = useSelector(selectUserProfile)
	const transactionCategories = useSelector((state) =>
		selectTransactionCategories(state, selectedBusinessId)
	)
	const categories = formatCategory(transactionCategories)
	const getTransactionsDoc = useDocument("accounts", selectedBusinessId)
	const [showCategories] = useState(
		categories.map((category) => category.value)
	)
	const categoriesDropDown = formatCategoryDropDown(transactionCategories)

	useEffect(() => {
		db.collection("accounts")
			.doc(selectedBusinessId)
			.onSnapshot(
				(snapshot) => {
					if (snapshot.data()) {
						getData(
							snapshot.data(),
							transactionCategories,
							showCategories,
							startDate,
							endDate
						)
					}
				},
				(err) => {
					console.log(err.message)
				}
			)
	}, [])

	const handleCategoryChart = () => {
		getData(
			getTransactionsDoc.document,
			transactionCategories,
			showCategories,
			startDate,
			endDate
		)
	}

	const handleMOMChart = () => {
		getMOMData(
			getTransactionsDoc.document,
			transactionCategories,
			MOMCategory,
			firstMonth,
			secondMonth
		)
	}

	const handleCashflowChart = () => {
		getCashflowData(
			getTransactionsDoc.document,
			cashflowStartDate,
			cashflowEndDate
		)
	}

	return (
		<>
			{/* <SubTitle>Select the categories you want to generate reports for.</SubTitle> */}
			<DivWrapper top={2} bottom={2}>
				<Text bold size={1}>
					Category Reports
				</Text>
				<SplitDiv minWidth={120} gap={1} top={2}>
					<DateInput
						type="date"
						value={startDate}
						onChange={(e) => setStartDate(e.target.value)}
						size="small"
					/>
					<DateInput
						type="date"
						value={endDate}
						onChange={(e) => setEndDate(e.target.value)}
						size="small"
					/>
					<Button size="small" onClick={handleCategoryChart}>
						Apply
					</Button>
				</SplitDiv>
				<DivWrapper top={1}>
					<GraphWrapper top={1}>
						{dailyCategoryData && <LineChart data={dailyCategoryData} />}
					</GraphWrapper>
				</DivWrapper>
			</DivWrapper>

			<Divider />
			<DivWrapper top={2} bottom={2}>
				<Text bold size={1}>
					Cashflow Reports
				</Text>
				<SplitDiv minWidth={120} gap={1} top={2}>
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
						{combinedCashflowData && <PieChart data={combinedCashflowData} />}
					</GraphWrapper>
				</DivWrapper>
			</DivWrapper>

			<Divider />

			<DivWrapper top={2} bottom={2}>
				<Text bold size={1}>
					Month-on-Month (MOM) Reports
				</Text>
				<SplitDiv minWidth={120} gap={1} top={2}>
					<DateInput
						type="month"
						value={firstMonth}
						onChange={(e) => setFirstMonth(e.target.value)}
						size="small"
					/>
					<DateInput
						type="month"
						value={secondMonth}
						onChange={(e) => setSecondMonth(e.target.value)}
						size="small"
					/>
					<Select
						options={categoriesDropDown}
						onChange={(e) => setMOMCategory(e.target.value)}
						value={MOMCategory}
						size="small"
					/>
					<ButtonState
						size="small"
						loading={false}
						condition={buttonConditionMOM}
						loadingText=""
						onClick={handleMOMChart}
					>
						Apply
					</ButtonState>
				</SplitDiv>
				<DivWrapper top={1}>
					<GraphWrapper top={1}>
						{combinedCashflowData && <BarChart data={MOMData} />}
					</GraphWrapper>
				</DivWrapper>
			</DivWrapper>
		</>
	)
}

export default CategoryReports
