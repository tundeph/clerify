import React from "react"
import styled from "styled-components"
import { size } from "../layout/theme"
// import theme from "../layout/theme"
// console.log(theme.lightTheme.colors.foreground)
const Text = styled.span`
  color: ${(props) =>
    props.reverse || (({ theme }) => theme.colors.foreground)};
  font: ${size.s}em "Beatrice-Bold", sans-serif;
  font-weight: bold;
`

const Logo = () => {
  return <Text>Clerify::</Text>
}

export default Logo
