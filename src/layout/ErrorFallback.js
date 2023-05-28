"use client"

import React, { useState } from "react"
import { Modal } from "@components"

export const ErrorModal = () => <div>There was an error</div>

export function ErrorFallback({ error, resetErrorBoundary }) {
  const [errorModal, setErrorModal] = useState(true)
  // Call resetErrorBoundary() to reset the error boundary and retry the render.

  const handleCloseModal = () => {
    setErrorModal(false)
    window.location.replace("/")
  }

  return (
    <>
      {errorModal ? (
        <Modal role="alert" title="Error" handleClose={handleCloseModal}>
          <p>Something went wrong</p>
        </Modal>
      ) : null}
    </>
  )
}
