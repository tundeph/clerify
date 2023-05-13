import React from "react"

import { size } from "../../layout/theme"

import { DivWrapper, SubTitle, FormInput } from "../../layout/styles"
import Select from "../../components/select"

const AddBusinessForm = ({ name, setName, type, setType, businessType }) => {
	return (
		<DivWrapper>
			<DivWrapper gap={size.xxs}>
				<SubTitle> Add a business </SubTitle>
				<FormInput
					onChange={(e) => setName(e.target.value)}
					value={name}
					type="text"
					placeholder="Name of business"
					required
				/>
				<Select
					onChange={(e) => setType(e.target.value)}
					value={type}
					options={businessType}
				/>
			</DivWrapper>
		</DivWrapper>
	)
}

export default AddBusinessForm
