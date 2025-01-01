"use client";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";

const Login: React.FC = () => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // TODO: Implement login logic here (e.g., API call)
    console.log("Login submitted with:", { identifier, password });
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col justify-center items-center py-12">
      <Head>
        <title>Login - Expense Manager</title>
        <meta
          name="description"
          content="Login to your Expense Manager account."
        />
      </Head>

      <div className="bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          Login
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <div>
            <label
              htmlFor="identifier"
              className="block text-gray-300 text-sm font-medium mb-1"
            >
              Email or Username
            </label>
            <input
              type="text"
              id="identifier"
              className="bg-gray-700 text-gray-100 rounded-md border border-gray-600 px-4 py-2 w-full focus:outline-none focus:border-indigo-500"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-gray-300 text-sm font-medium mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="bg-gray-700 text-gray-100 rounded-md border border-gray-600 px-4 py-2 w-full focus:outline-none focus:border-indigo-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
          >
            Log In
          </button>
          <div className="mt-4 text-center">
            <p className="text-gray-400">
              Don't have an account?{" "}
              <Link
                href="/signup"
                className="text-indigo-500 hover:text-indigo-400"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
