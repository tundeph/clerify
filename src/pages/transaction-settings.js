import React from "react"
import { NavLink } from "react-router-dom"

import { PageWrapper, UserWrapper, DivWrapper, Title } from "../layout/styles"
import { size } from "../layout/theme"

export const TransactionSettings = () => {
	console.log("here here ooo")
	return (
		<>
			<PageWrapper>
				<UserWrapper>
					<DivWrapper bottom={size.xxxs}>
						<Title> Edit Transaction </Title>
						<DivWrapper></DivWrapper>
					</DivWrapper>
				</UserWrapper>
			</PageWrapper>
		</>
	)
}
