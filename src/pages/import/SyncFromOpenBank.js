import React, { useState, useContext, useReducer } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { selectUserProfile, selectUserBusiness, selectBusinessAccounts } from "../../redux/profileSlice"
import { useFirestore } from "../../hooks/useFirestore"

import { addYears, format, isBefore } from "date-fns"
import { textSorter } from "../../helper"

//
import styled, { ThemeContext } from "styled-components"
import { size } from "../../layout/theme"

import {
  PageWrapper,
  UserWrapper,
  DivWrapper,
  HalfDiv,
  Button,
  Text,
  DateInput,
  InfoBox,
  Title,
  SubTitle,
  LoadingIcon,
  DottedLoadingIcon,
} from "../../layout/styles"

import Select from "../../components/Select"
import Modal from "../../components/Modal"
import RadioInput from "../../components/RadioInput"
import ButtonState from "../../components/ButtonState"
import { Navigate } from "react-router-dom"

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

  //- NEEDED --useEffect to load lastAcctData into state

  //
  const dateNow = new Date()
  const oneYearBackwards = addYears(dateNow, -1).toDateString()

  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState(format(dateNow, "yyyy-MM-dd"))
  const [syncDate, setSyncDate] = useState(format(dateNow, "yyyy-MM-dd"))
  const [selectedAccount, setSelectedAccount] = useState("")

  //reducer for status messages in modal

  const initialState = {
    status: false,
    mssg: {},
  }

  const reducer = (state, action) => {
    switch (action.type) {
      case "LOADING_DATA":
        return { ...state, mssg: action.payload, status: true }
      case "ADDING_DATA":
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

  // const lastAcctData = null
  const { selectedBusinessId } = useSelector(selectUserProfile)
  const business = useSelector(selectUserBusiness)
  const getBusinessAccts = useSelector((state) => selectBusinessAccounts(state, selectedBusinessId))
  const [businessAccts] = getBusinessAccts.filter((businessAcct) => businessAcct.acctName === selectedAccount)

  // const { document, error } = useDocument("business", selectedBusinessId)
  // const dispatch = useDispatch()

  //
  const bankAccounts = textSorter([...business[selectedBusinessId].accts], "asc", "acctName").map((acct) => ({
    value: acct.acctName,
    text: acct.acctName,
  }))

  const sortedBankAccounts = [{ value: "", text: "Select account" }, ...bankAccounts]

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

  // const handleCancelSync = (e) => {
  //   console.log("sync cancelled ")
  // }

  const syncModalMessage = {
    loading: {
      title: "Sync in Progress",
      text: (
        <Text justify="center" color={colors.gray600}>
          Please be patient, your data is being synchronized. Don't close this page, as this may take up to 5 mins.
        </Text>
      ),
    },
    adding: {
      title: "Adding to Database",
      text: (
        <Text justify="center" color={colors.green}>
          The your financial data is now being added to your account, please wait a bit more!
        </Text>
      ),
    },
    reconciling: {
      title: "Reconciling accounts...",
      text: (
        <Text justify="center" color={colors.green}>
          We're almost there. We are now automatically reconciling your new data with your categories.
        </Text>
      ),
    },
    error: {
      title: "Error!",
      text: (
        <Text justify="center" color={colors.red}>
          Data sync was not successful. Please retry!
        </Text>
      ),
    },
  }

  const handleStartSync = async (e) => {
    e.preventDefault()
    dispatch({ type: "LOADING_DATA", payload: syncModalMessage.loading })

    try {
      const res = await fetch("http://localhost:3000/gtbank?_start=0&_end=10")
      const data = await res.json()
      console.log(data)
      dispatch({ type: "ADDING_DATA", payload: syncModalMessage.adding })
      //add data into 'accounts' document
      if (!businessAccts.hasOwnProperty("lastAcctData")) {
        await addDocumentWithId(selectedBusinessId, { data })
      } else {
        await updateDocument(selectedBusinessId, { data })
      }
      if (!response.error) {
        await updateDocument(selectedBusinessId, { lastAcctData: data[data.length - 1] })

        //reeconcile accts if lastAcctData and update modal to show process

        navigate("/reconcile")
      } else {
        dispatch({ type: "ERROR", payload: syncModalMessage.error })
      }
      // await updateDocument()
    } catch (err) {
      console.log("Error fetching data: " + err)
      dispatch({ type: "ERROR", payload: syncModalMessage.error })
    }
  }

  return (
    <>
      <PageWrapper>
        <UserWrapper>
          <form onSubmit={handleStartSync}>
            <DivWrapper bottom={size.xl}>
              <Title> Import financial records </Title>
              <SubTitle> Sync your financial records from your bank. </SubTitle>
            </DivWrapper>
            <DivWrapper gap={2}>
              <Select data={sortedBankAccounts} onChange={(e) => setSelectedAccount(e.target.value)} value={selectedAccount} />
              {businessAccts && !businessAccts.lastAcctData ? (
                <>
                  <DivWrapper>
                    <Text left={1} color={colors.gray600} size={0.8}>
                      Sync from{" "}
                      {!businessAccts.lastAcctData && (
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
                    {businessAccts && businessAccts.lastAcctData && (
                      <>
                        from last date <Text bold> {new Date(businessAccts.lastAcctData.transDate).toDateString()} </Text>
                      </>
                    )}
                    up till:
                  </Text>
                  <DateInput type="date" value={syncDate} onChange={handleSyncDateChange} />
                </DivWrapper>
              )}
              <ButtonState loading={false} condition={buttonCondition}>
                Sync data
              </ButtonState>
            </DivWrapper>
          </form>
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
