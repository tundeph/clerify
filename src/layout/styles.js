import styled, { css } from "styled-components"
import { size } from "../layout/theme"

import { Dashboard } from "@styled-icons/material/Dashboard"
import { EditOff } from "@styled-icons/material-sharp/EditOff"
import { SlackHash } from "@styled-icons/fa-brands/SlackHash"
import { ImportExport } from "@styled-icons/material-outlined/ImportExport"
import { BarChartFill } from "@styled-icons/bootstrap/BarChartFill"
import { Settings } from "@styled-icons/ionicons-sharp/Settings"
import { SignOut } from "@styled-icons/octicons/SignOut"
import { CloseOutline } from "@styled-icons/evaicons-outline/CloseOutline"
import { Calendar } from "@styled-icons/entypo/Calendar"
import { AccountTree } from "@styled-icons/material/AccountTree"
import { DiagonalArrowRightUpOutline } from "styled-icons/evaicons-outline"
import { DiagonalArrowLeftDownOutline } from "styled-icons/evaicons-outline"
import { ArrowForwardOutline } from "@styled-icons/evaicons-outline/ArrowForwardOutline"
import { LoaderAlt } from "styled-icons/boxicons-regular"
import { Loader3 } from "@styled-icons/remix-fill/Loader3"
import { DownArrow } from "@styled-icons/boxicons-solid/DownArrow"
import { ArrowRight } from "@styled-icons/bootstrap/ArrowRight"
import { CheckmarkCircle } from "@styled-icons/fluentui-system-regular/CheckmarkCircle"
import { Cabinet } from "@styled-icons/boxicons-regular/Cabinet"
import { Check2 } from "@styled-icons/bootstrap/Check2"

const IconProps = css`
  height: ${(props) => props.size || 20}px;
`

const buttonProps = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  height: 3.5rem;
  font: ${size.xxs}em "Beatrice-Bold", sans-serif;
  border-radius: 50px;
  padding: 0.5rem 25px;
  border: 0px;
`

export const DashboardIcon = styled(Dashboard)`
  ${IconProps}
`
export const CategoriseIcon = styled(EditOff)`
  ${IconProps}
`

export const KeywordsIcon = styled(SlackHash)`
  ${IconProps}
`

export const ImportAccountsIcon = styled(ImportExport)`
  ${IconProps}
`

export const ReportsIcon = styled(BarChartFill)`
  ${IconProps}
`

export const SettingsIcon = styled(Settings)`
  ${IconProps}
`

export const SignOutIcon = styled(SignOut)`
  ${IconProps}
`

export const ReconcileIcon = styled(AccountTree)`
  ${IconProps}
`

export const CalendarIcon = styled(Calendar)`
  ${IconProps}
`

export const ArrowRightIcon = styled(ArrowRight)`
  height: 1.2em;
`

export const LoadingIcon = styled(LoaderAlt)`
  ${IconProps}

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }

    to {
      transform: rotate(360deg);
    }
  }
  animation: spin 0.5s linear 0s infinite running;
`

export const BouncingCabinetIcon = styled(Cabinet)`
  ${IconProps}

  @keyframes bounce {
    10%,
    100% {
      transform: translateY(5px);
    }
  }
  animation: bounce 1s linear 0s infinite running;
`

export const DebitIcon = styled(DiagonalArrowRightUpOutline)`
  height: 1.2em;
  margin-left: 1em;
`
export const CreditIcon = styled(DiagonalArrowLeftDownOutline)`
  height: 1.2em;
  margin-left: 1em;
`
export const ArrowForwardIcon = styled(ArrowForwardOutline)`
  height: 1.2em;
`

export const CloseIcon = styled(CloseOutline)`
  height: 1.2em;
  margin-left: 1em;
`
export const CheckmarkCircleIcon = styled(CheckmarkCircle)`
  height: 1.2em;
`
export const CheckmarkIcon = styled(Check2)`
  height: 1.2em;
`
export const CabinetIcon = styled(Cabinet)`
  ${IconProps}
`

export const CustomCloseIcon = styled(CloseOutline)`
  height: 1.2em;
  padding: 10px 10px;
  border-radius: 100px;

  &:hover {
    color: ${({ theme }) => theme.colors.gray600};
    background-color: ${({ theme }) => theme.colors.gray100};
  }

  &:active {
    background-color: ${({ theme }) => theme.colors.gray300};
  }
`
export const PageWrapper = styled.div`
  flex-grow: 1;
  display: flex;
  min-height: 100vh;
  padding: 1rem 2rem;
`

export const MidWrapper = styled.div`
  width: ${(props) => props.width || 80}%;
  margin: 0 auto;
  padding: 5rem 2rem;
  box-sizing: border-box;
  text-align: center;
  display: flex;
  flex-direction: column;
`

export const UserWrapper = styled.div`
  width: 90%;
  max-width: 900px;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 3rem 2rem;
  box-sizing: border-box;
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
  height: ${(props) => (props.height ? props.height : size.xxl)}rem;
  width: 100%;
  border: 1px solid ${({ theme }) => theme.colors.gray300};
  border-radius: 50px;
  padding: 0.5rem 2rem;
  font-size: ${(props) => props.fontSize || size.xxs}em;
  font-family: "Beatrice", sans-serif;
  color: ${({ theme }) => theme.colors.secondary};
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.colors.gray100};

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    background-color: ${({ theme }) => theme.colors.reverse};
    outline: none;
  }
`

export const SelectInput = styled.select`
  height: ${(props) => (props.height ? props.height : size.xxl)}rem;
  width: 100%;
  border: 1.5px solid ${({ theme }) => theme.colors.gray300};
  border-radius: 50px;
  padding: 0rem 20px;
  font-size: ${(props) => (props.fontSize ? props.fontSize : size.xxs)}em;
  font-family: "Beatrice", sans-serif;
  color: ${({ theme }) => theme.colors.secondary};
  box-sizing: border-box;
  background-color: ${(props) => (props.bgColor ? props.bgColor : ({ theme }) => theme.colors.gray100)};

  &:focus {
    border-color: ${({ theme }) => theme.colors.gray600};
    background-color: ${(props) => (props.bgColor ? props.bgColor : ({ theme }) => theme.colors.reverse)};
    outline: none;
  }
`

export const Button = styled.button`
  ${buttonProps}
  color: ${({ theme }) => theme.colors.reverse};
  background-color: ${({ theme }) => theme.colors.primary};

  &:hover {
    transform: scale(1.02);
    cursor: pointer;
  }

  ${({ size }) =>
    size === "small" &&
    css`
      height: 2.5rem;
      // padding: 0.1rem, 15px !important;
    `}
`

export const DisabledButton = styled.button.attrs((props) => ({
  disabled: true,
}))`
  ${buttonProps}
  color: ${({ theme }) => theme.colors.reverse};
  background-color: ${(props) => props.color || (({ theme }) => theme.colors.primary)};
`

export const PasswordInput = styled(FormInput)`
  &::placeholder {
    letter-spacing: 0px;
  }
  letter-spacing: ${size.xxs}rem;
`

export const DivWrapper = styled.div`
  display: flex;
  min-width: ${null || ((props) => props.width)}rem;
  flex-direction: ${(props) => props.direction || "column"};
  margin-bottom: ${null || ((props) => props.bottom)}rem;
  margin-top: ${null || ((props) => props.top)}rem;
  margin-left: ${null || ((props) => props.left)}rem;
  margin-right: ${null || ((props) => props.right)}rem;
  gap: ${null || ((props) => props.gap)}rem;
  justify-content: ${(props) => props.justify || "left"};
  align-items: ${(props) => props.align || "left"};
  flex-wrap: ${(props) => props.wrap || "nowrap"};
  color: ${null || ((props) => props.color)};
`

export const Text = styled.span`
  display: inline;
  margin-bottom: ${null || ((props) => props.bottom)}rem;
  margin-top: ${null || ((props) => props.top)}rem;
  margin-right: ${null || ((props) => props.right)}rem;
  margin-left: ${null || ((props) => props.left)}rem;
  font-size: ${null || ((props) => props.size)}rem;
  text-align: ${null || ((props) => props.align)};
  color: ${null || ((props) => props.color)};

  ${({ bold }) => bold && ` font-family: "Beatrice Bold", sans-serif`}
`

export const Divider = styled.div`
  display: inline-block;
  border-top: 1px solid ${({ theme }) => theme.colors.gray300};
  border-color: ${((props) => props.color) || (({ theme }) => theme.colors.gray300)};
  margin: ${null || ((props) => props.gap)}rem 0;
`

export const KeywordsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-content: flex-start;
  flex-wrap: wrap;
  gap: ${size.xxxs}rem;
  height: 300px;
  background-color: ${({ theme }) => theme.colors.gray100};
  border-radius: 15px;
  padding: ${size.xs}rem ${size.xxs}rem;
  box-sizing: border-box;
  overflow-y: scroll;
`

export const UploadInput = styled.input`
  height: ${(props) => (props.height ? props.height : size.xxl)}rem;
  background-color: ${({ theme }) => theme.colors.gray100};
  border-radius: 100px;
  border: 1.5px solid ${({ theme }) => theme.colors.secondary};
  padding: ${size.xxs}rem ${size.xs}rem;
  box-sizing: border-box;
  font-family: "Beatrice", sans-serif;
  color: ${({ theme }) => theme.colors.gray600};

  &::-webkit-file-upload-button {
    display: none;
  }

  &::before {
    content: "Click to Upload: ";
    font-family: "Beatrice Bold", sans-serif;
  }

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    background-color: ${({ theme }) => theme.colors.reverse};
  }
`

export const HalfDiv = styled.div`
  display: flex;
  flex-grow: 1;
  min-width: ${(props) => props.minWidth || "50"}px;
  justify-content: ${(props) => props.justify || "left"};
  align-items: ${(props) => props.align || "left"};
  text-align: ${(props) => props.alignText || "left"};
  gap: ${null || ((props) => props.gap)}rem;
`

export const SplitDiv = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(${(props) => props.minWidth || "200"}px, 1fr));
  gap: ${((props) => props.gap) || null}rem;
  margin-bottom: ${null || ((props) => props.bottom)}rem;
  margin-top: ${null || ((props) => props.top)}rem;
  margin-left: ${null || ((props) => props.left)}rem;
  margin-right: ${null || ((props) => props.right)}rem;
`

export const DateInput = styled.input`
  height: ${size.xxl}rem;
  background-color: ${({ theme }) => theme.colors.gray100};
  border-radius: 100px;
  border: 1.5px solid ${({ theme }) => theme.colors.gray300};
  padding: ${size.xxs}rem ${size.xs}rem;
  box-sizing: border-box;
  font-family: "Beatrice", sans-serif;
  color: ${({ theme }) => theme.colors.gray600};

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    background-color: ${({ theme }) => theme.colors.reverse};
  }

  ${({ size }) =>
    size === "small" &&
    css`
      height: 2.5rem;
    `}
`

export const InfoBoxDangerProp = css`
  background-color: #f8d7da;
  border: 1px solid #f5c2c7;
  color: ${({ theme }) => theme.colors.red};
`

export const InfoBoxSuccessProp = css`
  background-color: #d1e7dd;
  border: 1px solid #badbcc;
  color: ${({ theme }) => theme.colors.green};
`

export const InfoBox = styled.div`
  background-color: #e2e3e5;
  border: 1px solid #d3d6d8;
  border-radius: 20px;
  color: ${({ theme }) => theme.colors.gray600};
  text-align: center;
  padding: ${size.s}rem ${size.xxs}rem;
  font-size: ${size.xxxs}rem;

  ${({ danger }) => danger && InfoBoxDangerProp}
  ${({ success }) => success && InfoBoxSuccessProp}
`

export const SpanWrapper = styled.span``

export const UnderFormText = styled(Text)`
  margin-top: 0.8rem;
  margin-right: 1rem;
  font-size: 0.8rem;
  text-align: right;
  color: ${({ theme }) => theme.colors.secondary};
`
