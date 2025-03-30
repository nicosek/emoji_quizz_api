# 🧠 EmojiQuizz – Backend API

**EmojiQuizz** is a multiplayer emoji-based quiz web app.  
Users join groups, create quizzes made of emoji questions, submit their answers in real-time, and compete for the fastest and most accurate answers.

This Express.js backend API handles all the app logic: authentication, groups, quizzes, submissions, leaderboard, etc.

---
### 🚀 Main Features
<details>
<summary>Check</summary>

- JWT-based authentication
- Group system with roles (`member` / `admin`)
- Emoji-based quiz questions
- Multilingual answers (French / English)
- Multiple submissions per user
- Automatic score computation with fuzzy matching (`levenshtein`)
- Per-quiz leaderboard
- Cloudinary image uploads
- Modular MVC architecture

</details>

---

### ⚙️ Quickstart
<details>
<summary>Check</summary>

#### 📦 Installation

```bash
git clone https://github.com/yourname/emojiquizz.git
cd emojiquizz
npm install
```

#### 🔐 Configuration

Create a `.env` file:

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/emojiquizz
JWT_SECRET=yourSecretKey
CLOUDINARY_CLOUD_NAME=xxxx
CLOUDINARY_API_KEY=xxxx
CLOUDINARY_API_SECRET=xxxx
```

#### ▶️ Start the server

```bash
npm run dev
```

The API will run on `http://localhost:3000`.

</details>

---
### Endpoints
<details>
<summary>Check</summary>
   
<details>
<summary>🧪 Authentication</summary>

| Method | Endpoint         | Description    |
|--------|------------------|----------------|
| POST   | /api/auth/signup | Sign up        |
| POST   | /api/auth/login  | Log in         |

</details>

---

<details>
<summary>👥 Users</summary>

| Method | Endpoint               | Access       | Description                        |
|--------|------------------------|--------------|------------------------------------|
| GET    | /api/users             | Global admin | List all users                     |
| GET    | /api/users/:id         | Global admin | Show a specific user               |
| POST   | /api/users             | Global admin | Create a user                      |
| PATCH  | /api/users/:id         | User / Admin | Update own user profile            |
| PATCH  | /api/users/:id/promote | Global admin | Promote to global admin            |
| DELETE | /api/users/:id         | Global admin | Delete a user                      |

</details>

---

<details>
<summary>👨‍👩‍👧‍👦 Groups & Memberships</summary>

### Groups

| Method | Endpoint         | Description                         |
|--------|------------------|-------------------------------------|
| GET    | /api/groups      | List all groups                     |
| POST   | /api/groups      | Create a group                      |
| GET    | /api/groups/:id  | Show group details + members        |
| PATCH  | /api/groups/:id  | Update group name (if admin)        |
| DELETE | /api/groups/:id  | Delete a group                      |

### Memberships

| Method | Endpoint                                     | Description                         |
|--------|----------------------------------------------|-------------------------------------|
| POST   | /api/groups/:groupId/members/:userId         | Add a user to group                 |
| PATCH  | /api/groups/:groupId/members/:userId         | Change role (admin/member)          |
| DELETE | /api/groups/:groupId/members/:userId         | Remove user from group              |

</details>

---

<details>
<summary>🧠 Categories & Questions</summary>

### Categories

| Method | Endpoint                            | Description                |
|--------|-------------------------------------|----------------------------|
| GET    | /api/groups/:groupId/categories     | List categories            |
| POST   | /api/groups/:groupId/categories     | Create a category          |
| PATCH  | /api/groups/:groupId/categories/:id | Update a category          |
| DELETE | /api/groups/:groupId/categories/:id | Delete (if no questions)   |

### Questions

| Method | Endpoint                                      | Description                        |
|--------|-----------------------------------------------|------------------------------------|
| GET    | /api/categories/:categoryId/questions         | List own questions in a category   |
| POST   | /api/categories/:categoryId/questions         | Create a question                  |
| PATCH  | /api/categories/:categoryId/questions/:id     | Update a question                  |
| DELETE | /api/categories/:categoryId/questions/:id     | Delete a question                  |

</details>

---

<details>
<summary>🧩 Quizzes</summary>

| Method | Endpoint                                 | Description                              |
|--------|------------------------------------------|------------------------------------------|
| GET    | /api/groups/:groupId/quizzes             | List quizzes for a group                 |
| POST   | /api/groups/:groupId/quizzes             | Create a new quiz                        |
| GET    | /api/quizzes/:id                         | Show quiz (with or without answers)      |
| PATCH  | /api/quizzes/:id                         | Update quiz (only before it starts)      |
| DELETE | /api/quizzes/:id                         | Delete quiz                              |
| GET    | /api/quizzes/:id/leaderboard             | Get quiz leaderboard                     |

</details>

---

<details>
<summary>📝 Submissions</summary>

| Method | Endpoint                                                 | Description                            |
|--------|----------------------------------------------------------|----------------------------------------|
| POST   | /api/quizzes/:quizId/quiz_submissions                    | Submit answers                         |
| GET    | /api/quizzes/:quizId/quiz_submissions                    | View all submissions (after deadline)  |
| GET    | /api/quizzes/:quizId/users/:userId/quiz_submissions      | View submissions of a specific user    |
| GET    | /api/quiz_submissions/:id                                | View details of a submission           |

</details>

</details>

---

### 🧱 Tech Stack

<details>
<summary>Check</summary>

- Node.js + Express.js
- MongoDB (via Mongoose)
- JWT Auth
- Cloudinary for images
- Modular MVC architecture:
  - controllers/
  - serializers/
  - policies/
  - services/
  - models/
  - middlewares/
  - utils/

</details>

---

## 📁 Folder Structure

```
src/
├── controllers/
├── models/
├── policies/
├── serializers/
├── services/
├── utils/
├── routes/
├── middlewares/
└── index.js
```

---

## 👨‍💻 Author

Built by **Nicolas Sekri** as part of a full-stack training project.

---

## 🏗️ Frontend Integration

A frontend is being built using **React + Vite** and will consume this API.  
This backend is **fully functional and ready to be connected**.
