import React from "react"
import styled, { css } from "styled-components"
import { NavLink, useMatch, useResolvedPath } from "react-router-dom"

const matchProps = css`
  font-family: "Beatrice Bold", sans-serif;
  color: ${({ theme }) => theme.colors.foreground};
  border-bottom: 3px solid ${({ theme }) => theme.colors.gray600};

  &:hover {
    border-bottom: 3px solid ${({ theme }) => theme.colors.gray600};
  }
`

const NavProps = css`
  min-width: max-content;
  padding: 0.8em 0.2em;
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.secondary};
  text-decoration: none;
  text-align: center;
  cursor: pointer;
  border: none;

  &:hover {
    border-bottom: 3px solid ${({ theme }) => theme.colors.gray300};
  }

  ${({ match }) => match && matchProps}
`
const SubMenuNav = styled(NavLink)`
  ${NavProps}
`

export const CustomNavLink = ({ children, to, ...props }) => {
  let resolved = useResolvedPath(to)
  let match = useMatch({ path: resolved.pathname, end: true })

  return (
    <SubMenuNav to={to} match={match} {...props}>
      {children}
    </SubMenuNav>
  )
}
