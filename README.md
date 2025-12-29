
Enterprise Expense Approval Dashboard

🔗 Live Demo: https://enterprise-expense-approval-dashboa.vercel.app

An enterprise-style expense approval system built using modern React architecture, simulating real-world company workflows for employees, managers, and finance teams.

This project is designed specifically to stand out to recruiters in 2026 by focusing on business logic, role-based flows, and analytics — not just UI.

-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

✨ Key Features

👤 Employee
1.Submit expense requests
2.Select category (Travel, Food, Office, Other)
3.View submission status (Pending / Approved / Rejected)

👔 Manager
1.Review pending expenses
2.Approve or reject requests
3.Instant UI updates without page reload

💰 Finance

1.View approved expenses
2.Analytics dashboard with charts
3.Category-wise expense breakdown

-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

🛠️ Tech Stack

1.React + TypeScript
2.Vite (fast dev & build)
3.Context API (global state)
4.React Router (role-based routing)
5.Tailwind CSS (enterprise UI)
6.Recharts (analytics & charts)
8.LocalStorage (mock backend)

-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

🗂️ Folder Structure
src/
├── components/     # Reusable UI components
├── pages/          # Employee, Manager, Finance screens
├── context/        # Global state (ExpenseContext)
├── types/          # TypeScript interfaces
├── utils/          # Helpers
└── App.tsx         # Routing & layout

-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

🔄 Application Workflow

1.Employee submits an expense → status pending
2.Manager reviews and approves/rejects
3.Finance views analytics on approved expenses
4.Data persists using LocalStorage (mock backend)

-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

🧩 Architecture Overview

1.Single Source of Truth via Context API
2.Controlled components for forms
3.Role-based routing for clean separation
4.Easy to plug in real backend APIs later

-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

🐞 Real Bug Fixed (Interview Highlight)

Fixed an issue where all expenses were saved as Travel
Root cause: uncontrolled select input
Solution: controlled state & dynamic category binding
✔ Demonstrates real debugging and problem-solving skills

-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

🚀 Getting Started (Local Setup)
git clone https://github.com/your-username/enterprise-expense-approval-dashboard.git
cd enterprise-expense-approval-dashboard
npm install
npm run dev
Open: http://localhost:5173

-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

📈 Future Enhancements

1.Authentication & protected routes
2.Backend APIs (Node / Spring / Firebase)
3.Notifications for approvals
4.Export reports (CSV / PDF)
5.Role-based access control (RBAC)

------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

📌 Resume Highlights (ATS-Friendly)

Built an enterprise expense approval dashboard using React and TypeScript
Implemented role-based workflows for employees, managers, and finance teams
Designed analytics dashboards using Recharts
Used Context API and LocalStorage to simulate backend state management
Focused on scalable frontend architecture and real-world business logic

------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

🎯 One-Line Pitch

An enterprise expense approval system with role-based workflows and analytics, built using modern React architecture.

------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
⭐ If you are a recruiter or reviewer, feel free to explore the live demo:

👉 https://enterprise-expense-approval-dashboa.vercel.app
------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
