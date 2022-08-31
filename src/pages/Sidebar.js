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

const width = "300"

const SideBar = styled(PageWrapper)`
  display: flex;
  flex-direction: "row";
  background-color: ${({ theme }) => theme.colors.foreground};
  min-height: 100vh;
  width: ${width}px;
  max-width: ${width}px;
  min-width: ${width}px;
  padding: ${width / 6}px ${width / 6}px;
  box-sizing: border-box;
`

const SidebarContent = styled(DivWrapper)`
  position: fixed;
  min-width: ${width - width / 3}px;
`

const NavProps = css`
  display: flex;
  gap: 1.2rem;
  text-decoration: none;
  margin: 0.5em 0;
  color: ${({ theme }) => theme.colors.gray300};

  &:hover {
    filter: brightness(200%);
    font-family: "Beatrice-Bold", sans-serif;
  }

  &.active {
    filter: invert(80%);
    font-family: "Beatrice-Bold", sans-serif;
  }
`
const Nav = styled(NavLink)`
  ${NavProps}
`

const Sidebar = ({ business, onChange }) => {
  const { logout } = useLogout()

  let data = Object.entries(business).map((bus) => ({
    value: bus[0],
    label: bus[1].name,
    selected: bus[1].selected,
  }))
  data = [...data, { value: "add", label: "Add another business" }]

  return (
    <SideBar>
      <SidebarContent>
        <DivWrapper bottom={2}>
          <Logo reverse />
        </DivWrapper>
        <DivWrapper bottom={4}>
          <Select options={data} onChange={onChange} size="small" mode="reverse" />
        </DivWrapper>
        <Nav to="/dashboard">
          <DashboardIcon /> Dashboard
        </Nav>
        <Nav to="/sync-accounts">
          <ImportAccountsIcon /> Sync Accounts
        </Nav>

        <Nav to="/reconcile">
          <ReconcileIcon /> Categorize
        </Nav>

        <Nav to="/reports">
          <ReportsIcon /> Reports
        </Nav>

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
