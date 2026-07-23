# 💰 ExpensePilot - AI Financial Planner

ExpensePilot is a smart financial management application designed to help users manage their income, expenses, savings, budgets, and financial goals in one place.

The platform provides a secure and personalized experience where every user can manage their own financial data with authentication and privacy controls.

---

## 🚀 Features

## 🔐 Authentication
- User registration and login
- JWT-based authentication
- Secure user-specific access
- Protected API endpoints

## 💳 Transaction Management
- Add and manage income and expense transactions
- Track spending history
- Organize transactions using categories

## 📂 Category Management
- Default categories available for all users
- Users can create custom categories
- User-specific category visibility
- Secure category access control

## 🎯 Financial Goals
- Create personal financial goals
- Set target amount and deadline
- Update and delete goals
- Each user can only access their own goals

## 📊 Dashboard
Coming Soon:
- Total income overview
- Expense analysis
- Savings progress
- Financial insights

## 🤖 AI Financial Assistant
Coming Soon:
- Smart spending analysis
- Personalized financial recommendations
- Budget suggestions
- AI-powered financial planning

---

# 🛠️ Tech Stack

## Backend
- ASP.NET Core Web API (.NET 8)
- Entity Framework Core
- PostgreSQL
- JWT Authentication
- Swagger API Documentation

## Frontend
- React.js
- Tailwind CSS

## Tools
- Visual Studio
- Git & GitHub
- Postman / Swagger

---

# 📁 Project Structure

```
ExpensePilot
│
├── Backend
│   └── ExpensePilot.API
│       ├── Controllers
│       ├── Models
│       ├── DTO
│       ├── Data
│       └── Services
│
├── Frontend
│   └── React Application
│
└── README.md
```

---

# ⚙️ Installation & Setup

## Clone Repository

```bash
git clone https://github.com/AmnaMastoor/ExpensePilot---Financial-Planner.git
```

---

# 🔧 Backend Setup

Navigate to backend folder:

```bash
cd Backend/ExpensePilot.API
```

Restore dependencies:

```bash
dotnet restore
```

Apply database migrations:

```bash
dotnet ef database update
```

Run backend:

```bash
dotnet run
```

API documentation:

```
https://localhost:<port>/swagger
```

---

# 🎨 Frontend Setup

Navigate to frontend folder:

```bash
cd Frontend
```

Install dependencies:

```bash
npm install
```

Run frontend:

```bash
npm run dev
```

---

# 🔒 Security

ExpensePilot follows secure development practices:

- JWT authentication
- User-specific authorization
- Protected financial information
- Secure API access
- Database migrations using Entity Framework Core

---

# 🗄️ Database Entities

Current entities:

- Application User
- Categories
- Transactions
- Financial Goals

Planned entities:

- Budgets
- Savings
- AI Recommendations

---

# 👥 Contributors

| Name | Role |
|------|------|
| Nouman Saeed | Backend Development |
| Amna Mastoor | Full Stack Development |

---

# 📌 Future Enhancements

- AI-powered financial assistant
- Automated budget recommendations
- Expense prediction
- Data visualization dashboard
- Financial reports
- Mobile application
- Smart saving suggestions

---

# 📸 Screenshots

Coming Soon 🚀

---

# 📄 License

This project is developed for educational and portfolio purposes.
