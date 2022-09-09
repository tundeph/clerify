import React, { useContext } from "react"

import { ThemeContext } from "styled-components"
import { size } from "../../layout/theme"
import { AddFormButton, DeleteFormButton } from "../../components/FormButtons"
import { DivWrapper, Divider, SubTitle, Text, FormInput } from "../../layout/styles"
import Select from "../../components/Select"

const AddBusinessForm = ({
  name,
  setName,
  type,
  setType,
  businessType,
  accts,
  handleAcctChange,
  handleDeleteForm,
  handleAddMore,
}) => {
  const { colors } = useContext(ThemeContext)

  return (
    <DivWrapper>
      <DivWrapper gap={size.xxs}>
        <SubTitle> Details of Business </SubTitle>
        <FormInput
          onChange={(e) => setName(e.target.value)}
          value={name}
          type="text"
          placeholder="Name of business"
          required
        />
        <Select onChange={(e) => setType(e.target.value)} value={type} options={businessType} />
      </DivWrapper>
      <Divider gap={size.m} />
      <DivWrapper gap={size.xxs}>
        <SubTitle>Add Your Financial Accounts </SubTitle>
        <Text align="center" size={size.xxxs} color={colors.secondary}>
          For example, different bank accounts
        </Text>
        {accts.map((acct, i) => {
          return (
            <DivWrapper key={acct.id}>
              <Text align="left" left={size.xxs} size={size.xxxs} color={colors.secondary}>
                Account {i + 1}:
              </Text>
              <DivWrapper direction="row">
                <FormInput
                  onChange={(e) => handleAcctChange(e, acct.id)}
                  value={acct.acctName}
                  type="text"
                  placeholder="e.g. ABC Bank "
                />
                {accts.length > 1 && i < accts.length - 1 && (
                  <DeleteFormButton onClick={handleDeleteForm} size={0.7} value={acct.id} />
                )}
                {accts.length - 1 === i && <AddFormButton onClick={handleAddMore} size={0.7} />}
              </DivWrapper>
            </DivWrapper>
          )
        })}
      </DivWrapper>
    </DivWrapper>
  )
}

export default AddBusinessForm
