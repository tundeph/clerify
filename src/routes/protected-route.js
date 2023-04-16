import React from "react"
import { Navigate, useLocation } from "react-router-dom"
import { useSelector } from "react-redux"
import { selectUserProfile } from "../redux/profileSlice"

export const ProtectedRoute = ({ children }) => {
	const { user } = useSelector(selectUserProfile)
	let location = useLocation()

	if (!user) {
		return <Navigate to="/signin" state={{ from: location }} replace />
	}

	return children
}
