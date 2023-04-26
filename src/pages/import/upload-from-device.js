import React from "react"
import styled from "styled-components"
import { size } from "../../layout/theme"

import {
	DivWrapper,
	HalfDiv,
	Text,
	UploadInput,
	Button,
} from "../../layout/styles"
import Select from "../../components/select"

export const CustomText = styled(Text)`
	background-color: ${({ theme }) => theme.colors.gray100};
	border-radius: 100px;
	padding: ${size.xxs}rem ${size.xs}rem;
	box-sizing: border-box;
`

export const UploadFromDevice = ({
	selectData,
	selectValue,
	selectOnChange,
	uploadValue,
	uploadOnChange,
	onSubmit,
}) => {
	return (
		<form onSubmit={onSubmit}>
			<DivWrapper gap={2}>
				<Select
					options={selectData}
					value={selectValue}
					onChange={selectOnChange}
				/>
				<DivWrapper bottom={1} direction="horizontal" gap={3} align="center">
					<HalfDiv>
						<Text size={0.8}>Last date in account data </Text>
					</HalfDiv>
					<HalfDiv>
						<CustomText size={0.8}> January 25, 2022 at 9:03am </CustomText>
					</HalfDiv>
				</DivWrapper>
				<UploadInput
					type="file"
					value={uploadValue}
					onChange={uploadOnChange}
				/>
				<Button type="submit"> Upload data </Button>
			</DivWrapper>
		</form>
	)
}
