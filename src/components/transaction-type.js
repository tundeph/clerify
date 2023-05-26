import React, { useContext } from "react"
import { ThemeContext } from "styled-components"

import { DivWrapper, DebitIcon, CreditIcon, Text } from "@layout/styles"

import { size } from "@layout/theme"

export const TransactionType = ({ type, ...props }) => {
	const { colors } = useContext(ThemeContext)

	return (
		<DivWrapper direction="row">
			<Text
				size={props.size || size.xxxs}
				color={type === "credit" ? colors.green : colors.red}
			>
				{type === "credit" ? (
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
	)
}
