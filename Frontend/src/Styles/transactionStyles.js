const styles = {
  /* ===========================
     PAGE
  =========================== */

  page: {
backgroundColor: "var(--bg-color)",
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
    color: "var(--text-color)",
  },

  subtitle: {
    marginTop: "8px",
    marginBottom: "30px",
    fontSize: "15px",
    color: "var(--text-faint)",
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
    background: "var(--surface)",
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
    color: "var(--text-color)",
  },

  selectWrap: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    background: "var(--surface)",
    border: "1px solid #e2e8f0",
    borderRadius: "10px",
    padding: "0 12px",
    height: "46px",
  },

  selectWrapFull: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
   background: "var(--surface)",
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
    color: "var(--surface)",
    padding: "12px 20px",
    borderRadius: "10px",
    fontWeight: 600,
    fontSize: "14px",
  },
    /* ===========================
     TABLE
  =========================== */

  tableCard: {
    backgroundColor: "var(--surface)",
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
backgroundColor: "var(--bg-color)",
    color:"var(--text-faint)",
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
    color:"var(--text-muted)",
    verticalAlign: "middle",
  },

  tdTitle: {
    padding: "18px 22px",
    fontWeight: 600,
    color: "var(--text-color)",
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
    backgroundColor: "var(--surface)",
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
  backgroundColor: "var(--surface)",
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
  color: "var(--text-color)",
},

modalSubtitle: {
  marginTop: "6px",
  color:"var(--text-faint)",
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
  color:"var(--text-muted)",
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

cancelButton: {
  border: "1px solid #e2e8f0",
  background: "var(--surface)",
  color:"var(--text-muted)",
  padding: "12px 20px",
  borderRadius: "10px",
  fontWeight: 600,
  fontSize: "14px",
  cursor: "pointer",
},

submitButton: {
  border: "none",
  background: "#4f46e5",
  color: "var(--surface)",
  padding: "12px 20px",
  borderRadius: "10px",
  fontWeight: 600,
  fontSize: "14px",
  cursor: "pointer",
},

  /* ===========================
     CATEGORY FIELD (label + add button)
  =========================== */

  labelRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "8px",
  },

  addCategoryBtn: {
    display: "flex",
    alignItems: "center",
    gap: "4px",
    border: "none",
    background: "transparent",
    color: "#4f46e5",
    fontWeight: 600,
    fontSize: "13px",
    cursor: "pointer",
    padding: 0,
  },

  /* ===========================
     ADD CATEGORY (mini modal)
  =========================== */

  miniOverlay: {
    position: "fixed",
    inset: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    boxSizing: "border-box",
    zIndex: 10000,
  },

  miniModal: {
    width: "440px",
    maxWidth: "100%",
    backgroundColor: "var(--surface)",
    borderRadius: "20px",
    padding: "28px",
    boxSizing: "border-box",
  },

  privateNote: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    backgroundColor: "#eef2ff",
    color: "#4f46e5",
    fontSize: "13px",
    fontWeight: 500,
    padding: "10px 14px",
    borderRadius: "10px",
    marginBottom: "20px",
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
    color: "var(--text-color)",
  },

  emptyText: {
    marginTop: "8px",
    color: "var(--text-faint)",
    fontSize: "14px",
  },

  emptyRow: {
    padding: "50px",
    textAlign: "center",
    color: "var(--text-faint)",
    fontSize: "14px",
  },
};

export default styles;