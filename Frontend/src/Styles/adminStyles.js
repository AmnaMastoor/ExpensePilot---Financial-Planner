const styles = {
  page: {
    display: "flex",
    minHeight: "100vh",
    width: "100%",
backgroundColor: "var(--bg-color)",
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  },

  sidebar: {
    width: 240,
    backgroundColor: "var(--surface)",
    borderRight: "1px solid #e2e8f0",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    padding: "20px 16px",
    boxSizing: "border-box",
    flexShrink: 0,
  },

  logoRow: {
    padding: "0 8px",
    marginBottom: 8,
    display: "flex",
    alignItems: "center",
    gap: 8,
  },

  logoText: {
    fontSize: 18,
    fontWeight: 700,
    color:"var(--text-color)",
  },

  adminBadge: {
    display: "inline-block",
    padding: "4px 10px",
    borderRadius: 6,
    backgroundColor: "#eef2ff",
    color: "#4f46e5",
    fontSize: 12,
    fontWeight: 600,
    marginBottom: 20,
  },

  nav: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
  },

  navItem: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: "10px 12px",
    borderRadius: 8,
    border: "none",
    backgroundColor: "transparent",
    cursor: "pointer",
    fontSize: 14,
    textAlign: "left",
    width: "100%",
  },

  navItemActive: {
    backgroundColor: "#eef2ff",
  },

  logoutButton: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: "10px 12px",
    borderRadius: 8,
    border: "none",
    backgroundColor: "transparent",
    cursor: "pointer",
    fontSize: 14,
    color: "#475569",
    borderTop: "1px solid #e2e8f0",
    paddingTop: 16,
    marginTop: 16,
  },

  main: {
    flex: 1,
    width: 0,
    minWidth: 0,
    display: "flex",
    flexDirection: "column",
  },

  content: {
    padding: "28px 32px",
    boxSizing: "border-box",
  },

 pageTitle: {
  fontSize: 26,
  fontWeight: 700,
  color: "var(--text-color)",
  margin: 0,
},

  pageSubtitle: {
    fontSize: 14,
    color: "var(--text-faint)",
    margin: "4px 0 24px 0",
  },

  statGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: 20,
    marginBottom: 32,
  },

  statCard: {
    backgroundColor: "var(--surface)",
    border: "1px solid #e2e8f0",
    borderRadius: 12,
    padding: "20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },

  statLabel: {
    fontSize: 13,
    color: "var(--text-faint)",
    marginBottom: 8,
  },

  statValue: {
    fontSize: 26,
    fontWeight: 700,
    color:"var(--text-color)",
  },

  statIconWrap: (bg) => ({
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: bg,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }),

  sectionHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: 700,
    color: "var(--text-color)",
    margin: "24px 0 12px 0",
  },

  card: {
    backgroundColor: "var(--surface)",
    border: "1px solid #e2e8f0",
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 24,
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
  },

  th: {
    textAlign: "left",
    fontSize: 12,
    color: "var(--text-faint)",
    fontWeight: 600,
    padding: "12px 20px",
    borderBottom: "1px solid #e2e8f0",
  },

  td: {
    padding: "14px 20px",
    borderBottom: "1px solid #f1f5f9",
    fontSize: 14,
    color:"var(--text-color)",
    verticalAlign: "middle",
  },

  userCell: {
    display: "flex",
    alignItems: "center",
    gap: 12,
  },

  avatarCircle: {
    width: 36,
    height: 36,
    borderRadius: "50%",
    backgroundColor: "#4f46e5",
    color: "var(--surface)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 600,
    fontSize: 13,
    flexShrink: 0,
  },

  userName: {
    fontWeight: 600,
    fontSize: 14,
    color:"var(--text-color)",
  },

  userEmail: {
    fontSize: 13,
   color: "var(--text-faint)",
  },

  badge: (bg, color) => ({
    display: "inline-block",
    padding: "4px 10px",
    borderRadius: 6,
    fontSize: 12,
    fontWeight: 600,
    backgroundColor: bg,
    color: color,
  }),

  actionsCell: {
    display: "flex",
    gap: 8,
  },

  iconBtn: (bg) => ({
    width: 30,
    height: 30,
    borderRadius: 8,
    border: "none",
    backgroundColor: bg,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
  }),

  primaryButton: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#4f46e5",
    color: "var(--surface)",
    border: "none",
    padding: "10px 16px",
    borderRadius: 8,
    fontSize: 14,
    fontWeight: 600,
    cursor: "pointer",
  },

  categoryIconWrap: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: "#eef2ff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  emptyText: {
    padding: "24px 20px",
    color: "var(--text-faint)",
    fontSize: 14,
    textAlign: "center",
  },

  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(15, 23, 42, 0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 100,
  },

  modalBox: {
    backgroundColor: "var(--surface)",
    borderRadius: 12,
    padding: 24,
    width: 420,
    maxWidth: "90%",
    boxSizing: "border-box",
  },

  modalHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },

  modalTitle: {
    fontSize: 18,
    fontWeight: 700,
    color: "var(--text-color)",
    margin: 0,
  },

  formGroup: {
    marginBottom: 14,
  },

  label: {
    display: "block",
    fontSize: 13,
    fontWeight: 600,
    color:"var(--text-muted)",
    marginBottom: 6,
  },

  input: {
    width: "100%",
    padding: "10px 12px",
    borderRadius: 8,
    border: "1px solid #e2e8f0",
    fontSize: 14,
    boxSizing: "border-box",
    outline: "none",
  },

  modalActions: {
    display: "flex",
    justifyContent: "flex-end",
    gap: 10,
    marginTop: 20,
  },

  secondaryButton: {
    padding: "10px 16px",
    borderRadius: 8,
    border: "1px solid #e2e8f0",
    backgroundColor: "var(--surface)",
    color: "var(--text-muted)",
    fontSize: 14,
    fontWeight: 600,
    cursor: "pointer",
  },
};

export default styles;