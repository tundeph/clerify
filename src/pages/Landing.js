import React from "react"
import { Link } from "react-router-dom"

import { DivWrapper } from "../layout/styles"

const Landing = () => {
  return (
    <DivWrapper gap={2}>
      Landing Page
      <Link to="/signup"> Sign up </Link>
      <Link to="/signin"> Sign in </Link>
    </DivWrapper>
  )
}

export default Landing
