import React from "react"
import { size } from "@layout/theme"

import {
  PageWrapper,
  UserWrapper,
  DivWrapper,
  Title,
  Divider,
} from "@layout/styles"

import { CustomNavLink } from "@components"

export const Reports = () => {
  return (
    <PageWrapper>
      <UserWrapper>
        <DivWrapper bottom={size.xxxs}>
          <Title> Reports </Title>
          <DivWrapper>
            <DivWrapper direction="column" gap={1.5} top={2}>
              <CustomNavLink to="/reports">Visual Reports</CustomNavLink>
              <CustomNavLink to="/reports/financial">
                Financial Reports
              </CustomNavLink>
            </DivWrapper>
            <Divider />
          </DivWrapper>
        </DivWrapper>

        {/* <Outlet /> */}
      </UserWrapper>
    </PageWrapper>
  )
}
