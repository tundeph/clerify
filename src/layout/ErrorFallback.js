"use client"

import React, { useState } from "react"
import { Modal } from "@components"

export const ErrorModal = () => <div>There was an error</div>

export function ErrorFallback({ error, resetErrorBoundary }) {
  const [errorModal, setErrorModal] = useState(true)
  // Call resetErrorBoundary() to reset the error boundary and retry the render.
  console.log("There is an error")

  return (
    <>
      {errorModal ? (
        <Modal
          role="alert"
          title="Error"
          handleClose={() => setErrorModal(false)}
        >
          <p>Something went wrong</p>
        </Modal>
      ) : null}
    </>
  )
}
