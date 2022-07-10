import React from "react"
import { SelectInput } from "../layout/styles"

const Select = ({ name, data, height, bgColor, fontSize, value, onChange }) => {
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
  const newValue = handleValue(value, data)

  return (
    <SelectInput height={height} bgColor={bgColor} fontSize={fontSize} name={name} onChange={onChange} value={newValue}>
      {data.map((d, i) => {
        return (
          <option key={i} value={d.value}>
            {d.text}
          </option>
        )
      })}
    </SelectInput>
  )
}

export default Select
