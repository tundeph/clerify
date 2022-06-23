import React, { useContext } from "react"
import { NavLink } from "react-router-dom"
import styled, { ThemeContext } from "styled-components"

import {
  PageWrapper,
  DivWrapper,
  DashboardIcon,
  CategoriseIcon,
  KeywordsIcon,
  ImportAccountsIcon,
  ReconcileIcon,
  ReportsIcon,
  SettingsIcon,
  SignOutIcon,
} from "../layout/styles"
import Logo from "../components/Logo"
import Select from "../components/Select"

const SideBar = styled(PageWrapper)`
  display: flex;
  flex-direction: "row";
  background-color: ${({ theme }) => theme.colors.foreground};
  min-height: 100vh;
  width: 320px;
  max-width: 320px;
  min-width: 320px;
  padding: 50px 50px;
  box-sizing: border-box;
`

const SidebarContent = styled(DivWrapper)`
  position: fixed;
`

const Nav = styled(NavLink)`
  text-decoration: none;
  margin-bottom: 1em;
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

const Sidebar = () => {
  const { colors } = useContext(ThemeContext)
  const data = [
    { value: "one", text: "Organization 1" },
    { value: "two", text: "Organization 2" },
  ]
  return (
    <SideBar>
      <SidebarContent>
        <DivWrapper bottom={2}>
          <Logo reverse />
        </DivWrapper>
        <DivWrapper bottom={4}>
          <Select height={2.5} bgColor={colors.foreground} data={data} />
        </DivWrapper>
        <Nav to="/dashboard">
          <DashboardIcon /> Dashboard
        </Nav>

        <Nav to="/categorise">
          <CategoriseIcon /> Categorise
        </Nav>

        <Nav to="/keywords">
          <KeywordsIcon /> Keywords
        </Nav>

        <Nav to="/imports">
          <ImportAccountsIcon /> Import Accounts
        </Nav>

        <Nav to="/reconcile">
          <ReconcileIcon /> Reconcile
        </Nav>

        <Nav to="/reports">
          <ReportsIcon /> Reports
        </Nav>

        <Nav to="/dashboard">
          <SettingsIcon /> Settings
        </Nav>

        <Nav to="/dashboard">
          <SignOutIcon /> Sign out
        </Nav>
      </SidebarContent>
    </SideBar>
  )
}

export default Sidebar
