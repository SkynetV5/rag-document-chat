# rag-document-chat

AI-powered RAG system that allows users to chat with PDF documents using vector search and LLMs.

## Requirements

- Node.js 18+
- Docker and Docker Compose
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

### Infrastructure

- Docker
- Docker Compose

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


## Docker

The application can be run using Docker Compose.

The project consists of two containers:

- `server` – Node.js + Express backend
- `client` – React + Vite frontend

The backend container uses Node.js with the required native dependencies for ONNX Runtime.

### Build and run with Docker Compose

From the project root:

```bash
docker compose up --build
```

To stop the containers:

```bash
docker compose down
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

## Backend overview

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

## Evaluation

The `evaluation/` folder contains scripts for measuring RAG quality on a fixed question set. Both scripts reuse the same backend services as the application (`ragService`, Supabase, Groq) and load environment variables from `server/.env`.

### Prerequisites

1. Configure `server/.env` (see [Environment configuration](#environment-configuration)).
2. Upload the PDF documents referenced in the dataset through the app.
3. Map each document filename to its chat UUID in `evaluation/chats.json`:

```json
{
  "auchan.pdf": "your-chat-uuid",
  "decathlon.pdf": "your-chat-uuid"
}
```

### Dataset format

Questions are stored in `evaluation/dataset.json`. Each entry contains:

- `id` – question identifier
- `question` – user question
- `expected_answer` – reference answer used for LLM-based evaluation
- `expected_document` – PDF filename (must exist in `chats.json`)
- `expected_pages` – page numbers where the correct answer should be found

### Retrieval evaluation

Measures how well the vector search retrieves the right document chunks.

```bash
npx tsx evaluation/evaluate.ts
```

**Metrics:**

- **Hit@K** – share of questions where at least one chunk from an expected page appears in the top K results (K = 1, 3, 5, 10)
- **MRR** (Mean Reciprocal Rank) – average of `1 / rank` for the first relevant chunk; `0` if none is found

**Output:** `evaluation/results/retrieval-results.json` (per-question results + summary table in the console)

**Sample results** (18 questions from `dataset.json`):

| Metric  | Score  |
|---------|--------|
| Hit@1   | 33.3%  |
| Hit@3   | 72.2%  |
| Hit@5   | 83.3%  |
| Hit@10  | 94.4%  |
| MRR     | 0.529  |

### Answer evaluation

Runs the full RAG pipeline: retrieval → answer generation (`askLLM`) → LLM-as-judge scoring.

```bash
npx tsx evaluation/evaluate-answers.ts
```

Each generated answer is scored from 1 to 5 by a separate LLM call on:

- **Correctness** – is the information correct?
- **Groundedness** – is the answer supported by retrieved context?
- **Relevance** – does it address the question?
- **Completeness** – does it include all important details?

**Output:** `evaluation/results/answer-results.json` (question, generated answer, retrieved pages, scores, and reasoning)

### Evaluation folder structure

- `evaluation/evaluate.ts` – retrieval metrics (Hit@K, MRR)
- `evaluation/evaluate-answers.ts` – end-to-end answer quality evaluation
- `evaluation/metrics.ts` – Hit@K and MRR helpers
- `evaluation/dataset.json` – test questions and expected answers
- `evaluation/chats.json` – document filename → chat UUID mapping
- `evaluation/results/` – generated result files

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
