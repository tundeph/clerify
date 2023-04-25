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

const AdminSettings = () => {
	return (
		<PageWrapper>
			<UserWrapper>
				<DivWrapper bottom={size.xxxs}>
					<Title> Settings </Title>
					<DivWrapper>
						<DivWrapper direction="row" gap={1.5} top={2}>
							<CustomNavLink to="/admin-settings">
								Add user account
							</CustomNavLink>
							<CustomNavLink to="/admin-settings/delete">
								Delete user account
							</CustomNavLink>
							<CustomNavLink to="/admin-settings/add-business">
								Add business
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

export default AdminSettings
