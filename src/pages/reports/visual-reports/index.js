// parent component for the visual report components
import React from "react"
import { useProfileQuery } from "@services/profile-slice2"
import { useAccountsQuery } from "@services/account-slice"

import { size } from "@layout/theme"
import { Outlet } from "react-router-dom"
import {
  PageWrapper,
  UserWrapper,
  DivWrapper,
  Title,
  Divider,
} from "@layout/styles"

import { CustomNavLink } from "@components"

export const VisualReports = () => {
  // get all data from redux
  const {
    data: { business, selectedBusinessId },
  } = useProfileQuery()
  const { data: accounts } = useAccountsQuery(selectedBusinessId)

  const transactionCategories = business[selectedBusinessId].categories

  return (
    <PageWrapper>
      <UserWrapper>
        <DivWrapper bottom={size.xxxs}>
          <Title> Visual Reports </Title>
          <DivWrapper>
            <DivWrapper direction="row" gap={1.5} top={2}>
              <CustomNavLink to="/reports/visual">
                Category report
              </CustomNavLink>
              <CustomNavLink to="/reports/visual/cashflow">
                Cashflow report
              </CustomNavLink>
              <CustomNavLink to="/reports/visual/mom">
                Month-on-Month report
              </CustomNavLink>
            </DivWrapper>
            <Divider />
          </DivWrapper>
        </DivWrapper>
        {/* pass all data through outlet to child components */}
        <Outlet
          context={{
            accounts,
            business,
            selectedBusinessId,
            transactionCategories,
          }}
        />
      </UserWrapper>
    </PageWrapper>
  )
}
