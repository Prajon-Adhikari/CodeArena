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
        <Route path="myjoinedhackathon" element={<MyJoinedHackathon />} />
        <Route path="myhostedhackathon" element={<MyHostedHackathon />} />
        <Route path="myjudgedhackathon" element={<MyJudgedHackathon/>} />
        <Route path=":id/overview" element={<Overview />} />
        <Route path=":id/myproject" element={<Project />} />
        <Route path="project/:id" element={<SpecificProject />} />
        <Route path=":id/rules" element={<Rules />} />
        <Route path=":id/prizes" element={<Prizes />} />
        <Route path=":id/judges" element={<Judges />} />
        <Route path="host/hackathon" element={<Hosting />} />
        <Route path="profile" element={<Profile />}>
          <Route path="portfolio" /> {/* nested, no element */}
        </Route>
        <Route path="profile/:id" element={<SpecificPortfolioProject />} />
        <Route path="/:id/profile" element={<SearchProfile />} />
        <Route path="blog" element={<BlogPage />} />
        <Route path="blog/:id" element={<SpecificBlog />} />
        <Route path="about" element={<About />} />
        <Route path="message" element={<Message/>}/>
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
