import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../../services/api";
import styles from "../../Styles/adminStyles";

import AdminSidebar from "../../Components/Layout/AdminSidebar";
import Navbar from "../../Components/Layout/Navbar";

import {
  UsersIcon,
  LockIcon,
  UnlockIcon,
  TrashIcon,
  EditIcon,
  PlusIcon,
  TransactionIcon,
  TagIcon,
  XIcon,
} from "../../Components/Admin/icons";

function initials(name = "") {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join("");
}

export default function AdminOverview() {
  const navigate = useNavigate();

  const [dashboard, setDashboard] = useState(null);
  const [users, setUsers] = useState([]);
  const [categories, setCategories] = useState([]);

  const [loadingUsers, setLoadingUsers] = useState(true);
  const [loadingCategories, setLoadingCategories] = useState(true);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [form, setForm] = useState({ name: "", description: "", icon: "" });

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const loadDashboard = async () => {
    try {
      const res = await api.get("/Admin/dashboard");
      setDashboard(res.data);
    } catch (error) {
      console.log("Dashboard error:", error);
    }
  };

  const loadUsers = async () => {
    try {
      setLoadingUsers(true);
      const res = await api.get("/Admin/users");
      setUsers(res.data);
    } catch (error) {
      console.log("Users error:", error);
    } finally {
      setLoadingUsers(false);
    }
  };

  const loadCategories = async () => {
    try {
      setLoadingCategories(true);
      const res = await api.get("/AdminCategory");
      setCategories(res.data);
    } catch (error) {
      console.log("Categories error:", error);
    } finally {
      setLoadingCategories(false);
    }
  };

  useEffect(() => {
    loadDashboard();
    loadUsers();
    loadCategories();
  }, []);

  // ---------- Users actions ----------

  const toggleLock = async (user) => {
    try {
      if (user.isLocked) {
        await api.put(`/Admin/users/${user.id}/unlock`);
      } else {
        await api.put(`/Admin/users/${user.id}/lock`);
      }
      loadUsers();
      loadDashboard();
    } catch (error) {
      console.log("Toggle lock error:", error);
      alert(error?.response?.data?.message || "Action failed");
    }
  };

  const deleteUser = async (user) => {
    if (!window.confirm(`Delete ${user.fullName}? This cannot be undone.`)) return;

    try {
      await api.delete(`/Admin/users/${user.id}`);
      loadUsers();
      loadDashboard();
    } catch (error) {
      console.log("Delete user error:", error);
      alert(error?.response?.data?.message || "Action failed");
    }
  };

  // ---------- Category actions ----------

  const openAddModal = () => {
    setEditingCategory(null);
    setForm({ name: "", description: "", icon: "" });
    setModalOpen(true);
  };

  const openEditModal = (category) => {
    setEditingCategory(category);
    setForm({
      name: category.name || "",
      description: category.description || "",
      icon: category.icon || "",
    });
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

  const saveCategory = async () => {
    if (!form.name.trim()) {
      alert("Category name is required");
      return;
    }

    try {
      if (editingCategory) {
        await api.put(`/AdminCategory/${editingCategory.categoryId}`, form);
      } else {
        await api.post("/AdminCategory", form);
      }
      setModalOpen(false);
      loadCategories();
      loadDashboard();
    } catch (error) {
      console.log("Save category error:", error);
      alert(error?.response?.data?.message || "Action failed");
    }
  };

  const toggleCategoryActive = async (category) => {
    try {
      if (category.isActive) {
        await api.put(`/AdminCategory/${category.categoryId}/deactivate`);
      } else {
        await api.put(`/AdminCategory/${category.categoryId}/activate`);
      }
      loadCategories();
      loadDashboard();
    } catch (error) {
      console.log("Toggle category error:", error);
      alert(error?.response?.data?.message || "Action failed");
    }
  };

  return (
    <div style={styles.page}>
      <AdminSidebar logout={logout} />

      <div style={styles.main}>
        <Navbar />

        <div style={styles.content}>
          <h1 style={styles.pageTitle}>Admin overview</h1>
          <p style={styles.pageSubtitle}>Platform-wide stats across every user.</p>

          {/* Stat cards */}
          <div style={styles.statGrid}>
            <div style={styles.statCard}>
              <div>
                <div style={styles.statLabel}>Total users</div>
                <div style={styles.statValue}>{dashboard?.totalUsers ?? "—"}</div>
              </div>
              <div style={styles.statIconWrap("#eef2ff")}>
                <UsersIcon color="#4f46e5" />
              </div>
            </div>

            <div style={styles.statCard}>
              <div>
                <div style={styles.statLabel}>Locked users</div>
                <div style={styles.statValue}>{dashboard?.lockedUsers ?? "—"}</div>
              </div>
              <div style={styles.statIconWrap("#fee2e2")}>
                <LockIcon color="#ef4444" />
              </div>
            </div>

            <div style={styles.statCard}>
              <div>
                <div style={styles.statLabel}>Transactions</div>
                <div style={styles.statValue}>{dashboard?.totalTransactions ?? "—"}</div>
              </div>
              <div style={styles.statIconWrap("#e0f2fe")}>
                <TransactionIcon color="#0ea5e9" />
              </div>
            </div>

            <div style={styles.statCard}>
              <div>
                <div style={styles.statLabel}>Categories</div>
                <div style={styles.statValue}>{dashboard?.totalCategories ?? "—"}</div>
              </div>
              <div style={styles.statIconWrap("#f3e8ff")}>
                <TagIcon color="#a855f7" />
              </div>
            </div>
          </div>

          {/* Users table */}
          <h2 style={styles.sectionTitle}>Users</h2>

          <div style={styles.card}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>User</th>
                  <th style={styles.th}>Role</th>
                  <th style={styles.th}>Status</th>
                  <th style={styles.th}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {loadingUsers ? (
                  <tr>
                    <td style={styles.emptyText} colSpan={4}>Loading users...</td>
                  </tr>
                ) : users.length === 0 ? (
                  <tr>
                    <td style={styles.emptyText} colSpan={4}>No users found.</td>
                  </tr>
                ) : (
                  users.map((user) => (
                    <tr key={user.id}>
                      <td style={styles.td}>
                        <div style={styles.userCell}>
                          <div style={styles.avatarCircle}>{initials(user.fullName)}</div>
                          <div>
                            <div style={styles.userName}>{user.fullName}</div>
                            <div style={styles.userEmail}>{user.email}</div>
                          </div>
                        </div>
                      </td>
                      <td style={styles.td}>
                        <span
                          style={styles.badge(
                            user.role === "Admin" ? "#eef2ff" : "#f1f5f9",
                            user.role === "Admin" ? "#4f46e5" : "#475569"
                          )}
                        >
                          {user.role}
                        </span>
                      </td>
                      <td style={styles.td}>
                        <span
                          style={styles.badge(
                            user.isLocked ? "#fee2e2" : "#dcfce7",
                            user.isLocked ? "#ef4444" : "#16a34a"
                          )}
                        >
                          {user.isLocked ? "Locked" : "Active"}
                        </span>
                      </td>
                      <td style={styles.td}>
                        <div style={styles.actionsCell}>
                          <button
                            style={styles.iconBtn("#f1f5f9")}
                            title={user.isLocked ? "Unlock user" : "Lock user"}
                            onClick={() => toggleLock(user)}
                            disabled={user.role === "Admin"}
                          >
                            {user.isLocked ? (
                              <UnlockIcon color="#16a34a" />
                            ) : (
                              <LockIcon color="#64748b" />
                            )}
                          </button>
                          <button
                            style={styles.iconBtn("#fee2e2")}
                            title="Delete user"
                            onClick={() => deleteUser(user)}
                            disabled={user.role === "Admin"}
                          >
                            <TrashIcon color="#ef4444" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Categories table */}
          <div style={styles.sectionHeader}>
            <h2 style={{ ...styles.sectionTitle, margin: 0 }}>Default categories</h2>
            <button style={styles.primaryButton} onClick={openAddModal}>
              <PlusIcon color="#fff" size={16} />
              Add category
            </button>
          </div>

          <div style={{ ...styles.card, marginTop: 12 }}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Name</th>
                  <th style={styles.th}>Status</th>
                  <th style={styles.th}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {loadingCategories ? (
                  <tr>
                    <td style={styles.emptyText} colSpan={3}>Loading categories...</td>
                  </tr>
                ) : categories.length === 0 ? (
                  <tr>
                    <td style={styles.emptyText} colSpan={3}>No default categories yet.</td>
                  </tr>
                ) : (
                  categories.map((category) => (
                    <tr key={category.categoryId}>
                      <td style={styles.td}>
                        <div style={styles.userCell}>
                          <div style={styles.categoryIconWrap}>
                            <TagIcon color="#4f46e5" />
                          </div>
                          <span style={styles.userName}>{category.name}</span>
                        </div>
                      </td>
                      <td style={styles.td}>
                        <span
                          style={styles.badge(
                            category.isActive ? "#dcfce7" : "#f1f5f9",
                            category.isActive ? "#16a34a" : "#94a3b8"
                          )}
                        >
                          {category.isActive ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td style={styles.td}>
                        <div style={styles.actionsCell}>
                          <button
                            style={styles.iconBtn("#f1f5f9")}
                            title="Edit category"
                            onClick={() => openEditModal(category)}
                          >
                            <EditIcon color="#64748b" />
                          </button>
                          <button
                            style={styles.iconBtn("#f1f5f9")}
                            title={category.isActive ? "Deactivate" : "Activate"}
                            onClick={() => toggleCategoryActive(category)}
                          >
                            {category.isActive ? (
                              <LockIcon color="#64748b" />
                            ) : (
                              <UnlockIcon color="#16a34a" />
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {modalOpen && (
        <div style={styles.modalOverlay} onClick={closeModal}>
          <div style={styles.modalBox} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h3 style={styles.modalTitle}>
                {editingCategory ? "Edit category" : "Add category"}
              </h3>
              <button
                onClick={closeModal}
                style={{ background: "none", border: "none", cursor: "pointer" }}
              >
                <XIcon color="#64748b" />
              </button>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Name</label>
              <input
                style={styles.input}
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="e.g. Travel & Transport"
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Description</label>
              <input
                style={styles.input}
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="Short description"
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Icon</label>
              <input
                style={styles.input}
                value={form.icon}
                onChange={(e) => setForm({ ...form, icon: e.target.value })}
                placeholder="Icon name or emoji"
              />
            </div>

            <div style={styles.modalActions}>
              <button style={styles.secondaryButton} onClick={closeModal}>
                Cancel
              </button>
              <button style={styles.primaryButton} onClick={saveCategory}>
                {editingCategory ? "Save changes" : "Create category"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
