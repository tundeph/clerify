import React, { useContext } from "react"
import { ThemeContext } from "styled-components"
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
