//spool the categories from selector and make their ids their value
//create the date components for users to select date range
//get all transactions and sort/filter based on date values

import React, { useState, useMemo } from "react"
import { useOutletContext } from "react-router-dom"
import { getCashflowChartData } from "../../helper/charts-util"

import { format, subDays } from "date-fns"

import {
	DivWrapper,
	SplitDiv,
	DateInput,
	GraphWrapper,
} from "../../layout/styles"
import { PieChart } from "../../components/charts"

export const CashflowReports = () => {
	const { accounts } = useOutletContext()

	const todayDate = format(new Date("2022/06/30"), "yyyy-MM-dd")
	const thirtyDaysAgo = format(
		subDays(new Date("2022/06/30"), 30),
		"yyyy-MM-dd"
	)

	const [cashflowStartDate, setCashflowStartDate] = useState(thirtyDaysAgo)
	const [cashflowEndDate, setCashflowEndDate] = useState(todayDate)

	const chartData = useMemo(
		() => getCashflowChartData(accounts, cashflowStartDate, cashflowEndDate),
		[accounts, cashflowStartDate, cashflowEndDate]
	)

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
				</SplitDiv>
				<DivWrapper top={1}>
					<GraphWrapper top={1}>
						{chartData ? (
							<PieChart data={chartData.resultForMonthlyCashflow} />
						) : null}
					</GraphWrapper>
					{/* <GraphWrapper top={1}>
						{combinedCashflowData && <PieChart data={combinedCashflowData} />}
					</GraphWrapper> */}
				</DivWrapper>
			</DivWrapper>
		</>
	)
}
