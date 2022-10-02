import React, { useContext } from "react"
import { ThemeContext } from "styled-components"
import { Button, DisabledButton, LoadingIcon } from "../layout/styles"

const ButtonState = ({ size, loading, loadingText, children, condition, onClick }) => {
  const { colors } = useContext(ThemeContext)

  if (loading) {
    return (
      <DisabledButton size={size}>
        {loadingText} <LoadingIcon />
      </DisabledButton>
    )
  } else {
    if (condition) {
      return (
        <Button size={size} onClick={onClick}>
          {children}
        </Button>
      )
    } else {
      return (
        <DisabledButton size={size} color={colors.gray600}>
          {children}
        </DisabledButton>
      )
    }
  }
}

export default ButtonState
