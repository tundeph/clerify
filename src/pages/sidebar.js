// this is the sidebar component
import React, { useState } from "react"
import { NavLink } from "react-router-dom"
import styled, { css } from "styled-components"
import { useLogoutMutation } from "@services/profile-slice2"

import {
  DivWrapper,
  DashboardIcon,
  ImportAccountsIcon,
  ReconcileIcon,
  ReportsIcon,
  SettingsIcon,
  SignOutIcon,
} from "@layout/styles"
import { Logo, Select } from "@components"

const WIDTH = "300"

const SideBar = styled.div`
  display: flex;
  flex-direction: "row";
  background-color: ${({ theme }) => theme.colors.foreground};
  min-height: 100vh;
  width: ${WIDTH}px;
  max-width: ${WIDTH}px;
  min-width: ${WIDTH}px;
  padding: ${WIDTH / 6}px ${WIDTH / 6}px;
  box-sizing: border-box;
  overflow-y: hidden;
  position: relative;
  z-index: auto;
`

const SidebarContent = styled(DivWrapper)`
  min-width: ${WIDTH - WIDTH / 3}px;
  z-index: 1;
  position: fixed;
`

const SubMenu = styled.div`
  position: fixed;
  width: 300px;
  background-color: #fff;
  top: 0;
  left: ${({ show }) => (show ? "300px" : "-3000px")};
  right: 200px;
  height: 100%;
  overflow-y: hidden;
  padding: 64px 24px 24px 24px;
  transition: all 1s ease-out;
  z-index: -1;
`

const NavProps = css`
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.gray300};
  font-size: 0.85rem;
  border-radius: 4px;
  padding: 8px;
  margin: 0px 0px 2px 12px;
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
  filter: invert(50%);
  font-family: "Beatrice-Bold", sans-serif;
  color: ${({ theme }) => theme.colors.background};
`

export const Sidebar = ({ permission, business, onChange }) => {
  // import the logout function from redux actions
  const [logout] = useLogoutMutation(undefined, {})

  const [showSubmenu] = useState(false)

  const data = Object.entries(business).map((bus) => ({
    value: bus[0],
    label: bus[1].name,
    selected: bus[1].selected,
  }))
  //  data = [...data, { value: "add", label: "Add another business" }]

  return (
    <SideBar>
      <SubMenu show={showSubmenu}> Submenu </SubMenu>
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
        <SubTitle>
          <DashboardIcon /> Home
        </SubTitle>
        <Nav to="/dashboard">Dashboard</Nav>
        <SubTitle>
          <ImportAccountsIcon /> Synchronize
        </SubTitle>
        <Nav to="/sync-accounts">Sync accounts</Nav>
        <SubTitle>
          <ReconcileIcon /> Transactions
        </SubTitle>
        <Nav to="/reconcile">Categorize </Nav>
        <Nav to="/transaction-settings">Transation settings</Nav>
        <SubTitle>
          <ReportsIcon /> Reports
        </SubTitle>
        <Nav to="/reports/visual">Visual reports</Nav>
        <Nav to="/reports/financial">Financial reports</Nav>
        <SubTitle>
          <SettingsIcon /> Settings
        </SubTitle>
        {/* <Nav onClick={() => setShowSubmenu(!showSubmenu)}>Add account</Nav> */}
        <Nav to="/reset-password">Reset password </Nav>
        <Nav to="/account-settings">Account settings</Nav>
        {permission === "admin" ? (
          <Nav to="/admin-settings">Admin settings </Nav>
        ) : null}
        <Nav to="/signin" onClick={async () => logout()}>
          <SignOutIcon /> Sign out
        </Nav>
      </SidebarContent>
    </SideBar>
  )
}
