import React, { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { selectUserProfile, selectUserBusiness } from "../../redux/profileSlice"

import styled from "styled-components"
import { size } from "../../layout/theme"
import {
	PageWrapper,
	UserWrapper,
	DivWrapper,
	Title,
	Text,
	SubTitle,
} from "../../layout/styles"

import { textSorter } from "../../helper"
import TabDiv from "../../components/TabDiv"
import UploadFromDevice from "./upload-from-device"
import SyncFromOpenBank from "../import/SyncFromOpenBank"

export const CustomText = styled(Text)`
	background-color: ${({ theme }) => theme.colors.gray100};
	border-radius: 100px;
	padding: ${size.xxs}rem ${size.xs}rem;
	box-sizing: border-box;
`

export const HalfDiv = styled(DivWrapper)`
	width: 50%;
`

const ImportAccounts = () => {
	const { selectedBusinessId } = useSelector(selectUserProfile)
	const business = useSelector(selectUserBusiness)
	// const { document, error } = useDocument("business", selectedBusinessId)
	const dispatch = useDispatch()

	const [startDate, setStartDate] = useState("")
	const [endDate, setEndDate] = useState("")

	const bankAccounts = textSorter(
		[...business[selectedBusinessId].accts],
		"asc",
		"acctName"
	).map((acct) => ({
		value: acct.acctName,
		text: acct.acctName,
	}))

	const sortedBankAccounts = [
		{ value: "", text: "Select account" },
		...bankAccounts,
	]

	//
	const [selectedAccount, setSelectedAccount] = useState("")

	const Tab1 = (
		<SyncFromOpenBank
			selectData={sortedBankAccounts}
			selectOnChange={(e) => setSelectedAccount(e.target.value)}
			selectValue={selectedAccount}
			startDate={startDate}
			endDate={endDate}
			onChangeStartDate={(e) => setStartDate(e.target.value)}
			onChangeEndDate={(e) => setEndDate(e.target.value)}
		/>
	)

	const Tab2 = (
		<UploadFromDevice
			name="moi"
			selectData={sortedBankAccounts}
			onSubmit={(e) => {
				e.preventDefault()
			}}
		/>
	)

	const contents = [
		{ title: "Sync from Open Bank data", data: Tab1 },
		// { title: "Upload from Device", data: Tab2 },
	]

	return (
		<>
			<PageWrapper>
				<UserWrapper>
					<DivWrapper bottom={size.m}>
						<Title> Import financial records </Title>
						<SubTitle> Sync your financial records from your bank. </SubTitle>
					</DivWrapper>
					<DivWrapper bottom={size.m}>
						<TabDiv contents={contents} />
					</DivWrapper>
				</UserWrapper>
			</PageWrapper>
		</>
	)
}

export default ImportAccounts
