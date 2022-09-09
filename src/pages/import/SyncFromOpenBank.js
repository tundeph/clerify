// NEEDED - Error handling if useeffect data fails
//- NEEDED --maybe a useEffect to load lastAcctData into state

import React, { useState, useContext, useReducer } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import {
  selectUserProfile,
  selectUserBusiness,
  selectBusinessAccounts,
  selectTransactionCategories,
} from "../../redux/profileSlice"
import MonoConnect from "@mono.co/connect.js"
import { MonoSync } from "../../backend/MonoSync"

import { useDocument } from "../../hooks/useDocument"
import { useFirestore } from "../../hooks/useFirestore"

import { addYears, format, isBefore } from "date-fns"
import { textSorter, reconcileAccts, LIVE_PUBLIC_KEY } from "../../helper"
import { syncModalMessages } from "../../helper/defaultData"
import shortid from "shortid"

//
import styled, { ThemeContext } from "styled-components"
import { size } from "../../layout/theme"

import {
  PageWrapper,
  UserWrapper,
  DivWrapper,
  Text,
  DateInput,
  Title,
  SubTitle,
  LoadingIcon,
} from "../../layout/styles"

import Select from "../../components/Select"
import Modal from "../../components/Modal"
import ButtonState from "../../components/ButtonState"

export const CustomText = styled(Text)`
  background-color: ${({ theme }) => theme.colors.gray100};
  border-radius: 100px;
  padding: ${size.xxs}rem ${size.xs}rem;
  box-sizing: border-box;
`

const SyncFromOpenBank = () => {
  const { colors } = useContext(ThemeContext)
  const navigate = useNavigate()
  const { addDocumentWithId, updateDocument, response } = useFirestore("accounts")
  const updateBusiness = useFirestore("business")
  const { selectedBusinessId, lastAcctData } = useSelector(selectUserProfile)
  const { document } = useDocument("accounts", selectedBusinessId)
  const syncModalMessage = syncModalMessages(colors)
  const dateNow = new Date()
  const oneYearBackwards = addYears(dateNow, -1).toDateString()

  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState(format(dateNow, "yyyy-MM-dd"))
  const [syncDate, setSyncDate] = useState(format(dateNow, "yyyy-MM-dd"))
  const [selectedAccount, setSelectedAccount] = useState("")

  const initialState = {
    status: false,
    mssg: {},
  }

  const reducer = (state, action) => {
    switch (action.type) {
      case "PROCESSING_DATA":
        return { ...state, mssg: action.payload, status: true }
      case "ERROR":
        return { ...state, mssg: action.payload, status: true }
      case "CLEAR_MODAL":
        return { ...state, ...initialState }
      default:
        return state
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState)

  const buttonCondition = selectedAccount
  //
  const business = useSelector(selectUserBusiness)
  const getBusinessAccts = useSelector((state) => selectBusinessAccounts(state, selectedBusinessId))

  const [businessAccts] = getBusinessAccts.filter(
    (businessAcct) => businessAcct.id === selectedAccount
  )
  const transactionCategories = useSelector((state) =>
    selectTransactionCategories(state, selectedBusinessId)
  )

  //
  const bankAccounts = textSorter([...business[selectedBusinessId].accts], "asc", "acctName").map(
    (acct) => ({
      value: acct.id,
      label: acct.acctName,
    })
  )

  const sortedBankAccounts = [{ value: "", label: "Select account" }, ...bankAccounts]

  //
  const handleStartDateChange = (e) => {
    if (isBefore(new Date(e.target.value), new Date(oneYearBackwards))) {
      setStartDate(format(new Date(oneYearBackwards), "yyyy-MM-dd"))
    } else {
      if (isBefore(new Date(e.target.value), new Date(endDate))) {
        setStartDate(format(new Date(e.target.value), "yyyy-MM-dd"))
      } else {
        setStartDate(format(new Date(endDate), "yyyy-MM-dd"))
      }
    }
  }

  const handleEndDateChange = (e) => {
    if (isBefore(new Date(e.target.value), new Date(startDate))) {
      setEndDate(format(new Date(startDate), "yyyy-MM-dd"))
    } else {
      if (new Date(e.target.value) < dateNow) {
        setEndDate(e.target.value)
      } else {
        setEndDate(format(dateNow, "yyyy-MM-dd"))
      }
    }
  }

  const handleSyncDateChange = (e) => {
    if (new Date(e.target.value) > businessAccts.lastAcctData.transDate) {
      setSyncDate(e.target.value)
    } else {
      setSyncDate(format(new Date(businessAccts.lastAcctData.transDate), "yyyy-MM-dd"))
    }
  }

  //connect account and get code
  const monoConnect = React.useMemo(() => {
    const monoInstance = new MonoConnect({
      onClose: () => console.log("Widget closed"),
      onLoad: () => console.log("Widget loaded successfully"),
      onSuccess: async ({ code }) => {
        // add code for actions to be taken
        const transactions = MonoSync(code, selectedAccount)
        dispatch({ type: "PROCESSING_DATA", payload: syncModalMessage.adding })

        const incomingAccounts = transactions.data.reduce((acc, item, index) => {
          const id = shortid.generate()
          if (index === transactions.data.length - 1) {
            item.lastAcct = true
            updateBusiness.updateDocument(selectedBusinessId, { ...{ lastAcctData: item } })
          }
          item.acctName = selectedAccount
          item.categoryId = ""
          acc[id] = item

          return acc
        }, {})

        // add data into 'accounts' document
        const hasLastAcctData = document
        if (!hasLastAcctData) {
          await addDocumentWithId(selectedBusinessId, { ...incomingAccounts })
        } else {
          const updatedAccts = { ...document[selectedAccount], ...incomingAccounts }
          await updateDocument(selectedBusinessId, { ...updatedAccts })
        }
        if (!response.error) {
          // 1. update modal with syncModal.reconciling
          dispatch({ type: "PROCESSING_DATA", payload: syncModalMessage.reconciling })
          // 2. reconcile accts
          const reconciledAccts = reconcileAccts(transactionCategories, incomingAccounts)
          await updateDocument(selectedBusinessId, { ...reconciledAccts })
          // 3. then navigate to '/reconcile' after
          navigate("/reconcile")
        } else {
          dispatch({ type: "ERROR", payload: syncModalMessage.error })
        }

        //end of code of actions
      },
      key: LIVE_PUBLIC_KEY,
    })

    monoInstance.setup()

    return monoInstance
  }, [])

  return (
    <>
      <PageWrapper>
        <UserWrapper>
          <DivWrapper bottom={size.xl}>
            <Title> Import financial records </Title>
            <SubTitle> Sync your financial records from your bank. </SubTitle>
          </DivWrapper>
          <DivWrapper gap={2}>
            <Select
              options={sortedBankAccounts}
              onChange={(e) => setSelectedAccount(e.target.value)}
              value={selectedAccount}
            />
            {businessAccts && !lastAcctData ? (
              <>
                <DivWrapper>
                  <Text left={1} color={colors.gray600} size={0.8}>
                    Sync from{" "}
                    {!lastAcctData && (
                      <>
                        as far back as <Text bold> {` ${oneYearBackwards}`} </Text>
                      </>
                    )}
                    :
                  </Text>
                  <DateInput type="date" value={startDate} onChange={handleStartDateChange} />
                </DivWrapper>
                <DivWrapper>
                  <Text left={1} color={colors.gray600} size={0.8}>
                    Sync up till:
                  </Text>
                  <DateInput type="date" value={endDate} onChange={handleEndDateChange} />
                </DivWrapper>
              </>
            ) : (
              <DivWrapper bottom={2}>
                <Text left={1} color={colors.gray600} size={0.8}>
                  Sync{" "}
                  {businessAccts && lastAcctData && (
                    <>
                      from last date{" "}
                      <Text bold> {new Date(lastAcctData.date).toDateString()} </Text>
                    </>
                  )}
                  up till:
                </Text>
                <DateInput type="date" value={syncDate} onChange={handleSyncDateChange} />
              </DivWrapper>
            )}
            <ButtonState
              loading={false}
              condition={buttonCondition}
              onClick={() => monoConnect.open()}
            >
              Sync data
            </ButtonState>
          </DivWrapper>
        </UserWrapper>
      </PageWrapper>
      {state.status && (
        <Modal title={state.mssg.title} handleClose={() => dispatch({ type: "CLEAR_MODAL" })}>
          <DivWrapper align="center" gap={2}>
            {state.mssg.title !== syncModalMessage.error.title && (
              <Text color={colors.gray300}>
                <LoadingIcon size={80} />
              </Text>
            )}
            {state.mssg.text}
          </DivWrapper>
        </Modal>
      )}
    </>
  )
}

export default SyncFromOpenBank
