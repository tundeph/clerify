// NEEDED - Error handling if useeffect data fails to render a modal or something

import React, { useState, useEffect } from "react"
import { AppRoutes } from "../routes"

import { useSelector, useDispatch } from "react-redux"
import {
	selectUserProfile,
	authReady,
	updateSelectedBusiness,
} from "../redux/profileSlice"
import { db, authService } from "../firebase/config"
import { useFirestore } from "../hooks/useFirestore"

import styled, { ThemeProvider } from "styled-components"
import { GlobalStyles } from "../layout/GlobalStyles"
import theme from "../layout/theme"
import shortid from "shortid"
import { businessType, businessCategories } from "../helper/defaultData"
import { handleButtonState } from "../helper"
import { size } from "../layout/theme"

import {
	Button,
	Form,
	DivWrapper,
	Divider,
	LoadingIcon,
	Text,
} from "../layout/styles"
import Modal from "../components/Modal"
import AddBusinessForm from "../pages/addbusiness/AddBusinessForm"

const AppWrapper = styled.div`
	display: flex;
	flex-direction: row;
`

const App = () => {
	const dispatch = useDispatch()
	const { updateDocument, addDocument, response } = useFirestore("business")
	const { user, authIsReady, profileTheme } = useSelector(selectUserProfile)

	const [addModal, setAddModal] = useState({ status: false })
	const [changeModal, setChangeModal] = useState({ status: false })
	const firstId = shortid.generate()
	const [name, setName] = useState("")
	const [type, setType] = useState("")
	const [accts, setAccts] = useState([
		{ id: firstId, acctName: "", syncId: "" },
	])

	const buttonCondition = name.length > 0 && type.length > 0

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

	let selectedBusinessId = null

	useEffect(() => {
		const unsub = authService.onAuthStateChanged((user) => {
			if (!user && !authIsReady) {
				dispatch(authReady({ authIsReady: true }))
			}
			if (user) {
				const { uid, displayName, photoURL, email } = user
				db.collection("business")
					.where("uid", "==", user.uid)
					.onSnapshot((snapshot) => {
						let business = {}
						let hasAccts = {}

						snapshot.docs.forEach((doc) => {
							let id = doc.id
							const { accts, name, type, selected, categories, lastAcctData } =
								doc.data()
							if (selected) {
								selectedBusinessId = id
								hasAccts = lastAcctData
							}
							business[id] = { id, accts, name, type, selected, categories }
						})

						dispatch(
							authReady({
								data: { uid, displayName, photoURL, email, business },
								selectedBusinessId,
								lastAcctData: hasAccts,
							})
						)
					})

				unsub(user)
			}
		})
	}, [])

	const handleChangeBusiness = async (e) => {
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

	const handleAddBusiness = async (e) => {
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

	const hasBusiness = (user) => {
		if (user) {
			if (
				user.hasOwnProperty("business") &&
				Object.keys(user.business).length
			) {
				return true
			}
		}
		return false
	}

	return (
		<ThemeProvider theme={theme[profileTheme]}>
			<GlobalStyles />
			{authIsReady && (
				<AppWrapper>
					<AppRoutes
						user={user}
						hasBusiness={hasBusiness}
						handleChangeBusiness={handleChangeBusiness}
					/>

					{addModal.status && (
						<Modal
							title="Add another business"
							handleClose={() => setAddModal({ status: false })}
							noBgClose
						>
							<DivWrapper align="center" gap={1}>
								<Form onSubmit={handleAddBusiness}>
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
	)
}

export default App
