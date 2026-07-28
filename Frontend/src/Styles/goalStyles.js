const styles = {
  /* ===========================
      Toolbar
  ============================ */

  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
    flexWrap: "wrap",
    gap: 20,
  },

  toolbarLeft: {
    display: "flex",
    alignItems: "center",
    gap: 15,
  },

  toolbarIcon: {
    width: 52,
    height: 52,
    borderRadius: 12,
    backgroundColor: "#eef2ff",
    color: "#4f46e5",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  pageTitle: {
    margin: 0,
    fontSize: 28,
    fontWeight: 700,
    color: "#111827",
  },

  pageSubtitle: {
    marginTop: 5,
    color: "#6b7280",
    fontSize: 14,
  },

  addButton: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#4f46e5",
    color: "#fff",
    border: "none",
    borderRadius: 10,
    padding: "12px 20px",
    cursor: "pointer",
    fontWeight: 600,
    fontSize: 14,
  },

  /* ===========================
      Stats
  ============================ */

  statsContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px,1fr))",
    gap: 18,
    marginBottom: 30,
  },

  statCard: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 20,
    display: "flex",
    alignItems: "center",
    gap: 18,
    boxShadow: "0 2px 10px rgba(0,0,0,.05)",
  },

  statIcon: {
    width: 50,
    height: 50,
    borderRadius: "50%",
    backgroundColor: "#f3f4f6",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 24,
  },

  statContent: {
    display: "flex",
    flexDirection: "column",
  },

  statTitle: {
    margin: 0,
    color: "#6b7280",
    fontSize: 13,
  },

  statValue: {
    margin: "5px 0 0",
    fontSize: 24,
    color: "#111827",
    fontWeight: 700,
  },

  /* ===========================
      Empty State
  ============================ */

  emptyContainer: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 60,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    boxShadow: "0 2px 10px rgba(0,0,0,.05)",
  },

  emptyIcon: {
    width: 90,
    height: 90,
    borderRadius: "50%",
    backgroundColor: "#eef2ff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#4f46e5",
    marginBottom: 20,
  },

  emptyTitle: {
    margin: 0,
    fontSize: 24,
    color: "#111827",
    fontWeight: 700,
  },

  emptyText: {
    marginTop: 12,
    color: "#6b7280",
    maxWidth: 450,
    lineHeight: 1.6,
    marginBottom: 25,
  },
    /* ===========================
      Goal Card
  ============================ */

  goalCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    overflow: "hidden",
    boxShadow: "0 2px 10px rgba(0,0,0,.05)",
    border: "1px solid #e5e7eb",
  },

  goalTopBar: {
    height: 5,
    backgroundColor: "#4f46e5",
  },

  goalBody: {
    padding: 20,
  },

  goalHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 15,
    marginBottom: 20,
  },

  goalTitle: {
    margin: 0,
    fontSize: 18,
    fontWeight: 700,
    color: "#111827",
  },

  goalDescription: {
    marginTop: 6,
    fontSize: 13,
    color: "#6b7280",
    lineHeight: 1.5,
  },

  statusBadge: {
    padding: "6px 12px",
    borderRadius: 30,
    fontSize: 12,
    fontWeight: 600,
    whiteSpace: "nowrap",
  },

  amountRow: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 18,
  },

  amountLabel: {
    display: "block",
    color: "#9ca3af",
    marginBottom: 5,
    fontSize: 12,
    fontWeight: 600,
  },

  savedAmount: {
    fontSize: 18,
    fontWeight: 700,
    color: "#16a34a",
  },

  targetAmount: {
    fontSize: 18,
    fontWeight: 700,
    color: "#111827",
  },

  progressRow: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 8,
    fontSize: 13,
  },

  remainingText: {
    color: "#6b7280",
  },

  progressPercent: {
    color: "#4f46e5",
    fontWeight: 700,
  },

  progressTrack: {
    width: "100%",
    height: 8,
    backgroundColor: "#e5e7eb",
    borderRadius: 20,
    overflow: "hidden",
    marginBottom: 20,
  },

  progressFill: {
    height: "100%",
    backgroundColor: "#4f46e5",
    borderRadius: 20,
  },

  footer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
    flexWrap: "wrap",
    gap: 10,
  },

  date: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    color: "#6b7280",
    fontSize: 13,
  },

  actions: {
    display: "flex",
    gap: 10,
  },

  editButton: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    padding: "8px 14px",
    backgroundColor: "#eef2ff",
    color: "#4f46e5",
    border: "none",
    borderRadius: 8,
    cursor: "pointer",
    fontWeight: 600,
  },

  deleteButton: {
    width: 38,
    height: 38,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fee2e2",
    color: "#dc2626",
    border: "none",
    borderRadius: 8,
    cursor: "pointer",
  },
    /* ===========================
      Modal
  ============================ */

  modalOverlay: {
    position: "fixed",
    inset: 0,
    backgroundColor: "rgba(0,0,0,.45)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
    padding: 20,
  },

  modal: {
    width: "100%",
    maxWidth: 520,
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 28,
    boxSizing: "border-box",
  },

  modalTitle: {
    marginTop: 0,
    marginBottom: 24,
    fontSize: 24,
    fontWeight: 700,
    color: "#111827",
  },

  formGroup: {
    display: "flex",
    flexDirection: "column",
    marginBottom: 18,
  },

  formRow: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 16,
  },

  input: {
    marginTop: 8,
    padding: "12px 14px",
    border: "1px solid #d1d5db",
    borderRadius: 10,
    fontSize: 14,
    outline: "none",
    boxSizing: "border-box",
  },

  textarea: {
    marginTop: 8,
    padding: "12px 14px",
    border: "1px solid #d1d5db",
    borderRadius: 10,
    fontSize: 14,
    resize: "vertical",
    outline: "none",
    boxSizing: "border-box",
    fontFamily: "inherit",
  },

  modalActions: {
    display: "flex",
    justifyContent: "flex-end",
    gap: 12,
    marginTop: 28,
  },

  cancelButton: {
    padding: "10px 20px",
    borderRadius: 10,
    border: "1px solid #d1d5db",
    backgroundColor: "#fff",
    cursor: "pointer",
    fontWeight: 600,
  },

  saveButton: {
    padding: "10px 20px",
    borderRadius: 10,
    border: "none",
    backgroundColor: "#4f46e5",
    color: "#fff",
    cursor: "pointer",
    fontWeight: 600,
  },
};

export default styles;