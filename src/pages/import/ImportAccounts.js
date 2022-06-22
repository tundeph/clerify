import React from "react"
import styled from "styled-components"
import { size } from "../../layout/theme"
import {
  PageWrapper,
  UserWrapper,
  DivWrapper,
  Title,
  Text,
  SubTitle,
} from "../../layout/styles"

import TabDiv from "../../components/TabDiv"

import UploadFromDevice from "../import/UploadFromDevice"
import SyncFromOpenBank from "../import/SyncFromOpenBank"

export const CustomText = styled(Text)`
  background-color: ${({ theme }) => theme.colors.gray100};
  border-radius: 100px;
  padding: ${size.xxs}rem ${size.xs}rem;
  box-sizing: border-box;
`

export const HalfDiv = styled(DivWrapper)`
  width: 50%;
`

const ImportAccounts = () => {
  const categories = [
    { value: "", text: "Select account" },
    { value: "gtb", text: "Guarantee Trust Bank" },
    { value: "zenith", text: "Zenith Bank" },
  ]

  const Tab1 = (
    <UploadFromDevice
      name="moi"
      selectData={categories}
      onSubmit={(e) => {
        e.preventDefault()
      }}
    />
  )

  const Tab2 = <SyncFromOpenBank selectData={categories} />

  const contents = [
    { title: "Upload from Device", data: Tab1 },
    { title: "Sync from Open Bank data", data: Tab2 },
  ]

  return (
    <>
      <PageWrapper>
        <UserWrapper>
          <DivWrapper bottom={size.m}>
            <Title> Import financial records </Title>
            <SubTitle> Reconcile your data by uploading them. </SubTitle>
          </DivWrapper>
          <DivWrapper bottom={size.m}>
            <TabDiv contents={contents} />
          </DivWrapper>
        </UserWrapper>
      </PageWrapper>
    </>
  )
}

export default ImportAccounts
