import requests
import os
OLLAMA_URL = os.getenv("OLLAMA_URL")

def generate_embedding(text: str):
    response = requests.post(
        OLLAMA_URL,
        json={
            "model": "bge-large",
            "prompt": text
        }
    )

    if response.status_code != 200:
        raise Exception("Ollama embedding failed")

    embedding = response.json()["embedding"]

    print("Embedding length:", len(embedding))

    return embedding