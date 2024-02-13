from pydantic import BaseModel, Field
from typing import List


class SQLQuery(BaseModel):
    sql_query: str = Field(description="requested sql query")
    technology: str = Field(
        description="Name of database technology for which sql query was requested."
    )


class Database(BaseModel):
    database: str
    databaseSchema: str
    table: str
    columns: List[str | int]
    actionColumns: List[str]


class GenerationSchema(BaseModel):
    action: str
    databases: List[Database]


class Columns_to_join(BaseModel):
    left_table_column: str
    right_table_column: str


class ValidateQuery(BaseModel):
    query: str


class Verified_Query(BaseModel):
    sql_query: str = Field(description="sql query to be validated")
    valid_query: str = Field(description="valid sql query")
    info: str = Field(
        description="If query is invalid. Provide a reason why it is invalid."
    )
