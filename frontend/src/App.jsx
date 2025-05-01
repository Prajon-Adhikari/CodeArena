import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./Components/Signup";
import Signin from "./Components/Signin";
import Home from "./Components/Home";
import HostHackathon from "./Components/HostHackathon";
import ResetPassword from "./Components/ResetPassword";
import ForgotPassword from "./Components/ForgotPassword";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/api/auth/signup" element={<Signup />} />
        <Route path="/api/auth/signin" element={<Signin />} />
        <Route path="/api/auth/forgotpassword" element={<ForgotPassword />} />
        <Route path="/api/auth/resetpassword/:token" element={<ResetPassword />} />
    
        <Route path="/home" element={<Home />} />
        <Route path="/host/hackathon" element={<HostHackathon />} />
      </Routes>
    </BrowserRouter>
  );
}
