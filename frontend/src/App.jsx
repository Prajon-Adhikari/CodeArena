import React from "react";
import Navbar from "./Components/Navbar.jsx";
import { Outlet } from "react-router-dom";
import Footer from "./Components/Footer.jsx";
import ScrollToTop from "./Components/ScrollToTop.jsx";

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}
