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
    borderRight: "1px solid var(--border-color)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    padding: "20px 16px",
    boxSizing: "border-box",
    flexShrink: 0,
  },

  logoRow: {
    padding: "0 8px",
    marginBottom: 24,
  },

  logoText: {
    fontSize: 18,
    fontWeight: 700,
    color: "var(--text-color)",
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
   backgroundColor: "var(--accent-bg)",
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
    paddingTop: 16,
    marginTop: 16,
    color: "var(--text-secondary)",
    borderTop: "1px solid var(--border-color)",

  },

 main: {
  flex: 1,
  width: 0,
  minWidth: 0,
  display: "flex",
  flexDirection: "column",
  backgroundColor: "var(--bg-color)",
},

  topBar: {
    width: "100%",
    height: "80px",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    padding: "0 32px",
    backgroundColor: "var(--surface)",
    boxSizing: "border-box",
  },

  topBarRight: {
    display: "flex",
    alignItems: "center",
    gap: 20,
  },

  bellWrap: {
    position: "relative",
    cursor: "pointer",
  },

  bellDot: {
    position: "absolute",
    top: -2,
    right: -2,
    width: 8,
    height: 8,
    borderRadius: "50%",
    backgroundColor: "#ef4444",
    border: "2px solid var(--surface)",
  },

  userWrap: {
    display: "flex",
    alignItems: "center",
    gap: 10,
  },

  avatar: {
    width: 34,
    height: 34,
    borderRadius: "50%",
    backgroundColor: "#4f46e5",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  userName: {
    fontSize: 13,
    fontWeight: 600,
    color: "var(--text-color)",
  },

  userEmail: {
    fontSize: 12,
    color: "var(--text-faint)",
  },

  content: {
  padding: "28px 32px",
  flex: 1,
  boxSizing: "border-box",
  backgroundColor: "var(--bg-color)",
},

  pageTitle: {
    fontSize: 26,
    fontWeight: 700,
    color:"var(--text-color)",
    margin: 0,
  },

  pageSubtitle: {
    fontSize: 14,
    color: "var(--text-faint)",
    margin: "6px 0 24px 0",
  },

  statGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: 20,
    marginBottom: 24,
  },

  statCard: {
    backgroundColor: "var(--surface)",
    border: "1px solid #e2e8f0",
    borderRadius: 12,
    padding: 20,
  },

  statCardTop: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },

  statLabel: {
    fontSize: 13,
    color: "var(--text-faint)",
    marginBottom: 8,
  },

  statValue: {
    fontSize: 22,
    fontWeight: 700,
    color: "var(--text-color)",
  },

  statIconBox: {
    width: 40,
    height: 40,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },

  statChange: {
    fontSize: 12,
    fontWeight: 500,
    marginTop: 12,
  },

  midGrid: {
    display: "grid",
    gridTemplateColumns: "1.4fr 1fr",
    gap: 20,
  },

  panel: {
    backgroundColor: "var(--surface)",
    border: "1px solid #e2e8f0",
    borderRadius: 12,
    padding: 22,
    boxSizing: "border-box",
  },

  panelTitle: {
    fontSize: 15,
    fontWeight: 600,
    color:"var(--text-color)",
    margin: "0 0 18px 0",
  },

  pieWrap: {
    display: "flex",
    justifyContent: "center",
  },

  alertBox: {
    backgroundColor: "#fff7ed",
    border: "1px solid #fed7aa",
    borderRadius: 10,
    padding: 14,
    marginBottom: 14,
  },

  alertHeader: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    marginBottom: 8,
  },

alertLabel: {
  fontSize: 13,
  fontWeight: 600,
  color: "#000000",
  display: "flex",
  gap: 6,
  alignItems: "baseline",
},
  alertAmount: {
    fontSize: 12,
    fontWeight: 400,
    color: "var(--text-faint)",
  },

  progressTrack: {
    width: "100%",
    height: 6,
    backgroundColor: "#fed7aa",
    borderRadius: 4,
    overflow: "hidden",
  },

  progressFill: {
    height: "100%",
    borderRadius: 4,
  },

  alertPercent: {
    fontSize: 12,
    color: "#9a3412",
    marginTop: 6,
  },

  budgetNote: {
    fontSize: 13,
    color:"var(--text-faint)",
    marginTop: 4,
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
  },

  th: {
    textAlign: "left",
    fontSize: 12,
    fontWeight: 600,
    color: "var(--text-faint)",
    padding: "10px 8px",
    borderBottom: "1px solid #e2e8f0",
  },

  tr: {
    borderBottom: "1px solid #f1f5f9",
  },

  td: {
    padding: "14px 8px",
    fontSize: 14,
    color: "var(--text-muted)",
  },

  tdDesc: {
    padding: "14px 8px",
    fontSize: 14,
    fontWeight: 500,
    color: "var(--text-color)",
  },

  badge: {
    fontSize: 12,
    fontWeight: 500,
    padding: "3px 10px",
    borderRadius: 6,
    display: "inline-block",
  },
};

export default styles;