import React from "react"
import { size } from "../../layout/theme"
import { Outlet } from "react-router-dom"
import { PageWrapper, UserWrapper, DivWrapper, Title, Divider } from "../../layout/styles"

import CustomNavLink from "../../components/CustomNavLink"

const Reports = () => {
  return (
    <PageWrapper>
      <UserWrapper>
        <DivWrapper bottom={size.xxxs}>
          <Title> Reports </Title>
          <DivWrapper>
            <DivWrapper direction="row" gap={1.5} top={2}>
              <CustomNavLink to="/reports">Visual Reports</CustomNavLink>
              <CustomNavLink to="/reports/financial">Financial Reports</CustomNavLink>
            </DivWrapper>
            <Divider />
          </DivWrapper>
        </DivWrapper>

        <Outlet />
      </UserWrapper>
    </PageWrapper>
  )
}

export default Reports
