# DocMind AI – AI-Powered Document Chat

DocMind AI is an AI-powered document assistant that allows users to upload PDF documents, process their content, and interact with them through an intelligent chat interface.

Users can ask questions about a selected document, query multiple documents, or ask general questions. The application uses document-aware AI responses to provide relevant answers based on the uploaded content and clearly indicates when information is not available in the selected document.

## 🚀 Live Demo

🔗 Live: https://docmind-ai.ismailirshad.in/

🔗 GitHub: https://github.com/Ismailirshad/DocMind-Ai.git

---

## ✨ Features

### 🔐 Authentication

- User registration and login
- Google OAuth authentication
- JWT-based authentication
- Access token and refresh token based session management
- Automatic access-token refresh when the access token expires
- Protected API routes
- Persistent authentication using refresh tokens
- Logout functionality

### 📄 Document Management

- Upload PDF documents
- Store uploaded files using Cloudinary
- Extract text from PDFs using `pdf-parse`
- Automatically calculate PDF page count
- Store document metadata and extracted text in MongoDB
- Organize documents using categories
- Search documents by title
- View uploaded documents
- Delete/manage documents

### 🤖 AI Document Chat

- Ask questions about a selected document
- Ask questions across multiple documents
- Ask general AI questions without selecting a document
- Gemini-powered AI responses
- Document-aware question answering
- Context-based responses using extracted document content
- Clear response when requested information is not available in the document
- Separation between document-based answers and general AI answers
- Chat history for each document

### 💬 Chat History

- Store user questions and AI responses
- Associate conversations with documents
- View previous conversations
- Display chat counts
- Search document conversation history

### 📊 Dashboard

- Total document count
- Total indexed pages
- Total AI chat count
- Recent documents
- Document search
- Category-based organization

### 🎨 User Interface

- Responsive UI
- Dark-themed interface
- Loading skeletons
- Toast notifications
- Document selection interface
- Chat interface with user and AI messages
- Responsive document management interface

---

## 🛠️ Tech Stack

### Frontend

- Next.js
- React
- JavaScript
- Tailwind CSS
- Zustand
- Axios

### Backend

- Next.js API Routes
- Node.js
- JWT
- MongoDB
- Mongoose

### AI

- Google Gemini API

### Authentication

- JWT Access Tokens
- JWT Refresh Tokens
- Google OAuth

### Document Processing

- `pdf-parse`
- Cloudinary

### Storage

- MongoDB Atlas
- Cloudinary

---

## 🏗️ Application Architecture

```text
                         ┌─────────────────────┐
                         │       User          │
                         └──────────┬──────────┘
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │    Next.js / React  │
                         │      Frontend       │
                         └──────────┬──────────┘
                                    │
                              Axios API
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │    Next.js API       │
                         │      Routes          │
                         └──────────┬──────────┘
                                    │
                ┌───────────────────┼───────────────────┐
                │                   │                   │
                ▼                   ▼                   ▼
        ┌──────────────┐    ┌──────────────┐    ┌──────────────┐
        │   MongoDB    │    │  Cloudinary  │    │ Gemini API   │
        │              │    │              │    │              │
        │ Users        │    │ PDF Files    │    │ AI Answers   │
        │ Documents    │    │              │    │              │
        │ Chats        │    │              │    │              │
        └──────────────┘    └──────────────┘    └──────────────┘
                                    │
                                    ▼
                            ┌──────────────┐
                            │   pdf-parse  │
                            │              │
                            │ Text Extract │
                            └──────────────┘



📁 Project Structure

The project follows a Next.js application structure with separate components, API routes, models, stores, and utility functions.

docmind-ai/
│
├── src/
│   │
│   ├── app/
│   │   ├── api/
│   │   │   ├── auth/
│   │   │   │   ├── login/
│   │   │   │   ├── register/
│   │   │   │   ├── refresh/
│   │   │   │   ├── logout/
│   │   │   │   └── profile/
│   │   │   │
│   │   │   ├── chat/
│   │   │   │   ├── chat/
│   │   │   │   └── getchat/
│   │   │   │
│   │   │   └── document/
│   │   │       ├── upload/
│   │   │       ├── fetchdocuments/
│   │   │       └── ...
│   │   │
│   │   ├── history/
│   │   ├── documents/
│   │   ├── login/
│   │   └── ...
│   │
│   ├── components/
│   │   ├── Documents.tsx
│   │   ├── ChatMessage.tsx
│   │   ├── PdfViewerModal.tsx
│   │   ├── Sidebar.tsx
│   │   └── ...
│   │
│   ├── lib/
│   │   ├── axios.ts
│   │   ├── auth/
│   │   ├── db.ts
│   │   └── ...
│   │
│   ├── models/
│   │   ├── User.ts
│   │   ├── Document.ts
│   │   └── Chat.ts
│   │
│   └── store/
│       ├── userStore.ts
│       ├── documentStore.ts
│       └── chatStore.ts
│
├── public/
│
├── .env
├── package.json
└── README.md

🤖 AI Chat Flow

DocMind AI supports three types of questions.

## Selected Document Questions

The user selects a document and asks a question.

User Question
      │
      ▼
Selected Document
      │
      ▼
Extracted Document Text
      │
      ▼
Gemini API
      │
      ▼
Document-aware Answer

The AI is instructed to use the selected document as the primary source of information.

If the requested information cannot be found in the document, the application provides a clear response instead of presenting unrelated information as if it came from the document.

## Multi-Document Questions

Users can query information across multiple uploaded documents.

User Question
      │
      ▼
Multiple Documents
      │
      ▼
Relevant Document Content
      │
      ▼
Gemini API
      │
      ▼
Combined Answer

## General Questions

Users can also ask general questions without selecting a document.

User Question
      │
      ▼
No Document Selected
      │
      ▼
Gemini API
      │
      ▼
General AI Response

This keeps general AI conversations separate from document-based answers.


Conclusion

DocMind AI is a full-stack AI-powered document assistant that combines Next.js, MongoDB, Zustand, JWT authentication, Google OAuth, Cloudinary, PDF processing, and Gemini AI to provide an interactive document-based question-answering experience.

The project demonstrates the implementation of secure authentication, PDF processing, cloud file storage, document-aware AI conversations, multi-document querying, chat history, and automatic access-token refresh, providing a practical end-to-end example of building an AI-powered SaaS application.
```
