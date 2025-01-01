import Head from "next/head";
import Link from "next/link";
import { Fragment } from "react";

const Home: React.FC = () => {
  return (
    <Fragment>
      <Head>
        <title>Expense Manager - Track Your Spending</title>
        <meta
          name="description"
          content="Effortlessly manage your expenses with our simple and intuitive expense tracker."
        />
      </Head>

      <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col">
        {/* Navigation Bar */}
        <nav className="bg-gray-800 py-4">
          <div className="container mx-auto flex justify-between items-center px-4">
            <Link href="/" className="text-white text-xl font-bold">
              Expense Manager
            </Link>
            <div>
              <Link
                href="/login"
                className="text-gray-300 hover:text-gray-100 mr-4"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-500"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <main className="container mx-auto flex-grow flex items-center justify-center px-4">
          <div className="text-center md:text-left md:w-2/3">
            <h1 className="text-4xl font-bold mb-4">
              Take Control of Your Finances
            </h1>
            <p className="text-lg text-gray-300 mb-8">
              Our expense manager helps you track your spending, stay within
              budget, and save money. Start today
            </p>
            <div className="flex flex-col sm:flex-row justify-center md:justify-start">
              <Link
                href="/signup"
                className="bg-indigo-600 text-white py-3 px-6 rounded-md hover:bg-indigo-700 mb-4 sm:mb-0 sm:mr-4"
              >
                Get Started Free
              </Link>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-gray-800 text-gray-400 py-4 text-center">
          <div className="container mx-auto">
            <p>
              © {new Date().getFullYear()} Expense Manager. All Rights Reserved.
            </p>
          </div>
        </footer>
      </div>
    </Fragment>
  );
};

export default Home;
