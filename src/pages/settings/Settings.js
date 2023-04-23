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

const Settings = () => {
	return (
		<PageWrapper>
			<UserWrapper>
				<DivWrapper bottom={size.xxxs}>
					<Title> Settings </Title>
					<DivWrapper>
						<DivWrapper direction="row" gap={1.5} top={2}>
							<CustomNavLink to="/settings">Category Settings</CustomNavLink>
							<CustomNavLink to="/settings/keywords">
								Keyword Settings
							</CustomNavLink>
							<CustomNavLink to="/settings/accounts">
								Account Settings
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

export default Settings
