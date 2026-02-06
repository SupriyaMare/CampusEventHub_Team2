// src/components/ProtectedRoute/ProtectedRoute.jsx (REPLACE / CREATE) — must match your folder name
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

// usage:
// <ProtectedRoute>...</ProtectedRoute>  => any logged-in user
// <ProtectedRoute role="college_admin">...</ProtectedRoute> => only role
const ProtectedRoute = ({ children, role }) => {
  const { user } = useContext(AuthContext);

  if (!user) return <Navigate to="/" replace />;

  if (role && user.role !== role) {
    // redirect to correct dashboard
    return (
      <Navigate
        to={user.role === "college_admin" ? "/admin/dashboard" : "/student/dashboard"}
        replace
      />
    );
  }

  return children;
};

export default ProtectedRoute;
