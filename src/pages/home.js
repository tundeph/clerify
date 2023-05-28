import React from "react"
import styled from "styled-components"
import { Link, useNavigate } from "react-router-dom"

import { size } from "../layout/theme"
import {
  PageWrapper,
  DivWrapper,
  UserWrapper,
  Text,
  Divider,
  SplitDiv,
  Button,
  MidWrapper,
} from "../layout/styles"

import ReconcileImg from "../assets/images/reconcile.svg"
import DecisionsImg from "../assets/images/decisions.svg"
import MoneyImg from "../assets/images/money.svg"
import { Logo } from "@components"

const Image = styled.img`
  height: ${({ size }) => size}rem;
  width: ${({ size }) => size}rem;
  transition: 0.5s ease-in-out;

  &:hover {
    transform: scale(1.03);
  }
`

export const Home = () => {
  const navigate = useNavigate()

  return (
    <PageWrapper align="center">
      <UserWrapper>
        <DivWrapper align="center" gap={2}>
          <Logo />
          <Divider />
          <DivWrapper direction="vertical" align="center" gap={5}>
            <Image src={ReconcileImg} size={5} />
            <Image src={DecisionsImg} size={5} />
            <Image src={MoneyImg} size={5} />
          </DivWrapper>
          <Text align="center" size={size.xs}>
            CarPaddy's internal automated acount reconciliation and
            categorization application
          </Text>
        </DivWrapper>

        <MidWrapper>
          <DivWrapper direction="vertical" gap={3} bottom={3} justify="center">
            <Button onClick={() => navigate("signup")}> Sign up </Button>
            <Button onClick={() => navigate("signin")}> Log in </Button>
          </DivWrapper>
        </MidWrapper>
      </UserWrapper>
    </PageWrapper>
  )
}
