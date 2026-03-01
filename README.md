# Kohabit :
Kohabit uses semantic vector search and AI embeddings to intelligently match compatible roommates and connections based on lifestyle, preferences, and personality.

## Problem Statement

Finding compatible roommates is difficult because:
- Traditional filters (city, age, budget) are too shallow.
- Compatibility depends on lifestyle, personality, habits, and interests.
- Simple SQL filtering cannot capture semantic similarity.

We need intelligent matching based on meaning, not just exact fields.

## Why Vector Search?

Traditional databases rely on exact matching or filtering.
However, human compatibility is semantic.

Example:
"Fitness lover who wakes up early"
and
"Morning gym enthusiast"

These are semantically similar but textually different.

Vector embeddings convert user profiles into high-dimensional representations.
Similarity search using cosine distance allows matching based on meaning.

## Why Endee Vector Database?

Endee is a high-performance vector database optimized for:

- Fast cosine similarity search
- Efficient storage of high-dimensional embeddings
- Persistent local storage via Docker
- Simple REST-based integration

It was chosen over traditional SQL or in-memory solutions
because scalable semantic search is required.

## Workflow

1. User completes onboarding.
2. Backend constructs a profile summary.
3. Ollama generates a 1024-dimensional embedding.
4. Embedding stored in Endee vector index.
5. When matching is requested:
   - Current user's embedding is retrieved.
   - Cosine similarity search is performed.
   - Top K similar users are returned.
6. Frontend displays ranked matches.

## Dataset Generation

For evaluation purposes, 100 synthetic users from Delhi were generated
using Faker and embedded using Ollama.

This allows demonstration of real similarity search.

## Tech Stack

- Frontend: Next.js 14
- Backend: FastAPI
- Database: Supabase PostgreSQL
- Embeddings: Ollama (bge-large, 1024-dim)
- Vector DB: Endee
- Containerization: Docker Compose

## Prerequisites

Make sure the following are installed:

- Docker (20.10 or later)
- Docker Compose v2
- At least 2GB available RAM

Verify installation:

```bash
docker --version
docker compose version
```

## Setup

1. Clone the repository
2. Create .env from .env.example
3. Run:
### Note: Ollama model must be pulled manually after first Docker startup.
```bash
cd endee
docker compose up --build
docker exec -it kohabit_ollama ollama pull bge-large 
```

To populate the database with synthetic users:

```bash
docker exec -it kohabit_backend bash
PYTHONPATH=/app python scripts/users_generation.py
```
### Access the Application

Frontend:
http://localhost:3000

Backend API Docs:
http://localhost:8000/docs

## Supabase Setup

This project uses Supabase as a managed PostgreSQL database.

To run locally:
1. Create a Supabase project.
2. Copy the connection string.
3. Add it to your `.env` file as:

DATABASE_URL=your_supabase_connection_string

<img width="1505" height="812" alt="Screenshot 2026-03-01 at 11 13 38 PM" src="https://github.com/user-attachments/assets/3a1cb7a4-698d-44bc-b504-45eaa97dca67" />
<img width="756" height="817" alt="Screenshot 2026-03-01 at 11 14 46 PM" src="https://github.com/user-attachments/assets/3117c776-95db-4dbc-92b4-0d7c3fa2bda6" />
<img width="710" height="817" alt="Screenshot 2026-03-01 at 11 15 16 PM" src="https://github.com/user-attachments/assets/414cfab1-33e6-45cb-9269-e1762c24eaa6" />
<img width="693" height="355" alt="Screenshot 2026-03-01 at 11 15 55 PM" src="https://github.com/user-attachments/assets/4aacfd86-20de-44f7-9e74-521e9c84931e" />
<img width="1437" height="563" alt="Screenshot 2026-03-01 at 11 19 45 PM" src="https://github.com/user-attachments/assets/86f3bb2a-c4e3-42cf-893a-fc7e6043fe07" />


