// custom component to render modals in the app
import React from "react"
import ReactDOM from "react-dom"
import styled from "styled-components"
import { CloseOutline } from "@styled-icons/evaicons-outline/CloseOutline"

const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgb(0, 0, 0, 0.5);
  z-index: 1;
`

const ModalContents = styled.div`
  padding: 30px;
  max-width: 480px;
  margin: 100px auto;
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
  border-bottom: 1px solid #cccccc;
`

const ModalBody = styled.div`
  /* display: flex; */
  text-align: center;
`

const CustomCloseIcon = styled(CloseOutline)`
  height: 1.2em;
  padding: 10px 10px;
  border-radius: 100px;

  &:hover {
    color: #434343;
    background-color: #ebebeb;
  }

  &:active {
    background-color: #cccccc;
  }
`

export const Modal = ({ title, children, handleClose, icon, noBgClose }) => {
  return ReactDOM.createPortal(
    <ModalBackdrop onClick={noBgClose ? null : handleClose}>
      <ModalContents>
        <ModalHeader>
          <ModalTitle>
            {title} {icon}
          </ModalTitle>
          <CustomCloseIcon onClick={handleClose} />
        </ModalHeader>
        <ModalBody> {children} </ModalBody>
      </ModalContents>
    </ModalBackdrop>,
    document.querySelector("#root")
  )
}
