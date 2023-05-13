import React, { useState } from "react"
import { AppRoutes } from "../routes"

import { useFirestore } from "../hooks/useFirestore"

import styled, { ThemeProvider } from "styled-components"
import { GlobalStyles } from "../layout/GlobalStyles"
import theme from "../layout/theme"
import shortid from "shortid"
import { businessType, businessCategories } from "../helper/default-data"
import { size } from "../layout/theme"

import {
	Button,
	Form,
	DivWrapper,
	Divider,
	LoadingIcon,
	Text,
} from "../layout/styles"
import Modal from "../components/modal"
import AddBusinessForm from "../pages/add-business/add-business-form"
import { useProfileQuery } from "../services/profile-slice2"

const AppWrapper = styled.div`
	position: relative;
	display: flex;
	flex-direction: row;
	height: 100%;
`

const App = () => {
	const { data } = useProfileQuery()

	const { updateDocument, addDocument, response } = useFirestore("business")

	const [addModal, setAddModal] = useState({ status: false })
	const [changeModal, setChangeModal] = useState({ status: false })
	const firstId = shortid.generate()
	const [name, setName] = useState("")
	const [type, setType] = useState("")
	const [accts, setAccts] = useState([
		{ id: firstId, acctName: "", syncId: "" },
	])

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

	const handleChangeBusiness = async (e, user) => {
		e.preventDefault()
		setChangeModal({ status: true })
		const businesses = user.business
		if (e.target.value === "add") {
			setAddModal({ status: true })
		} else {
			Object.entries(businesses).forEach(async (bus) => {
				if (bus[0] === e.target.value) {
					await updateDocument(bus[0], { selected: true })
					window.location.reload()
				} else {
					await updateDocument(bus[0], { selected: false })
				}
			})
		}
	}

	const handleAddBusiness = async (e, user) => {
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

		await addDocument(business)
		Object.entries(user.business).forEach((bus) => {
			//usr.business here should become business
			bus[1].name === name
				? updateDocument(bus[0], { selected: true })
				: updateDocument(bus[0], { selected: false })
		})

		if (!response.error) {
			setAddModal({ status: false })
		}
	}

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

	const hasBusiness = (business) => {
		return Object.keys(business).length ? true : false
	}

	return (
		<>
			{data && (
				<ThemeProvider theme={theme[data.profileTheme]}>
					<GlobalStyles />
					{data.authIsReady && (
						<AppWrapper>
							<AppRoutes
								user={data.user}
								business={data.business}
								hasBusiness={hasBusiness}
								handleChangeBusiness={(e) => handleChangeBusiness(e, data.user)}
							/>

							{addModal.status && (
								<Modal
									title="Add another business"
									handleClose={() => setAddModal({ status: false })}
									noBgClose
								>
									<DivWrapper align="center" gap={1}>
										<Form onSubmit={(e) => handleAddBusiness(e, data.user)}>
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
											<Divider gap={size.m} />
											<DivWrapper>
												<Button> Add business</Button>
											</DivWrapper>
										</Form>
									</DivWrapper>
								</Modal>
							)}
							{changeModal.status && (
								<Modal
									title="Changing business... "
									handleClose={() => setChangeModal({ status: false })}
									noBgClose
								>
									<DivWrapper align="center" gap={2}>
										<Text color={theme.lightTheme.colors.gray300}>
											<LoadingIcon size={80} />
										</Text>
									</DivWrapper>
								</Modal>
							)}
						</AppWrapper>
					)}
				</ThemeProvider>
			)}
		</>
	)
}

export default App
