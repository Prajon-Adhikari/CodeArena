import React from "react";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import ForbiddenPage from "../Pages/ForbiddenPage.jsx";

export default function ProtectedRoute({ children, requiredRole }) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null); // store user info

  useEffect(() => {
    const verify = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/auth/check`,
          { withCredentials: true }
        );
        if (res.data.success) {
          setUser(res.data.user);
        }
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    verify();
  }, []);

  if (loading) return <p>Loading...</p>;

  if (!user) return <Navigate to="/api/auth/signin" replace />;
  console.log(user.role, requiredRole);

   if (requiredRole && user.role !== requiredRole) {
    return <ForbiddenPage />;
  }

  if (!requiredRole && user.role === "admin") {
    return <Navigate to="/menu/dashboard" replace />;
  }

  return React.cloneElement(children, { user });
}
