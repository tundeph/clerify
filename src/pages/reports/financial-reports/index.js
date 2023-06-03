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

export const FinancialReports = () => {
  const {
    data: { business, selectedBusinessId },
  } = useProfileQuery()
  const { data: accounts } = useAccountsQuery(selectedBusinessId)

  const transactionCategories = business[selectedBusinessId].categories

  return (
    <PageWrapper>
      <UserWrapper>
        <DivWrapper bottom={size.xxxs}>
          <Title> Financial reports </Title>
          <DivWrapper>
            <DivWrapper direction="row" gap={1.5} top={2}>
              <CustomNavLink to="/reports/financial">
                Profit & Loss statement
              </CustomNavLink>
              <CustomNavLink to="/reports/financial/cashflow">
                Cashflow statement
              </CustomNavLink>
            </DivWrapper>
            <Divider />
          </DivWrapper>
        </DivWrapper>

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
