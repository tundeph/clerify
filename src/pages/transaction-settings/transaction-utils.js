// reducer function to get the filter values
export const filterReducer = (state, action) => {
  switch (action.type) {
    case "BY_TEXT":
      return {
        ...state,
        txt: action.payload.txt,
        num: state.txt.length > 1 || state.uncat ? action.payload.num : 5,
      }
    case "TRANS_NUM":
      return { ...state, num: action.payload }
    case "UNCATEGORIZED":
      return {
        ...state,
        uncat: action.payload.uncat,
        num: !state.uncat || state.txt.length > 1 ? action.payload.num : 5,
      }
    default:
      return state
  }
}

// filter funtions
export const filterByUncategorized = (accounts, uncategorized) => {
  return uncategorized
    ? accounts.filter((account) => account.categoryId === "")
    : accounts
}

export const filterBySearchText = (accounts, text) => {
  return text.length
    ? accounts.filter((account) =>
        account.remarks.toLowerCase().includes(text.toLowerCase())
      )
    : accounts
}

export const filterByNum = (accounts, num) => {
  return accounts.filter((account, index) => index < num)
}

export const combinedFilters = (
  accounts,
  uncategorized,
  text,
  transactionNum
) => {
  const filteredNum = filterByNum(accounts, transactionNum)
  const filteredText = filterBySearchText(filteredNum, text)
  const filteredUncategorized = filterByUncategorized(
    filteredText,
    uncategorized
  )
  return filteredUncategorized
}
