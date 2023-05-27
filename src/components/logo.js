import React, { useContext } from "react"
import styled from "styled-components"
import PropTypes from "prop-types"
import { size } from "../layout/theme"
import { ThemeContext } from "styled-components"
import { Text } from "../layout/styles"

const LogoText = styled(Text)`
  font: ${size.s}em "Beatrice-Bold", sans-serif;
  font-weight: bold;
`

export const Logo = ({ reverse }) => {
  const { colors } = useContext(ThemeContext)

  return (
    <LogoText color={reverse ? "#FFFFFF" : colors.foreground}>
      Clerify::
    </LogoText>
  )
}

Logo.propTypes = {
  reverse: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
}
