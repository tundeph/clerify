import React from "react"
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

const AccountSettings = () => {
	return (
		<PageWrapper>
			<UserWrapper>
				<DivWrapper bottom={size.xxxs}>
					<Title> Settings </Title>
					<DivWrapper>
						<DivWrapper direction="row" gap={1.5} top={2}>
							<CustomNavLink to="/account-settings">
								Edit financial account
							</CustomNavLink>
							<CustomNavLink to="/account-settings/add-user">
								Add new financial account
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

export default AccountSettings
