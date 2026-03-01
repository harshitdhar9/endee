from endee import Endee
import os
from dotenv import load_dotenv

load_dotenv()

client = Endee()

ENDEE_URL = os.getenv("ENDEE_URL")
client.set_base_url(ENDEE_URL)

INDEX_NAME = "kohabit_index"
EMBEDDING_DIM = 1024

import time

def ensure_index():
    for attempt in range(5):
        try:
            client.create_index(
                name=INDEX_NAME,
                dimension=EMBEDDING_DIM,
                space_type="cosine",
                precision="float32"
            )
            print(" kohabit_index created")
            return

        except Exception as e:
            if "already exists" in str(e).lower():
                print(" kohabit_index already exists")
                return

            print(f"Attempt {attempt + 1} failed. Retrying...")
            time.sleep(3)

    raise Exception("Failed to create index after retries")

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