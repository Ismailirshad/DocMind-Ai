# DocMind AI – RAG-Powered Document Assistant

DocMind AI is an AI-powered document assistant that allows users to upload PDF documents and ask questions using **Retrieval-Augmented Generation (RAG)**.

It processes documents into smaller text chunks, generates vector embeddings, and stores them in MongoDB Atlas for semantic search. When a user asks a question, the system retrieves relevant content and uses Google Gemini to generate accurate, context-aware responses.

**Live Demo:** https://docmind-ai.ismailirshad.in/

**GitHub:** https://github.com/Ismailirshad/DocMind-Ai

## Features

### Authentication
- User registration and login
- Google OAuth authentication
- JWT access and refresh token authentication
- Automatic access-token refresh
- Protected API routes

### Document Management
- PDF upload and processing
- Cloudinary file storage
- Text extraction using `pdf-parse`
- Automatic page count calculation
- Document categorization and search
- Document management and deletion

### RAG-Based AI Chat
- Text chunking with overlapping sections
- Vector embedding generation using Gemini Embedding API
- Embedding storage in MongoDB Atlas
- Semantic retrieval using MongoDB Atlas Vector Search
- Single-document and multi-document querying
- Context-aware answer generation using Gemini 2.5 Flash
- User-specific document retrieval
- Responses grounded in retrieved document content

### Chat & Dashboard
- Persistent chat history
- Document-based conversations
- Document and indexed-page statistics
- User-specific usage tracking
- Admin dashboard for user and document monitoring

### User Interface
- Responsive dark-themed interface
- Document selection and chat interface
- Loading skeletons and toast notifications
- Zustand state management

## Tech Stack

| Category | Technologies |
|---|---|
| Frontend | Next.js, React, JavaScript, Tailwind CSS |
| State Management | Zustand |
| Backend | Next.js API Routes, Node.js |
| Database | MongoDB Atlas, Mongoose |
| AI Model | Google Gemini 2.5 Flash |
| Embeddings | Gemini Embedding API |
| Vector Search | MongoDB Atlas Vector Search |
| Authentication | JWT, Google OAuth |
| HTTP Client | Axios |
| PDF Processing | pdf-parse |
| File Storage | Cloudinary |

## RAG Architecture

DocMind AI uses Retrieval-Augmented Generation to provide document-aware answers.

```text
          PDF Upload
              |
              v
       Cloudinary Storage
              |
              v
        PDF Text Extraction
              |
              v
         Text Chunking
       (Overlapping Chunks)
              |
              v
       Gemini Embeddings
              |
              v
      MongoDB Atlas Storage
       (Document Vectors)
              |
              v
        User Question
              |
              v
     Generate Query Embedding
              |
              v
    MongoDB Atlas Vector Search
              |
              v
      Retrieve Top 5 Chunks
              |
              v
     Retrieved Context + Question
              |
              v
       Gemini 2.5 Flash
              |
              v
        AI-Generated Answer
```

## How It Works

1. Users upload PDF documents.
2. The application extracts text and splits it into overlapping chunks.
3. Each chunk is converted into a vector embedding using Gemini Embedding API.
4. Embeddings and associated metadata are stored in MongoDB Atlas.
5. When a user asks a question, the question is converted into an embedding.
6. MongoDB Atlas Vector Search retrieves the five most relevant chunks.
7. Retrieved content is provided to Gemini 2.5 Flash as context.
8. Gemini generates a response based on the retrieved information.

**Retrieval modes:**
- **Single-document:** Searches within the selected document.
- **Multi-document:** Searches across all documents belonging to the authenticated user.

## Project Structure

```text
src/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   ├── chat/
│   │   ├── document/
│   │   └── admin/
│   └── (dashboard)/
│       ├── documents/
│       ├── history/
│       ├── settings/
│       └── admin/
├── components/
├── lib/
│   ├── axios.ts
│   ├── embedding.ts
│   ├── gemini.ts
│   ├── db.ts
│   └── auth/
├── models/
│   ├── User.ts
│   ├── Document.ts
│   ├── DocumentChunk.ts
│   └── Chat.ts
└── store/
    ├── userStore.ts
    ├── documentStore.ts
    └── chatStore.ts
```

## Getting Started

### Prerequisites
- Node.js
- MongoDB Atlas account with Vector Search support
- Google Gemini API key
- Cloudinary account
- Google OAuth credentials (if using Google login)

### Installation

```bash
git clone https://github.com/Ismailirshad/DocMind-Ai.git

cd DocMind-Ai

npm install
```

Configure your environment variables in a `.env` file using the variable names expected by the application.

Start the development server:

```bash
npm run dev
```

Open http://localhost:3000.

## Future Improvements
- Document source citations with page references
- Streaming AI responses
- Advanced document filtering and retrieval
- Improved conversational context management

## Author

**Ismail Irshad**

- Portfolio: https://www.ismailirshad.in
- GitHub: https://github.com/Ismailirshad
- LinkedIn: https://www.linkedin.com/in/ismail-irshad
