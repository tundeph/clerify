import React from "react"
import styled from "styled-components"
import { Link, useNavigate } from "react-router-dom"

import { size } from "../layout/theme"
import {
	PageWrapper,
	DivWrapper,
	UserWrapper,
	Text,
	SubTitle,
	Divider,
	SplitDiv,
	Button,
} from "../layout/styles"

import ReconcileImg from "../assets/images/reconcile.svg"
import DecisionsImg from "../assets/images/decisions.svg"
import MoneyImg from "../assets/images/money.svg"
import Logo from "../components/logo"

const Image = styled.img`
	height: ${({ size }) => size}rem;
	width: ${({ size }) => size}rem;
	transition: 0.5s ease-in-out;

	&:hover {
		transform: scale(1.03);
	}
`

const StyledLink = styled(Link)`
	text-align: right;
`

const Home = () => {
	const navigate = useNavigate()

	return (
		<PageWrapper align="center">
			<UserWrapper>
				<DivWrapper align="center">
					<Logo />
					<SplitDiv minWidth={200} gap={3} top={2}>
						<StyledLink to="/signup">Sign up</StyledLink>
						<Link to="/signin">Login </Link>
					</SplitDiv>
				</DivWrapper>
				<SplitDiv minWidth={200} top={3} gap={4}>
					<DivWrapper top={5} gap={3}>
						<Text size={size.m}> Reconcile your accounts in seconds. </Text>
						<SubTitle>
							Categorize millions of financial transactions with accuracy, in a
							breeze. Your financial statements are no longer a burden
						</SubTitle>
						<Divider />
					</DivWrapper>
					<DivWrapper>
						<Image src={ReconcileImg} size={25} />
					</DivWrapper>
				</SplitDiv>

				<SplitDiv minWidth={200} top={3} gap={4}>
					<DivWrapper align="left">
						<Image src={DecisionsImg} size={24} />
					</DivWrapper>
					<DivWrapper top={5} gap={3}>
						<Text size={size.m}>
							{" "}
							Make better decisions for your business.{" "}
						</Text>
						<SubTitle>
							See how your business is doing- with financial and visual reports
							in real time. Plot charts, compare month-on-month volumes for any
							category of your transactions in few clicks
						</SubTitle>
						<Divider />
					</DivWrapper>
				</SplitDiv>

				<SplitDiv minWidth={200} top={3} gap={4}>
					<DivWrapper top={5} gap={3}>
						<Text size={size.m}> Save time and money </Text>
						<SubTitle>
							Save time and money with our automated transaction categorization.
							You'll never have to worry about your accounts again
						</SubTitle>
						<Divider />
					</DivWrapper>
					<DivWrapper>
						<Image src={MoneyImg} size={24} />
					</DivWrapper>
				</SplitDiv>

				<DivWrapper top={5} bottom={3}>
					<Button onClick={() => navigate("signup")}> Create account </Button>
				</DivWrapper>
			</UserWrapper>
		</PageWrapper>
	)
}

export default Home
