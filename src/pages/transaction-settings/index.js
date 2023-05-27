import React, { useState, useReducer } from "react"

import {
  useAccountsQuery,
  useUpdateAccountsMutation,
} from "@services/account-slice"

import {
  PageWrapper,
  UserWrapper,
  DivWrapper,
  Title,
  FormInput,
  Divider,
  LoadingIcon,
  Text,
  SpanWrapper,
} from "@layout/styles"

import { size } from "@layout/theme"
import { Checkbox } from "@components"
import TransactionCard from "./transaction-card"
import TransactionModal from "./transaction-modal"
import { combinedFilters, filterReducer } from "./transaction-utils"

export const TransactionSettings = (props) => {
  const { data: accounts, isLoading } = useAccountsQuery(
    props.selectedBusinessId
  )
  const [updateAccounts, result] = useUpdateAccountsMutation()

  const [openModal, setOpenModal] = useState(false)
  const [accountToEdit, setAccountToEdit] = useState({})

  const initialState = {
    txt: "",
    num: 5,
    uncat: false,
  }

  const [state, dispatch] = useReducer(filterReducer, initialState)

  const handleTextChange = (e, total) => {
    dispatch({
      type: "BY_TEXT",
      payload: { txt: e.target.value, num: total },
    })
  }

  const handleUncatChange = (e, total) => {
    dispatch({
      type: "UNCATEGORIZED",
      payload: {
        uncat: e.target.checked,
        num: total,
      },
    })
  }

  const handleEdit = (data) => {
    setAccountToEdit(data)
    setOpenModal(true)
  }

  const handleUpdateTransaction = (id) => {
    updateAccounts({ selectedBusinessId: id, reconciledAccts: [accountToEdit] })
    setOpenModal(false)
  }

  return (
    <PageWrapper>
      <UserWrapper>
        <DivWrapper gap={2} bottom={size.xxxs}>
          <Title> Transactions </Title>
          {isLoading ? (
            <>
              <LoadingIcon size={80} />
              Loading transactions...
            </>
          ) : (
            <>
              <FormInput
                type="text"
                value={state.txt}
                onChange={(e) => handleTextChange(e, accounts.length)}
                height={size.xl}
                placeholder="Search transactions"
              />
              <SpanWrapper>
                <Text size={size.xxxs}> Filter by: </Text>
                <Checkbox
                  onChange={(e) => handleUncatChange(e, accounts.length)}
                  checked={state.uncat}
                >
                  Uncategorized transactions
                </Checkbox>
              </SpanWrapper>

              <Divider />
              <DivWrapper gap={1}>
                {accounts
                  ? combinedFilters(
                      accounts,
                      state.uncat,
                      state.txt,
                      state.num
                    ).map((account, index) => (
                      <TransactionCard
                        key={index}
                        account={account}
                        selectedBusinessId={props.selectedBusinessId}
                        business={props.business}
                        onClick={() => handleEdit(account)}
                      />
                    ))
                  : null}
              </DivWrapper>
            </>
          )}
        </DivWrapper>
      </UserWrapper>
      {openModal && (
        <TransactionModal
          accountToEdit={accountToEdit}
          setOpenModal={setOpenModal}
          setAccountToEdit={setAccountToEdit}
          result={result}
          onClickUpdate={() =>
            handleUpdateTransaction(props.selectedBusinessId)
          }
          {...props}
        />
      )}
    </PageWrapper>
  )
}
