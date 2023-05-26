import { api } from "./api"
import {
	getUsersService,
	addUsersService,
	deleteUsersService,
} from "./users-service"

export const authApi = api.injectEndpoints({
	endpoints: (build) => ({
		getUsers: build.query({
			queryFn: async (selectedBusinessId) => {
				try {
					const result = await new Promise((resolve) =>
						resolve(getUsersService(selectedBusinessId))
					)
					return { data: result }
				} catch (error) {
					return { error: { error } }
				}
			},
			providesTags: ["Users"],
		}),

		// this is used to adds extra users that can access the account
		addUsers: build.mutation({
			queryFn: async (body) => {
				try {
					const { selectedBusinessId, email, permission } = body

					// add new user's detail to the business db
					const result = await new Promise((resolve) =>
						resolve(addUsersService(selectedBusinessId, email, permission))
					)
					return { data: result }
				} catch (err) {
					console.log(err)
					return { error: { data: JSON.stringify(err) } }
				}
			},
			invalidatesTags: ["Users"],
		}),

		// this is used to delete users from accessing the account
		deleteUser: build.mutation({
			queryFn: async (body) => {
				try {
					const { selectedBusinessId, email, users } = body

					// add new user's detail to the business db
					const result = await new Promise((resolve) =>
						resolve(deleteUsersService(selectedBusinessId, users, email))
					)
					return { data: result }
				} catch (err) {
					console.log(err)
					return { error: { data: JSON.stringify(err) } }
				}
			},
			invalidatesTags: ["Users"],
		}),
	}),
})

export const { useGetUsersQuery, useAddUsersMutation, useDeleteUserMutation } =
	authApi
