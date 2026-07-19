# rag-document-chat

AI-powered RAG system that allows users to chat with PDF documents using vector search and LLMs.

## Requirements

- Node.js 18+
- Supabase account
- Groq API key
- PostgreSQL database with the pgvector extension enabled in Supabase

## Environment configuration

Create a file named .env in the server folder and add:

```env
PORT=your_port
URL=your_url

GROQ_API_KEY=your_groq_api_key
SUPABASE_URL=your_supabase_url
SUPABASE_SECRET_KEY=your_supabase_service_role_key
```

Create a file named .env in the client folder and add:

```env
PORT=your_port
VITE_AXIOS_BASE_URL_API=your_base_url
```

## Technology stack

### Backend

- Node.js
- TypeScript
- Express
- Supabase JS
- Groq SDK
- Multer
- Swagger
- Xenova Transformers

### Frontend

- React + TypeScript
- Vite
- React Router
- Material UI (MUI)
- TanStack React Query
- Axios
- Orval (API client generation)

## Installation

Frontend:

```bash
cd client
npm install
```

Backend:

```bash
cd server
npm install
```

## Running the app

Frontend:

```bash
cd client
npm run dev
```

Backend:

```bash
cd server
npm run dev
```

## Frontend overview

The frontend lives in the client folder and provides a modern UI for uploading documents, browsing stored files, and interacting with the RAG chat experience.

### Main frontend structure

- client/src/App.tsx – app bootstrap with React Query and React Router
- client/src/utils/Router.tsx – route configuration
- client/src/pages – page-level components such as LandingPage, UploadPage, DocumentsListPage, and ChatPage
- client/src/components – reusable UI pieces such as Sidebar, UploadDropzone, ChatBox, InputBar, and Message
- client/src/api – generated API client layer for communicating with the backend

### Current frontend routes

- / – landing page
- /upload – document upload screen
- /documents – list of uploaded documents

## Project structure

- server/src/app.ts – app configuration, middleware, routing, Swagger
- server/src/routes – API endpoints
- server/src/controllers – controllers
- server/src/services – business logic, RAG, chunking
- server/src/lib – integration with Supabase and Groq
- server/src/utils – validation and error handling
- client/src – frontend UI, routing, and API integration

## RAG workflow

1. A user uploads a PDF document.
2. The document is stored in Supabase Storage and registered in the database.
3. The document is split into chunks.
4. An embedding is generated for each chunk.
5. When a user asks a question:
   - the question is embedded,
   - relevant chunks for the selected chat are retrieved,
   - the retrieved context is passed to the LLM,
   - the model responds based on those chunks.

## SQL schema

```sql
CREATE TABLE public.documents (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  name text NOT NULL,
  file_path text,
  size integer,
  created_at timestamp without time zone DEFAULT now(),
  CONSTRAINT documents_pkey PRIMARY KEY (id)
);

CREATE TABLE public.document_chunks (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  document_id uuid,
  content text,
  chunk_index integer,
  page_number integer,
  embedding USER-DEFINED,
  CONSTRAINT document_chunks_pkey PRIMARY KEY (id),
  CONSTRAINT document_chunks_document_id_fkey FOREIGN KEY (document_id) REFERENCES public.documents(id)
);

CREATE TABLE public.chats (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  title text,
  created_at timestamp without time zone DEFAULT now(),
  CONSTRAINT chats_pkey PRIMARY KEY (id)
);

CREATE TABLE public.messages (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  chat_id uuid,
  role text,
  content text,
  created_at timestamp without time zone DEFAULT now(),
  CONSTRAINT messages_pkey PRIMARY KEY (id),
  CONSTRAINT messages_chat_id_fkey FOREIGN KEY (chat_id) REFERENCES public.chats(id)
);

CREATE TABLE public.chat_documents (
  chat_id uuid NOT NULL,
  document_id uuid NOT NULL,
  CONSTRAINT chat_documents_pkey PRIMARY KEY (chat_id, document_id),
  CONSTRAINT chat_documents_chat_id_fkey FOREIGN KEY (chat_id) REFERENCES public.chats(id),
  CONSTRAINT chat_documents_document_id_fkey FOREIGN KEY (document_id) REFERENCES public.documents(id)
);

create or replace function public.match_documents(
    query_embedding vector,
    match_count integer,
    chat_id uuid
)
returns table (
    id uuid,
    document_id uuid,
    content text,
    similarity double precision
)
language sql
as $$
    select
        dc.id,
        dc.document_id,
        dc.content,
        1 - (dc.embedding <=> query_embedding) as similarity
    from document_chunks dc
    where dc.document_id in (
        select document_id
        from chat_documents
        where chat_id = match_documents.chat_id
    )
    order by dc.embedding <=> query_embedding
    limit match_count;
$$;
```
