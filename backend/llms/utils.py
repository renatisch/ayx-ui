def get_schemas(query: str, db_name: str):
    new_query = query.replace("database_name", db_name)
    return new_query
