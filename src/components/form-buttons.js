// custom components for buttons with icons
import React from "react"
import styled, { css } from "styled-components"
import { PlusIcon, CloseIcon } from "../layout/styles"

const CustomButton = styled.button`
  background-color: transparent;
  color: none;
  border: none;
  cursor: pointer;

  &:hover {
    > svg {
      fill: ${({ theme }) => theme.colors.reverse};
      background-color: ${({ theme }) => theme.colors.gray300};
    }
  }
`

const IconProps = css`
  width: calc(${(props) => props.size * 1.5}rem);
  height: calc(${(props) => props.size * 1.5}rem);
  padding: calc(${(props) => props.size * 15}px)
    calc(${(props) => props.size * 15}px);
  background-color: ${({ theme }) => theme.colors.gray100};
  border-radius: 50%;
  fill: ${({ theme }) => theme.colors.secondary};
  margin-left: 0px;
  pointer-events: none;
`
const StyledCloseIcon = styled(CloseIcon)`
  ${IconProps}
`

const StyledPlusIcon = styled(PlusIcon)`
  ${IconProps}
`

export const AddFormButton = ({ size, onClick }) => {
  return (
    <CustomButton size={size} onClick={onClick} align="center">
      <StyledPlusIcon size={size} />
    </CustomButton>
  )
}

export const DeleteFormButton = ({ size, onClick, value }) => {
  return (
    <CustomButton size={size} onClick={onClick} value={value} align="center">
      <StyledCloseIcon size={size} />
    </CustomButton>
  )
}

export default DeleteFormButton
