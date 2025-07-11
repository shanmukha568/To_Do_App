# 📝 Smart To-Do List Application

An intuitive and responsive To-Do List application built with **Angular** and **Firebase Firestore**, featuring task creation, filtering, sorting, real-time updates, and a modern UI using Angular Material.

---

## 📌 Features

- ✅ Add new tasks with title, description, category, and due date
- 📝 View full task descriptions in a dialog
- 🕒 Sort tasks by created date or due date
- 🔍 Filter tasks by status: Pending, Completed, All
- ✅ Mark tasks as complete/incomplete
- 🗑️ Delete tasks
- 📄 Paginate task list
- 🔄 Real-time sync with Firebase Firestore
- 📅 Prevent selecting past due dates

---

## 🛠️ Tech Stack

| Layer       | Technology             |
|-------------|------------------------|
| Frontend    | Angular 14+            |
| UI          | Angular Material       |
| Backend     | Firebase Firestore     |
| Language    | TypeScript             |
| Forms       | Reactive Forms         |

---

## 🚀 Getting Started

### Prerequisites

- Node.js & npm
- Angular CLI (`npm install -g @angular/cli`)
- Firebase account (for Firestore setup)

### Installation

1. **Clone the repository**

 ```bash
  git clone https://github.com/your-username/todo-app.git
  cd todo-app
  npm install

### Firebase Setup

    Go to Firebase Console

    Create a project and enable Firestore Database

    In src/environments/environment.ts, add your Firebase config:

    export const environment = {
    production: false,
    firebase: {
        apiKey: 'YOUR_API_KEY',
        authDomain: 'YOUR_PROJECT_ID.firebaseapp.com',
        projectId: 'YOUR_PROJECT_ID',
        storageBucket: 'YOUR_PROJECT_ID.appspot.com',
        messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
        appId: 'YOUR_APP_ID'
    }
    };

2. **Run the app**

ng serve

