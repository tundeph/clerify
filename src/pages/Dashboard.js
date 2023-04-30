import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import { format, subDays } from "date-fns"
import RecentTransactions from "../components/recent-transactions"
import { renderCharts } from "../hooks/useCharts"
import { PieChart, BarChart } from "../components/charts"
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
import { db } from "../firebase/config"
import { useProfileQuery } from "../services/profile-slice2"

export const Dashboard = () => {
	const navigate = useNavigate()
	const { data } = useProfileQuery()

	// const hasBusiness =
	// 	data.user.hasOwnProperty("business") &&
	// 	Object.keys(data.user.business).length
	// if (!hasBusiness) {
	// 	navigate("/add-business")
	// }
	const endDate = format(new Date("2022/06/30"), "yyyy-MM-dd")
	const startDate = format(subDays(new Date("2022/06/30"), 30), "yyyy-MM-dd")
	const { getCashflowData, dailyCashflowData, combinedCashflowData } =
		renderCharts()

	// const { selectedBusinessId } = data
	const [rawData, setRawData] = useState()

	useEffect(() => {
		// const generateReports = (selectedBusinessId) => {
		if (data) {
			db.collection("accounts")
				.doc(data.selectedBusinessId)
				.onSnapshot(
					(snapshot) => {
						getCashflowData(snapshot.data(), startDate, endDate)
						setRawData(snapshot.data())
					},
					(err) => {
						console.log(err.message)
					}
				)
		}
		// }
	}, [])

	return (
		<PageWrapper>
			{data && (
				<UserWrapper>
					{/* {data && generateReports(data.selectedBusinessId)} */}
					<Title> Dashboard</Title>
					<DivWrapper top={1}>
						<Text size={size.xxxs} bold>
							30-day Daily Cashflow
						</Text>
						{dailyCashflowData && <BarChart data={dailyCashflowData} />}
					</DivWrapper>
					<Divider />
					<SplitDiv minWidth={250} gap={1} top={1}>
						<GraphWrapper>
							{combinedCashflowData && <PieChart data={combinedCashflowData} />}
						</GraphWrapper>
						<GrayWrapper padding={size.xxs}>
							<Text size={size.xxxs} bold bottom={size.xs}>
								Latest transactions
							</Text>
							<Divider />
							{rawData && <RecentTransactions data={rawData} />}
						</GrayWrapper>
					</SplitDiv>
				</UserWrapper>
			)}
		</PageWrapper>
	)
}
