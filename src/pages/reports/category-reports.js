//spool the categories from selector and make their ids their value
//create the date components for users to select date range
//get all transactions and sort/filter based on date values
//get the chart.js graph from my exercise repo
//if number of days is more than 30, monthly chart is spooled, if more then 365 days, yearly chart

import React, { useState, useMemo } from "react"
import { getCategoryChartData } from "../../helper/charts-util"
import { formatCategory } from "../../helper"
import { format, subDays } from "date-fns"
import { useOutletContext } from "react-router-dom"

import {
	DivWrapper,
	SplitDiv,
	DateInput,
	GraphWrapper,
} from "../../layout/styles"
import { LineChart } from "../../components/charts"

export const CategoryReports = () => {
	const { selectedBusinessId, business, accounts, transactionCategories } =
		useOutletContext()

	const todayDate = format(new Date("2022/06/30"), "yyyy-MM-dd")
	const thirtyDaysAgo = format(
		subDays(new Date("2022/06/30"), 30),
		"yyyy-MM-dd"
	)

	//
	const [startDate, setStartDate] = useState(thirtyDaysAgo)
	const [endDate, setEndDate] = useState(todayDate)

	const categories = formatCategory(transactionCategories)
	const [showCategories] = useState(
		categories.map((category) => category.value)
	)

	//get the chart data
	const chartData = useMemo(
		() =>
			getCategoryChartData(
				accounts,
				business[selectedBusinessId].categories,
				showCategories,
				startDate,
				endDate
			),
		[accounts, showCategories, startDate, endDate]
	)

	return (
		<>
			<DivWrapper bottom={2}>
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
				</SplitDiv>
				<DivWrapper top={1}>
					<GraphWrapper top={1}>
						{/* {dailyCategoryData && <LineChart data={dailyCategoryData} />}
						<Divider /> */}
						{chartData && <LineChart data={chartData} />}
					</GraphWrapper>
				</DivWrapper>
			</DivWrapper>
		</>
	)
}
