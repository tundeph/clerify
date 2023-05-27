import React, { useContext } from "react"
import { ThemeContext } from "styled-components"

import { DivWrapper, Text, BouncingCabinetIcon } from "../../layout/styles"
import ButtonState from "@components/button-state"

const ReconcileCard = ({ isPending, onClick }) => {
  const { colors } = useContext(ThemeContext)

  return (
    <DivWrapper align="center" gap={2}>
      <Text color={colors.gray300}>
        <BouncingCabinetIcon size={80} />
      </Text>
      <Text align="center">
        Click the button below to reconcile your transactions
      </Text>
      <ButtonState
        loading={isPending}
        condition={true}
        loadingText=""
        onClick={onClick}
      >
        Reconcile
      </ButtonState>
    </DivWrapper>
  )
}

export default ReconcileCard
