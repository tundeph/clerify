import { api } from "./api"
import { db, authService, timestamp } from "../firebase/config"
import { transformLoginData } from "./utils"

//an initial state is defined that is fed into global Theme object
const initialState = {
  user: null,
  business: {},
  authIsReady: false,
  profileTheme: "lightTheme",
}

export const authApi = api.injectEndpoints({
  endpoints: (build) => ({
    profile: build.query({
      queryFn: async () => {
        try {
          // new Promise is used to get data from the firebase function
          // as there are several callbacks, resolve saves the response
          let result
          result = await new Promise((resolve) =>
            authService.onAuthStateChanged(async (user) => {
              if (user) {
                db.collection("business")
                  // .where("uid", "==", user.uid)
                  .where("users", "array-contains-any", [
                    { email: user.email, permission: "admin" },
                    { email: user.email, permission: "user" },
                  ])
                  .onSnapshot(
                    (snapshot) => {
                      resolve(transformLoginData(snapshot, user, initialState))
                    },
                    (err) => {
                      // error thrown here from firebase functions is sent to the catch below
                      // throw err.message
                      console.log(err)
                    }
                  )
              } else {
                resolve({ ...initialState, authIsReady: true })
              }
            })
          )
          return { data: result }
        } catch (error) {
          return { error: { error } }
        }
      },

      providesTags: ["Profile"],
      // onQueryStarted helps to access the getState() method to global state
      // 	async onQueryStarted(_, { getState }) {
      // 		console.log("getState()", getState())
      // 	},
    }),

    // this is used to add a new user (which is an admin user)
    addProfile: build.mutation({
      queryFn: async (body) => {
        try {
          const { email, password, name } = body

          // creates new user and updates the displayName
          const result = await new Promise((resolve) =>
            authService
              .createUserWithEmailAndPassword(email, password)
              .then((data) => resolve(data))
              .catch((err) => {
                throw err.messsage
              })
          )
          const user = result.user.updateProfile({ displayName: name })

          return {
            data: {
              ...initialState,
              user: {
                uid: user.uid,
                displayName: name,
                photoURL: user.photoURL,
                email,
              },
            },
          }
        } catch (err) {
          return { error: err }
        }
      },
      invalidatesTags: ["Profile"],
    }),

    updateBusiness: build.mutation({
      queryFn: async (body) => {
        try {
          const { selectedBusinessId, updatedBusiness } = body
          const business = updatedBusiness[selectedBusinessId]
          // new Promise is used to get data from the firebase function
          // as there are several callbacks, resolve saves the response
          // resolve is defined here because a result must be returned
          const result = await new Promise((resolve) =>
            db
              .collection("business")
              .doc(selectedBusinessId)
              .update({ ...business })
              .then(() => resolve("success"))
              .catch((error) => {
                if (error) {
                  throw error.message
                }
              })
          )
          return { data: result }
        } catch (err) {
          return { error: err }
        }
      },
      invalidatesTags: ["Profile"],
    }),

    addBusiness: build.mutation({
      queryFn: async (body) => {
        const { selectedBusinessId, business } = body

        try {
          // new Promise is used to get data from the firebase function
          // as there are several callbacks, resolve saves the response
          // resolve is defined here because a result must be returned

          const createdAt = timestamp.fromDate(new Date())
          const result = await new Promise((resolve) =>
            db
              .collection("business")
              .doc(selectedBusinessId)
              .add({ ...business, createdAt })
              .then(() => resolve("success"))
              .catch((error) => {
                if (error) {
                  throw error
                }
              })
          )
          return { data: result }
        } catch (err) {
          // returns error if there is any error in the endpoint
          return { error: err }
        }
      },
      invalidatesTags: ["Profile"],
    }),

    logout: build.mutation({
      queryFn: async () => {
        try {
          // use firebase function to sign out
          const result = authService.signOut()
          return { data: result }
        } catch (err) {
          // returns error if there is any error in the endpoint
          return { error: err }
        }
      },
      invalidatesTags: ["Profile"],
    }),
  }),
})

export const {
  useProfileQuery,
  useUpdateBusinessMutation,
  useAddBusinessMutation,
  useAddProfileMutation,
  useLogoutMutation,
} = authApi
