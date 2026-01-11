import React, { useState } from "react";
import Navbar from "./Navbar";
import { Navigate, Outlet } from "react-router";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Loading from "../ui/Loading";

const Layout = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      if (!user.emailVerified) {
        setLoading(false);
        return setUser(null);
      }
      setUser(user);
      setLoading(false);
    } else {
      setUser(null);
      setLoading(false);
    }
  });
  if (loading) {
    return <Loading />;
  }
  if (!user) {
    return <Navigate to="/login" />;
  }
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Layout;
