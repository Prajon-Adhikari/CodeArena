import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Navigate,
  createRoutesFromElements,
} from "react-router-dom";

import App from "./App.jsx";
import AuthLayout from "./AuthLayout/AuthLayout.jsx";
import Signup from "./AuthLayout/SignUp.jsx";
import Signin from "./AuthLayout/SignIn.jsx";
import ForgotPassword from "./AuthLayout/ForgotPassword.jsx";
import ResetPassword from "./AuthLayout/ResetPassword.jsx";
import Home from "./Pages/Home.jsx";
import HostHackathon from "./HostPages/HostHackathon.jsx";
import JoinHackathon from "./JoinPages/JoinHackathon.jsx";
import Hosting from "./HostPages/Hosting.jsx";
import BlogPage from "./Pages/BlogPage.jsx";
import About from "./Pages/About.jsx";
import Contact from "./Pages/Contact.jsx";
import Profile from "./Pages/Profile.jsx";
import Overview from "./Pages/Overview.jsx";
import MyJoinedHackathon from "./MyHackathonPages/MyJoinedHackathon.jsx";
import MyHostedHackathon from "./MyHackathonPages/MyHostedHackathon";
import MyJudgedHackathon from "./MyHackathonPages/MyJudgedHackathon.jsx";
import Project from "./Pages/Project.jsx";
import Rules from "./Pages/Rules.jsx";
import Prizes from "./Pages/Prizes.jsx";
import Judges from "./Pages/Judges.jsx";
import SpecificBlog from "./Pages/SpecificBlog.jsx";
import SpecificPortfolioProject from "./Pages/SpecificPortfolioProject.jsx";
import SearchProfile from "./Pages/SearchProfile.jsx";
import SpecificProject from "./Pages/SpecificProject.jsx";
import Message from "./Pages/Message.jsx";
import Admin from "./Pages/Admin.jsx";
import Dashboard from "./Admin/Dashboard.jsx";
import Users from "./Admin/Users.jsx";
import Hackathons from "./Admin/Hackathons.jsx";
import Setting from "./Admin/Setting.jsx";
import AdminOverview from "./Admin/AdminOverview.jsx";
import AdminProject from "./Admin/AdminProject.jsx";
import AdminRules from "./Admin/AdminRules.jsx";
import AdminPrizes from "./Admin/AdminPrizes.jsx";
import AdminJudges from "./Admin/AdminJudges.jsx";
import AdminSpecificProject from "./Admin/AdminSpecificProject.jsx";
import ProtectedRoute from "./AuthLayout/ProtectedRoute.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Auth routes (public) */}
      <Route element={<AuthLayout />}>
        <Route path="api/auth/signin" element={<Signin />} />
        <Route path="api/auth/signup" element={<Signup />} />
        <Route path="api/auth/forgotpassword" element={<ForgotPassword />} />
        <Route
          path="api/auth/resetpassword/:token"
          element={<ResetPassword />}
        />
      </Route>

      {/* Admin routes (protected) */}
      <Route
        path="/menu"
        element={
          <ProtectedRoute requiredRole="admin">
            <Admin />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="dashboard" />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="users" element={<Users />} />
        <Route path="hackathons" element={<Hackathons />} />
        <Route path="setting" element={<Setting />} />
        <Route path=":id/admin/overview" element={<AdminOverview />} />
        <Route path=":id/admin/myproject" element={<AdminProject />} />
        <Route path="project/:id" element={<AdminSpecificProject />} />
        <Route path=":id/admin/rules" element={<AdminRules />} />
        <Route path=":id/admin/prizes" element={<AdminPrizes />} />
        <Route path=":id/admin/judges" element={<AdminJudges />} />
      </Route>

      {/* App routes (some protected, some public) */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <App />
          </ProtectedRoute>
        }
      >
        <Route index element={<Home />} />

        {/* protected user routes */}
        <Route
          path="myjoinedhackathon"
          element={
            <ProtectedRoute>
              <MyJoinedHackathon />
            </ProtectedRoute>
          }
        />
        <Route
          path="myhostedhackathon"
          element={
            <ProtectedRoute>
              <MyHostedHackathon />
            </ProtectedRoute>
          }
        />
        <Route
          path="myjudgedhackathon"
          element={
            <ProtectedRoute>
              <MyJudgedHackathon />
            </ProtectedRoute>
          }
        />
        <Route
          path="profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        >
          <Route path="portfolio" />
        </Route>

        {/* public routes */}
        <Route path="join/hackathon" element={<JoinHackathon />} />
        <Route path="hackathon" element={<HostHackathon />} />
        <Route path=":id/overview" element={<Overview />} />
        <Route path=":id/myproject" element={<Project />} />
        <Route path="project/:id" element={<SpecificProject />} />
        <Route path=":id/rules" element={<Rules />} />
        <Route path=":id/prizes" element={<Prizes />} />
        <Route path=":id/judges" element={<Judges />} />
        <Route path="host/hackathon" element={<Hosting />} />
        <Route path="profile/:id" element={<SpecificPortfolioProject />} />
        <Route path="/:id/profile" element={<SearchProfile />} />
        <Route path="blog" element={<BlogPage />} />
        <Route path="blog/:id" element={<SpecificBlog />} />
        <Route path="about" element={<About />} />
        <Route path="message" element={<Message />} />
        <Route path="contact" element={<Contact />} />
      </Route>
    </>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
