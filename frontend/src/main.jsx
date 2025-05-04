import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from "react-router-dom";

import App from "./App.jsx";
import AuthLayout from "./AuthLayout/AuthLayout.jsx";

import Signup from "./Components/Signup.jsx";
import Signin from "./Components/Signin.jsx";
import ForgotPassword from "./Components/ForgotPassword.jsx";
import ResetPassword from "./Components/ResetPassword.jsx";
import Home from "./Pages/Home.jsx";
import HostHackathon from "./Pages/HostHackathon.jsx";
import JoinHackathon from "./Pages/JoinHackathon.jsx";
import Hosting from "./Pages/Hosting.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Auth routes without navbar/footer */}
      <Route element={<AuthLayout />}>
        <Route path="api/auth/signin" element={<Signin />} />
        <Route path="api/auth/signup" element={<Signup />} />
        <Route path="api/auth/forgotpassword" element={<ForgotPassword />} />
        <Route
          path="api/auth/resetpassword/:token"
          element={<ResetPassword />}
        />
      </Route>

      {/* App routes with navbar/footer */}
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="join/hackathon" element={<JoinHackathon />} />
        <Route path="hackathon" element={<HostHackathon />} />
        <Route path="host/hackathon" element={<Hosting />} />
      </Route>
    </>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
