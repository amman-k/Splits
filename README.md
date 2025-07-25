# Splits - MERN Stack Money Splitting App

Splits is a full-stack web application designed to help users track and split group expenses easily. Built with the MERN (MongoDB, Express.js, React, Node.js) stack, this application allows users to create groups, add expenses, and see a simplified summary of who owes whom.

## Features

* **Full User Authentication:** Secure user registration and login with JWT (JSON Web Token) authentication.
* **Group Management:**
    * Create new groups, which automatically makes you the owner.
    * Join existing groups using a unique, auto-generated 8-character code.
* **Expense Tracking:**
    * Any member of a group can add a new expense.
    * Expenses are split equally among all group members.
* **Admin Approval Workflow:**
    * Expenses added by non-owners are marked as "pending".
    * The group owner has exclusive permission to "approve" or "reject" pending expenses, ensuring financial accuracy.
* **Dynamic Balance Calculation:**
    * A real-time balance summary shows a simplified view of who owes whom within the group.
    * Balances are only calculated based on approved expenses.
* **Modern UI/UX:**
    * A sleek, responsive, dark-mode interface built with React and styled with Tailwind CSS.
    * Interactive modals for creating and joining groups.
    * Animated and polished UI elements for a better user experience.

## Tech Stack

### Backend

* **Node.js:** JavaScript runtime environment.
* **Express.js:** Web framework for Node.js.
* **MongoDB:** NoSQL database for storing data.
* **Mongoose:** Object Data Modeling (ODM) library for MongoDB.
* **JSON Web Token (JWT):** For secure user authentication.
* **bcryptjs:** For hashing passwords.
* **nanoid:** For generating unique group join codes.

### Frontend

* **React:** JavaScript library for building user interfaces (with Vite).
* **React Router:** For client-side routing and navigation.
* **Axios:** For making API requests to the backend.
* **Tailwind CSS:** A utility-first CSS framework for styling.
* **React Icons:** For including high-quality icons.

## Getting Started

Follow these instructions to get a local copy of the project up and running.

### Prerequisites

* **Node.js & npm:** [Download & Install Node.js](https://nodejs.org/)
* **MongoDB:** You need a running MongoDB instance. You can [install it locally](https://www.mongodb.com/try/download/community) or use a free cloud service like [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/your-username/splits.git](https://github.com/your-username/splits.git)
    cd splits
    ```

2.  **Setup the Backend:**
    * Navigate to the backend directory: `cd backend`
    * Install dependencies: `npm install`
    * Create a `.env` file in the `backend` directory and add your secret keys:
        ```env
        MONGO_URI="your_mongodb_connection_string"
        JWT_SECRET="your_super_secret_jwt_key"
        ```
    * Start the backend server: `npm run dev`
    * The server will be running on `http://localhost:5001`.

3.  **Setup the Frontend:**
    * Open a **new terminal window**.
    * Navigate to the frontend directory: `cd frontend/splits-app`
    * Install dependencies: `npm install`
    * Start the frontend development server: `npm run dev`
    * The application will open in your browser at `http://localhost:5173` (or another available port).

You can now register a new user and start using the application!
