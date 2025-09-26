import React from "react";
import { LockKeyhole } from "lucide-react";
import { Link } from "react-router-dom";

export default function ForbiddenPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-10 rounded-2xl shadow-lg text-center max-w-lg w-full">
        <div className="flex justify-center mb-6">
          <div className="bg-red-100 p-4 rounded-full">
            <LockKeyhole className="w-12 h-12 text-red-600" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">403 Forbidden</h1>
        <p className="text-gray-600 mb-6">
          Sorry, you don’t have permission to access this page.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            to="/"
            className="px-5 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
          >
            Go Home
          </Link>
          <Link
            to="/api/auth/signin"
            className="px-5 py-2 border border-gray-300 rounded-lg shadow hover:bg-gray-100 transition"
          >
            Sign In with Another Account
          </Link>
        </div>
      </div>
    </div>
  );
}
