import React, { useContext } from "react"
import { ThemeContext } from "styled-components"
import { Filter } from "styled-icons/boxicons-regular"
import { Button, DisabledButton, LoadingIcon } from "../layout/styles"

export const handleButtonState = (loading, loadingText, buttonText, condition) => {
  const { colors } = useContext(ThemeContext)

  if (loading) {
    return (
      <DisabledButton>
        {loadingText} <LoadingIcon />
      </DisabledButton>
    )
  } else {
    if (condition) {
      return <Button> {buttonText}</Button>
    } else {
      return <DisabledButton color={colors.gray600}> {buttonText} </DisabledButton>
    }
  }
}

export const textSorter = (array, type, sortbyAttr) => {
  const sorted = array.sort((a, b) => {
    let aWithAttr = ""
    let bWithAttr = ""

    if (sortbyAttr) {
      aWithAttr = a[sortbyAttr]
      bWithAttr = b[sortbyAttr]
    } else {
      aWithAttr = a
      bWithAttr = b
    }

    if (type === "asc") {
      if (aWithAttr.toLowerCase() > bWithAttr.toLowerCase()) {
        return 1
      } else if (aWithAttr.toLowerCase() < bWithAttr.toLowerCase()) {
        return -1
      } else {
        return 0
      }
    } else if (type === "desc") {
      if (aWithAttr.toLowerCase() > bWithAttr.toLowerCase()) {
        return -1
      } else if (aWithAttr.toLowerCase() < bWithAttr.toLowerCase()) {
        return 1
      } else {
        return 0
      }
    } else {
      return array
    }
  })

  return sorted
}

export const reconcileAccts = (categories, accounts) => {
  if (Object.keys(categories).length === 0) return accounts

  const objIn = {}
  const objOut = {}

  for (const category of categories) {
    category.keywords.forEach((keyword) => {
      if (category.type === "debit") {
        objOut[keyword.toLowerCase()] = category.categoryId
      } else {
        objIn[keyword.toLowerCase()] = category.categoryId
      }
    })
  }

  Object.entries(accounts).map((account, index) => {
    const keywords = account[1].remarks.split(/\/| |-/)
    if (!account[1].categoryId) {
      for (const keyword of keywords) {
        if (account[1].type === "debit" && objOut[keyword.toLowerCase()]) {
          accounts[account[0]].categoryId = objOut[keyword.toLowerCase()]
          break
        }

        if (account[1].type === "credit" && objIn[keyword.toLowerCase()]) {
          accounts[account[0]].categoryId = objIn[keyword.toLowerCase()]
          break
        }

        if (!accounts[account[0]].hasOwnProperty("categoryId")) {
          accounts[account[0]].categoryId = ""
        }
      }
    }
  })
  return accounts
}

export const formatCategory = (transactionCategories) => {
  const sortedCategories = textSorter([...transactionCategories], "asc", "title").map((category) => ({
    value: category.categoryId,
    label: category.title,
  }))
  const categories = [{ value: "", label: "Select a category" }, ...sortedCategories]
  return categories
}

export const formatDropDown = (data, selectDescription) => {
  const sortedData = textSorter([...new Set(data)], "asc")
    .filter((filteredData) => filteredData.trim().length > 0)
    .map((selectedData) => ({
      value: selectedData,
      label: selectedData,
    }))
  const finalData = [{ value: "", label: selectDescription }, ...sortedData]
  return finalData
}

export const formatKeywordsDropDown = (uncategorisedAccts) => {
  let keywordsArray = uncategorisedAccts.trim().split(/\/| |-/)
  // add 2-word keywords
  const twoWordKeyWords = []
  for (let counter = 0; counter <= keywordsArray.length - 1; counter++) {
    if (keywordsArray[counter] && keywordsArray[counter + 1]) {
      twoWordKeyWords.push(`${keywordsArray[counter]} ${keywordsArray[counter + 1]}`)
    }
  }
  const threeWordKeyWords = []
  for (let counter = 0; counter <= Math.abs(keywordsArray.length / 2); counter++) {
    if (keywordsArray[counter] && keywordsArray[counter + 1] && keywordsArray[counter + 2]) {
      threeWordKeyWords.push(`${keywordsArray[counter]} ${keywordsArray[counter + 1]} ${keywordsArray[counter + 2]}`)
    }
  }
  keywordsArray = [...keywordsArray, ...twoWordKeyWords, ...threeWordKeyWords]
  return formatDropDown(keywordsArray, "Select a keyword or phrase")
}

export const formatUpdatedCategories = (document, category, keyword) => {
  return document.categories.reduce((acc, item) => {
    if (item.categoryId === category) {
      if (!item.keywords.find((selectedKeyword) => selectedKeyword.toLowerCase() === keyword.toLowerCase())) {
        item.keywords.push(keyword)
      }
      acc.push(item)
    } else {
      acc.push(item)
    }
    return acc
  }, [])
}
