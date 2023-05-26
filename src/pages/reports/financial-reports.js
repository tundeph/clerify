import React, { useState } from "react"
import { useProfileQuery } from "@services/profile-slice2"
import { useAccountsQuery } from "@services/account-slice"
import { getCategoryChartData } from "@utils/charts-util"

import { format, subDays } from "date-fns"

import {
	DivWrapper,
	UserWrapper,
	PageWrapper,
	Text,
	DateInput,
	SplitDiv,
} from "@layout/styles"
import ButtonState from "@components/button-state"
import { formatCategory } from "@utils"
import ReportsTable from "@components/reports-table"

export const FinancialReports = (props) => {
	const { data } = useProfileQuery()
	const { data: accounts } = useAccountsQuery(props.selectedBusinessId)
	const { business } = data

	const todayDate = format(new Date("2022/06/30"), "yyyy-MM-dd")
	const thirtyDaysAgo = format(
		subDays(new Date("2022/06/30"), 30),
		"yyyy-MM-dd"
	)

	const transactionCategories = business[props.selectedBusinessId].categories
	const categories = formatCategory(transactionCategories)

	const [startDate, setStartDate] = useState(thirtyDaysAgo)
	const [endDate, setEndDate] = useState(todayDate)
	const [dailyCategoryData, setDailyCategoryData] = useState()

	const [showCategories] = useState(
		categories.map((category) => category.value)
	)

	const buttonConditionPL = startDate && endDate

	const handlePL = () => {
		setDailyCategoryData(
			getCategoryChartData(
				accounts,
				transactionCategories,
				showCategories,
				startDate,
				endDate
			)
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
