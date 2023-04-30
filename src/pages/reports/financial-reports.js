import React, { useState } from "react"
import { useProfileQuery } from "@services/profile-slice2"
// import { useSelector } from "react-redux"
// import {
// 	selectUserProfile,
// 	selectTransactionCategories,
// } from "../../services/profile-slice"
import { renderCharts } from "../../hooks/useCharts"
import { useDocument } from "../../hooks/useDocument"

import { format, subDays } from "date-fns"

import {
	DivWrapper,
	UserWrapper,
	PageWrapper,
	Text,
	DateInput,
	SplitDiv,
} from "../../layout/styles"
import ButtonState from "../../components/button-state"
import { formatCategory } from "../../helper"
import ReportsTable from "../../components/reports-table"

export const FinancialReports = () => {
	const {
		data: { user, selectedBusinessId },
	} = useProfileQuery()

	const todayDate = format(new Date("2022/06/30"), "yyyy-MM-dd")
	const thirtyDaysAgo = format(
		subDays(new Date("2022/06/30"), 30),
		"yyyy-MM-dd"
	)

	// const { selectedBusinessId } = useSelector(selectUserProfile)
	const transactionCategories = user.business[selectedBusinessId].categories
	const getTransactionsDoc = useDocument("accounts", selectedBusinessId)
	// const transactionCategories = useSelector((state) =>
	// 	selectTransactionCategories(state, selectedBusinessId)
	// )
	const categories = formatCategory(transactionCategories)
	const { getData, dailyCategoryData } = renderCharts()
	//
	const [startDate, setStartDate] = useState(thirtyDaysAgo)
	const [endDate, setEndDate] = useState(todayDate)
	const [showCategories] = useState(
		categories.map((category) => category.value)
	)

	const buttonConditionPL = startDate && endDate

	const handlePL = () => {
		getData(
			getTransactionsDoc.document,
			transactionCategories,
			showCategories,
			startDate,
			endDate
		)
	}

	return (
		<PageWrapper>
			<UserWrapper>
				<DivWrapper gap={2}>
					<Text bold="bold"> Profit and Loss Statement </Text>
					<SplitDiv minWidth={120} gap={1} top={1}>
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
						<ButtonState
							size="small"
							loading={false}
							condition={buttonConditionPL}
							loadingText=""
							onClick={handlePL}
						>
							Apply
						</ButtonState>
					</SplitDiv>

					<DivWrapper>
						{dailyCategoryData && transactionCategories && (
							<ReportsTable
								data={dailyCategoryData}
								categories={transactionCategories}
							/>
						)}
					</DivWrapper>
				</DivWrapper>
			</UserWrapper>
		</PageWrapper>
	)
}
