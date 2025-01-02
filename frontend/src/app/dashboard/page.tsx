"use client";
import Head from "next/head";
import { useEffect, useState } from "react";

// Type definition for a transaction (expense or income)
interface Transaction {
  id: number;
  date: string; // Date in ISO format (e.g., "2024-02-05")
  description?: string; // Description is optional
  amount: number;
  category: string;
  type: "expense" | "income"; // 'expense' or 'income'
}

const Dashboard: React.FC = () => {
  // Mock static transaction data (expenses and income)
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: 1,
      date: "2024-02-05",
      description: "Groceries",
      amount: 55.25,
      category: "Food",
      type: "expense",
    },
    {
      id: 2,
      date: "2024-02-10",
      description: "Electricity Bill",
      amount: 75.0,
      category: "Utilities",
      type: "expense",
    },
    {
      id: 3,
      date: "2024-02-15",
      description: "Dinner",
      amount: 30.5,
      category: "Food",
      type: "expense",
    },
    {
      id: 4,
      date: "2024-02-20",
      description: "Fuel",
      amount: 40.0,
      category: "Transportation",
      type: "expense",
    },
    {
      id: 5,
      date: "2024-02-12",
      description: "Salary",
      amount: 1500.0,
      category: "Salary",
      type: "income",
    },
    {
      id: 6,
      date: "2024-02-18",
      description: "Freelance Work",
      amount: 200.0,
      category: "Freelance",
      type: "income",
    },
    {
      id: 7,
      date: "2024-02-25",
      amount: 100,
      category: "Other",
      type: "expense",
    }, // Example with optional description
  ]);

  // State for total income
  const [totalIncome, setTotalIncome] = useState<number>(0);

  // State for total expense
  const [totalExpense, setTotalExpense] = useState<number>(0);

  // State for new transaction form
  const [newTransaction, setNewTransaction] = useState<Omit<Transaction, "id">>(
    {
      date: new Date().toISOString().split("T")[0],
      amount: 0,
      category: "",
      type: "expense", // Default to expense
    }
  );

  useEffect(() => {
    // Function to calculate total income
    setTotalIncome(
      transactions
        .filter((transaction) => transaction.type === "income")
        .reduce((sum, transaction) => sum + transaction.amount, 0)
    );

    // Function to calculate total expense
    setTotalExpense(
      transactions
        .filter((transaction) => transaction.type === "expense")
        .reduce((sum, transaction) => sum + transaction.amount, 0)
    );
    console.log(
      "Transactions Updated:",
      transactions,
      totalIncome,
      totalExpense
    );
  }, [transactions]);

  useEffect(() => {
    console.log("New Transaction Updated:", newTransaction);
  }, [newTransaction]);

  // Function to add a new transaction (expense or income)
  const handleAddTransaction = (event: React.FormEvent) => {
    event.preventDefault();
    const newId =
      transactions.length > 0
        ? Math.max(...transactions.map((tran) => tran.id)) + 1
        : 1;

    setTransactions([...transactions, { id: newId, ...newTransaction }]);

    console.log("New Transaction Added:", newTransaction);
    //Reset Form
    setNewTransaction({
      date: new Date().toISOString().split("T")[0],
      amount: 0,
      category: "",
      type: "expense",
    });
  };

  // Function to delete a transaction by ID
  const handleDeleteTransaction = (id: number) => {
    setTransactions(
      transactions.filter((transaction) => transaction.id !== id)
    );
  };

  // Function to handle changes in new transaction form
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    setNewTransaction((prevTransaction) => {
      const updatedTransaction = {
        ...prevTransaction,
        [name]:
          name === "amount"
            ? value === null ||
              undefined ||
              value === "" ||
              isNaN(parseFloat(value))
              ? 0
              : parseFloat(value)
            : value,
      };
      if (name === "description" && value === "") {
        delete updatedTransaction.description; // Delete when empty for optional
      }
      return updatedTransaction as Omit<Transaction, "id">;
    });
  };

  // Function to get current month name
  const getCurrentMonthName = (): string => {
    const currentDate = new Date();
    return currentDate.toLocaleString("default", { month: "long" });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 py-8">
      <Head>
        <title>Dashboard - Expense Manager</title>
        <meta
          name="description"
          content="Track and manage your expenses and income."
        />
      </Head>

      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6 text-center md:text-left">
          Dashboard
        </h1>

        {/* Summary Section */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4">
            Transactions for {getCurrentMonthName()}
          </h2>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div className="mb-2 md:mb-0">
              <p className="text-gray-300 text-lg">
                Total Income:
                <span className="text-green-400 font-bold ml-1">
                  ${totalIncome.toFixed(2)}
                </span>
              </p>
              <p className="text-gray-300 text-lg">
                Total Expenses:
                <span className="text-red-400 font-bold ml-1">
                  ${totalExpense}
                </span>
              </p>
              <p className="text-gray-300 text-lg">
                Net Income:
                <span
                  className={`${
                    totalIncome - totalExpense >= 0
                      ? "text-green-400"
                      : "text-red-400"
                  } font-bold ml-1`}
                >
                  ${(totalIncome - totalExpense).toFixed(2)}
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Transaction List */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4">All Transactions</h2>
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr className="text-gray-300 border-b border-gray-700">
                  <th className="py-2 text-left">Date</th>
                  <th className="py-2 text-left">Description</th>
                  <th className="py-2 text-left">Amount</th>
                  <th className="py-2 text-left">Category</th>
                  <th className="py-2 text-left">Type</th>
                  <th className="py-2 text-left"></th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction) => (
                  <tr
                    key={transaction.id}
                    className="border-b border-gray-700 last:border-b-0"
                  >
                    <td className="py-2">{transaction.date}</td>
                    <td className="py-2">{transaction.description || "—"}</td>
                    <td className="py-2">${transaction.amount}</td>
                    <td className="py-2">{transaction.category}</td>
                    <td className="py-2">
                      <span
                        className={
                          transaction.type === "income"
                            ? "text-green-400"
                            : "text-red-400"
                        }
                      >
                        {transaction.type}
                      </span>
                    </td>
                    <td className="py-2">
                      <button
                        className="text-red-600 hover:underline ml-2"
                        onClick={() => handleDeleteTransaction(transaction.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add Transaction Form */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4">Add New Transaction</h2>
          <form
            onSubmit={handleAddTransaction}
            className="flex flex-col space-y-4"
          >
            <div>
              <label
                htmlFor="date"
                className="block text-gray-300 text-sm font-medium mb-1"
              >
                Date
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={newTransaction.date}
                onChange={handleInputChange}
                className="bg-gray-700 text-gray-100 rounded-md border border-gray-600 px-4 py-2 w-full focus:outline-none focus:border-indigo-500"
                required
              />
            </div>
            <div>
              <label
                htmlFor="description"
                className="block text-gray-300 text-sm font-medium mb-1"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={newTransaction.description || ""}
                onChange={handleInputChange}
                className="bg-gray-700 text-gray-100 rounded-md border border-gray-600 px-4 py-2 w-full focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label
                htmlFor="amount"
                className="block text-gray-300 text-sm font-medium mb-1"
              >
                Amount
              </label>
              <input
                type="number"
                id="amount"
                name="amount"
                value={newTransaction.amount}
                onChange={handleInputChange}
                className="bg-gray-700 text-gray-100 rounded-md border border-gray-600 px-4 py-2 w-full focus:outline-none focus:border-indigo-500"
                required
              />
            </div>
            <div>
              <label
                htmlFor="category"
                className="block text-gray-300 text-sm font-medium mb-1"
              >
                Category
              </label>
              <select
                id="category"
                name="category"
                value={newTransaction.category}
                onChange={handleInputChange}
                className="bg-gray-700 text-gray-100 rounded-md border border-gray-600 px-4 py-2 w-full focus:outline-none focus:border-indigo-500"
                required
              >
                <option value="">Select a category</option>
                <option value="Food">Food</option>
                <option value="Utilities">Utilities</option>
                <option value="Transportation">Transportation</option>
                <option value="Salary">Salary</option>
                <option value="Freelance">Freelance</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="type"
                className="block text-gray-300 text-sm font-medium mb-1"
              >
                Type
              </label>
              <select
                id="type"
                name="type"
                value={newTransaction.type}
                onChange={handleInputChange}
                className="bg-gray-700 text-gray-100 rounded-md border border-gray-600 px-4 py-2 w-full focus:outline-none focus:border-indigo-500"
                required
              >
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </select>
            </div>
            <button
              type="submit"
              className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
            >
              Add Transaction
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
