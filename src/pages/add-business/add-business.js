import React, { useContext, useState } from "react"
// import { useSelector } from "react-redux"
// import { selectUserProfile } from "../../services/profile-slice"
import { useFirestore } from "../../hooks/useFirestore"
import { useNavigate } from "react-router-dom"
import {
	useProfileQuery,
	useAddBusinessMutation,
} from "../../services/profile-slice2"
// import { useLogout } from "../hooks/useLogout"
import shortid from "shortid"
import Logo from "../../components/logo"
import Select from "../../components/select"
import styled from "styled-components"
import { size } from "../../layout/theme"
import { ThemeContext } from "styled-components"
import {
	PageWrapper,
	MidWrapper,
	DivWrapper,
	Title,
	SubTitle,
	Form,
	Text,
	Divider,
} from "../../layout/styles"

import AddBusinessForm from "./add-business-form"
import { AddFormButton, DeleteFormButton } from "../../components/form-buttons"
import { handleButtonState } from "../../helper"
import { businessType, businessCategories } from "../../helper/default-data"

const CustomMidWrapper = styled(MidWrapper)`
	gap: ${size.s}rem;
	min-width: 500px;
`

export const AddBusiness = () => {
	const {
		data: { user, selectedBusinessId },
	} = useProfileQuery()
	const [addBusiness, { isError, isLoading }] = useAddBusinessMutation()

	const { colors } = useContext(ThemeContext)
	// const { user } = useSelector(selectUserProfile)
	const navigate = useNavigate()
	// const { addDocument, response } = useFirestore("business")

	const defaultBusinessCategories = businessCategories.reduce((acc, item) => {
		if (item.value !== "") {
			const categoryId = shortid.generate()
			acc.push({
				categoryId: categoryId,
				title: item.value,
				keywords: [],
				type: item.type,
			})
		}
		return acc
	}, [])

	const firstId = shortid.generate()
	const [name, setName] = useState("")
	const [type, setType] = useState("")
	const [accts, setAccts] = useState([
		{ id: firstId, acctName: "", syncId: "" },
	])

	const buttonCondition = name.length > 0 && type.length > 0

	const handleAcctChange = (e, id) => {
		setAccts(
			accts.map((acc) =>
				acc.id === id ? { ...acc, ...{ id, acctName: e.target.value } } : acc
			)
		)
	}

	const handleDeleteForm = (e) => {
		e.preventDefault()
		const filteredAccts = accts.filter((acct) => acct.id !== e.target.value)
		setAccts(filteredAccts)
	}

	const handleAddMore = (e) => {
		e.preventDefault()
		const id = shortid.generate()
		setAccts([...accts, { id, acctName: "", syncId: "" }])
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		const filteredAccts = accts.filter((acct) => acct.acctName.trim() !== "")
		const business = {
			uid: user.uid,
			name,
			type,
			accts: filteredAccts,
			categories: defaultBusinessCategories,
			selected: true,
		}
		addBusiness({ selectedBusinessId, business })
		// await addDocument(business)
		if (isError) {
			navigate("/")
		}
	}

	return (
		<PageWrapper>
			<CustomMidWrapper>
				<DivWrapper bottom={3}>
					<Logo />
				</DivWrapper>
				{/* <Text onClick={async () => await authService.signOut()}>Log out </Text> */}
				<DivWrapper bottom={size.xxs}>
					<Title> Create a business or organization. </Title>
					<SubTitle>
						You need to add a business or organization to your account
					</SubTitle>
				</DivWrapper>
				<Divider gap={size.m} />
				<Form onSubmit={handleSubmit}>
					<AddBusinessForm
						name={name}
						setName={setName}
						type={type}
						setType={setType}
						businessType={businessType}
						accts={accts}
						handleAcctChange={handleAcctChange}
						handleDeleteForm={handleDeleteForm}
						handleAddMore={handleAddMore}
					/>
					{/* <DivWrapper gap={size.xxs} left={size.m} right={size.m}>
            <SubTitle> Details of Business </SubTitle>
            <FormInput
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
              placeholder="Name of business"
              required
            />
            <Select onChange={(e) => setType(e.target.value)} value={type} options={businessType} />
          </DivWrapper>
          <Divider gap={size.m} />
          <DivWrapper gap={size.xxs} left={size.m} right={size.m}>
            <SubTitle>Add Your Financial Accounts </SubTitle>
            <Text align="center" size={size.xxxs} color={colors.secondary}>
              For example, different bank accounts
            </Text>
            {accts.map((acct, i) => {
              return (
                <DivWrapper key={acct.id}>
                  <Text align="left" left={size.xxs} size={size.xxxs} color={colors.secondary}>
                    Account {i + 1}:
                  </Text>
                  <DivWrapper direction="row">
                    <FormInput
                      onChange={(e) => handleAcctChange(e, acct.id)}
                      value={acct.acctName}
                      type="text"
                      placeholder="e.g. ABC Bank "
                    />
                    {accts.length > 1 && i < accts.length - 1 && (
                      <DeleteFormButton onClick={handleDeleteForm} size={0.7} value={acct.id} />
                    )}
                    {accts.length - 1 === i && <AddFormButton onClick={handleAddMore} size={0.7} />}
                  </DivWrapper>
                </DivWrapper>
              )
            })}
          </DivWrapper> */}
					<Divider gap={size.m} />
					<DivWrapper gap={size.xxs} left={size.m} right={size.m}>
						{handleButtonState(
							isLoading,
							"Loading",
							"Add business",
							buttonCondition
						)}
					</DivWrapper>
				</Form>
			</CustomMidWrapper>
		</PageWrapper>
	)
}
