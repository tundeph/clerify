import React from "react"

import { size } from "@layout/theme"
import { DivWrapper, TextareaInput, Label } from "@layout/styles"

import Select from "@components/select"
import ButtonState from "@components/button-state"
import Modal from "@components/modal"

const transactionType = [
  { label: "Credit", value: "credit" },
  { label: "Debit", value: "debit" },
]

const TransactionModal = ({
  accountToEdit,
  setOpenModal,
  setAccountToEdit,
  result,
  onClickUpdate,
}) => {
  return (
    <Modal
      title="Edit transaction"
      handleClose={() => setOpenModal(false)}
      noBgClose
    >
      <DivWrapper align="left" gap={2}>
        <DivWrapper>
          <Label bottom={0.5}>Description</Label>
          <TextareaInput
            type="text"
            value={accountToEdit.remarks}
            onChange={(e) =>
              setAccountToEdit((data) => ({
                ...data,
                remarks: e.target.value,
              }))
            }
            height={size.xl}
          />
        </DivWrapper>

        <Select
          options={transactionType}
          label="Type"
          onChange={(e) =>
            setAccountToEdit((data) => ({
              ...data,
              type: e.target.value,
            }))
          }
          value={accountToEdit.type}
        />
        <ButtonState
          loading={result.isPending}
          loadingText="Loading"
          condition={true}
          onClick={onClickUpdate}
        >
          Edit transaction
        </ButtonState>
      </DivWrapper>
    </Modal>
  )
}

export default TransactionModal
