import React from "react"
import styled from "styled-components"

import { CustomCloseIcon } from "../layout/styles"

const KeywordButton = styled.div`
	display: grid;
	grid-template-columns: 1fr 10px;
	justify-self: center;
	align-items: center;
	min-width: 50px;
	padding: 0.5em 2.5em;
	border-radius: 100px;
	background-color: ${({ theme }) => theme.colors.background};
	font-size: 0.8rem;
	color: ${({ theme }) => theme.colors.secondary};
	box-shadow: 0px 0px 15px ${({ theme }) => theme.colors.gray300};
`

const Keyword = ({ text, onClick }) => {
	const handleClick = (text) => {
		if (!onClick) return null
		return onClick(text)
	}

	return (
		<KeywordButton>
			{text}
			{onClick ? <CustomCloseIcon onClick={() => handleClick(text)} /> : null}
		</KeywordButton>
	)
}

export default Keyword
