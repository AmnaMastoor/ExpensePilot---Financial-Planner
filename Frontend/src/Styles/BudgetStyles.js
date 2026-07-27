const styles = {
  /* ===========================
     PAGE
  =========================== */

  headerRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "30px",
  },

  title: {
    margin: 0,
    fontSize: "34px",
    fontWeight: 700,
    color: "#0f172a",
  },

  subtitle: {
    marginTop: "8px",
    fontSize: "15px",
    color: "#64748b",
  },

  addButton: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    border: "none",
    cursor: "pointer",
    background: "#4f46e5",
    color: "#fff",
    padding: "12px 20px",
    borderRadius: "10px",
    fontWeight: 600,
    fontSize: "14px",
    whiteSpace: "nowrap",
  },

  /* ===========================
     MONTHLY BUDGET CARD
  =========================== */

  monthlyCard: {
    backgroundColor: "#ffffff",
    borderRadius: "14px",
    border: "1px solid #e2e8f0",
    boxShadow: "0 4px 12px rgba(15,23,42,0.05)",
    padding: "24px 28px",
    marginBottom: "28px",
  },

  monthlyTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },

  monthlyLabel: {
    margin: 0,
    fontSize: "14px",
    color: "#64748b",
    fontWeight: 500,
  },

  monthlyAmountRow: {
    display: "flex",
    alignItems: "baseline",
    gap: "6px",
    marginTop: "8px",
  },

  monthlySpent: {
    fontSize: "30px",
    fontWeight: 700,
    color: "#0f172a",
  },

  monthlyTotal: {
    fontSize: "16px",
    fontWeight: 500,
    color: "#94a3b8",
  },

  editButton: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    border: "1px solid #e2e8f0",
    background: "#fff",
    color: "#4f46e5",
    padding: "9px 16px",
    borderRadius: "9px",
    fontWeight: 600,
    fontSize: "13px",
    cursor: "pointer",
  },

  progressTrackLg: {
    width: "100%",
    height: "10px",
    backgroundColor: "#e2e8f0",
    borderRadius: "999px",
    overflow: "hidden",
    marginTop: "18px",
  },

  progressFillLg: {
    height: "100%",
    borderRadius: "999px",
    backgroundColor: "#4f46e5",
  },

  progressMetaRow: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "10px",
  },

  progressMetaLeft: {
    fontSize: "13px",
    color: "#64748b",
  },

  progressMetaRight: {
    fontSize: "13px",
    fontWeight: 600,
    color: "#16a34a",
  },

  /* ===========================
     CATEGORY BUDGETS
  =========================== */

  sectionTitle: {
    margin: "0 0 16px 0",
    fontSize: "18px",
    fontWeight: 700,
    color: "#0f172a",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
    gap: "20px",
  },

  card: {
    backgroundColor: "#ffffff",
    borderRadius: "14px",
    border: "1px solid #e2e8f0",
    boxShadow: "0 4px 12px rgba(15,23,42,0.05)",
    padding: "20px",
  },

  cardTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "18px",
  },

  cardCategoryWrap: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },

  cardIconBox: {
    width: "38px",
    height: "38px",
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },

  cardCategoryName: {
    fontSize: "15px",
    fontWeight: 600,
    color: "#0f172a",
  },

  cardActions: {
    display: "flex",
    gap: "8px",
  },

  iconButton: {
    width: "30px",
    height: "30px",
    borderRadius: "8px",
    border: "1px solid #e2e8f0",
    backgroundColor: "#ffffff",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  cardAmountRow: {
    display: "flex",
    alignItems: "baseline",
    gap: "6px",
    marginBottom: "10px",
  },

  cardSpent: {
    fontSize: "22px",
    fontWeight: 700,
    color: "#0f172a",
  },

  cardTotal: {
    fontSize: "14px",
    color: "#94a3b8",
  },

  progressTrackSm: {
    width: "100%",
    height: "7px",
    backgroundColor: "#e2e8f0",
    borderRadius: "999px",
    overflow: "hidden",
  },

  progressFillSm: {
    height: "100%",
    borderRadius: "999px",
  },

  cardPercent: {
    fontSize: "13px",
    color: "#64748b",
    marginTop: "10px",
  },

  addCard: {
    borderRadius: "14px",
    border: "2px dashed #cbd5e1",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    minHeight: "170px",
    cursor: "pointer",
    background: "transparent",
    color: "#64748b",
    fontWeight: 600,
    fontSize: "14px",
  },

  emptyState: {
    padding: "60px 20px",
    textAlign: "center",
    color: "#64748b",
  },

  /* ===========================
     MODAL
  =========================== */

  overlay: {
    position: "fixed",
    inset: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0, 0, 0, 0.45)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    boxSizing: "border-box",
    zIndex: 9999,
  },

  modal: {
    width: "440px",
    maxWidth: "100%",
    backgroundColor: "#ffffff",
    borderRadius: "20px",
    padding: "28px",
    boxSizing: "border-box",
  },

  modalHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "22px",
  },

  modalTitle: {
    margin: 0,
    fontSize: "20px",
    fontWeight: 700,
    color: "#0f172a",
  },

  closeButton: {
    width: "36px",
    height: "36px",
    border: "none",
    borderRadius: "10px",
    background: "#f1f5f9",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },

  field: {
    marginBottom: "18px",
  },

  label: {
    display: "block",
    marginBottom: "8px",
    fontWeight: 600,
    color: "#334155",
    fontSize: "14px",
  },

  input: {
    width: "100%",
    padding: "12px 14px",
    borderRadius: "10px",
    border: "1px solid #cbd5e1",
    outline: "none",
    fontSize: "14px",
    boxSizing: "border-box",
  },

  selectWrapFull: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    background: "#fff",
    border: "1px solid #cbd5e1",
    borderRadius: "10px",
    padding: "0 12px",
    height: "46px",
  },

  selectFull: {
    flex: 1,
    border: "none",
    outline: "none",
    background: "transparent",
    fontSize: "14px",
  },

  modalActions: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "12px",
    marginTop: "10px",
  },

  cancelButton: {
    border: "1px solid #e2e8f0",
    background: "#fff",
    color: "#334155",
    padding: "12px 22px",
    borderRadius: "10px",
    fontWeight: 600,
    fontSize: "14px",
    cursor: "pointer",
  },

  submitButton: {
    border: "none",
    background: "#4f46e5",
    color: "#fff",
    padding: "12px 22px",
    borderRadius: "10px",
    fontWeight: 600,
    fontSize: "14px",
    cursor: "pointer",
  },
};

export default styles;