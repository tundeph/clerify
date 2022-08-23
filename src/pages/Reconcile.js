// load transactions with useeffect
//sort only transactions with no categoryId
// create a state for array index starting from 0
// create a state array for credit
// create a state array for debit
// show array [arrayindex]
//after user clicks NEXT update state array for credit or debit with keyword
//loop through array, if transaction is debit, check if its keyword exist in debit vice versa
// if it does not exist, update array index
//NEED: Change dropdown for keywords to checkboxes component, adn investigate adding array to keywords in db and state

import React, { useState, useEffect, useContext } from "react"
import styled, { ThemeContext } from "styled-components"
import { useSelector } from "react-redux"
import { useDocument } from "../hooks/useDocument"
import { selectUserProfile, selectTransactionCategories } from "../redux/profileSlice"
import { useFirestore } from "../hooks/useFirestore"
import { db } from "../firebase/config"
import { formatCategory, formatKeywordsDropDown, formatUpdatedCategories, reconcileAccts } from "../helper"

import { size } from "../layout/theme"
import {
  PageWrapper,
  UserWrapper,
  DivWrapper,
  Title,
  SubTitle,
  CalendarIcon,
  DebitIcon,
  CreditIcon,
  Text,
  ArrowForwardIcon,
  BouncingCabinetIcon,
} from "../layout/styles"

import Select from "../components/Select"
import ButtonState from "../components/ButtonState"
import NoTransactions from "../components/NoTransactions"
import { default as ReactSelect } from "react-select"

export const GrayWrapper = styled(DivWrapper)`
  background-color: ${({ theme }) => theme.colors.gray100};
  border-radius: 15px;
  padding: ${size.l}rem ${size.l}rem;
  box-sizing: border-box;
`

export const CustomDivWrapper = styled(DivWrapper)`
  gap: ${size.xxxs}rem;
  height: 160px;
  box-shadow: 2px 2px 2px ${({ theme }) => theme.colors.gray300};
  background-color: ${({ theme }) => theme.colors.reverse};
  border-radius: 15px;
  padding: ${size.xs}rem ${size.xxs}rem;
  box-sizing: border-box;
  overflow-y: scroll;
`

const CustomButton = styled(ButtonState)`
  padding: ${size.s}rem ${size.s}rem;
`

const Reconcile = () => {
  const { colors } = useContext(ThemeContext)
  const { selectedBusinessId } = useSelector(selectUserProfile)
  const [category, setCategory] = useState()
  const [chosenKeyword, setChosenKeyword] = useState()
  const [isPending, setIsPending] = useState(false)
  const [transactions, setTransactions] = useState()
  const [index, setIndex] = useState(0)
  const [loading, setLoading] = useState(true)
  const [chosenThirdParty, setChosenThirdParty] = useState()

  useEffect(() => {
    db.collection("accounts")
      .doc(selectedBusinessId)
      .onSnapshot(
        (snapshot) => {
          if (snapshot.data()) {
            setTransactions(snapshot.data())
            setLoading(false)
          } else {
            // setError("Oops! Nothing exists there")
          }
        },
        (err) => {
          console.log(err.message)
          // setError("failed to get document")
        }
      )
  }, [])

  let sorted = []

  if (transactions) {
    sorted = Object.entries(transactions).filter((transaction) => transaction[1].categoryId.trim() === "")
  }

  const buttonCondition = category && chosenKeyword
  const showReconcileButton = index > 0 && (index >= sorted.length || index > 10)

  const transactionCategories = useSelector((state) => selectTransactionCategories(state, selectedBusinessId))
  const categories = formatCategory(transactionCategories)
  const transactionsDb = useFirestore("accounts")
  const businessDb = useFirestore("business")
  const getTransactionsDoc = useDocument("accounts", selectedBusinessId)
  const getBusinessDoc = useDocument("business", selectedBusinessId)

  const handleReconcile = async () => {
    setIsPending(true)
    //do reconciliation
    const reconciledAccts = reconcileAccts(transactionCategories, getTransactionsDoc.document)
    setIndex(0)
    //update transactions db
    await transactionsDb.updateDocument(selectedBusinessId, reconciledAccts)

    setIsPending(false)
    // dispatch(getTransactions({ data: reconciled }))
  }

  const handleCategorise = async () => {
    setIsPending(true)
    //update categories with keyword
    const updatedCategories = formatUpdatedCategories(getBusinessDoc.document, category, chosenKeyword)
    await businessDb.updateDocument(selectedBusinessId, { categories: updatedCategories })

    if (index <= sorted.length) {
      setIndex(index + 1)
    }
    setChosenKeyword("")
    setCategory("")
    setIsPending(false)
  }

  return (
    <>
      <PageWrapper>
        <UserWrapper>
          <DivWrapper bottom={size.xs}>
            <Title> Reconcile records </Title>
            <SubTitle> Reconcile your data by categorising them properly.</SubTitle>
          </DivWrapper>
          {transactions && (
            <GrayWrapper gap={3}>
              {sorted && index < sorted.length && (
                <>
                  <DivWrapper direction="row" justify="space-between">
                    <DivWrapper direction="row">
                      <Text size={size.xxxs} color={colors.gray600}>
                        <CalendarIcon /> {sorted[index][1].date}
                      </Text>
                    </DivWrapper>
                    <DivWrapper direction="row">
                      <Text size={size.xxxs} color={sorted[index][1].type === "credit" ? colors.green : colors.red}>
                        {sorted[index][1].type === "credit" ? (
                          <>
                            CREDIT <CreditIcon />
                          </>
                        ) : (
                          <>
                            DEBIT <DebitIcon />
                          </>
                        )}
                      </Text>
                    </DivWrapper>
                  </DivWrapper>

                  <CustomDivWrapper align="center">
                    <Text size={size.m} color={sorted[index][1].type === "credit" ? colors.green : colors.red}>
                      {(sorted[index][1].amount / 100).toFixed(2)}
                    </Text>
                    <Text color={colors.gray600}> {sorted[index][1].remarks} </Text>
                  </CustomDivWrapper>
                  <ReactSelect options={formatKeywordsDropDown(sorted[index][1].remarks)} />
                  <DivWrapper>
                    <Text left={1} color={colors.gray600} size={0.8}>
                      Select a unique keyword or phrase to identify similar transactions
                    </Text>
                    <Select
                      options={formatKeywordsDropDown(sorted[index][1].remarks)}
                      value={chosenKeyword}
                      onChange={(e) => setChosenKeyword(e.target.value)}
                    />
                  </DivWrapper>

                  <DivWrapper>
                    <Text left={1} color={colors.gray600} size={0.8}>
                      Do you want to add a compulsory third-party {sorted[index][1].type === "credit" ? `(sender)` : `(receiver)`}{" "}
                      for this type of transaction?
                    </Text>
                    <Select
                      options={formatKeywordsDropDown(sorted[index][1].remarks)}
                      value={chosenKeyword}
                      onChange={(e) => setChosenThirdParty(e.target.value)}
                    />
                  </DivWrapper>

                  <DivWrapper direction="row" gap={1}>
                    <Select options={categories} value={category} onChange={(e) => setCategory(e.target.value)} />
                    <CustomButton
                      loading={isPending}
                      loadingText=""
                      condition={buttonCondition}
                      onClick={() => handleCategorise()}
                    >
                      Next <ArrowForwardIcon />
                    </CustomButton>
                  </DivWrapper>
                </>
              )}
              {sorted.length === 0 && !isPending && <NoTransactions />}
              {showReconcileButton && (
                <DivWrapper align="center" gap={2}>
                  <Text color={colors.gray300}>
                    <BouncingCabinetIcon size={80} />
                  </Text>
                  <Text align="center"> Click the button below to reconcile your transactions </Text>
                  <ButtonState loading={isPending} condition={true} loadingText="" onClick={() => handleReconcile()}>
                    Reconcile
                  </ButtonState>
                </DivWrapper>
              )}
            </GrayWrapper>
          )}

          {!loading && !transactions && (
            <GrayWrapper>
              <NoTransactions />
            </GrayWrapper>
          )}
        </UserWrapper>
      </PageWrapper>
    </>
  )
}

export default Reconcile
