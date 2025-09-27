import React from "react";
import { Link } from "react-router-dom";
import pageNotFound from "../assets/pageNotFound.png";

export default function PageNotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center bg-gray-50 ">
      <img src={pageNotFound} alt="" className="w-[400px]"/>
      <h2 className=" font-semibold text-4xl mb-4">
        Page Not Found
      </h2>
      <p className="text-gray-600 dark:text-gray-600 mb-6">
        Sorry, the page you are looking for does not exist.
      </p>
      <Link
        to="/"
        className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
      >
        Go to Homepage
      </Link>
    </div>
  );
}
