import styled from "styled-components"
import { size } from "../layout/theme"

export const PageWrapper = styled.div`
  display: flex;
  min-height: 100vh;
`

export const MidWrapper = styled.div`
  width: 60vw;
  margin: 0 auto;
  padding: 5rem 2rem;
  box-sizing: border-box;
  text-align: center;
  display: flex;
  flex-direction: column;
`

export const Title = styled.span`
  font: ${size.xs}em "Beatrice", sans-serif;
  color: ${(props) => props.color || (({ theme }) => theme.colors.foreground)};
`

export const SubTitle = styled.span`
  font: ${size.xxs}em "Beatrice", sans-serif;
  color: ${(props) => props.color || (({ theme }) => theme.colors.secondary)};
`

export const FormInput = styled.input`
  height: 3.5rem;
  width: 100%;
  border: 1.5px solid ${({ theme }) => theme.colors.secondary};
  border-radius: 50px;
  padding: 0.5rem 2rem;
  font: ${size.xxs}em "Beatrice", sans-serif;
  color: ${({ theme }) => theme.colors.secondary};
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.colors.lightGray};

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    background-color: ${({ theme }) => theme.colors.reverse};
    outline: none;
  }
`
export const Button = styled.button`
  height: 3.5rem;
  font: ${size.xxs}em "Beatrice-Bold", sans-serif;
  color: ${({ theme }) => theme.colors.reverse};
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 50px;
  padding: 0.5rem 1rem;

  &:hover {
    transform: scale(1.02);
    cursor: pointer;
  }
`

export const DivWrapper = styled.div`
  display: flex;
  flex-direction: ${(props) => props.direction || "column"};
  margin-bottom: ${null || ((props) => props.bottom)}rem;
  margin-top: ${null || ((props) => props.top)}rem;
`

export const Text = styled.span`
  display: inline;
  margin-bottom: ${null || ((props) => props.bottom)}rem;
  margin-top: ${null || ((props) => props.top)}rem;
`
