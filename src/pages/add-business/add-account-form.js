import React, { useContext } from "react"
import { ThemeContext } from "styled-components"

import { size } from "../../layout/theme"

import { DivWrapper, SubTitle, Text, FormInput } from "../../layout/styles"
import { AddFormButton, DeleteFormButton } from "@components/form-buttons"

const AddAccountForm = ({
	accts,
	title,
	description,
	align,
	onChange,
	onAddMoreClick,
	onDeleteFormClick,
}) => {
	const { colors } = useContext(ThemeContext)

	return (
		<DivWrapper gap={size.xxs}>
			{title ? <SubTitle align={align}>{title} </SubTitle> : null}
			<Text align={align} size={size.xxxs} color={colors.secondary}>
				{description}
			</Text>
			{accts.map((acct, i) => {
				return (
					<DivWrapper key={acct.id}>
						<Text align="left" size={size.xxxs} color={colors.secondary}>
							Account {i + 1}:
						</Text>
						<DivWrapper direction="row">
							<FormInput
								onChange={(e) => onChange(e, acct.id)}
								value={acct.acctName}
								type="text"
								placeholder="e.g. ABC Bank "
							/>
							{accts.length > 1 && i < accts.length - 1 && (
								<DeleteFormButton
									onClick={onDeleteFormClick}
									size={0.7}
									value={acct.id}
								/>
							)}
							{accts.length - 1 === i && (
								<AddFormButton onClick={onAddMoreClick} size={0.7} />
							)}
						</DivWrapper>
					</DivWrapper>
				)
			})}
		</DivWrapper>
	)
}

export default AddAccountForm
