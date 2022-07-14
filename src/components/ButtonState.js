import React, { useContext } from "react"
import { ThemeContext } from "styled-components"
import { Button, DisabledButton, LoadingIcon } from "../layout/styles"

const ButtonState = ({ loading, loadingText, children, condition, onClick }) => {
  const { colors } = useContext(ThemeContext)

  if (loading) {
    return (
      <DisabledButton>
        {loadingText} <LoadingIcon />
      </DisabledButton>
    )
  } else {
    if (condition) {
      return <Button onClick={onClick}> {children}</Button>
    } else {
      return <DisabledButton color={colors.gray600}> {children} </DisabledButton>
    }
  }
}

export default ButtonState
