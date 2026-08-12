
# ExpensePilot: A Hybrid AI Financial Assistant with Intelligent Data Retrieval and RAG-Powered Knowledge

<p align="center">
  <strong>An AI-powered personal finance management platform combining secure financial management, intelligent data retrieval, and Hybrid Retrieval-Augmented Generation.</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/.NET-8.0-512BD4?style=for-the-badge&logo=dotnet&logoColor=white" alt=".NET 8">
  <img src="https://img.shields.io/badge/React-Vite-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React">
  <img src="https://img.shields.io/badge/Python-AI%2FRAG-3776AB?style=for-the-badge&logo=python&logoColor=white" alt="Python">
  <img src="https://img.shields.io/badge/PostgreSQL-Database-4169E1?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL">
  <img src="https://img.shields.io/badge/Entity%20Framework%20Core-ORM-512BD4?style=for-the-badge&logo=dotnet&logoColor=white" alt="EF Core">
</p>

<p align="center">
  <a href="#-overview">Overview</a> •
  <a href="#-features">Features</a> •
  <a href="#-ai-powered-financial-assistant">AI Assistant</a> •
  <a href="#-hybrid-rag">Hybrid RAG</a> •
  <a href="#-architecture">Architecture</a> •
  <a href="#-installation">Installation</a>
</p>

---

## 📌 Overview

**ExpensePilot** is a full-stack personal finance management platform designed to help users manage, monitor, and understand their financial activities through a centralized application.

The project combines a modern financial management system with an **AI-powered financial assistant** built around **Hybrid Retrieval-Augmented Generation (RAG)**.

ExpensePilot goes beyond traditional expense tracking by combining financial management features with intelligent information retrieval and AI-powered assistance.

### Core capabilities include:

* Secure user authentication
* JWT-based authorization
* Google OAuth authentication
* User-specific financial data
* Transaction management
* Financial categories
* Budget management
* Financial goal tracking
* Financial reporting
* Financial dashboard
* Role-based authorization
* AI-powered financial assistance
* Intelligent data retrieval
* Hybrid RAG pipeline
* Context-aware AI responses

The AI component is maintained separately inside the `AI` directory and works alongside the core ASP.NET Core backend and React frontend.

---

# ✨ Features

## 🔐 Authentication & Authorization

ExpensePilot provides secure authentication and authorization for protecting user accounts and financial information.

### Features

* User registration
* User login
* JWT-based authentication
* Google OAuth authentication
* Password management
* Change password
* Role-based authorization
* Protected API endpoints
* User-specific financial data

---

## 📊 Financial Dashboard

The dashboard provides users with a centralized overview of their financial activity.

### Dashboard includes

* Total income
* Total expenses
* Current balance
* Monthly budget
* Budget progress
* Recent transactions
* Financial goals
* Spending overview
* Financial summaries

The dashboard allows users to quickly understand their financial position without navigating through multiple sections.

---

## 💳 Transaction Management

ExpensePilot provides complete CRUD functionality for managing financial transactions.

### Features

* Add transactions
* View transactions
* Update transactions
* Delete transactions
* Track income
* Track expenses
* Assign categories
* View transaction history
* User-specific transaction records

---

## 💰 Budget Management

Users can create and manage budgets to better control their spending.

### Features

* Monthly budget limits
* Category-based budgeting
* Budget tracking
* Budget progress monitoring
* Spending comparison
* User-specific budgets

Each user's budget information is isolated from other users.

---

## 🏷️ Category Management

Transactions can be organized using financial categories.

The system supports:

* Income categories
* Expense categories
* Default categories
* User-created categories

Categories provide better organization and support meaningful financial analysis.

---

## 🎯 Financial Goals

Users can create and monitor long-term financial goals.

### Goal information includes

* Goal name
* Target amount
* Current progress
* Target date
* Goal status
* Progress tracking

This allows users to monitor their progress toward specific financial objectives.

---

## 📈 Financial Reports

ExpensePilot provides financial reporting functionality to help users understand their financial activity.

Reports can be generated using transaction and budgeting information to provide meaningful financial summaries.

---

# 🤖 AI-Powered Financial Assistant

One of the major components of ExpensePilot is its **AI-powered financial assistant**.

The assistant is designed to provide context-aware responses by retrieving relevant information before generating an answer.

Instead of relying only on the language model's internal knowledge, the system follows a **retrieval-first approach**.

```text
User Query
    │
    ▼
Query Processing
    │
    ▼
Information Retrieval
    │
    ▼
Relevant Context
    │
    ▼
Language Model
    │
    ▼
AI Response
```

This architecture helps the AI assistant generate responses grounded in relevant retrieved information.

---

# 🧠 Hybrid RAG

ExpensePilot implements a **Hybrid Retrieval-Augmented Generation architecture**.

The system combines multiple retrieval strategies to improve the quality and relevance of information provided to the language model.

## 🔹 Semantic Retrieval

Semantic retrieval uses vector embeddings to identify information that is conceptually similar to the user's query.

This means the system can retrieve relevant information even when the user's wording differs from the wording stored in the available knowledge.

For example, a user might ask:

```text
How can I reduce unnecessary spending?
```

while the relevant information may contain terms such as:

```text
expense reduction
spending control
financial discipline
budget optimization
```

Semantic retrieval can identify the conceptual relationship between these expressions.

---

## 🔹 Keyword Retrieval

Keyword retrieval focuses on important terms contained within the user's query.

This is particularly useful for:

* Exact financial terms
* Category names
* Specific references
* Important keywords
* Precise financial information

Keyword retrieval complements semantic retrieval by preserving the importance of exact terms.

---

## 🔹 Hybrid Retrieval

The results from semantic and keyword retrieval are combined to produce a more relevant set of information.

The resulting context is then provided to the language model for response generation.

---

# 🔄 Hybrid RAG Pipeline

```text
                         ┌──────────────┐
                         │     User     │
                         └──────┬───────┘
                                │
                                ▼
                       ┌─────────────────┐
                       │   User Query    │
                       └────────┬────────┘
                                │
                                ▼
                       ┌─────────────────┐
                       │ Query Processing│
                       └────────┬────────┘
                                │
                   ┌────────────┴────────────┐
                   │                         │
                   ▼                         ▼
          ┌─────────────────┐       ┌─────────────────┐
          │ Semantic Search │       │ Keyword Search  │
          └────────┬────────┘       └────────┬────────┘
                   │                         │
                   └────────────┬────────────┘
                                ▼
                     ┌────────────────────┐
                     │ Hybrid Retrieval   │
                     └─────────┬──────────┘
                               │
                               ▼
                     ┌────────────────────┐
                     │ Relevant Context   │
                     └─────────┬──────────┘
                               │
                               ▼
                     ┌────────────────────┐
                     │ Prompt Construction│
                     └─────────┬──────────┘
                               │
                               ▼
                         ┌─────────────┐
                         │     LLM     │
                         └──────┬──────┘
                                │
                                ▼
                     ┌────────────────────┐
                     │ Generated Response │
                     └────────────────────┘
```

---

# 🎯 Why Hybrid RAG?

A single retrieval strategy does not always provide the best results.

Semantic retrieval is effective at understanding **meaning and context**, while keyword retrieval is effective at identifying **specific and exact terms**.

By combining both strategies, ExpensePilot can consider both semantic similarity and lexical relevance during retrieval.

### Benefits

* Improved retrieval relevance
* Better context selection
* Greater information coverage
* Better handling of different query formulations
* More grounded AI responses
* Better retrieval for both conceptual and exact queries
* Reduced dependence on the LLM's internal knowledge

---

# 🧩 AI Architecture

The AI component follows a retrieval-first architecture:

```text
User
 │
 ▼
AI Financial Assistant
 │
 ▼
Query Processing
 │
 ├──────────────────┐
 │                  │
 ▼                  ▼
Semantic Retrieval  Keyword Retrieval
 │                  │
 └────────┬─────────┘
          ▼
   Hybrid Retrieval
          │
          ▼
   Relevant Context
          │
          ▼
    Prompt Assembly
          │
          ▼
         LLM
          │
          ▼
    AI Response
```

The AI implementation is maintained independently inside the project's `AI` directory.

---

# 🏗️ Architecture

ExpensePilot follows a multi-component architecture consisting of:

1. React frontend
2. ASP.NET Core backend
3. PostgreSQL database
4. Dedicated AI / Hybrid RAG component

```text
                           ┌──────────────────┐
                           │       User       │
                           └────────┬─────────┘
                                    │
                                    ▼
                           ┌──────────────────┐
                           │ React Frontend   │
                           └────────┬─────────┘
                                    │
                              REST API / HTTP
                                    │
                                    ▼
                           ┌──────────────────┐
                           │ ASP.NET Core API │
                           └───────┬───┬──────┘
                                   │   │
                         ┌─────────┘   └───────────┐
                         ▼                         ▼
                ┌─────────────────┐       ┌─────────────────┐
                │   PostgreSQL    │       │   AI Service    │
                │    Database     │       │   Hybrid RAG    │
                └─────────────────┘       └────────┬────────┘
                                                   │
                                                   ▼
                                            ┌─────────────┐
                                            │     LLM     │
                                            └─────────────┘
```

---

# 🖼️ Architecture Diagram

The complete ExpensePilot architecture diagram is stored inside the `Images` directory.

```text
ExpensePilot---Financial-Planner/
│
├── Images/
│   └── ExpensePilot-Architecture.png
│
└── README.md
```

<p align="center">
  <img src="Images/ExpensePilot-Architecture.png" alt="ExpensePilot Architecture" width="900">
</p>

---

# 🛠️ Technology Stack

## Frontend

<p align="center">
  <img src="https://img.shields.io/badge/React-Frontend-61DAFB?style=flat-square&logo=react&logoColor=black">
  <img src="https://img.shields.io/badge/Vite-Build%20Tool-646CFF?style=flat-square&logo=vite&logoColor=white">
  <img src="https://img.shields.io/badge/JavaScript-ES6%2B-F7DF1E?style=flat-square&logo=javascript&logoColor=black">
  <img src="https://img.shields.io/badge/Axios-HTTP%20Client-5A29E4?style=flat-square">
</p>

* React.js
* Vite
* JavaScript
* React Router
* Axios
* HTML5
* CSS3

---

## Backend

<p align="center">
  <img src="https://img.shields.io/badge/C%23-Backend-239120?style=flat-square&logo=csharp&logoColor=white">
  <img src="https://img.shields.io/badge/ASP.NET%20Core-Web%20API-512BD4?style=flat-square&logo=dotnet&logoColor=white">
  <img src="https://img.shields.io/badge/.NET-8.0-512BD4?style=flat-square&logo=dotnet&logoColor=white">
  <img src="https://img.shields.io/badge/Entity%20Framework%20Core-ORM-512BD4?style=flat-square&logo=dotnet&logoColor=white">
</p>

* C#
* ASP.NET Core Web API
* .NET 8
* Entity Framework Core
* ASP.NET Core Identity
* JWT Authentication
* Google OAuth
* Swagger / OpenAPI

---

## Database

<p align="center">
  <img src="https://img.shields.io/badge/PostgreSQL-Database-4169E1?style=flat-square&logo=postgresql&logoColor=white">
</p>

* PostgreSQL
* Entity Framework Core
* EF Core Migrations

---

## AI & RAG

<p align="center">
  <img src="https://img.shields.io/badge/Python-AI-3776AB?style=flat-square&logo=python&logoColor=white">
  <img src="https://img.shields.io/badge/RAG-Hybrid%20Retrieval-FF6F00?style=flat-square">
  <img src="https://img.shields.io/badge/AI-LLM-8E44AD?style=flat-square">
</p>

* Python
* Retrieval-Augmented Generation
* Hybrid Retrieval
* Semantic Search
* Keyword Retrieval
* Vector Embeddings
* Large Language Models
* Context-aware generation

---

# 📁 Project Structure

```text
ExpensePilot---Financial-Planner/
│
├── backend/
│   │
│   └── ExpensePilot.API/
│       ├── Controllers/
│       ├── Data/
│       ├── DTOs/
│       ├── Models/
│       ├── Services/
│       ├── Migrations/
│       ├── Middleware/
│       ├── Properties/
│       └── Program.cs
│
├── frontend/
│   │
│   └── expensepilot/
│       ├── public/
│       ├── src/
│       │   ├── components/
│       │   ├── pages/
│       │   ├── services/
│       │   ├── assets/
│       │   └── ...
│       ├── package.json
│       └── vite.config.js
│
├── AI/
│   ├── ...
│   └── ...
│
├── Images/
│   └── ExpensePilot-Architecture.png
│
├── README.md
└── .gitignore
```

> The `AI` directory contains the AI-powered Hybrid RAG implementation, while the `backend` directory contains the core ASP.NET Core API and financial management logic.

---

# 🔌 Backend Architecture

The backend is built using **ASP.NET Core Web API** and provides the core business logic and REST APIs for the application.

### Backend responsibilities

* Authentication
* Authorization
* User management
* Transaction management
* Category management
* Budget management
* Financial goals
* Reports
* Dashboard data
* Database operations

### Request Flow

```text
HTTP Request
     │
     ▼
Controller
     │
     ▼
DTO / Validation
     │
     ▼
Business Logic / Service
     │
     ▼
Entity Framework Core
     │
     ▼
PostgreSQL
     │
     ▼
HTTP Response
```

---

# 🔑 Authentication Flow

## JWT Authentication

```text
User
 │
 ▼
Register / Login
 │
 ▼
ASP.NET Core Identity
 │
 ▼
JWT Token
 │
 ▼
React Frontend
 │
 ▼
Authenticated API Requests
```

Protected API endpoints require a valid authentication token.

---

# 🔵 Google OAuth

ExpensePilot also supports Google authentication.

```text
User
 │
 ▼
Google Login
 │
 ▼
Google OAuth
 │
 ▼
Backend Verification
 │
 ▼
Authenticated User
 │
 ▼
JWT Token
 │
 ▼
ExpensePilot
```

---

# 🗄️ Database Architecture

The PostgreSQL database stores application and financial data.

Major data areas include:

```text
User
 │
 ├── Transactions
 │
 ├── Categories
 │
 ├── Budgets
 │
 ├── Financial Goals
 │
 └── Financial Records
```

Entity Framework Core migrations are used to manage database schema changes.

---

# 🔒 Security

ExpensePilot handles sensitive financial information, making security an important part of the system.

The application uses:

* JWT authentication
* ASP.NET Core Identity
* Role-based authorization
* Protected API endpoints
* User-specific data access
* Secure password management
* Google OAuth
* Environment-based secret management
* Database-level user relationships

Each authenticated user's financial information is isolated from other users.

---

# 🔄 Overall Application Flow

```text
                         ┌──────────────┐
                         │     User     │
                         └──────┬───────┘
                                │
                                ▼
                       ┌─────────────────┐
                       │ React Frontend  │
                       └───────┬─────────┘
                               │
                    ┌──────────┴──────────┐
                    │                     │
                    ▼                     ▼
             REST API Requests       AI Requests
                    │                     │
                    ▼                     ▼
          ┌─────────────────┐    ┌─────────────────┐
          │ ASP.NET Core    │    │ AI / Hybrid RAG │
          │ Backend         │    │     Service     │
          └────────┬────────┘    └────────┬────────┘
                   │                      │
                   ▼                      ▼
          ┌─────────────────┐       ┌─────────────┐
          │   PostgreSQL    │       │     LLM     │
          └─────────────────┘       └─────────────┘
```

---

# 📦 Core Application Modules

```text
ExpensePilot
│
├── 🔐 Authentication
│   ├── Registration
│   ├── Login
│   ├── JWT Authentication
│   ├── Google OAuth
│   └── Password Management
│
├── 📊 Dashboard
│   ├── Income Overview
│   ├── Expense Overview
│   ├── Balance
│   ├── Budget Progress
│   └── Financial Summary
│
├── 💳 Transactions
│   ├── Create
│   ├── Read
│   ├── Update
│   └── Delete
│
├── 🏷️ Categories
│   ├── Default Categories
│   └── User Categories
│
├── 💰 Budgets
│   ├── Monthly Budget
│   └── Category Budgets
│
├── 🎯 Financial Goals
│   └── Goal Tracking
│
├── 📈 Reports
│   └── Financial Reporting
│
└── 🤖 AI Financial Assistant
    │
    └── Hybrid RAG
        ├── Query Processing
        ├── Semantic Retrieval
        ├── Keyword Retrieval
        ├── Hybrid Retrieval
        ├── Context Assembly
        └── LLM Generation
```

---

# 🚀 Installation

## Prerequisites

Make sure the following are installed:

* .NET 8 SDK
* Node.js
* npm
* PostgreSQL
* Python
* Git

---

## 1. Clone Repository

```bash
git clone https://github.com/AmnaMastoor/ExpensePilot---Financial-Planner.git

cd ExpensePilot---Financial-Planner
```

---

## 2. Backend Setup

Navigate to the backend:

```bash
cd backend
```

Restore .NET dependencies:

```bash
dotnet restore
```

Configure your database connection and authentication settings.

Apply Entity Framework migrations:

```bash
dotnet ef database update
```

Run the API:

```bash
dotnet run
```

Swagger/OpenAPI can be used to explore and test the API during development.

---

## 3. Frontend Setup

Open another terminal:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the Vite development server:

```bash
npm run dev
```

Open the URL provided by Vite.

---

## 4. AI Setup

Navigate to the AI directory:

```bash
cd AI
```

Create a Python virtual environment:

```bash
python -m venv .venv
```

### Windows

```bash
.venv\Scripts\activate
```

### Linux / macOS

```bash
source .venv/bin/activate
```

Install the required dependencies:

```bash
pip install -r requirements.txt
```

Configure the required AI/LLM environment variables before running the AI component.

---

# 🔐 Environment Configuration

Sensitive credentials should **never be committed to GitHub**.

Depending on the configured environment, the application may require:

```text
Database connection string
JWT configuration
Google OAuth credentials
AI / LLM API credentials
AI service configuration
Frontend API URL
```

Use environment variables or appropriate local configuration files for sensitive information.

---

# 🧪 API Documentation

ExpensePilot exposes RESTful APIs for the major application modules.

Swagger/OpenAPI is included for development and API testing.

Major API areas include:

```text
Authentication
Users
Transactions
Categories
Budgets
Financial Goals
Reports
Dashboard
```

---

# 🧠 AI Design Philosophy

ExpensePilot follows a **retrieval-first AI architecture**.

Instead of asking the language model to answer a financial question using only its internal knowledge, the system first retrieves relevant information.

```text
User Question
      │
      ▼
Retrieve Relevant Information
      │
      ▼
Combine Retrieved Context
      │
      ▼
Provide Context to LLM
      │
      ▼
Generate Response
```

This approach helps produce responses that are better grounded in relevant retrieved information.

---

# 🎯 Project Objectives

ExpensePilot was developed to:

* Simplify personal financial management
* Provide secure financial data management
* Help users track income and expenses
* Improve budgeting
* Track financial goals
* Generate useful financial reports
* Provide AI-powered financial assistance
* Demonstrate Hybrid RAG in a real-world application
* Combine full-stack development with modern AI techniques

---

# 🔮 Future Improvements

Potential future enhancements include:

* Advanced financial analytics
* AI-powered spending recommendations
* Automated transaction categorization
* Spending trend prediction
* Financial forecasting
* Recurring transactions
* Budget alerts
* Email notifications
* AI-generated financial reports
* Advanced RAG evaluation
* Retrieval ranking optimization
* Mobile application
* Enhanced admin analytics

---

# 👥 Contributors

ExpensePilot was collaboratively developed by:

* **Nouman Saeed Butt**
* **Amna Mastoor**

Both contributors worked on the development and implementation of the platform, including its full-stack financial management functionality and AI-powered Hybrid RAG component.

---

# 📜 License

This project was developed for educational and software development purposes.

---

<p align="center">
  <strong>ExpensePilot</strong>
  <br><br>
  <em>Smarter Financial Management Through Full-Stack Development and AI</em>
</p>
