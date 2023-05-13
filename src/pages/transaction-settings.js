import React from "react"

import { useProfileQuery } from "../services/profile-slice2"
import { useAccountsQuery } from "../services/account-slice"

import {
	PageWrapper,
	UserWrapper,
	DivWrapper,
	Title,
	Text,
} from "../layout/styles"
import { size } from "../layout/theme"

export const TransactionSettings = () => {
	const { data } = useProfileQuery()
	const { data: accounts } = useAccountsQuery(data.selectedBusinessId)

	console.log("here here ooo")
	return (
		<>
			<PageWrapper>
				<UserWrapper>
					<DivWrapper bottom={size.xxxs}>
						<Title> Edit Transaction </Title>
						{accounts
							? accounts
									.filter((account, index) => index < 10)
									.map((account) => <Text>{account.remarks} </Text>)
							: null}
						<DivWrapper></DivWrapper>
					</DivWrapper>
				</UserWrapper>
			</PageWrapper>
		</>
	)
}
