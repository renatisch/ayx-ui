from langchain.output_parsers import PydanticOutputParser
from langchain.prompts import PromptTemplate
from langchain_openai import OpenAI
import dotenv
from pydantic.v1 import BaseModel, Field
from langchain.tools import Tool, StructuredTool
from llms.handlers import ChatModelStartHandler
from llms.models import SQLQuery, Columns_to_join
from typing import List, Dict

dotenv.load_dotenv()


def get_databases_query(technology: str):
    model = OpenAI(
        model_name="gpt-3.5-turbo-instruct",
        temperature=0.0,
        callbacks=[ChatModelStartHandler()],
    )
    parser = PydanticOutputParser(pydantic_object=SQLQuery)
    prompt = PromptTemplate(
        template="You need to generate a sql query that list all databases in my {database} account. \n{format_instructions}\n",
        input_variables=["database"],
        partial_variables={"format_instructions": parser.get_format_instructions()},
    )
    prompt_and_model = prompt | model
    output = prompt_and_model.invoke({"database": technology})
    parsed_output = SQLQuery.model_validate(parser.invoke(output))
    return parsed_output.sql_query


class SelectToolArgs(BaseModel):
    technology: str = Field(
        description="database technology name for which query needs to be executed."
    )
    database: str = Field(
        description="database name for which query needs to be executed."
    )
    schema_name: str = Field(
        description="schema name for which query needs to be executed."
    )
    table: str = Field(
        description="database name for which query needs to be executed."
    )
    column: List[str] = Field(
        description="Column names for which query needs to be executed."
    )


class JoinToolArgs(BaseModel):
    technology: str = Field(
        description="database technology name for which query needs to be executed."
    )
    left_table_name: str = Field(description="Left table name.")
    left_table_schema: str = Field(description="Left table schema name.")
    left_table_databse: str = Field(description="Left table database name.")
    left_table_columns: List[str] = Field(description="Left table column names.")
    right_table_name: str = Field(description="Right table name.")
    right_table_schema: str = Field(description="Right table schema name.")
    right_table_databse: str = Field(description="Right table database name.")
    right_table_columns: List[str] = Field(description="Right table column names.")
    left_column_to_join_on: str = Field(
        description="Left table column name on which join is performed."
    )
    right_column_to_join_on: str = Field(
        description="Right table column name on which join is performed."
    )


class ToolArgs(BaseModel):
    technology: str = Field(
        description="database technology name for which query needs to be executed."
    )


class ValidateToolArgs(BaseModel):
    query: str = Field(description="SQL query to validate.")


get_databases_query_tool = Tool.from_function(
    name="get_databases_query_tool",
    description="Generates a query to list databases.",
    func=get_databases_query,
    args_schema=ToolArgs,
)


def get_schemas_query(technology: str):
    model = OpenAI(
        model_name="gpt-3.5-turbo-instruct",
        temperature=0.0,
        callbacks=[ChatModelStartHandler()],
    )
    parser = PydanticOutputParser(pydantic_object=SQLQuery)
    prompt = PromptTemplate(
        template="""You need to generate a sql query that lists schema names in a specific {database} database. 
                    Use dot notation with one dot. \n{format_instructions}\n""",
        input_variables=["database"],
        partial_variables={"format_instructions": parser.get_format_instructions()},
    )
    prompt_and_model = prompt | model
    output = prompt_and_model.invoke({"database": technology})
    parsed_output = SQLQuery.model_validate(parser.invoke(output))
    return parsed_output.sql_query


get_schemas_query_tool = Tool.from_function(
    name="get_schemas_query_tool",
    description="Generates a query to list schemas in a specific database.",
    func=get_schemas_query,
    args_schema=ToolArgs,
)


def get_tables_query(technology: str):
    model = OpenAI(
        model_name="gpt-3.5-turbo-instruct",
        temperature=0.0,
        callbacks=[ChatModelStartHandler()],
    )
    parser = PydanticOutputParser(pydantic_object=SQLQuery)
    prompt = PromptTemplate(
        template="""You need to generate a sql query that shows tables in a specific schema of a {database} database, without using a database.
                    Use dot notation with one dot: e.g. <database_name>.<schema_name>. \n
                    {format_instructions}\n""",
        input_variables=["database"],
        partial_variables={"format_instructions": parser.get_format_instructions()},
    )
    prompt_and_model = prompt | model
    output = prompt_and_model.invoke({"database": technology})
    parsed_output = SQLQuery.model_validate(parser.invoke(output))
    return parsed_output.sql_query


get_tables_query_tool = Tool.from_function(
    name="get_tables_query_tool",
    description="Generates a query to list tables in a specific schema.",
    func=get_tables_query,
    args_schema=ToolArgs,
)


def get_select_query(
    technology: str, database: str, schema_name: str, table: str, column: List[str]
):
    model = OpenAI(
        model_name="gpt-3.5-turbo-instruct",
        temperature=0.0,
        callbacks=[ChatModelStartHandler()],
    )
    parser = PydanticOutputParser(pydantic_object=SQLQuery)
    prompt = PromptTemplate(
        template="""Your goal is to generate a SELECT sql query for {technology} database. \n
                    You are provided with the list of columns to be retrieved. You are also given database, schema and table name.\n
                    Make sure to end the query with ';' sign indicating the end of the query\n
                    Use dot notation with one dot to specify path to dataset: e.g. <database_name>.<schema_name>.<table_name>. \n
                    Database = {database}, Schema = {schema}, Table = {table}. Fields to be retrieved: {column}
                    {format_instructions}\n""",
        input_variables=["technology", "database", "schema", "table", "column"],
        partial_variables={"format_instructions": parser.get_format_instructions()},
    )
    prompt_and_model = prompt | model
    output = prompt_and_model.invoke(
        {
            "technology": technology,
            "database": database,
            "schema": schema_name,
            "table": table,
            "column": column,
        }
    )
    parsed_output = SQLQuery.model_validate(parser.invoke(output))
    return parsed_output.sql_query


get_select_query_tool = StructuredTool.from_function(
    name="get_select_query",
    description="Generates a SELECT sql query.",
    func=get_select_query,
    args_schema=SelectToolArgs,
)


def get_join_query(
    technology: str,
    left_table_name: str,
    left_table_schema: str,
    left_table_databse: str,
    left_table_columns: List[str],
    right_table_name: str,
    right_table_schema: str,
    right_table_databse: str,
    right_table_columns: List[str],
    left_column_to_join_on: str,
    right_column_to_join_on: str,
):
    model = OpenAI(
        model_name="gpt-3.5-turbo-instruct",
        temperature=0.0,
        callbacks=[ChatModelStartHandler()],
    )
    parser = PydanticOutputParser(pydantic_object=SQLQuery)
    prompt = PromptTemplate(
        template="""Your goal is to generate a JOIN sql query for {technology} database. The query shall join two tables left and right one. \n
                    The query shall join two tables on columns: {left_column_to_join_on} {right_column_to_join_on}\n 
                    You are provided with the list of columns to be retrieved from both tables. You are also given database, schema and table names of both tables.\n
                    Make sure to end the query with ';' sign indicating the end of the query\n
                    My left table is {left_table_name}. My right table is {right_table_name}.\n 
                    The query shall allow me to select {left_table_columns} columns from left table.\n
                    The query shall allow me to select {right_table_columns} columns from right table.\n
                    The left table is available in {left_table_schema} schema of {left_table_database} database.\n
                    The right table is available in {right_table_schema} schema of {right_table_database} database.\n
                    Use dot notation with one dot to specify path to dataset: e.g. <database_name>.<schema_name>.<table_name>. \n
                    {format_instructions}\n""",
        input_variables=[
            "technology",
            "left_column_to_join_on",
            "right_column_to_join_on",
            "left_table_name",
            "left_table_columns",
            "left_table_schema",
            "left_table_database",
            "right_table_name",
            "right_table_columns",
            "right_table_schema",
            "right_table_database",
        ],
        partial_variables={"format_instructions": parser.get_format_instructions()},
    )
    prompt_and_model = prompt | model
    output = prompt_and_model.invoke(
        {
            "technology": technology,
            "left_column_to_join_on": left_column_to_join_on,
            "right_column_to_join_on": right_column_to_join_on,
            "left_table_name": left_table_name,
            "left_table_columns": left_table_columns,
            "left_table_schema": left_table_schema,
            "left_table_database": left_table_databse,
            "right_table_name": right_table_name,
            "right_table_columns": right_table_columns,
            "right_table_schema": right_table_schema,
            "right_table_database": right_table_databse,
        }
    )
    parsed_output = SQLQuery.model_validate(parser.invoke(output))
    return parsed_output.sql_query


get_join_query_tool = StructuredTool.from_function(
    name="get_join_query",
    description="Generates a JOIN sql query for two tables.",
    func=get_join_query,
    args_schema=JoinToolArgs,
)


def validate_query(query: str):
    model = OpenAI(
        model_name="gpt-3.5-turbo-instruct",
        temperature=0.0,
        callbacks=[ChatModelStartHandler()],
    )
    parser = PydanticOutputParser(pydantic_object=SQLQuery)
    prompt = PromptTemplate(
        template="""You need to validate if the following sql query: {query} is valid for execution in Snowflake. 
                    Use dot notation with one dot. \n{format_instructions}\n""",
        input_variables=["query"],
        partial_variables={"format_instructions": parser.get_format_instructions()},
    )
    prompt_and_model = prompt | model
    output = prompt_and_model.invoke({"query": query})
    parsed_output = SQLQuery.model_validate(parser.invoke(output))
    return parsed_output.sql_query


validate_query_tool = StructuredTool.from_function(
    name="validate_query",
    description="Validates if SQL query is valid for execution in a Snowflake.",
    func=validate_query,
    args_schema=ValidateToolArgs,
)
