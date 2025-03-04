import { Navigate } from "react-router-dom";
import { ReactNode } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { getRoleFromToken } from "../lib/authUtils";

interface Props {
    children: ReactNode;
    allowedRole: 'user' | 'admin'
}
const ProtectedRoute = ({ children, allowedRole }: Props) => {
    const token = useSelector((state: RootState) => state.auth.token);
    const role = getRoleFromToken(token);

    if (!token) {
        return <Navigate to="/" replace/>;
    }

    if (role !== allowedRole) {
        return <Navigate to="/unauthorized" replace/>;
    }

    return children;
};

export default ProtectedRoute;