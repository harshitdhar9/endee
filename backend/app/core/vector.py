from endee import Endee, Precision
import os
from dotenv import load_dotenv

load_dotenv()

client = Endee()

client.set_base_url("http://localhost:8080/api/v1")

INDEX_NAME = "kohabit_index"
EMBEDDING_DIM = 768


def ensure_index():
    indexes = client.list_indexes()

    if INDEX_NAME not in indexes:
        try:
            client.create_index(
                name=INDEX_NAME,
                dimension=EMBEDDING_DIM,
                space_type="cosine",
                precision="float32"
            )
            print("✅ kohabit_index created")
        except Exception as e:
            print("❌ INDEX CREATION FAILED:")
            print(e)
            raise
    else:
        print("ℹ️ kohabit_index already exists")


def upsert_vector(user_id: int, vector: list):
    ensure_index()
    index = client.get_index(name=INDEX_NAME)

    index.upsert([
        {
            "id": str(user_id),
            "vector": vector,
            "meta": {"user_id": user_id}
        }
    ])

    print(f"✅ Vector stored for user {user_id}")