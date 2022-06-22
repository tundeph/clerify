import React from "react"
import { SelectInput } from "../layout/styles"

const Select = ({ name, data, height, bgColor, fontSize, value, onChange }) => {
  return (
    <SelectInput
      height={height}
      bgColor={bgColor}
      fontSize={fontSize}
      name={name}
      onChange={onChange}
      value={value}
    >
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
