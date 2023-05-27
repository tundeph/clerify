import { db } from "../firebase/config"

//in firebase, we have a collection (accounts), with a doc (named using selectedBusinessId)
// and then the doc have subcollection and in the subcollection are the documents that contains transactions

// custom firebase function to save transactions in database
export const addAccountsService = async (id, doc) => {
  const ref = db.collection("accounts").doc(id).collection("transactions")
  var batch = db.batch()
  try {
    //forEach or map is not used here because they have callback functions and can make batch operations with async fail
    for (let index = 0; index < doc.length; index++) {
      batch.set(ref.doc(doc[index].id), doc[index])
      if (index === 500) {
        await batch.commit()
      }
      if (index === doc.length - 1) {
        await batch.commit()
      }
    }
    await db
      .collection("business")
      .doc(id)
      .update({ ...{ lastAcctData: doc[doc.length - 1] } })

    return { status: 200 }
  } catch (err) {
    console.log(err)
    return null
  }
}

// custom firebase function to get transactions from the database
export const getAccountsService = async (id) => {
  const ref = db.collection("accounts").doc(id).collection("transactions")
  const data = await ref.get()

  let result = []
  try {
    if (!data.empty) {
      data.forEach((doc) => {
        result.push(doc.data())
      })
    }
    return result
  } catch (err) {
    console.log(err)
    return err
  }
}

// custom firebase function to update transactions in database
export const updateAccountsService = async (id, doc) => {
  const ref = db.collection("accounts").doc(id).collection("transactions")
  var batch = db.batch()
  try {
    for (let index = 0; index < doc.length; index++) {
      // as with batch.st, batch.update can also be destructured to update only a single value
      // like so batch.update(ref.doc(doc[index].id), {prop: value})
      batch.update(ref.doc(doc[index].id), doc[index])
      if (index === 500) {
        await batch.commit()
      }
      if (index === doc.length - 1) {
        await batch.commit()
      }
    }

    return { status: 200 }
  } catch (err) {
    console.log(err)
    return null
  }
}
