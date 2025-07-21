# Multimodal Code Debug Assistant - Frontend

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)

The user interface for the Multimodal Code Debug Assistant is a full-stack developer tool that leverages Large Language Models (LLMs) to provide intelligent debugging suggestions based on code, logs, and screenshot analysis.

### ➤ [View Backend Repository](https://github.com/Aranav8/Nebula_AI_Assignment_Backend)

---

## 🖼️ Application Gallery & Workflow

The user flow is designed to be simple and intuitive: authenticate, submit your bug's context, and receive an instant AI-powered solution.

### 1. Secure Authentication

A clean and simple interface for user registration and login.

| Login Page | Signup Page |
| :---: | :---: |
| ![Login Page](https://github.com/user-attachments/assets/4d042c8a-7e8e-44be-8352-ec03ea6a1d95) | ![Signup Page](https://github.com/user-attachments/assets/8d7585f1-1389-4901-9e1d-cf5691ac5d95) |

<br/>

### 2. Multimodal Bug Submission

Once logged in, the user is presented with the main dashboard. Here, they can provide a complete picture of their bug by inputting:
- A title for the session.
- The problematic code snippet in a rich editor.
- The full error trace or console output.
- Any relevant logs.
- A screenshot of the UI to provide visual context (optional).

![Dashboard Input](https://github.com/user-attachments/assets/a916aeaa-d734-407d-9177-9faefb955d55)

<br/>

### 3. AI-Powered Solution

After submitting the context, the backend processes all the information and returns a structured suggestion from the Google Gemini AI. The UI then neatly displays:
- **The Rationale:** A clear, step-by-step explanation of what the bug is and why it occurred.
- **The Corrected Code:** A ready-to-use code block with the fix applied, displayed in a read-only editor.

![Dashboard Output](https://github.com/user-attachments/assets/18c5c63a-abae-4ec5-8119-e9e7b45df752)

---

## ✨ Features

- **Secure User Authentication:** JWT-based login and registration flows.
- **Modern UI:** A clean, responsive interface built with TailwindCSS.
- **Rich Code Editing:** Integrated Monaco Editor (the engine for VS Code) for a premium code input experience.
- **Multimodal Inputs:** Accepts code snippets, error traces, logs, and image uploads.
- **Dynamic Results:** Displays the AI-generated rationale and corrected code in a clear, easy-to-read format.

---

## 🛠️ Tech Stack

- **Framework:** React.js (v18) with TypeScript
- **Styling:** TailwindCSS
- **State Management:** Zustand
- **API Communication:** Axios
- **Routing:** React Router v6
- **Code Editor:** Monaco Editor

---

## 🚀 Getting Started

To get the frontend running locally, follow these steps.

### Prerequisites

- Node.js (v18 or higher) installed.
- **The [backend server](https://github.com/Aranav8/Nebula_AI_Assignment_Backend) must be running first.** The frontend cannot function without it.

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Aranav8/Nebula_AI_Assignment
    cd Nebula_AI_Assignment
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Configure environment variables:**
    
    The frontend needs to know the address of the backend API. Create a file named `.env` in the root of the project folder. The default value is set up to work with the backend running on port 5001.
    
    ```env
    # ./.env
    REACT_APP_API_BASE_URL=http://localhost:5001/api
    ```

4.  **Start the development server:**
    ```bash
    npm start
    ```
    The application will open automatically in your browser at `http://localhost:3000`.
