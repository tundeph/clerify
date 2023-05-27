import React from "react"
import styled, { css, useTheme } from "styled-components"
import { Text } from "@layout/styles"

const RadioInput = styled.input`
  appearance: none;
  position: fixed;
  z-index: 30;
`

export const SelectedProp = css`
  color: ${({ theme }) => theme.colors.reverse};
  background-color: ${({ theme }) => theme.colors.primary};
  border: 1px solid ${({ theme }) => theme.colors.primary};
`

export const DeselectedProp = css`
  color: ${({ theme }) => theme.colors.primary};
  background-color: ${({ theme }) => theme.colors.reverse};
  &:hover {
    background-color: ${({ theme }) => theme.colors.gray300};
  }
`

const Label = styled.label`
  position: relative;
  cursor: pointer;
  padding: 0.5em 1em;
`

const LabelDiv = styled.div`
  display: block;
  resize: none;
  cursor: pointer;
  border-radius: 50px;
  min-width: max-content;
  height: min-content;
  text-align: center;
  padding: 3px 1px;
  border: 1px solid ${({ theme }) => theme.colors.gray300};
  ${({ selected }) => (selected ? SelectedProp : DeselectedProp)}
`

const RadioButton = ({ labelText, value, checked, onChange }) => {
  const { size } = useTheme()

  return (
    <LabelDiv selected={checked}>
      <Label htmlFor={labelText}>
        <RadioInput
          type="radio"
          id={labelText}
          value={value}
          checked={checked}
          onChange={onChange}
        />
        <Text size={size.xxxs}> {labelText} </Text>
      </Label>
    </LabelDiv>
  )
}

export default RadioButton
