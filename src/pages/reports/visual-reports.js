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

import { size } from "../../layout/theme"
import { Outlet } from "react-router-dom"
import {
	PageWrapper,
	UserWrapper,
	DivWrapper,
	Title,
	Divider,
} from "../../layout/styles"

import CustomNavLink from "../../components/custom-navlink"
import { LineChart, PieChart, BarChart } from "../../components/charts"

export const VisualReports = () => {
	const todayDate = format(new Date("2022/06/30"), "yyyy-MM-dd")
	const thirtyDaysAgo = format(
		subDays(new Date("2022/06/30"), 30),
		"yyyy-MM-dd"
	)

	//
	const [startDate, setStartDate] = useState(thirtyDaysAgo)
	const [endDate, setEndDate] = useState(todayDate)

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

	return (
		<PageWrapper>
			<UserWrapper>
				<DivWrapper bottom={size.xxxs}>
					<Title> Visual Reports </Title>
					<DivWrapper>
						<DivWrapper direction="row" gap={1.5} top={2}>
							<CustomNavLink to="/reports/visual">
								Category reports
							</CustomNavLink>
							<CustomNavLink to="/reports/visual/cashflow">
								Cashflow reports
							</CustomNavLink>
							<CustomNavLink to="/reports/visual/mom">
								Month-on-Month reports
							</CustomNavLink>
						</DivWrapper>
						<Divider />
					</DivWrapper>
				</DivWrapper>

				<Outlet />
			</UserWrapper>
		</PageWrapper>
	)
}
