import React from "react"
import ReactDOM from "react-dom"
import styled from "styled-components"
import { CustomCloseIcon } from "../layout/styles"

const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgb(0, 0, 0, 0.5);
`

const ModalContents = styled.div`
  padding: 30px;
  max-width: 480px;
  margin: 200px auto;
  border-radius: 10px;
  background-color: #ffffff;
`

const ModalTitle = styled.div`
  text-align: center;
  font-family: "Beatrice Bold", sans-serif;
  font-size: 1.2rem;
`

const ModalHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr 20px;
  margin-bottom: 30px;
  align-items: center;
  padding-bottom: 5px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray300};
`

const ModalBody = styled.div`
  /* display: flex; */

  text-align: center;
`

const Modal = ({ title, children, handleClose }) => {
  return ReactDOM.createPortal(
    <ModalBackdrop>
      <ModalContents>
        <ModalHeader>
          <ModalTitle>{title} </ModalTitle>
          <CustomCloseIcon onClick={handleClose} />
        </ModalHeader>
        <ModalBody> {children} </ModalBody>
      </ModalContents>
    </ModalBackdrop>,
    document.querySelector("#root")
  )
}

export default Modal
