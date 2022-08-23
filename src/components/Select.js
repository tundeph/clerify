import React from "react"
import { SelectInput } from "../layout/styles"

const Select = ({ name, options, height, bgColor, fontSize, value, onChange }) => {
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
    <SelectInput height={height} bgColor={bgColor} fontSize={fontSize} name={name} onChange={onChange} value={newValue}>
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
