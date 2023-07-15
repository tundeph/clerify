// component that renders tables for financial reports
import React from "react"
import { size } from "../layout/theme"

import { DivWrapper, SplitDiv, Text, Divider } from "../layout/styles"
import { currencyFormatter } from "../helper"

export const ReportsTable = ({ data, categories }) => {
  const categoriesObj = categories.reduce((prev, current) => {
    prev[[current.title]] = current.type
    return prev
  }, {})

  const CalculateTotal = ({ data, obj }) => {
    let c = 0
    let d = 0
    data.datasets.forEach((selected) => {
      obj[selected.label] === "credit"
        ? (c += selected.data.reduce((prev, curr) => prev + curr, 0))
        : (d += selected.data.reduce((prev, curr) => prev + curr, 0))
    })
    return (
      <SplitDiv minWidth={200} gap={2} top={size.xxs}>
        <DivWrapper>
          <Text size={size.xxxs} bold="bold">
            Net Profit
          </Text>
        </DivWrapper>
        <DivWrapper>
          <Text size={size.xxxs} bold="bold" align="right">
            {currencyFormatter(c - d)}
          </Text>
        </DivWrapper>
      </SplitDiv>
    )
  }
  const FormatCreditList = ({ data, obj, type }) => {
    return (
      <>
        {data.datasets.map((selected, index) => (
          <React.Fragment key={index}>
            {obj[selected.label] === type && (
              <SplitDiv minWidth={200} gap={2} top={size.xxxs}>
                <DivWrapper>
                  <Text size={size.xxxs}> {selected.label}</Text>
                </DivWrapper>
                <DivWrapper>
                  <Text align="right" size={size.xxxs}>
                    {currencyFormatter(
                      selected.data.reduce((prev, curr) => prev + curr, 0)
                    )}
                  </Text>
                </DivWrapper>
              </SplitDiv>
            )}

            {index === data.datasets.length - 1 && (
              <DivWrapper top={1}>
                <Divider />
              </DivWrapper>
            )}
          </React.Fragment>
        ))}
      </>
    )
  }

  return (
    <DivWrapper>
      <DivWrapper justify="space-between" gap={0.5}>
        <FormatCreditList data={data} obj={categoriesObj} type="credit" />
        <FormatCreditList data={data} obj={categoriesObj} type="debit" />
        {data.datasets.length ? (
          <CalculateTotal data={data} obj={categoriesObj} />
        ) : null}
      </DivWrapper>
    </DivWrapper>
  )
}
