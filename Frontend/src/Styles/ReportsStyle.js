const styles = {

    page: {
        display: "flex",
        minHeight: "100vh",
        background: "var(--bg-color)",
        overflow: "hidden"
    },

    main: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        background: "var(--bg-color)"
    },

    content: {
        padding: "30px"
    },

    header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "30px"
    },

    pageTitle: {
        fontSize: "32px",
        fontWeight: "700",
        color: "var(--text-color)",
        margin: 0
    },

    pageSubtitle: {
        marginTop: "8px",
        color: "var(--text-muted)",
        fontSize: "15px"
    },

    downloadButton: {
        background: "var(--accent)",
        color: "var(--text-color)",
        border: "none",
        borderRadius: "8px",
        padding: "12px 22px",
        cursor: "pointer",
        fontWeight: "600",
        fontSize: "14px",
        transition: ".3s"
    },

    cardsGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(3,1fr)",
        gap: "20px",
        marginBottom: "30px"
    },

    card: {
        background: "var(--surface)",
        borderRadius: "14px",
        padding: "22px",
        boxShadow: "0 4px 15px rgba(0,0,0,.05)"
    },

    cardHeader: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "18px"
    },

    cardTitle: {
        fontSize: "14px",
        color: "var(--text-muted)",
        fontWeight: "500"
    },

    cardValue: {
        fontSize: "32px",
        fontWeight: "700",
        marginBottom: "8px",
        color: "var(--text-color)"
    },

    cardFooter: {
        fontSize: "13px",
        color: "var(--text-faint)"
    },

    chartGrid: {
        display: "grid",
        gridTemplateColumns: "2fr 1fr",
        gap: "22px",
        marginBottom: "30px"
    },

    chartCard: {
        background: "var(--surface)",
        borderRadius: "14px",
        padding: "22px",
        boxShadow: "0 4px 15px rgba(0,0,0,.05)"
    },

    chartTitle: {
        fontSize: "18px",
        fontWeight: "700",
        color: "var(--text-color)",
        marginBottom: "6px"
    },

    chartSubtitle: {
        color: "var(--text-faint)",
        fontSize: "13px",
        marginBottom: "20px"
    },

    tableCard: {
        background: "var(--surface)",
        borderRadius: "14px",
        padding: "22px",
        boxShadow: "0 4px 15px rgba(0,0,0,.05)",
        marginBottom: "30px"
    },

    tableTitle: {
        fontSize: "18px",
        fontWeight: "700",
        marginBottom: "20px",
        color: "var(--text-color)"
    },

    table: {
        width: "100%",
        borderCollapse: "collapse"
    },

    th: {
        background: "var(--table-header-bg)",
        color: "var(--text-muted)",
        textAlign: "left",
        padding: "14px",
        fontSize: "14px",
        fontWeight: "600"
    },

    td: {
        padding: "15px 14px",
        borderBottom: "1px solid var(--border-color)",
        fontSize: "14px",
        color: "var(--text-color)"
    },

    incomeBadge: {
        background: "var(--success-bg)",
        color: "var(--success)",
        padding: "5px 12px",
        borderRadius: "20px",
        fontWeight: "600",
        fontSize: "12px"
    },

    expenseBadge: {
        background: "var(--danger-bg)",
        color: "var(--danger)",
        padding: "5px 12px",
        borderRadius: "20px",
        fontWeight: "600",
        fontSize: "12px"
    },

    yearlyGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(3,1fr)",
        gap: "20px"
    },

    yearlyCard: {
        background: "var(--surface)",
        borderRadius: "14px",
        padding: "22px",
        textAlign: "center",
        boxShadow: "0 4px 15px rgba(0,0,0,.05)"
    },

    yearlyLabel: {
        color: "var(--text-faint)",
        marginBottom: "10px",
        fontSize: "14px"
    },

    yearlyValue: {
        fontSize: "28px",
        fontWeight: "700",
        color: "var(--text-color)"
    }

};

export default styles;