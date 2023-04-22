import React, { useState } from "react"
import styled, { css } from "styled-components"

import { DivWrapper, Divider } from "../layout/styles"

const TabsWrapper = styled.div`
	display: flex;
	gap: 20px;
	flex-wrap: nowrap;
`

const TabProps = css`
	min-width: 60px;
	padding: 0.8em 1.8em;
	font-size: 0.8rem;
	color: ${({ theme }) => theme.colors.secondary};
	text-align: center;
	border-radius: 100px;
	cursor: pointer;
	border: none;
`

const TabButton = styled.button`
	${TabProps}
`

const SelectedTabButton = styled.div`
	${TabProps}
	background-color: ${({ theme }) => theme.colors.gray100};
	font-family: "Beatrice Bold", sans-serif;
	color: ${({ theme }) => theme.colors.gray600};
`

const TabDiv = ({ contents }) => {
	const [selected, setSelected] = useState(0)

	return (
		<>
			<TabsWrapper direction="row" gap={0.5}>
				{contents.map(({ title }, i) => {
					return i === selected ? (
						<SelectedTabButton key={i} onClick={() => setSelected(i)}>
							{title}
						</SelectedTabButton>
					) : (
						<TabButton key={i} onClick={() => setSelected(i)} tabindex={i}>
							{title}
						</TabButton>
					)
				})}
			</TabsWrapper>
			<Divider gap={0.7} />
			<DivWrapper top={1}>{contents[selected].data}</DivWrapper>
		</>
	)
}

export default TabDiv
