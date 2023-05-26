import React from "react"
import styled from "styled-components"

import { Pill, DivWrapper } from "@layout/styles"

const CustomDivWrapper = styled(DivWrapper)`
	display: inline;
`
const Wrapper = styled.span`
	display: flex;
	gap: 8px;
	align-items: center;
`

export const IconPill = ({ text, Icon, ...props }) => (
	<CustomDivWrapper>
		<Pill {...props}>
			<Wrapper>
				<Icon />
				{text}
			</Wrapper>
		</Pill>
	</CustomDivWrapper>
)
