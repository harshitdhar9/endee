from endee import Endee
import os
from dotenv import load_dotenv

load_dotenv()

client = Endee()

ENDEE_URL = os.getenv("ENDEE_URL")
client.set_base_url(ENDEE_URL)

INDEX_NAME = "kohabit_index"
EMBEDDING_DIM = 1024

def ensure_index():
    try:
        client.create_index(
            name=INDEX_NAME,
            dimension=EMBEDDING_DIM,
            space_type="cosine",
            precision="float32"
        )
        print(" kohabit_index created")

    except Exception as e:
        if "already exists" in str(e).lower():
            print(" kohabit_index already exists")
        else:
            print(" INDEX CREATION FAILED:")
            print(e)
            raise

def upsert_vector(user_id: int, vector: list):
    index = client.get_index(name=INDEX_NAME)

    index.upsert([
        {
            "id": str(user_id),
            "vector": vector,
            "meta": {"user_id": user_id}
        }
    ])

    print(f"Vector stored for user {user_id}")