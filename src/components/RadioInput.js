import React from "react"
import { DivWrapper } from "../layout/styles"

const RadioInput = ({ name, id, onChange, children }) => {
  return (
    <DivWrapper direction="horizontal" gap={1}>
      <input type="radio" name={name} id={id} onChange={onChange} />
      <label htmlFor={id}> {children} </label>
    </DivWrapper>
  )
}

export default RadioInput
