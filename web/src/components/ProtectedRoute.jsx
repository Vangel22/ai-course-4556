import { isExpired } from "react-jwt";
import { Navigate, Outlet } from "react-router";

export default function ProtectedRoute() {
  const token = localStorage.getItem("token");

  if (!token || isExpired(token)) {
    console.log("Token is missing or expired!");
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
