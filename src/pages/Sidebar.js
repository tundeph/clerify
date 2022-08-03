import React, { useContext } from "react"
import { NavLink } from "react-router-dom"
import styled, { css, ThemeContext } from "styled-components"
import { useLogout } from "../hooks/useLogout"

import {
  PageWrapper,
  DivWrapper,
  SpanWrapper,
  DashboardIcon,
  ImportAccountsIcon,
  ReconcileIcon,
  ReportsIcon,
  SettingsIcon,
  SignOutIcon,
} from "../layout/styles"
import Logo from "../components/Logo"
import Select from "../components/Select"
import { selectUserBusiness } from "../redux/profileSlice"

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

const SuperNav = styled(DivWrapper)`
  ${NavProps}
  cursor: pointer;
`
const selectedProps = css`
  filter: brightness(200%);
  font-family: "Beatrice-Bold", sans-serif;
`
const CustomSpanWrapper = styled(SpanWrapper)`
  display: flex;
  gap: 1.2rem;
  ${({ selected }) => selected && selectedProps}
`

const Sidebar = ({ business, onChange }) => {
  const { logout } = useLogout()
  const { colors } = useContext(ThemeContext)

  const data = Object.entries(business).map((bus) => ({ value: bus[0], text: bus[1].name, selected: bus[1].selected }))

  return (
    <SideBar>
      <SidebarContent>
        <DivWrapper bottom={2}>
          <Logo reverse />
        </DivWrapper>
        <DivWrapper bottom={4}>
          <Select height={2.5} bgColor={colors.foreground} data={data} onChange={onChange} />
        </DivWrapper>
        <Nav to="/">
          <DashboardIcon /> Dashboard
        </Nav>
        <Nav to="/sync-accounts">
          <ImportAccountsIcon /> Sync Accounts
        </Nav>

        <Nav to="/reconcile">
          <ReconcileIcon /> Reconcile
        </Nav>

        <Nav to="/reports">
          <ReportsIcon /> Reports
        </Nav>

        <Nav to="/settings">
          <SettingsIcon /> Settings
        </Nav>

        {/* <DivWrapper>
          <SuperNav to="/settings" gap={2} align="center" direction="row" onClick={() => setSettingsSubmenu(!settingsSubmenu)}>
            <CustomSpanWrapper gap={3} selected={settingsSubmenu && shouldShow}>
              <SettingsIcon /> Settings
            </CustomSpanWrapper>
            <ArrowRightIcon />
          </SuperNav>
          {settingsSubmenu && (
            <DivWrapper top={1} bottom={1}>
              <Divider color={colors.gray600} />
              <Nav to={CATEGORISE_PATH}>
                <CategoriseIcon /> Category Settings
              </Nav>
              <Nav to={KEYWORDS_PATH}>
                <KeywordsIcon /> Keywords Settings
              </Nav>
              <Divider color={colors.gray600} />
            </DivWrapper>
          )}
        </DivWrapper> */}

        <Nav to="/signin" onClick={logout}>
          <SignOutIcon /> Sign out
        </Nav>
      </SidebarContent>
    </SideBar>
  )
}

export default Sidebar
