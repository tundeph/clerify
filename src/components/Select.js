import React from "react"
import { SelectInput } from "../layout/styles"

const Select = ({ name, options, size, bgColor, fontSize, value, onChange, mode }) => {
  const handleValue = (val, object) => {
    let res = ""
    if (val) {
      res = val
    } else {
      object.forEach((selectedObject) => {
        if (selectedObject.selected) {
          res = selectedObject.value
        }
      })
    }

    return res
  }
  const newValue = handleValue(value, options)

  return (
    <SelectInput size={size} bgColor={bgColor} fontSize={fontSize} name={name} onChange={onChange} value={newValue} mode={mode}>
      {options.map((option, i) => {
        return (
          <option key={i} value={option.value}>
            {option.label}
          </option>
        )
      })}
    </SelectInput>
  )
}

export default Select
