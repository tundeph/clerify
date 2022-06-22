import React from "react"
import styled from "styled-components"

import { size } from "../layout/theme"

const CheckboxProps = styled.input.attrs({
  type: "checkbox",
})`
  margin-right: ${size.xxxs}rem;
`

const Checkbox = ({ name, id, onChange, children }) => {
  return (
    <label htmlFor={id}>
      <CheckboxProps id={id} name={name} onChange={onChange} />
      {children}
    </label>
  )
}

export default Checkbox
