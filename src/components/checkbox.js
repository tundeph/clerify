import React from "react"
import styled, { css } from "styled-components"
import { CheckmarkIcon, Text } from "../layout/styles"
import { size } from "../layout/theme"

const CheckboxProps = styled.input.attrs({
  type: "checkbox",
})`
  appearance: none;
  position: fixed;
  z-index: 30;
  display: block;
`

export const SelectedProp = css`
  color: ${({ theme }) => theme.colors.primary};
  background-color: ${({ theme }) => theme.colors.reverse};
  border: 1px solid ${({ theme }) => theme.colors.primary};
`

export const DeselectedProp = css`
  color: ${({ theme }) => theme.colors.primary};
  background-color: ${({ theme }) => theme.colors.reverse};
  &:hover {
    border: 1px solid ${({ theme }) => theme.colors.primary};
  }
`

const Label = styled.label`
  position: relative;
  cursor: pointer;
  padding: 0.5em 0.5em;
`

const LabelDiv = styled.div`
  display: inline-block;
  resize: none;
  cursor: pointer;
  border-radius: 50px;
  min-width: max-content;
  width: max-content;
  text-align: center;
  padding: 3px 3px;
  border: 1px solid ${({ theme }) => theme.colors.gray300};
  ${({ checked }) => (checked ? SelectedProp : DeselectedProp)}
`

const CustomCheckmarkIcon = styled(CheckmarkIcon)`
  padding-left: 0.5em;
`

export const Checkbox = ({ name, id, value, checked, onChange, children }) => {
  return (
    <LabelDiv checked={checked}>
      {checked && <CustomCheckmarkIcon />}
      <Label htmlFor={id}>
        <CheckboxProps
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          checked={checked}
        />
        <Text size={size.xxxs}> {children}</Text>
      </Label>
    </LabelDiv>
  )
}
