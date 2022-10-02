// import React from "react"
// import MonoConnect from "@mono.co/connect.js"
// import { useFirestore } from "../hooks/useFirestore"
// import { useDocument } from "../hooks/useDocument"
// import { useSelector } from "react-redux"
// import { selectUserProfile } from "../redux/profileSlice"

// const TEST_SECRET_KEY = "test_sk_C1d7PNuoqToOVzoSXvHQ"
// const TEST_PUBLIC_KEY = "test_pk_SirSHhAgeBBeXvK8YYcV"
// const LIVE_SECRET_KEY = "live_sk_eFuifauPDbVczZOBr5rg"
// const LIVE_PUBLIC_KEY = "live_pk_3mCK0Mi5y5fO45oIGOwV"

// const fetchTransactions = (id) => {
//   const options = {
//     method: "GET",
//     headers: { Accept: "application/json", "mono-sec-key": TEST_SECRET_KEY },
//   }

//   fetch(`https://api.withmono.com/accounts/${id}/statement?period=last1months`, options)
//     .then((response) => response.json())
//     .then((response) => console.log("transactions", response))
//     .catch((err) => console.error(err))
// }
// // fetchTransactions()

// const manualDataSync = (id) => {
//   const options = { method: "POST", headers: { Accept: "application/json" } }

//   fetch(`https://api.withmono.com/accounts/${id}/sync?allow_incomplete_statement=false`, options)
//     .then((response) => response.json())
//     .then((response) => console.log("manual data: ", response))
//     .catch((err) => console.error(err))
// }

// const getExchangeToken = (code, acctsId) => {
//   //
//   const { selectedBusinessId, user } = useSelector(selectUserProfile)
//   const { updateDocument } = useFirestore("business")
//   const { document } = useDocument("business", selectedBusinessId)

//   //
//   const options = {
//     method: "POST",
//     headers: {
//       Accept: "application/json",
//       "mono-sec-key": TEST_SECRET_KEY,
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ code }),
//   }

//   fetch("https://api.withmono.com/account/auth", options)
//     .then((response) => response.json())

//     .then((response) => {
//       // edit accounts with sync id
//       editedAccts = document.accts.reduce((prev, acct) => {
//         if (acct.id === acctsId) {
//           acct.syncId = response.id
//           prev.push(acct)
//         } else {
//           prev.push(acct)
//         }
//         return prev
//       }, [])
//       document.accts = editedAccts
//       updateDocument(selectedBusinessId, document)
//       fetchTransactions(response.id)
//     })
//     .catch((err) => console.error(err))
// }

// const MonoSync = (acctsId) => {
//   const monoConnect = React.useMemo(() => {
//     const monoInstance = new MonoConnect({
//       onClose: () => console.log("Widget closed"),
//       onLoad: () => console.log("Widget loaded successfully"),
//       onSuccess: async ({ code }) => {
//         console.log(`Linked successfully: ${code}`)
//         getExchangeToken(code, acctsId)
//       },
//       key: TEST_PUBLIC_KEY,
//     })

//     monoInstance.setup()

//     return monoInstance
//   }, [])

//   return (
//     <div>
//       <button onClick={() => monoConnect.open()}>Link account with Mono</button>
//     </div>
//   )
// }

// export default MonoSync
