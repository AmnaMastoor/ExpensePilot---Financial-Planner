import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import dashboardStyles from "../../Styles/dashboardStyles";

import Sidebar from "../../Components/Layout/Sidebar";
import Navbar from "../../Components/Layout/Navbar";

import api from "../../services/api";

import styles from "../../Styles/budgetStyles";

import MonthlyBudgetCard from "../../Components/Budget/MonthlyBudgetCard";
import CategoryBudgetCard from "../../Components/Budget/CategoryBudgetCard";
import CategoryBudgetModal from "../../Components/Budget/CategoryBudgetModal";
import EditMonthlyBudgetModal from "../../Components/Budget/EditMonthlyBudgetModal";
import { PlusIcon, PlusIconMuted } from "../../Components/Budget/icons";

const EMPTY_FORM = () => ({
  categoryId: "",
  budgetAmount: "",
});

export default function Budget() {
  const navigate = useNavigate();

  const [budgets, setBudgets] = useState([]);
  const [categories, setCategories] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  const [monthlyLimit, setMonthlyLimit] = useState(0);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM());

  const [editMonthlyOpen, setEditMonthlyOpen] = useState(false);
  const [monthlyLimitInput, setMonthlyLimitInput] = useState(
    String(monthlyLimit || "")
  );

  // ===========================
  // LOAD DATA
  // ===========================

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      await Promise.all([
        getBudgets(),
        getCategories(),
        getTransactions(),
        getMonthlyLimit(),
      ]);
    } catch (error) {
      console.log(
        "Loading Error:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  // ===========================
  // LOGOUT
  // ===========================

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // ===========================
  // GET BUDGETS
  // ===========================

  const getBudgets = async () => {
    try {
      const response = await api.get("/Budget");
      setBudgets(response.data);
    } catch (error) {
      console.log(
        "Budget Loading Error:",
        error.response?.data || error.message
      );
    }
  };

  // ===========================
  // GET CATEGORIES
  // ===========================

  const getCategories = async () => {
    try {
      const response = await api.get("/Category");
      setCategories(response.data);
    } catch (error) {
      console.log(
        "Category Loading Error:",
        error.response?.data || error.message
      );
    }
  };

  // ===========================
  // GET TRANSACTIONS (needed to compute spent per category)
  // ===========================

  const getTransactions = async () => {
    try {
      const response = await api.get("/Transaction");
      setTransactions(response.data);
    } catch (error) {
      console.log(
        "Transaction Loading Error:",
        error.response?.data || error.message
      );
    }
  };

  const getMonthlyLimit = async () => {
     console.log("getMonthlyLimit called");
    try {
      const response = await api.get("/Budget/monthly-limit");
    console.log("Monthly Limit:", response.data);

      setMonthlyLimit(response.data);
    } catch (error) {
      console.log(
        "Monthly Budget Error:",
        error.response?.data || error.message
      );
    }
  };

  // ===========================
  // BUILD CATEGORY BUDGET LIST (with spent + name)
  // ===========================

  const categoryBudgets = useMemo(() => {
    const now = new Date();

    return budgets.map((budget) => {
      const category = categories.find(
        (c) => c.categoryId === budget.categoryId
      );

      const spent = transactions
        .filter((t) => {
          const date = new Date(t.transactionDate);

          return (
            t.categoryId === budget.categoryId &&
            t.type === 1 &&
            date.getMonth() === now.getMonth() &&
            date.getFullYear() === now.getFullYear()
          );
        })
        .reduce((sum, t) => sum + Number(t.amount), 0);

      return {
        ...budget,
        categoryName: category?.name || "Uncategorized",
        spent,
      };
    });
  }, [budgets, categories, transactions]);

  const totalSpent = useMemo(
    () =>
      categoryBudgets.reduce(
        (sum, b) => sum + b.spent,
        0
      ),
    [categoryBudgets]
  );

  // ===========================
  // ADD / EDIT MODAL
  // ===========================

  const openAddModal = () => {
    setEditingId(null);
    setForm(EMPTY_FORM());
    setModalOpen(true);
  };

  const openEditModal = (budget) => {
    setEditingId(budget.budgetId);

    setForm({
      categoryId: String(budget.categoryId),
      budgetAmount: String(budget.budgetAmount),
    });

    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingId(null);
    setForm(EMPTY_FORM());
  };

  // ===========================
  // SUBMIT CATEGORY BUDGET
  // ===========================

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!form.categoryId) {
        alert("Category is required.");
        return;
      }

      if (!form.budgetAmount || Number(form.budgetAmount) <= 0) {
        alert("Monthly limit must be greater than zero.");
        return;
      }

      const now = new Date();

      const startDate = new Date(
        now.getFullYear(),
        now.getMonth(),
        1
      );

      const endDate = new Date(
        now.getFullYear(),
        now.getMonth() + 1,
        0
      );

      const dto = {
        categoryId: Number(form.categoryId),
        budgetAmount: Number(form.budgetAmount),
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
      };

      if (editingId) {
        await api.put(`/Budget/${editingId}`, dto);
      } else {
        await api.post("/Budget", dto);
      }

      await getBudgets();
      closeModal();
    } catch (error) {
      console.log(
        "Budget Save Error:",
        error.response?.data || error.message
      );

      alert(
        error.response?.data ||
        "Something went wrong while saving the budget."
      );
    }
  };

  // ===========================
  // DELETE
  // ===========================

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this budget?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await api.delete(`/Budget/${id}`);
      await getBudgets();
    } catch (error) {
      console.log(
        "Delete Error:",
        error.response?.data || error.message
      );
    }
  };

  // ===========================
  // MONTHLY (OVERALL) BUDGET
  // ===========================

  const openEditMonthly = () => {
    setMonthlyLimitInput(String(monthlyLimit || ""));
    setEditMonthlyOpen(true);
  };

  const closeEditMonthly = () => {
    setEditMonthlyOpen(false);
  };

  const handleMonthlySubmit = async (e) => {
    e.preventDefault();

    const value = Number(monthlyLimitInput);

    if (value <= 0) {
      alert("Total monthly budget must be greater than zero.");
      return;
    }

    try {
      await api.put("/Budget/monthly-limit", {
        limit: value
      });

      setMonthlyLimit(value);

      setEditMonthlyOpen(false);
    } catch (error) {
      console.log(
        error.response?.data || error.message
      );

      alert("Unable to update monthly budget.");
    }
  };

  // ===========================
  // LOADING
  // ===========================

  if (loading) {
    return <h2>Loading...</h2>;
  }

  // ===========================
  // UI
  // ===========================

  return (
    <div style={dashboardStyles.page}>
      <Sidebar logout={logout} />

      <div style={dashboardStyles.main}>
        <Navbar />

        <div style={dashboardStyles.content}>
          <div style={styles.headerRow}>
            <div>
              <h1 style={styles.title}>Budget</h1>

              <p style={styles.subtitle}>
                Set spending limits and track how you're doing.
              </p>
            </div>

            <button
              type="button"
              style={styles.addButton}
              onClick={openAddModal}
            >
              <PlusIcon />
              Add Category Budget
            </button>
          </div>

          <MonthlyBudgetCard
            spent={totalSpent}
            total={monthlyLimit}
            onEdit={openEditMonthly}
          />

          <h2 style={styles.sectionTitle}>
            Category Budgets
          </h2>

          <div style={styles.grid}>
            {categoryBudgets.map((budget) => (
              <CategoryBudgetCard
                key={budget.budgetId}
                budget={budget}
                onEdit={openEditModal}
                onDelete={handleDelete}
              />
            ))}

            <button
              type="button"
              style={styles.addCard}
              onClick={openAddModal}
            >
              <PlusIconMuted />
              Add Category Budget
            </button>
          </div>

          <CategoryBudgetModal
            open={modalOpen}
            onClose={closeModal}
            editingId={editingId}
            form={form}
            setForm={setForm}
            onSubmit={handleSubmit}
            categories={categories}
          />

          <EditMonthlyBudgetModal
            open={editMonthlyOpen}
            onClose={closeEditMonthly}
            value={monthlyLimitInput}
            setValue={setMonthlyLimitInput}
            onSubmit={handleMonthlySubmit}
          />
        </div>
      </div>
    </div>
  );
}