# 🌐 Tarunet

**Tarunet** is a full-stack MERN (MongoDB, Express, React, Node.js) application that helps users learn new languages by connecting with others through **chat** and **video calls**. The platform uses the **Stream SDK** for real-time communication and is styled with **Tailwind CSS**. It supports authentication, language-based user recommendations, and a friend system. Tarunet is deployed on **Render**.

---

## Project is live at-
https://tarunet.onrender.com/

## ✨ Features

- 🌍 Onboarding system where users select:
  - Their **native language**
  - The **language they are learning**

- 🔍 User Discovery:
  - Get **recommended users** based on language preferences
  - **Send/Accept/Reject friend requests**

- 💬 Real-time Chat:
  - Powered by **Stream Chat**
  - Available once users become friends

- 📹 Video Calling:
  - Also handled using the **Stream** library
  - Initiated via chat interface between connected users

- 🔐 Authentication:
  - JWT-based login and signup
  - Protected routes
  - Logout functionality

- 👥 Friend Management:
  - Add / Remove friends
  - Mutual consent required to enable chat & video call

---

## 📁 Project Structure
```bash
tarunet/
├── backend/                    # Express backend
│   ├── frontend/               # React frontend
│   └── src/                    # Routes, controllers, DB models
├── .gitignore
├── package.json
```


---

## 🧠 Tech Stack

| Layer           | Technology               |
|----------------|--------------------------|
| Frontend        | React, Tailwind CSS       |
| Backend         | Express.js, Node.js       |
| Database        | MongoDB                   |
| Authentication  | JWT                       |
| Realtime Chat    | Stream Chat SDK           |
| Video Call       | Stream Video SDK          |
| Deployment       | Render                    |

---

## 🚀 Getting Started

### 🔧 Prerequisites

- Node.js & npm
- MongoDB (local or MongoDB Atlas)
- [Stream](https://getstream.io/) account (API Key + Secret)

---

### 📦 Install Dependencies

```bash
# Clone the repo
git clone https://github.com/anirudhnegi03/tarunet.git
cd tarunet/backend

# Backend dependencies
npm install

# Frontend dependencies
cd frontend
npm install
```

---

### 🔐 Environment Variables

Create a `.env` file inside `backend/`:

```ini
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
STREAM_API_KEY=your_stream_api_key
STREAM_API_SECRET=your_stream_api_secret
```

---

### ▶️ Run the App Locally

```bash
# Run backend
cd backend
npm run dev

# Run frontend
cd frontend
npm run dev
```

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:5000`

---

### 🧠 How It Works

1. User signs up or logs in using JWT.
2. On first login, user selects native & learning languages.
3. Based on preferences, users are recommended to each other.
4. Users can send, accept, reject, or remove friend requests.
5. Once friends, users can:
   - 💬 Chat using Stream Chat
   - 📹 Start video calls using Stream Video SDK

---

### 📸 Screenshots

<img width="1919" height="1079" alt="Screenshot 2025-07-14 231858" src="https://github.com/user-attachments/assets/31358ca5-0885-44ae-9df8-7e0898314408" /><br>


<img width="1919" height="1079" alt="Screenshot 2025-07-14 232021" src="https://github.com/user-attachments/assets/32df7d94-ca7a-4552-9d3d-11e909781b8c" /><br>


<img width="1919" height="1079" alt="Screenshot 2025-07-14 232039" src="https://github.com/user-attachments/assets/f5eb384d-4731-4610-816f-1bc4bede6c17" /><br>

(user-Anirudh)
<img width="1919" height="851" alt="Screenshot 2025-07-14 232159" src="https://github.com/user-attachments/assets/8caca1ef-a485-4985-88b5-f5c340027720" /><br>


<img width="910" height="1079" alt="Screenshot 2025-07-14 232213" src="https://github.com/user-attachments/assets/7405c630-d1b3-4462-a8d1-eb038e3afa5b" /><br>


<img width="1919" height="1079" alt="Screenshot 2025-07-14 232518" src="https://github.com/user-attachments/assets/991b2819-d992-43ef-b6ec-632b4b529106" /><br>


<img width="1919" height="1079" alt="Screenshot 2025-07-14 232844" src="https://github.com/user-attachments/assets/c7348461-9d6f-4fde-b1d5-b5281827c47e" /><br>


---

### 📦 Deployment

- The app is deployed using [Render](https://render.com)
- Update `.env` on Render dashboard with production values
- Configure auto-deploy from GitHub or use `render.yaml`

