# 📋 To-Do List App (Node.js + Express + Prisma + EJS)

A simple task management web app built with:

- **Node.js + Express.js** (Backend)
- **Prisma ORM** (MySQL Database)
- **EJS** (Server-side templates)
- **Bootstrap** (Styling)
- **jQuery + AJAX** (Client-side interactions)

---

## 🚀 Features

✅ Add new tasks (AJAX, no page reload)  
✅ Mark tasks as completed / not completed  
✅ Delete tasks  
✅ Edit tasks (inline edit + save)  
✅ Filter tasks (All / Completed / Not Completed)  

---

## 📦 Installation

### 1️⃣ Clone the repository
```bash
git clone <REPO_URL>
cd todo-app
2️⃣ Install dependencies
bash
Copy
Edit
npm install
3️⃣ Setup the database
Create a MySQL database (e.g., todo_app) and update .env:

ini
Copy
Edit
DATABASE_URL="mysql://root@localhost:3306/todo_app"
Run Prisma migrations:

bash
Copy
Edit
npx prisma migrate dev --name init
npx prisma generate
4️⃣ Start the server
bash
Copy
Edit
npm run dev
The app will run on http://localhost:3000

📂 Project Structure
pgsql
Copy
Edit
todo-app/
│── prisma/
│   └── schema.prisma
│── views/
│   └── index.ejs
│── public/        # optional custom CSS/JS
│── .env
│── package.json
│── index.js
🛠️ Tech Stack
Express.js – server framework

Prisma ORM – database access (MySQL)

EJS – server-side templates

Bootstrap – UI styling

jQuery – AJAX requests and event handling

✨ Optional Features
✔️ Edit tasks (inline update)
✔️ Filter tasks (All / Completed / Not Completed)

📸 Screenshots
(Add screenshots here if needed)

📌 Author
Created as part of ESN Home Assignment – Fullstack Developer Test.