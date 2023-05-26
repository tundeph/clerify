import { db, FieldValue } from "../firebase/config"

// custom firebase function to get users from the database
export const getUsersService = async (id) => {
	const ref = db.collection("business").doc(id)
	const result = await ref.get()

	try {
		return result.data().users
	} catch (err) {
		console.log(err)
	}
}

// custom firebase function to add users to the database
export const addUsersService = async (id, email, permission) => {
	const ref = db.collection("business").doc(id)

	try {
		ref.update({
			users: FieldValue.arrayUnion({ email, permission }),
		})
		return "success"
	} catch (err) {
		console.log(err)
		return err
	}
}

// custom firebase function to delete users to the database
export const deleteUsersService = async (id, users, email) => {
	const ref = db.collection("business").doc(id)
	const newUsers = users.filter((user) => user.email !== email)

	try {
		ref.update({ users: newUsers })
		return "success"
	} catch (err) {
		console.log(err)
		return err
	}
}
