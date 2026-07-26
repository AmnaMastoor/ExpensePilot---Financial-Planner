import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import dashboardStyles from "../../styles/dashboardStyles";

import Sidebar from "../../Components/Layout/Sidebar";
import Navbar from "../../Components/Layout/Navbar";

import api from "../../services/api";

import styles from "../../styles/transactionStyles";

import TransactionToolbar from "../../Components/Transaction/TransactionToolbar";
import TransactionTable from "../../Components/Transaction/TransactionTable";
import TransactionModal from "../../Components/Transaction/TransactionModal";


const EMPTY_FORM = () => ({
  title: "",
  amount: "",
  type: "Expense",
  categoryId: "",
  date: "",
  description: "",
});


export default function Transaction() {

  const navigate = useNavigate();


  const [transactions, setTransactions] = useState([]);

  const [categories, setCategories] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [typeFilter, setTypeFilter] =
    useState("All Types");

  const [categoryFilter, setCategoryFilter] =
    useState("All Categories");

  const [modalOpen, setModalOpen] =
    useState(false);

  const [editingId, setEditingId] =
    useState(null);

  const [form, setForm] =
    useState(EMPTY_FORM());


  // ===========================
  // LOAD DATA
  // ===========================

  useEffect(() => {

    loadData();

  }, []);


  const loadData = async () => {

    try {

      await Promise.all([
        getTransactions(),
        getCategories(),
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
  // GET TRANSACTIONS
  // ===========================

  const getTransactions = async () => {

    try {

      const response =
        await api.get("/Transaction");

      setTransactions(response.data);

    } catch (error) {

      console.log(
        "Transaction Loading Error:",
        error.response?.data || error.message
      );

    }

  };


  // ===========================
  // GET CATEGORIES
  // ===========================

  const getCategories = async () => {

    try {

      const response =
        await api.get("/Category");

      setCategories(response.data);

    } catch (error) {

      console.log(
        "Category Loading Error:",
        error.response?.data || error.message
      );

    }

  };


  // ===========================
  // FILTER
  // ===========================

  const filtered = useMemo(() => {

    return transactions.filter((transaction) => {


      const matchesSearch =
        transaction.title
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          );


      const matchesType =

        typeFilter === "All Types"

        ||

        (
          typeFilter === "Income" &&
          transaction.type === 0
        )

        ||

        (
          typeFilter === "Expense" &&
          transaction.type === 1
        );


      const matchesCategory =

        categoryFilter === "All Categories"

        ||

        transaction.categoryId ===
        Number(categoryFilter);


      return (

        matchesSearch &&
        matchesType &&
        matchesCategory

      );

    });

  }, [

    transactions,
    search,
    typeFilter,
    categoryFilter,

  ]);


  // ===========================
  // ADD MODAL
  // ===========================

  const openAddModal = () => {

    setEditingId(null);

    setForm(
      EMPTY_FORM()
    );

    setModalOpen(true);

  };


  // ===========================
  // EDIT MODAL
  // ===========================

  const openEditModal = (transaction) => {

    setEditingId(
      transaction.transactionId
    );


    setForm({

      title:
        transaction.title || "",


      amount:
        String(transaction.amount || ""),


      type:

        transaction.type === 0
          ? "Income"
          : "Expense",


      categoryId:

        transaction.categoryId
          ? String(transaction.categoryId)
          : "",


      date:

        transaction.transactionDate
          ? transaction.transactionDate
              .split("T")[0]
          : "",


      description:

        transaction.description || "",

    });


    setModalOpen(true);

  };


  // ===========================
  // CLOSE MODAL
  // ===========================

  const closeModal = () => {

    setModalOpen(false);

    setEditingId(null);

    setForm(
      EMPTY_FORM()
    );

  };


  // ===========================
  // SUBMIT
  // ===========================

  const handleSubmit = async (e) => {

    e.preventDefault();


    try {


      // ---------------------------
      // VALIDATION
      // ---------------------------

      if (!form.title.trim()) {

        alert("Title is required.");

        return;

      }


      if (!form.amount) {

        alert("Amount is required.");

        return;

      }


      if (!form.date) {

        alert("Date is required.");

        return;

      }


      // ---------------------------
      // DTO
      // ---------------------------

      const dto = {

        categoryId:

          form.categoryId
            ? Number(form.categoryId)
            : null,


        type:

          form.type === "Income"
            ? 0
            : 1,


        amount:

          Number(form.amount),


        transactionDate:

          `${form.date}T00:00:00`,


        title:

          form.title.trim(),


        description:

          form.description?.trim()
            ? form.description.trim()
            : null,

      };


      console.log(
        "DTO SENT TO BACKEND:",
        dto
      );


      // ---------------------------
      // UPDATE
      // ---------------------------

      if (editingId) {

        await api.put(

          `/Transaction/${editingId}`,

          dto

        );

      }


      // ---------------------------
      // CREATE
      // ---------------------------

      else {

        await api.post(

          "/Transaction",

          dto

        );

      }


      await getTransactions();

      closeModal();


    } catch (error) {

      console.log(
        "STATUS:",
        error.response?.status
      );


      console.log(
        "BACKEND ERROR:",
        error.response?.data
      );


      console.log(
        "SENT DATA:",
        error.config?.data
      );

    }

  };


  // ===========================
  // DELETE
  // ===========================

  const handleDelete = async (id) => {

    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete?"
      );


    if (!confirmDelete) {

      return;

    }


    try {

      await api.delete(
        `/Transaction/${id}`
      );


      await getTransactions();


    } catch (error) {

      console.log(
        "Delete Error:",
        error.response?.data || error.message
      );

    }

  };


  // ===========================
  // LOADING
  // ===========================

  if (loading) {

    return (

      <h2>
        Loading...
      </h2>

    );

  }


  // ===========================
  // UI
  // ===========================

  return (

    <div
      style={dashboardStyles.page}
    >

      <Sidebar
        logout={logout}
      />


      <div
        style={dashboardStyles.main}
      >

        <Navbar />


        <div
          style={dashboardStyles.content}
        >

          <div
            style={styles.container}
          >

            <h1
              style={styles.title}
            >
              Transactions
            </h1>


            <p
              style={styles.subtitle}
            >
              Manage your income and expenses
            </p>


            <TransactionToolbar

              search={search}

              setSearch={setSearch}

              typeFilter={typeFilter}

              setTypeFilter={setTypeFilter}

              categoryFilter={categoryFilter}

              setCategoryFilter={setCategoryFilter}

              onAdd={openAddModal}

              categories={categories}

            />


            <TransactionTable

              transactions={filtered}

              categories={categories}

              onEdit={openEditModal}

              onDelete={handleDelete}

            />


            <TransactionModal

              open={modalOpen}

              onClose={closeModal}

              editingId={editingId}

              form={form}

              setForm={setForm}

              onSubmit={handleSubmit}

              categories={categories}

            />

          </div>

        </div>

      </div>

    </div>

  );

}