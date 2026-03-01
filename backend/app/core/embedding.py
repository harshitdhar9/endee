import requests

OLLAMA_URL = "http://localhost:11434/api/embeddings"

def generate_embedding(text: str):
    response = requests.post(
        OLLAMA_URL,
        json={
            "model": "nomic-embed-text",
            "prompt": text
        }
    )

    if response.status_code != 200:
        raise Exception("Ollama embedding failed")

    embedding = response.json()["embedding"]

    print("Embedding length:", len(embedding))

    return embedding