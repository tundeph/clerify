import React, { useMemo } from "react"

import { useProfileQuery } from "../services/profile-slice2"
import { useAccountsQuery } from "../services/account-slice"
import { getCashflowChartData } from "../helper/charts-util"

import { format, subDays } from "date-fns"
import RecentTransactions from "../components/recent-transactions"
import { PieChart, BarChart } from "../components/c-harts"
import { size } from "../layout/theme"
import {
	PageWrapper,
	Title,
	UserWrapper,
	DivWrapper,
	SplitDiv,
	Text,
	Divider,
	GraphWrapper,
	GrayWrapper,
} from "../layout/styles"

export const Dashboard = () => {
	const { data } = useProfileQuery(undefined, {
		refetchOnMountOrArgChange: true,
	})
	const { data: accounts } = useAccountsQuery(data.selectedBusinessId)
	const endDate = format(new Date("2022/06/30"), "yyyy-MM-dd")
	const startDate = format(subDays(new Date("2022/06/30"), 30), "yyyy-MM-dd")

	//calculate data for chart and feed into the chart components
	let chartData
	chartData = useMemo(
		() => getCashflowChartData(accounts, startDate, endDate),
		[accounts]
	)

	return (
		<PageWrapper>
			{data && (
				<UserWrapper>
					<Title> Dashboard</Title>
					<DivWrapper top={1}>
						<Text size={size.xxxs} bold>
							30-day Daily Cashflow
						</Text>

						{chartData && <BarChart data={chartData.resultForDailyCashflow} />}
					</DivWrapper>
					<Divider />
					<SplitDiv minWidth={250} gap={1} top={1}>
						<GraphWrapper>
							{chartData && (
								<PieChart data={chartData.resultForMonthlyCashflow} />
							)}
						</GraphWrapper>
						<GrayWrapper padding={size.xxs}>
							<Text size={size.xxxs} bold bottom={size.xs}>
								Latest transactions
							</Text>
							<Divider />
							{accounts && <RecentTransactions data={accounts} />}
						</GrayWrapper>
					</SplitDiv>
				</UserWrapper>
			)}
		</PageWrapper>
	)
}
