import { ReactNode } from "react"
import { Navigate } from "react-router-dom"
import { useGetUserInfo } from "../hooks";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {

    const userInfo = useGetUserInfo();
    return (
        userInfo
            ? children
            : <Navigate to="/" replace={true} />
    )
}

export default ProtectedRoute
