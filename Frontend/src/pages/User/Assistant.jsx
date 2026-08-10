
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../../services/api";

import Sidebar from "../../Components/Layout/Sidebar";
import Navbar from "../../Components/Layout/Navbar";

import "../../Styles/assistantStyles.css";

function Assistant() {
    const navigate = useNavigate();

    // =========================================================
    // STATE
    // =========================================================

    const [documents, setDocuments] = useState([]);
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [deletingId, setDeletingId] = useState(null);

    const fileInputRef = useRef(null);
    const messagesEndRef = useRef(null);

    // =========================================================
    // LOGOUT
    // =========================================================

    const logout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    // =========================================================
    // LOAD USER DOCUMENTS
    // GET /api/UserDocument
    // =========================================================

    const loadDocuments = async () => {
        try {
            const response = await api.get("/UserDocument");

            setDocuments(response.data || []);
        } catch (error) {
            console.error(
                "Failed to load documents:",
                error.response?.data || error.message
            );
        }
    };

    // =========================================================
    // INITIAL LOAD
    // =========================================================

    useEffect(() => {
        loadDocuments();
    }, []);
const loadChatHistory = async () => {
    try {

        const response =
            await api.get("/Chat/history");

        setMessages(
            response.data?.messages || []
        );

    } catch (error) {

        console.error(
            "Failed to load chat history:",
            error
        );
    }
};


useEffect(() => {
    loadChatHistory();
}, []);
    // =========================================================
    // AUTO SCROLL CHAT
    // =========================================================

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({
            behavior: "smooth",
        });
    }, [messages, loading]);

    // =========================================================
    // SEND CHAT MESSAGE
    // POST /api/Chat/ask
    // =========================================================

    const sendMessage = async () => {
        const trimmedMessage = message.trim();

        if (!trimmedMessage || loading) {
            return;
        }

        const userMessage = {
            role: "user",
            content: trimmedMessage,
        };

        setMessages((prev) => [...prev, userMessage]);
        setMessage("");
        setLoading(true);

        try {
            const response = await api.post("/Chat/ask", {
                question: trimmedMessage,
            });

            const assistantMessage = {
                role: "assistant",
                content:
                    response.data?.answer ||
                    response.data?.message ||
                    "I couldn't generate an answer.",
            };

            setMessages((prev) => [
                ...prev,
                assistantMessage,
            ]);
        } catch (error) {
            console.error(
                "Chat error:",
                error.response?.data || error.message
            );

            setMessages((prev) => [
                ...prev,
                {
                    role: "assistant",
                    content:
                        "Sorry, I couldn't process your question right now.",
                },
            ]);
        } finally {
            setLoading(false);
        }
    };

    // =========================================================
    // ENTER KEY
    // =========================================================

    const handleKeyDown = (event) => {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            sendMessage();
        }
    };

    // =========================================================
    // SUGGESTION
    // =========================================================

    const askSuggestion = (question) => {
        setMessage(question);
    };

    // =========================================================
    // UPLOAD USER DOCUMENT
    // POST /api/UserDocument/upload
    // =========================================================

    const handleFileSelect = async (event) => {
        const file = event.target.files?.[0];

        if (!file) {
            return;
        }

        setUploading(true);

        try {
            const formData = new FormData();

            formData.append("file", file);

            await api.post(
                "/UserDocument/upload",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            // Reload documents after successful upload
            await loadDocuments();

            alert("Document uploaded successfully.");
        } catch (error) {
            console.error(
                "Document upload failed:",
                error.response?.data || error.message
            );

            alert(
                error.response?.data?.message ||
                "Failed to upload document."
            );
        } finally {
            setUploading(false);

            // Allow uploading same file again
            event.target.value = "";
        }
    };

    // =========================================================
    // DELETE USER DOCUMENT
    // DELETE /api/UserDocument/{id}
    // =========================================================

    const deleteDocument = async (documentId) => {
        if (!documentId) {
            console.error("Document ID is missing.");
            return;
        }

        const confirmed = window.confirm(
            "Are you sure you want to delete this document?"
        );

        if (!confirmed) {
            return;
        }

        setDeletingId(documentId);

        try {
            await api.delete(
                `/UserDocument/${documentId}`
            );

            // Remove immediately from UI
            setDocuments((prev) =>
                prev.filter(
                    (document) =>
                        document.id !== documentId
                )
            );

            // Sync again with backend
            await loadDocuments();

            alert("Document deleted successfully.");
        } catch (error) {
            console.error(
                "Failed to delete document:",
                error.response?.data || error.message
            );

            alert(
                error.response?.data?.message ||
                "Failed to delete document."
            );
        } finally {
            setDeletingId(null);
        }
    };

    // =========================================================
    // FORMAT FILE SIZE
    // =========================================================

    const formatFileSize = (bytes) => {
        if (!bytes || bytes <= 0) {
            return "";
        }

        if (bytes < 1024) {
            return `${bytes} B`;
        }

        if (bytes < 1024 * 1024) {
            return `${(bytes / 1024).toFixed(1)} KB`;
        }

        return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    };

    // =========================================================
    // FORMAT DATE
    // =========================================================

    const formatDate = (date) => {
        if (!date) {
            return "";
        }

        const parsedDate = new Date(date);

        if (Number.isNaN(parsedDate.getTime())) {
            return "";
        }

        return parsedDate.toLocaleDateString(
            "en-US",
            {
                month: "short",
                day: "numeric",
                year: "numeric",
            }
        );
    };

    // =========================================================
    // UI
    // =========================================================

    return (
        <div
            style={{
                display: "flex",
                width: "100%",
                minHeight: "100vh",
                background: "var(--bg-color)",
            }}
        >

            {/* =================================================
                SIDEBAR
            ================================================= */}

            <Sidebar logout={logout} />

            <div
                style={{
                    flex: 1,
                    minWidth: 0,
                    display: "flex",
                    flexDirection: "column",
                }}
            >

                {/* =================================================
                    NAVBAR
                ================================================= */}

                <Navbar />

                <div
                    style={{
                        flex: 1,
                        minWidth: 0,
                        padding: "20px",
                        boxSizing: "border-box",
                    }}
                >

                    <div className="assistant-page">

                        {/* =================================================
                            MAIN CHAT
                        ================================================= */}

                        <div className="assistant-main">

                            {/* ==============================
                                HEADER
                            ============================== */}

                            <div className="assistant-header">

                                <div className="assistant-header-icon">

                                    <svg
                                        width="22"
                                        height="22"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    >
                                        <rect
                                            x="3"
                                            y="3"
                                            width="18"
                                            height="18"
                                            rx="4"
                                        />

                                        <path d="M8 10h8" />
                                        <path d="M8 14h5" />
                                    </svg>

                                </div>

                                <div>

                                    <h2>
                                        Finance Assistant
                                    </h2>

                                    <div className="assistant-status">
                                        <span></span>

                                        Online · knows your data
                                        &amp; documents
                                    </div>

                                </div>

                            </div>

                            {/* ==============================
                                CHAT
                            ============================== */}

                            <div className="assistant-chat">

                                {messages.length === 0 ? (

                                    <div className="assistant-empty">

                                        <div className="assistant-empty-icon">

                                            <svg
                                                width="30"
                                                height="30"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="1.8"
                                            >
                                                <path
                                                    d="M21 11.5a8.38 8.38 0 0 1-9 8.5
                                                    8.38 8.38 0 0 1-5-1.6L3 20l1.6-4
                                                    A8.38 8.38 0 0 1 3 11.5
                                                    8.5 8.5 0 1 1 21 11.5Z"
                                                />
                                            </svg>

                                        </div>

                                        <h3>
                                            Ask me about your finances
                                        </h3>

                                        <p>
                                            I can analyze your transactions,
                                            budgets, goals, and documents
                                            you've uploaded.
                                        </p>

                                        <div className="suggestions">

                                            <button
                                                onClick={() =>
                                                    askSuggestion(
                                                        "How much did I spend on dining last month?"
                                                    )
                                                }
                                            >
                                                How much did I spend on
                                                dining last month?
                                            </button>

                                            <button
                                                onClick={() =>
                                                    askSuggestion(
                                                        "Am I on track with my savings goal?"
                                                    )
                                                }
                                            >
                                                Am I on track with my
                                                savings goal?
                                            </button>

                                            <button
                                                onClick={() =>
                                                    askSuggestion(
                                                        "What's my biggest expense category?"
                                                    )
                                                }
                                            >
                                                What's my biggest expense
                                                category?
                                            </button>

                                            <button
                                                onClick={() =>
                                                    askSuggestion(
                                                        "Summarize my uploaded budget plan"
                                                    )
                                                }
                                            >
                                                Summarize my uploaded
                                                budget plan
                                            </button>

                                        </div>

                                    </div>

                                ) : (

                                    <div className="messages-container">

                                        {messages.map(
                                            (item, index) => (

                                                <div
                                                    key={index}
                                                    className={`message-row ${
                                                        item.role === "user"
                                                            ? "user-row"
                                                            : "assistant-row"
                                                    }`}
                                                >

                                                    <div
                                                        className={`message-bubble ${
                                                            item.role === "user"
                                                                ? "user-message"
                                                                : "assistant-message"
                                                        }`}
                                                    >
                                                        {item.content}
                                                    </div>

                                                </div>

                                            )
                                        )}

                                        {loading && (

                                            <div className="message-row assistant-row">

                                                <div className="message-bubble assistant-message typing">

                                                    <span></span>
                                                    <span></span>
                                                    <span></span>

                                                </div>

                                            </div>

                                        )}

                                        <div ref={messagesEndRef} />

                                    </div>

                                )}

                            </div>

                            {/* ==============================
                                INPUT
                            ============================== */}

                            <div className="assistant-input-area">

                                <div className="assistant-input">

                                    <button
                                        className="attachment-button"
                                        onClick={() =>
                                            fileInputRef.current?.click()
                                        }
                                        title="Upload document"
                                        disabled={uploading}
                                    >

                                        <svg
                                            width="20"
                                            height="20"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="1.8"
                                        >
                                            <path
                                                d="m21.44 11.05-9.19 9.19
                                                a6 6 0 0 1-8.49-8.49l9.19-9.19
                                                a4 4 0 0 1 5.66 5.66l-9.2 9.19
                                                a2 2 0 0 1-2.83-2.83l8.49-8.48"
                                            />
                                        </svg>

                                    </button>

                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        hidden
                                        accept=".pdf,.doc,.docx,.txt,.xlsx,.xls"
                                        onChange={handleFileSelect}
                                    />

                                    <input
                                        type="text"
                                        placeholder={
                                            uploading
                                                ? "Uploading document..."
                                                : "Ask about your spending, budgets, goals, or uploaded documents..."
                                        }
                                        value={message}
                                        onChange={(e) =>
                                            setMessage(
                                                e.target.value
                                            )
                                        }
                                        onKeyDown={handleKeyDown}
                                        disabled={uploading}
                                    />

                                    <button
                                        className="send-button"
                                        onClick={sendMessage}
                                        disabled={
                                            !message.trim() ||
                                            loading
                                        }
                                        title="Send"
                                    >

                                        <svg
                                            width="18"
                                            height="18"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                        >
                                            <path d="M22 2 11 13" />
                                            <path d="m22 2-7 20-4-9-9-4Z" />
                                        </svg>

                                    </button>

                                </div>

                                <div className="assistant-disclaimer">
                                    AI responses are informational only
                                    · not financial advice
                                </div>

                            </div>

                        </div>

                        {/* =================================================
                            RIGHT PANEL
                        ================================================= */}

                        <aside className="assistant-right-panel">

                            {/* =================================================
                                USER DOCUMENTS
                            ================================================= */}

                            <section className="assistant-card">

                                <div className="card-heading">

                                    <div className="card-title">

                                        <div className="card-icon document-icon">

                                            <svg
                                                width="17"
                                                height="17"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="1.8"
                                            >
                                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
                                                <path d="M14 2v6h6" />
                                            </svg>

                                        </div>

                                        <span>
                                            Your Documents
                                        </span>

                                    </div>

                                    <button
                                        className="add-document"
                                        onClick={() =>
                                            fileInputRef.current?.click()
                                        }
                                        disabled={uploading}
                                    >
                                        {uploading
                                            ? "Uploading..."
                                            : "+ Add"}
                                    </button>

                                </div>

                                <div className="documents-list">

                                    {documents.length === 0 ? (

                                        <div className="no-documents">
                                            No documents uploaded yet.
                                        </div>

                                    ) : (

                                        documents.map(
                                            (document) => (

                                                <div
                                                    className="document-item"
                                                    key={document.id}
                                                >

                                                    {/* =========================
                                                        DOCUMENT INFO
                                                    ========================= */}

                                                    <div className="document-info">

                                                        <div className="document-file-icon">

                                                            <svg
                                                                width="17"
                                                                height="17"
                                                                viewBox="0 0 24 24"
                                                                fill="none"
                                                                stroke="currentColor"
                                                                strokeWidth="1.8"
                                                            >
                                                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
                                                                <path d="M14 2v6h6" />
                                                            </svg>

                                                        </div>

                                                        <div className="document-text">

                                                            <div
                                                                className="document-name"
                                                                title={
                                                                    document.fileName
                                                                }
                                                            >
                                                                {document.fileName ||
                                                                    document.name}
                                                            </div>

                                                            <div className="document-date">

                                                                {formatDate(
                                                                    document.uploadedAt
                                                                )}

                                                                {document.fileSize
                                                                    ? ` · ${formatFileSize(
                                                                          document.fileSize
                                                                      )}`
                                                                    : ""}

                                                            </div>

                                                        </div>

                                                    </div>

                                                    {/* =========================
                                                        DELETE BUTTON
                                                    ========================= */}

                                                    <button
                                                        type="button"
                                                        className="document-delete-button"
                                                        onClick={() =>
                                                            deleteDocument(
                                                                document.id
                                                            )
                                                        }
                                                        disabled={
                                                            deletingId ===
                                                            document.id
                                                        }
                                                        title="Delete document"
                                                    >

                                                        {deletingId ===
                                                        document.id ? (

                                                            <span className="delete-spinner">
                                                                ⟳
                                                            </span>

                                                        ) : (

                                                            <svg
                                                                width="16"
                                                                height="16"
                                                                viewBox="0 0 24 24"
                                                                fill="none"
                                                                stroke="currentColor"
                                                                strokeWidth="2"
                                                            >
                                                                <polyline points="3 6 5 6 21 6" />
                                                                <path d="M19 6l-1 14H6L5 6" />
                                                                <path d="M10 11v6" />
                                                                <path d="M14 11v6" />
                                                                <path d="M9 6V4h6v2" />
                                                            </svg>

                                                        )}

                                                    </button>

                                                </div>

                                            )
                                        )

                                    )}

                                </div>

                            </section>

                            {/* =================================================
                                FINANCIAL GUIDES
                            ================================================= */}

                            <section className="assistant-card guides-card">

                                <div className="card-heading">

                                    <div className="card-title">

                                        <div className="card-icon guide-icon">

                                            <svg
                                                width="17"
                                                height="17"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="1.8"
                                            >
                                                <path d="M4 4h16v16H4z" />
                                                <path d="M8 8h8" />
                                                <path d="M8 12h8" />
                                                <path d="M8 16h5" />
                                            </svg>

                                        </div>

                                        <span>
                                            Financial Guides
                                        </span>

                                    </div>

                                </div>

                                <div className="guides-list">

                                    <div className="guide-item">

                                        <div className="guide-icon-small">
                                            ★
                                        </div>

                                        <div>
                                            <strong>
                                                Emergency Fund Planning Guide
                                            </strong>

                                            <small>
                                                Shared by admin
                                            </small>
                                        </div>

                                    </div>

                                    <div className="guide-item">

                                        <div className="guide-icon-small">
                                            ★
                                        </div>

                                        <div>
                                            <strong>
                                                Tax Deduction Checklists 2026
                                            </strong>

                                            <small>
                                                Shared by admin
                                            </small>
                                        </div>

                                    </div>

                                    <div className="guide-item">

                                        <div className="guide-icon-small">
                                            ★
                                        </div>

                                        <div>
                                            <strong>
                                                Debt Snowball vs Avalanche
                                            </strong>

                                            <small>
                                                Shared by admin
                                            </small>
                                        </div>

                                    </div>

                                </div>

                            </section>

                            {/* =================================================
                                SOURCES
                            ================================================= */}

                            <section className="assistant-card sources-card">

                                <div className="card-heading">

                                    <div className="card-title">

                                        <div className="card-icon info-icon">
                                            i
                                        </div>

                                        <span>
                                            How answers are sourced
                                        </span>

                                    </div>

                                </div>

                                <div className="source-list">

                                    <div className="source-item">

                                        <span className="source-dot blue"></span>

                                        <span>
                                            Your transactions, budgets
                                            &amp; goals
                                        </span>

                                    </div>

                                    <div className="source-item">

                                        <span className="source-dot green"></span>

                                        <span>
                                            Documents you uploaded
                                        </span>

                                    </div>

                                    <div className="source-item">

                                        <span className="source-dot purple"></span>

                                        <span>
                                            Admin financial guides
                                        </span>

                                    </div>

                                </div>

                            </section>

                        </aside>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Assistant;

