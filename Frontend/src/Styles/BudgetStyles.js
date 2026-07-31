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
    color: "var(--text-color)",
  },

  subtitle: {
    marginTop: "8px",
    fontSize: "15px",
    color: "var(--text-faint)",
  },

  addButton: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    border: "none",
    cursor: "pointer",
    background: "#4f46e5",
    color: "var(--surface)",
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
    backgroundColor: "var(--surface)",
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
    color:"var(--text-faint)",
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
    color: "var(--text-color)",
  },

  monthlyTotal: {
    fontSize: "16px",
    fontWeight: 500,
    color: "var(--text-faint)",
  },

  editButton: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    border: "1px solid #e2e8f0",
    background: "var(--surface)",
    color: "var(--accent)",
    padding: "9px 16px",
    borderRadius: "9px",
    fontWeight: 600,
    fontSize: "13px",
    cursor: "pointer",
  },

  progressTrackLg: {
    width: "100%",
    height: "10px",
   backgroundColor: "var(--border-color)",
    borderRadius: "999px",
    overflow: "hidden",
    marginTop: "18px",
  },

  progressFillLg: {
    height: "100%",
    borderRadius: "999px",
    backgroundColor: "var(--accent)",
  },

  progressMetaRow: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "10px",
  },

  progressMetaLeft: {
    fontSize: "13px",
    color: "var(--text-faint)",
  },

  progressMetaRight: {
    fontSize: "13px",
    fontWeight: 600,
   color: "var(--success)",
  },

  /* ===========================
     CATEGORY BUDGETS
  =========================== */

  sectionTitle: {
    margin: "0 0 16px 0",
    fontSize: "18px",
    fontWeight: 700,
    color: "var(--text-color)",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
    gap: "20px",
  },

  card: {
    backgroundColor: "var(--surface)",
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
    color: "var(--text-color)",
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
    backgroundColor: "var(--surface)",
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
    color: "var(--text-color)",
  },

  cardTotal: {
    fontSize: "14px",
    color: "var(--text-faint)",
  },

  progressTrackSm: {
    width: "100%",
    height: "7px",
   backgroundColor: "var(--border-color)",
    borderRadius: "999px",
    overflow: "hidden",
  },

  progressFillSm: {
    height: "100%",
    borderRadius: "999px",
  },

  cardPercent: {
    fontSize: "13px",
    color:"var(--text-faint)",
    marginTop: "10px",
  },

  addCard: {
    borderRadius: "14px",
    border: "2px dashed var(--border-color)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    minHeight: "170px",
    cursor: "pointer",
    background: "transparent",
    color: "var(--text-faint)",
    fontWeight: 600,
    fontSize: "14px",
  },

  emptyState: {
    padding: "60px 20px",
    textAlign: "center",
    color: "var(--text-faint)",
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
    backgroundColor: "var(--surface)",
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
    color: "var(--text-color)",
  },

  closeButton: {
    width: "36px",
    height: "36px",
    border: "none",
    borderRadius: "10px",
background: "var(--bg-color)",
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
    color:"var(--text-muted)",
    fontSize: "14px",
  },

  input: {
  width: "100%",
  padding: "12px 14px",
  borderRadius: "10px",
  border: "1px solid var(--border-color)",
  outline: "none",
  fontSize: "14px",
  boxSizing: "border-box",
  backgroundColor: "var(--surface)",
  color: "var(--text-color)",
},

  selectWrapFull: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    background: "var(--surface)",
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
    color: "var(--text-color)",
  },

  modalActions: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "12px",
    marginTop: "10px",
  },

  cancelButton: {
   border: "1px solid var(--border-color)",
    background: "var(--surface)",
    color: "var(--text-muted)",
    padding: "12px 22px",
    borderRadius: "10px",
    fontWeight: 600,
    fontSize: "14px",
    cursor: "pointer",
  },

  submitButton: {
    border: "none",
   background: "var(--accent)",
    color: "var(--surface)",
    padding: "12px 22px",
    borderRadius: "10px",
    fontWeight: 600,
    fontSize: "14px",
    cursor: "pointer",
  },
};

export default styles;