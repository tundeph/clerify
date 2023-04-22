import React from "react"
import styled from "styled-components"

const Container = styled.div`
  display: flex;
  align-items: center;
  text-align: center;

  &::after,
  &::before {
    content: "";
    border: 0.5px solid ${({ theme }) => theme.colors.gray300};
    flex: 1;
  }
`

const Span = styled.span`
  font-size: 10px;
  padding: 5px 20px;
  border-radius: 20px;
  background-color: ${({ theme }) => theme.colors.gray100};
  border: 0.5px solid ${({ theme }) => theme.colors.gray300};
`

const SectionDivider = ({ children }) => {
  return (
    <Container>
      <Span> {children} </Span>
    </Container>
  )
}

export default SectionDivider
