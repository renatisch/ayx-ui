from fastapi import FastAPI
from llms.llms import get_llm_response, get_select_query, get_join_query, validate_query
from clients import snowflake_get_dbs
from llms.utils import get_schemas
from fastapi.middleware.cors import CORSMiddleware
from llms.models import GenerationSchema, ValidateQuery

app = FastAPI()
origins = [
    "http://localhost:3000",
    "http://localhost",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def main():
    query = get_llm_response()
    return query


@app.get("/initial")
def initial():
    response = get_llm_response()
    return response


@app.post("/generate/")
async def home(query_params: GenerationSchema):
    if query_params.action == "select":
        response = get_select_query(query=query_params)
        return {"status": 200, "technology": "technology", "response": response}
    elif query_params.action == "join":
        print(query_params)
        response = get_join_query(query=query_params)
        return {"status": 200, "technology": "technology", "response": response}


@app.post("/validate")
async def validate(query: ValidateQuery):
    response = validate_query(query=query)
    return {"status": 200, "technology": "technology", "response": response}


if __name__ == "__main__":
    app()
