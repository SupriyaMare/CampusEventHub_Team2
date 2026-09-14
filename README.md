# CampusEventHub

Welcome to CampusEventHub, your one-stop portal for discovering, connecting with, and experiencing every event happening on campus. From tech fests and cultural nights to workshops and competitions, never miss out on what's happening around you.

---

## ✨ Features

- **Event Discovery:** Browse a comprehensive list of all upcoming campus events.
- **Detailed Event Information:** Get all the details you need, including date, time, venue, and description.
- **User Authentication:** Secure registration and login for students and organizers.
- **Event Management:** A dedicated dashboard for organizers to create, update, and manage their events.
- **Responsive Design:** A seamless experience whether you're on your desktop or mobile device.

---

## 🛠️ Tech Stack

This project is a full-stack application built with the MERN stack and Vite for a fast development experience.

- **Frontend:**

  - **React:** A JavaScript library for building user interfaces.
  - **Vite:** A next-generation frontend tooling for blazing fast development.
  - **React Router:** For declarative routing within the application.
  - **(Optional: Add State Management like Redux or Zustand)**
  - **(Optional: Add CSS Framework like Tailwind CSS or Material-UI)**

- **Backend:**
  - **Node.js:** A JavaScript runtime environment.
  - **Express.js:** A minimal and flexible Node.js web application framework.
  - **MongoDB:** A cross-platform document-oriented NoSQL database.
  - **Mongoose:** An elegant MongoDB object modeling tool for Node.js.
  - **JWT (JSON Web Tokens):** For secure user authentication.

---

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You need to have the following software installed on your machine:

- [Node.js](https://nodejs.org/en/) (v16 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [MongoDB](https://www.mongodb.com/try/download/community) (or a MongoDB Atlas account)

### Installation & Setup

1.  **Clone the repository:**

    ```bash
    git clone [https://github.com/your-username/CampusEventHub.git](https://github.com/your-username/CampusEventHub.git)
    cd CampusEventHub
    ```

2.  **Setup the Backend:**

    ```bash
    # Navigate to the backend directory
    cd backend

    # Install dependencies
    npm install

    # Create a .env file in the backend directory
    # and add the following environment variables:
    touch .env
    ```

    Your `backend/.env` file should look like this:

    ```env
    PORT=5000
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_super_secret_jwt_key
    ```

3.  **Setup the Frontend:**

    ```bash
    # Navigate to the frontend directory from the root
    cd ../frontend

    # Install dependencies
    npm install

    # Create a .env file in the frontend directory
    # and add the following environment variable:
    touch .env
    ```

    Your `frontend/.env` file should look like this. This tells your React app where to find the backend API.

    ```env
    VITE_API_BASE_URL=http://localhost:5000
    ```

### Running the Application

You'll need to run both the backend and frontend servers in separate terminals.

1.  **Run the Backend Server:**

    ```bash
    # From the /backend directory
    npm start
    ```

    Your backend server should now be running on `http://localhost:5000`.

2.  **Run the Frontend Development Server:**
    ```bash
    # From the /frontend directory
    npm run dev
    ```
    Your React application should now be running on `http://localhost:5173` (or another port specified by Vite).

---

## 🌐 Deployment & Live Demo

This application is fully deployed and accessible online. The backend and frontend are hosted separately.

* **Frontend (Vercel):** [**https://campus-connect-swart.vercel.app**](https://campus-connect-swart.vercel.app)
* **Backend (Render):** [**https://campuseventhub-api.onrender.com**](https://campuseventhub-api.onrender.com)

### Deployment Strategy

This project uses a split-hosting model for optimal performance:

#### 1. Backend on Render

The Node.js/Express backend is deployed on Render as a Docker container.
* **Service Type:** Web Service
* **Environment:** `Docker`
* **Root Directory:** `backend`
* **Dockerfile Path:** `Dockerfile`
* **Environment Variables:**
    * `MONGO_URI`: (Your MongoDB connection string)
    * `JWT_SECRET`: (Your secret key for tokens)

#### 2. Frontend on Vercel

The React/Vite frontend is deployed on Vercel.
* **Framework Preset:** `Vite`
* **Root Directory:** `frontend`
* **Environment Variable:**
    * `VITE_API_BASE_URL`: `https://campuseventhub-api.onrender.com` (pointing to the live backend)

---

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
## Project Title: CampusEventHub – Inter-College Event Management Platform

Objective:
CampusEventHub provides a centralized platform for colleges to host and manage
various events such as sports competitions, hackathons, cultural fests, and workshops.
Students from different colleges can browse upcoming events, register for participation,
and track event details seamlessly.
Outcomes:-
Enable students to view and register for inter college events.
- Allow colleges to manage event listings, registrations, and schedules efficiently.
- Provide real-time updates on event statuses and registrations.
- Foster engagement through event feedback and discussions.
Modules:
Module A:
Authentication & User Management
Module B:
Event Listing & Registration
Module C:
Event Management Dashboard
Module D:
Community Feedback & Interaction


# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
