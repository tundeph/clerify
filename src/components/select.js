import React from "react"
import { SelectInput, Label, DivWrapper } from "../layout/styles"

const Select = ({
	name,
	label,
	options,
	size,
	bgColor,
	fontSize,
	value,
	onChange,
	mode,
}) => {
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
		<DivWrapper>
			{label ? (
				<Label htmlFor={name} bottom={0.5}>
					{label}
				</Label>
			) : null}
			<SelectInput
				size={size}
				bgColor={bgColor}
				fontSize={fontSize}
				id={name}
				name={name}
				onChange={onChange}
				value={newValue}
				mode={mode}
			>
				{options.map((option, i) => {
					return (
						<option key={i} value={option.value}>
							{option.label}
						</option>
					)
				})}
			</SelectInput>
		</DivWrapper>
	)
}

export default Select
