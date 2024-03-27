# PDF Chat Conversations

PDF Chat Conversations is a web application that combines Flask on the backend and Next.js 14 on the frontend to enable users to upload PDF files and engage in dynamic conversations with an AI assistant. The application leverages OpenAI's language model to provide insightful responses based on the content of the uploaded PDF documents.

## Features
- **File Upload**: Users can upload multiple PDF files, and each file's content is processed to initiate individual chat conversations.
- **Interactive Conversations**: The AI assistant engages in interactive conversations with users, answering questions and providing information extracted from the uploaded PDFs.
- **Chat History Storage**: Each uploaded PDF maintains a chat history, allowing users to review and continue conversations over multiple sessions.
- **Effortless Navigation**: The web interface includes a sidebar that lists all uploaded PDF files, facilitating easy navigation between different chat histories.
- **State Management with Redux**: The frontend utilizes Redux for efficient state management, providing a seamless and responsive user experience.
- **Tailwind CSS Styling**: Tailwind CSS is employed for styling the frontend, ensuring a modern and visually appealing design.
- **Virtual Environment Setup**: The project provides instructions for setting up and activating a virtual environment for seamless deployment.


## Table of Contents

- [Installation](#installation)
  - [Virtual Environment](#virtual-environment)
- [Usage](#usage)
- [Endpoints](#endpoints)


## Installation

### Virtual Environment

1. Install and configure virtual environment:

   ```bash
   pip install virtualenv
   virtualenv venv
   ```

2. To activate the virtual environment:

   ```bash
   source venv/bin/activate
   ```

3. To deactivate the virtual environment:

   ```bash
   deactivate
   ```

4. Install project dependencies:

   ```bash
   pip install -r requirements.txt
   ```

### OpenAI API Key
To use the OpenAI language model, you need to provide your OpenAI API key. Follow the steps below to set up the API key:
```env
   OPENAI_API_KEY=your_openai_api_key_here
```

## Usage

1. Start the server:

   ```bash
   python app.py
   ```

2. Open the application in your browser:

   ```
   http://127.0.0.1:8000/
   ```

3. Follow the instructions on the web interface.

## Endpoints

- **POST /upload**: Upload PDF files and start conversations.
- **GET /conversation/<file_id>**: Retrieve conversation history for a specific file.
- **POST /add_message/<file_id>**: Add a message to the conversation for a specific file.
- **GET /files/all**: Retrieve information about all inserted files.

## Frontend Setup (Next.js)

### Installation Steps for Next.js

1. **Node.js and npm:**
   Ensure that you have Node.js and npm installed on your machine. You can download and install them from [Node.js official website](https://nodejs.org/).
2. Navigate to the App Directory:
```bash
cd frontend
```

### Running the Next.js App
1. **Development Server**:
Start the development server with the following command:
```bash
npm run dev
```
This will launch the Next.js app in development mode. Open your browser and navigate to http://localhost:3000 to view your app.

2. **Building for Production**:
When you're ready to deploy your app, build it using the following command:
```bash
npm run build
```
