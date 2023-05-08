import React from "react"
import { useProfileQuery } from "@services/profile-slice2"
import { useAccountsQuery } from "../../services/account-slice"

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

export const VisualReports = () => {
	const {
		data: { business, selectedBusinessId },
	} = useProfileQuery()
	const { data: accounts } = useAccountsQuery(selectedBusinessId)

	const transactionCategories = business[selectedBusinessId].categories

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

				<Outlet
					context={{
						accounts,
						business,
						selectedBusinessId,
						transactionCategories,
					}}
				/>
			</UserWrapper>
		</PageWrapper>
	)
}
