"use client";
import Head from "next/head";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useState } from "react";

const Login: React.FC = () => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  const localStorage = window.localStorage;

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const res = await fetch("http://localhost:5500/api/auth/login", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ identifier, password }),
    });

    console.log(res);
    if (res.ok) {
      // Redirect to dashboard
      const data = await res.json();
      if (!(data.message === "Login successful") || !data.token) {
        console.log(data);
        alert("Login failed. Please try again.");
        return;
      }
      localStorage.clear();
      localStorage.setItem("user", JSON.stringify(data.username));
      localStorage.setItem("email", JSON.stringify(data.email));
      localStorage.setItem("token", data.token);

      redirect("/dashboard");
    } else {
      // Handle login error
      const data = await res.json();
      alert(data.message);
    }
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
