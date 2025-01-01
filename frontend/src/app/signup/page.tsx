"use client";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";

const Signup: React.FC = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // TODO: Implement signup logic here (e.g., API call)
    console.log("Signup submitted with:", { email, username, password });
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col justify-center items-center py-12">
      <Head>
        <title>Sign Up - Expense Manager</title>
        <meta
          name="description"
          content="Create a new account on Expense Manager."
        />
      </Head>
      <div className="bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          Sign Up
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-gray-300 text-sm font-medium mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="bg-gray-700 text-gray-100 rounded-md border border-gray-600 px-4 py-2 w-full focus:outline-none focus:border-indigo-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label
              htmlFor="username"
              className="block text-gray-300 text-sm font-medium mb-1"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              className="bg-gray-700 text-gray-100 rounded-md border border-gray-600 px-4 py-2 w-full focus:outline-none focus:border-indigo-500"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
            Sign Up
          </button>
          <div className="mt-4 text-center">
            <p className="text-gray-400">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-indigo-500 hover:text-indigo-400"
              >
                Log In
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
