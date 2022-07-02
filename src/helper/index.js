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
