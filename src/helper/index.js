import React from "react"
import { Button, DisabledButton, LoadingIcon } from "../layout/styles"
import * as R from "ramda"

export const handleButtonState = (
  loading,
  loadingText,
  buttonText,
  condition
) => {
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
      return <DisabledButton color={"#434343"}> {buttonText} </DisabledButton>
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

export const getKeywordsFromRemarks = (remarks) => {
  //split into 1-word keywords
  let keywordsArray = remarks.trim().split(/\/| |-/)
  // add 2-word keywords
  const twoWordKeywords = []
  for (let counter = 0; counter <= keywordsArray.length - 1; counter++) {
    if (keywordsArray[counter] && keywordsArray[counter + 1]) {
      twoWordKeywords.push(
        `${keywordsArray[counter]} ${keywordsArray[counter + 1]}`
      )
    }
  }

  // add 3-word keywords
  const threeWordKeywords = []
  for (
    let counter = 0;
    counter <= Math.abs(keywordsArray.length / 2);
    counter++
  ) {
    if (
      keywordsArray[counter] &&
      keywordsArray[counter + 1] &&
      keywordsArray[counter + 2]
    ) {
      threeWordKeywords.push(
        `${keywordsArray[counter]} ${keywordsArray[counter + 1]} ${
          keywordsArray[counter + 2]
        }`
      )
    }
  }

  keywordsArray = [...keywordsArray, ...twoWordKeywords, ...threeWordKeywords]

  return keywordsArray
}

export const reconcileAccts = (categories, accounts) => {
  if (categories.length === 0) return accounts

  /// new logic
  accounts.forEach((account, index) => {
    if (!account.categoryId) {
      for (const category of categories) {
        let foundCategory = false

        if (category.type === account.type) {
          category.keywords.forEach((selected) => {
            if (
              account.remarks
                .toLowerCase()
                .includes(selected.keyword.toLowerCase()) &&
              account.remarks
                .toLowerCase()
                .includes(selected.thirdParty.toLowerCase())
            ) {
              accounts[index].categoryId = category.categoryId
              foundCategory = true
            }
          })
        }

        if (foundCategory) {
          break
        }
      }
    }
  })
  return accounts
}

export const formatDropDown = (data, selectDescription, sortByProp) => {
  const sortedData = textSorter([...new Set(data)], "asc", sortByProp)
    .filter((filteredData) => filteredData.trim().length > 0)
    .map((selectedData) => ({
      value: selectedData,
      label: selectedData,
    }))
  const finalData = [{ value: "", label: selectDescription }, ...sortedData]
  return finalData
}

export const formatCategory = (transactionCategories) => {
  const sortedCategories = textSorter(
    [...transactionCategories],
    "asc",
    "title"
  ).map((category) => ({
    value: category.categoryId,
    label: category.title,
  }))
  return sortedCategories
}

export const formatCategoryDropDown = (transactionCategories) => {
  const sortedCategories = formatCategory(transactionCategories)
  const categories = [
    { value: "", label: "Select a transaction category" },
    ...sortedCategories,
  ]
  return categories
}

export const formatKeywordsDropDown = (uncategorisedAccts) => {
  const keywordsArray = getKeywordsFromRemarks(uncategorisedAccts)
  return formatDropDown(keywordsArray, "Select ")
}

export const formatUpdatedCategories = (
  categories,
  category,
  keyword,
  thirdParty
) => {
  return R.reduce(
    (acc, item) => {
      if (item.categoryId === category) {
        const keywordExists = R.anyPass([
          R.propEq("keyword", keyword.toLowerCase()),
          R.propEq("thirdParty", thirdParty.toLowerCase()),
        ])

        const keywordAlreadyExists = R.any(keywordExists, item.keywords)

        if (!keywordAlreadyExists) {
          const updatedKeywords = R.append(
            { keyword, thirdParty },
            item.keywords
          )
          acc.push(R.assoc("keywords", updatedKeywords, item))
        } else {
          acc.push(item)
        }
      } else {
        acc.push(item)
      }
      return acc
    },
    [],
    categories
  )
}

//deletes a keyword from the category and returns updated business object
export const deleteKeywordFromCategory = (
  businessId,
  categoryId,
  keyword,
  data
) =>
  R.over(
    R.lensPath([businessId, "categories"]),
    R.map((item) => {
      if (item.categoryId === categoryId) {
        return R.over(
          R.lensProp("keywords"),
          R.reject(R.whereEq({ keyword: keyword }))
        )(item)
      }
      return item
    })
  )(data)

// replace the categories array of an object
export const replaceCategory = (id, newCategory, business) =>
  R.assocPath([id, "categories"], newCategory, business)

// adds a new category object into categories array
export const addCategoryData = (id, business, category) =>
  R.over(R.lensPath([id, "categories"]), R.append(category), business)

// updates the title of a category object referenced by title
export const updateCategoryTitle = (id, data, categoryId, title) =>
  R.evolve({
    [id]: {
      categories: R.map(
        R.when(R.propEq(categoryId, "categoryId"), R.assoc("title", title))
      ),
    },
  })(data)

export const currencyFormatter = (number) =>
  new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN" }).format(
    number
  )

export const findByProp = (prop, propValue, returnProp) =>
  R.pipe(R.find(R.propEq(prop, propValue)), R.prop(returnProp))

export const screenSizes = {
  xxs: "320px",
  xs: "480px",
  s: "600px",
  m: "768px",
  l: "900px",
  xl: "1024px",
}

export const TEST_SECRET_KEY = "test_sk_C1d7PNuoqToOVzoSXvHQ"
export const TEST_PUBLIC_KEY = "test_pk_SirSHhAgeBBeXvK8YYcV"
export const LIVE_SECRET_KEY = "live_sk_eFuifauPDbVczZOBr5rg"
export const LIVE_PUBLIC_KEY = "live_pk_3mCK0Mi5y5fO45oIGOwV"
