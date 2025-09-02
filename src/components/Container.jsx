import { useEffect, useState } from "react";
import BalanceContainer from "./BalanceContainer";
import History from "./History";
import ExpenseForm from "./ExpenseForm";
import { toast } from "react-toastify";

const INITIAL_EXPENSE = [
  { id: 1, title: "Salary", amount: 1000 },
  { id: 2, title: "Rent", amount: -200 },
];

const Container = () => {
  const [transactions, setTransactions] = useState(INITIAL_EXPENSE);
  const [editItem, setEditItem] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");

  const addExpense = async (title, amount) => {
    await fetch("https://expensetrackerbackend-1-xt9d.onrender.com/addExpense", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, amount })
    })
    getAllExpense()
  };

  useEffect(() => {
    getAllExpense()
  }, [])

  const getAllExpense = async () => {
    const response = await fetch("https://expensetrackerbackend-1-xt9d.onrender.com/getExpenses")
    const data = await response.json()
    setTransactions(data)
  }
  
  const deleteExpense = async (id) => {
  try {
    await fetch(`https://expensetrackerbackend-1-xt9d.onrender.com/deleteExpense/${id}`, {
      method: "DELETE"
    });
    getAllExpense();
  } catch (error) {
    toast.error("Error deleting expense");
  }
};

  const updateExpense = async (id, title, amount) => {
  let result = await fetch(`https://expensetrackerbackend-1-xt9d.onrender.com/updateExpense/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, amount })
  });
  toast.success("UPDATED SUCCESSFULLY");
  getAllExpense();
};


  const editExpense = (item) => {
    setEditItem(item);
  };

  const filteredTransactions = transactions.filter((txn) => {
    const matchesSearch = txn.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterType === "all"
        ? true
        : filterType === "income"
          ? txn.amount > 0
          : txn.amount < 0;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="container">
      <h2>Expense Tracker</h2>

      <div className="controls">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="all">All</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
      </div>

      <BalanceContainer transactions={transactions} />
      <History
        transactions={filteredTransactions}
        deleteExpense={deleteExpense}
        editExpense={editExpense}
      />
      <ExpenseForm
        addExpense={addExpense}
        editItem={editItem}
        updateExpense={updateExpense}
        setEditItem={setEditItem}
      />
    </div>
  );
};

export default Container;
