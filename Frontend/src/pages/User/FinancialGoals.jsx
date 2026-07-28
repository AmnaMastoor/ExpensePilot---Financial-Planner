import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../../services/api";
import styles from "../../styles/dashboardStyles";
import goalStyles from "../../styles/goalStyles";

import Sidebar from "../../Components/Layout/Sidebar";
import Navbar from "../../Components/Layout/Navbar";

import GoalToolbar from "../../Components/Goals/GoalToolbar";
import GoalStats from "../../Components/Goals/GoalStats";
import GoalCard from "../../Components/Goals/GoalCard";
import GoalModal from "../../Components/Goals/GoalModal";
import EmptyGoals from "../../Components/Goals/EmptyGoals";

export default function FinancialGoals() {
  const navigate = useNavigate();

  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingGoal, setEditingGoal] = useState(null);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {
    const loadGoals = async () => {
      // Check authentication first
      try {
        await api.get("/auth/profile");
      } catch (error) {
        console.log("Authentication failed", error);

        localStorage.removeItem("token");
        navigate("/login");
        return;
      }

      // Load goals
      try {
        const response = await api.get("/FinancialGoal");
        setGoals(response.data);
      } catch (error) {
        console.log("Error fetching goals", error);
      } finally {
        setLoading(false);
      }
    };

    loadGoals();
  }, [navigate]);

  const openAddModal = () => {
    setEditingGoal(null);
    setModalOpen(true);
  };

  const openEditModal = (goal) => {
    setEditingGoal(goal);
    setModalOpen(true);
  };

  const handleSave = async (goalData) => {
    try {
      if (editingGoal) {
        await api.put(
          `/FinancialGoal/${editingGoal.financialGoalId}`,
          goalData
        );
      } else {
        await api.post("/FinancialGoal", goalData);
      }

      const response = await api.get("/FinancialGoal");
      setGoals(response.data);

      setModalOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this goal?")) return;

    try {
      await api.delete(`/FinancialGoal/${id}`);

      const response = await api.get("/FinancialGoal");
      setGoals(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={styles.page}>
      <Sidebar logout={logout} />

      <div style={styles.main}>
        <Navbar />

        <div style={styles.content}>
          <GoalToolbar onAddGoal={openAddModal} />

          {loading ? (
            <p>Loading...</p>
          ) : (
            <>
              <GoalStats goals={goals} />

              {goals.length === 0 ? (
                <EmptyGoals onAddGoal={openAddModal} />
              ) : (
                <div style={goalStyles.goalGrid}>
                  {goals.map((goal) => (
                    <GoalCard
                      key={goal.financialGoalId}
                      goal={goal}
                      onEdit={openEditModal}
                      onDelete={handleDelete}
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <GoalModal
        isOpen={modalOpen}
        editingGoal={editingGoal}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
      />
    </div>
  );
}