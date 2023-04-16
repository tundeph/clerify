import React from "react"
import { NavLink } from "react-router-dom"
import styled, { css } from "styled-components"
import { useLogout } from "../hooks/useLogout"

import {
	PageWrapper,
	DivWrapper,
	DashboardIcon,
	ImportAccountsIcon,
	ReconcileIcon,
	ReportsIcon,
	SettingsIcon,
	SignOutIcon,
} from "../layout/styles"
import Logo from "../components/Logo"
import Select from "../components/Select"

const WIDTH = "300"

const SideBar = styled(PageWrapper)`
	display: flex;
	flex-direction: "row";
	background-color: ${({ theme }) => theme.colors.foreground};
	min-height: 100vh;
	width: ${WIDTH}px;
	max-width: ${WIDTH}px;
	min-width: ${WIDTH}px;
	padding: ${WIDTH / 6}px ${WIDTH / 6}px;
	box-sizing: border-box;
`

const SidebarContent = styled(DivWrapper)`
	position: fixed;
	min-width: ${WIDTH - WIDTH / 3}px;
`

const NavProps = css`
	display: flex;
	align-items: center;
	gap: 8px;
	text-decoration: none;
	color: ${({ theme }) => theme.colors.gray300};
	font-size: 0.9rem;
	border-radius: 4px;
	padding: 8px;
	margin-bottom: 2px;
	background-color: ${({ theme }) => theme.colors.foreground};

	&:hover {
		color: ${({ theme }) => theme.colors.gray400};
		background-color: ${({ theme }) => theme.colors.gray900};
	}

	&.active {
		background-color: ${({ theme }) => theme.colors.gray900};
	}
`
const Nav = styled(NavLink)`
	${NavProps}
`

const SubTitle = styled.span`
	margin-top: 15px;
	width: 100%;
	/* border-bottom: 1px solid white; */
	filter: invert(50%);
	font-family: "Beatrice-Bold", sans-serif;
	color: ${({ theme }) => theme.colors.background};
`

const Sidebar = ({ business, onChange }) => {
	const { logout } = useLogout()

	const data = Object.entries(business).map((bus) => ({
		value: bus[0],
		label: bus[1].name,
		selected: bus[1].selected,
	}))
	//  data = [...data, { value: "add", label: "Add another business" }]

	return (
		<SideBar>
			<SidebarContent>
				<DivWrapper bottom={2}>
					<Logo reverse />
				</DivWrapper>
				<DivWrapper bottom={1}>
					<Select
						options={data}
						onChange={onChange}
						size="small"
						mode="reverse"
					/>
				</DivWrapper>
				<SubTitle>Home </SubTitle>
				<Nav to="/dashboard">
					<DashboardIcon /> Dashboard
				</Nav>
				<SubTitle>Synchronize </SubTitle>
				<Nav to="/sync-accounts">
					<ImportAccountsIcon /> Sync Accounts
				</Nav>
				<SubTitle>Categorize </SubTitle>
				<Nav to="/reconcile">
					<ReconcileIcon /> Categorize
				</Nav>
				<SubTitle>Reports </SubTitle>
				<Nav to="/reports">
					<ReportsIcon /> Reports
				</Nav>
				<SubTitle>Settings </SubTitle>
				<Nav to="/settings">
					<SettingsIcon /> Settings
				</Nav>
				<Nav to="/signin" onClick={logout}>
					<SignOutIcon /> Sign out
				</Nav>
			</SidebarContent>
		</SideBar>
	)
}

export default Sidebar
