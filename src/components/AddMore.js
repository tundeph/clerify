import React from "react"
import styled from "styled-components"
import { DivWrapper, Text } from "../layout/styles"
import { ReactComponent as plusIcon } from "../assets/images/plus.svg"

const StyledIcon = styled(plusIcon)`
  width: calc(${(props) => props.size * 1.3}rem);
  height: calc(${(props) => props.size * 1.3}rem);
  padding: calc(${(props) => props.size * 18}px)
    calc(${(props) => props.size * 18}px);
  background-color: ${({ theme }) => theme.colors.gray100};
  border-radius: 50%;
  fill: ${({ theme }) => theme.colors.secondary};
  margin-bottom: 3px;
`

const CustomDiv = styled(DivWrapper)`
  margin: auto auto;
  cursor: pointer;
  width: calc(${(props) => props.size * 150}px);

  &:hover {
    > svg {
      fill: ${({ theme }) => theme.colors.reverse};
      background-color: ${({ theme }) => theme.colors.gray300};
    }
  }
`

const AddMore = ({ size }) => {
  return (
    <CustomDiv size={size} align="center">
      <StyledIcon size={size} />
      <Text size={size}> Add More</Text>
    </CustomDiv>
  )
}

export default AddMore
