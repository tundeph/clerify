import React, { useState, useContext } from "react"
import { useSelector, useDispatch } from "react-redux"
import { selectUserProfile, selectUserBusiness } from "../../redux/profileSlice"

import { addYears, format, isAfter, isBefore } from "date-fns"
import { textSorter } from "../../helper"

//
import styled, { css, ThemeContext } from "styled-components"
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
} from "../../layout/styles"

import Select from "../../components/Select"
import RadioInput from "../../components/RadioInput"
import ButtonState from "../../components/ButtonState"

export const CustomText = styled(Text)`
  background-color: ${({ theme }) => theme.colors.gray100};
  border-radius: 100px;
  padding: ${size.xxs}rem ${size.xs}rem;
  box-sizing: border-box;
`

const SyncFromOpenBank = () => {
  const { colors } = useContext(ThemeContext)
  const hasAccounts = null // { transDate: "2022/01/11" }
  const { selectedBusinessId } = useSelector(selectUserProfile)
  const business = useSelector(selectUserBusiness)
  // const { document, error } = useDocument("business", selectedBusinessId)
  const dispatch = useDispatch()

  //
  const dateNow = new Date()
  const oneYearBackwards = addYears(dateNow, -1).toDateString()

  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState(format(dateNow, "yyyy-MM-dd"))
  const [syncDate, setSyncDate] = useState(format(dateNow, "yyyy-MM-dd"))
  const [selectedAccount, setSelectedAccount] = useState("")

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
    if (new Date(e.target.value) > hasAccounts.transDate) {
      setSyncDate(e.target.value)
    } else {
      setSyncDate(format(new Date(hasAccounts.transDate), "yyyy-MM-dd"))
    }
  }

  return (
    <PageWrapper>
      <UserWrapper>
        <form>
          <DivWrapper bottom={size.xl}>
            <Title> Import financial records </Title>
            <SubTitle> Sync your financial records from your bank. </SubTitle>
          </DivWrapper>

          <DivWrapper gap={2}>
            <Select data={sortedBankAccounts} onChange={(e) => setSelectedAccount(e.target.value)} value={selectedAccount} />
            {!hasAccounts ? (
              <>
                <DivWrapper>
                  <Text left={1} color={colors.gray600} size={0.8}>
                    Sync from{" "}
                    {!hasAccounts && (
                      <>
                        from as far back as <Text bold> {` ${oneYearBackwards}`} </Text>
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
              <>
                <DivWrapper>
                  <Text left={1} color={colors.gray600} size={0.8}>
                    Sync{" "}
                    {hasAccounts && (
                      <>
                        from last date <Text bold> {new Date(hasAccounts.transDate).toDateString()} </Text>
                      </>
                    )}
                    up till:
                  </Text>
                  <DateInput type="date" value={syncDate} onChange={handleSyncDateChange} />
                </DivWrapper>
              </>
            )}
            <Button type="submit">Sync data </Button>
          </DivWrapper>
        </form>
      </UserWrapper>
    </PageWrapper>
  )
}

export default SyncFromOpenBank
