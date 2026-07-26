const styles = {
  /* ===========================
     PAGE
  =========================== */

  page: {
    backgroundColor: "#f8fafc",
    minHeight: "100vh",
    padding: "32px",
  },

  container: {
    maxWidth: "1300px",
    margin: "0 auto",
  },

  title: {
    margin: 0,
    fontSize: "34px",
    fontWeight: 700,
    color: "#0f172a",
  },

  subtitle: {
    marginTop: "8px",
    marginBottom: "30px",
    fontSize: "15px",
    color: "#64748b",
  },

  /* ===========================
     TOOLBAR
  =========================== */

  toolbar: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
    marginBottom: "24px",
    flexWrap: "wrap",
  },

  searchBox: {
    flex: 1,
    minWidth: "260px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    background: "#fff",
    border: "1px solid #e2e8f0",
    borderRadius: "10px",
    padding: "0 14px",
    height: "46px",
  },

  searchInput: {
    flex: 1,
    border: "none",
    outline: "none",
    fontSize: "14px",
    background: "transparent",
    color: "#0f172a",
  },

  selectWrap: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    background: "#fff",
    border: "1px solid #e2e8f0",
    borderRadius: "10px",
    padding: "0 12px",
    height: "46px",
  },

  selectWrapFull: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    background: "#fff",
    border: "1px solid #e2e8f0",
    borderRadius: "10px",
    padding: "0 12px",
    height: "46px",
    width: "100%",
  },

  select: {
    border: "none",
    outline: "none",
    background: "transparent",
    fontSize: "14px",
    cursor: "pointer",
  },

  selectFull: {
    flex: 1,
    border: "none",
    outline: "none",
    background: "transparent",
    fontSize: "14px",
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
  },
    /* ===========================
     TABLE
  =========================== */

  tableCard: {
    backgroundColor: "#ffffff",
    borderRadius: "14px",
    overflow: "hidden",
    border: "1px solid #e2e8f0",
    boxShadow: "0 4px 12px rgba(15,23,42,0.05)",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
  },

  th: {
    textAlign: "left",
    padding: "18px 22px",
    backgroundColor: "#f8fafc",
    color: "#64748b",
    fontWeight: 600,
    fontSize: "14px",
    borderBottom: "1px solid #e2e8f0",
  },

  tr: {
    borderBottom: "1px solid #f1f5f9",
  },

  td: {
    padding: "18px 22px",
    fontSize: "14px",
    color: "#334155",
    verticalAlign: "middle",
  },

  tdTitle: {
    padding: "18px 22px",
    fontWeight: 600,
    color: "#0f172a",
  },

  badge: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "6px 12px",
    borderRadius: "999px",
    fontSize: "12px",
    fontWeight: 600,
  },

  actionsWrap: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "10px",
  },

  iconButton: {
    width: "34px",
    height: "34px",
    borderRadius: "8px",
    border: "1px solid #e2e8f0",
    backgroundColor: "#ffffff",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "0.2s",
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
  width: "700px",
  maxWidth: "100%",
  height: "90vh",
  backgroundColor: "#ffffff",
  borderRadius: "20px",
  padding: "32px",
  boxSizing: "border-box",
  display: "flex",
  flexDirection: "column",
},

modalHeader: {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  marginBottom: "24px",
  flexShrink: 0,
},

modalForm: {
  flex: 1,
  overflowY: "auto",
  paddingRight: "8px",
},

modalTitle: {
  margin: 0,
  fontSize: "24px",
  fontWeight: 700,
  color: "#0f172a",
},

modalSubtitle: {
  marginTop: "6px",
  color: "#64748b",
  fontSize: "14px",
},

closeButton: {
  width: "40px",
  height: "40px",
  border: "none",
  borderRadius: "10px",
  background: "#f1f5f9",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
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

textarea: {
  width: "100%",
  padding: "12px 14px",
  borderRadius: "10px",
  border: "1px solid #cbd5e1",
  outline: "none",
  resize: "vertical",
  fontSize: "14px",
  boxSizing: "border-box",
},

modalActions: {
  display: "flex",
  justifyContent: "flex-end",
  gap: "12px",
  marginTop: "24px",
  paddingTop: "8px",
  paddingBottom: "8px",
},
  /* ===========================
     EMPTY STATE
  =========================== */

  emptyState: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px 0",
  },

  emptyTitle: {
    margin: 0,
    fontSize: "18px",
    fontWeight: 600,
    color: "#0f172a",
  },

  emptyText: {
    marginTop: "8px",
    color: "#64748b",
    fontSize: "14px",
  },

  emptyRow: {
    padding: "50px",
    textAlign: "center",
    color: "#94a3b8",
    fontSize: "14px",
  },
};

export default styles;