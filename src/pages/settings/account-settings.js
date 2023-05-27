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

export const AccountSettings = () => {
  return (
    <PageWrapper>
      <UserWrapper>
        <DivWrapper bottom={size.xxxs}>
          <Title> Settings </Title>
          <DivWrapper>
            <DivWrapper direction="row" gap={1.5} top={2}>
              <CustomNavLink to="/account-settings">Edit account</CustomNavLink>
              <CustomNavLink to="/account-settings/add">
                Add new account
              </CustomNavLink>
              <CustomNavLink to="/account-settings/category">
                Category settings
              </CustomNavLink>
              <CustomNavLink to="/account-settings/keywords">
                Keyword settings
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
