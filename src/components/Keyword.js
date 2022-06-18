import React from "react"
import styled from "styled-components"

import { CloseIcon } from "../layout/styles"

const KeywordButton = styled.span`
  min-width: 100px;
  padding: 1em 1.5em;
  border-radius: 100px;
  background-color: ${({ theme }) => theme.colors.background};
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.secondary};
  box-shadow: 0px 0px 15px ${({ theme }) => theme.colors.gray300};
`

const Keyword = ({ text, onClick }) => {
  return (
    <KeywordButton>
      {text} <CloseIcon onClick={() => onClick(text)} />
    </KeywordButton>
  )
}

export default Keyword
