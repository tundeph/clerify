import React from "react"
import styled, { useTheme } from "styled-components"

import { IconPill, TransactionType } from "@components"
import { currencyFormatter } from "@utils"
import { pipe, reduce, assoc, path, pick } from "ramda"

import {
	DivWrapper,
	SpanWrapper,
	Text,
	Card,
	CustomCheckmarkIcon,
	CustomDashIcon,
	BankIcon,
	CategoryIcon,
} from "@layout/styles"

const CustomCard = styled(Card)`
	display: grid;
	grid-template-columns: 50px 1fr 150px;
	&:hover {
		border: 1px solid ${({ theme }) => theme.colors.gray300};
	}
`

const TransactionCard = ({
	account,
	selectedBusinessId,
	business,
	onClick,
}) => {
	const { colors } = useTheme()

	const bankNames = pipe(
		path([selectedBusinessId, "accts"]),
		reduce((acc, obj) => assoc(obj.id, obj.acctName, acc), {})
	)
	const banks = bankNames(business)

	const categoryNames = (id, data) =>
		pipe(
			path([id, "categories"]),
			reduce(
				(acc, obj) => assoc(obj.categoryId, pick(["title", "type"], obj), acc),
				{}
			)
		)(data)

	const categories = categoryNames(selectedBusinessId, business)

	return (
		<CustomCard onClick={onClick}>
			{account.categoryId ? (
				<SpanWrapper color={colors.white}>
					<CustomCheckmarkIcon />
				</SpanWrapper>
			) : (
				<SpanWrapper color={colors.white}>
					<CustomDashIcon />
				</SpanWrapper>
			)}
			<DivWrapper>
				<Text size="0.8">{account.remarks} </Text>

				<DivWrapper direction="row" gap={0.6} top={0.6}>
					<IconPill size="0.6" text={banks[account.acctName]} Icon={BankIcon} />
					{account.categoryId ? (
						<IconPill
							size="0.6"
							text={categories[account.categoryId].title}
							Icon={CategoryIcon}
						/>
					) : null}
				</DivWrapper>
			</DivWrapper>
			<DivWrapper>
				<Text>{currencyFormatter(account.amount / 100)}</Text>

				<TransactionType type={account.type} size={0.7} />
			</DivWrapper>
		</CustomCard>
	)
}

export default TransactionCard
