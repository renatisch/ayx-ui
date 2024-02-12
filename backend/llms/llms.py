from dotenv import load_dotenv
from langchain.chat_models.openai import ChatOpenAI
from langchain.prompts import (
    ChatPromptTemplate,
    HumanMessagePromptTemplate,
    MessagesPlaceholder,
)
from langchain.schema import SystemMessage
from langchain.agents import OpenAIFunctionsAgent, AgentExecutor
from langchain.memory import ConversationBufferMemory
from langchain.output_parsers import (
    StructuredOutputParser,
    ResponseSchema,
)
from llms.handlers import ChatModelStartHandler
from llms.tools import (
    get_databases_query_tool,
    get_schemas_query_tool,
    get_tables_query_tool,
    get_select_query_tool,
    get_join_query_tool,
    validate_query_tool,
)
from llms.models import GenerationSchema

tools = [
    get_databases_query_tool,
    get_schemas_query_tool,
    get_tables_query_tool,
    get_select_query_tool,
    get_join_query_tool,
    validate_query_tool,
]

db_query = ResponseSchema(name="query", description="sql query.")

handler = ChatModelStartHandler()
output_parser = StructuredOutputParser.from_response_schemas([db_query])
response_format = output_parser.get_format_instructions()


def get_llm_response():
    prompt = ChatPromptTemplate(
        messages=[
            SystemMessage(
                content=(
                    "You a sql expert. Your goal is to generate queries for various data sources.\n"
                    "Do not make any assumptions about SQL queries.\n"
                    "Instead, ONLY use functions available to you to complete required tasks.\n"
                )
            ),
            MessagesPlaceholder(variable_name="chat_history"),
            HumanMessagePromptTemplate.from_template("{input}"),
            MessagesPlaceholder(variable_name="agent_scratchpad"),
        ]
    )

    memory = ConversationBufferMemory(memory_key="chat_history", return_messages=True)
    llm = ChatOpenAI(callbacks=[handler], temperature=0)
    agent = OpenAIFunctionsAgent(llm=llm, prompt=prompt, tools=tools)
    agent_executor = AgentExecutor(
        agent=agent,
        verbose=True,
        tools=tools,
        memory=memory,
    )
    queries = []
    datasource = "Snowflake"
    # output = agent_executor(
    #     f"""What is the SQL query do I need to run to list all databases in my {datasource} account.\n
    #         {response_format}
    #     """
    # )
    # database_query = output_parser.parse(output["output"])
    # queries.append(database_query)

    # output = agent_executor(
    #     f"""What SQL query do I need to run to list schemas for a {datasource} database.\n
    #         {response_format}
    #     """
    # )
    # schemas_query = output_parser.parse(output["output"])
    # queries.append(schemas_query)

    # output = agent_executor(
    #     f"""What SQL query do I need to run to list tables for a {datasource} schema.\n
    #         {response_format}
    #     """
    # )
    # schemas_query = output_parser.parse(output["output"])
    # queries.append(schemas_query)

    output = agent_executor(
        f"""Generate a SELECT sql query for {datasource} database.\n
            {response_format}
        """
    )
    schemas_query = output_parser.parse(output["output"])
    queries.append(schemas_query)

    return queries


def get_select_query(query: GenerationSchema):
    prompt = ChatPromptTemplate(
        messages=[
            SystemMessage(
                content=(
                    "You a sql expert. Your goal is to generate queries for various data sources.\n"
                    "Do not make any assumptions about SQL queries.\n"
                    "Instead, ONLY use functions available to you to complete required tasks.\n"
                )
            ),
            MessagesPlaceholder(variable_name="chat_history"),
            HumanMessagePromptTemplate.from_template("{input}"),
            MessagesPlaceholder(variable_name="agent_scratchpad"),
        ]
    )
    memory = ConversationBufferMemory(memory_key="chat_history", return_messages=True)
    llm = ChatOpenAI(callbacks=[handler], temperature=0)
    agent = OpenAIFunctionsAgent(llm=llm, prompt=prompt, tools=tools)
    agent_executor = AgentExecutor(
        agent=agent,
        verbose=True,
        tools=tools,
        memory=memory,
    )
    queries = []
    datasource = "Snowflake"
    output = agent_executor(
        f"""Generate a SELECT sql query for {datasource} database. The query shall allow me to select {query.databases[0].columns} columns \n
            from {query.databases[0].table} table of {query.databases[0].databaseSchema} schema of {query.databases[0].database} database.
            {response_format}
        """
    )
    schemas_query = output_parser.parse(output["output"])
    queries.append(schemas_query)
    return queries


def get_join_query(query: GenerationSchema):
    prompt = ChatPromptTemplate(
        messages=[
            SystemMessage(
                content=(
                    "You a sql expert. Your goal is to generate queries for various data sources.\n"
                    "Do not make any assumptions about SQL queries.\n"
                    "Instead, ONLY use functions available to you to complete required tasks.\n"
                )
            ),
            MessagesPlaceholder(variable_name="chat_history"),
            HumanMessagePromptTemplate.from_template("{input}"),
            MessagesPlaceholder(variable_name="agent_scratchpad"),
        ]
    )
    memory = ConversationBufferMemory(memory_key="chat_history", return_messages=True)
    llm = ChatOpenAI(callbacks=[handler], temperature=0)
    agent = OpenAIFunctionsAgent(llm=llm, prompt=prompt, tools=tools)
    agent_executor = AgentExecutor(
        agent=agent,
        verbose=True,
        tools=tools,
        memory=memory,
    )
    queries = []
    datasource = "Snowflake"
    output = agent_executor(
        f"""Generate a LEFT JOIN sql query for {datasource} database. The query shall join two tables on columns: {query.databases[0].actionColumns[0]} and {query.databases[1].actionColumns[0]}.\n 
        My left table is {query.databases[0].table}. My right table is {query.databases[1].table}.\n 
        The query shall allow me to select {query.databases[0].columns} columns from left table.\n
        The query shall allow me to select {query.databases[1].columns} columns from right table.\n
        The left table is available in {query.databases[0].databaseSchema} schema of {query.databases[0].database} database.\n
        The right table is available in {query.databases[1].databaseSchema} schema of {query.databases[1].database} database.\n
        {response_format}
        """
    )
    schemas_query = output_parser.parse(output["output"])
    queries.append(schemas_query)
    return queries


def validate_query(query: str):
    is_query_valid = ResponseSchema(
        name="is_query_valid",
        description="True if the sql query is valid. Otherwise, False.",
    )
    valid_query = ResponseSchema(
        name="valid_query",
        description="If query is invalid, returns corrected query is returned here.",
    )
    output_parser = StructuredOutputParser.from_response_schemas(
        [is_query_valid, valid_query]
    )
    response_format = output_parser.get_format_instructions()
    prompt = ChatPromptTemplate(
        messages=[
            SystemMessage(
                content=(
                    """You are a sql expert. Your goal is to validate SQL queries for various data sources.\n
                    You are provided with database technology name and a sql query. You need to check if provided sql query is valid for execution in the datatabase technology.\n
                    Do not make any assumptions about SQL queries.\n
                    Instead, ONLY use functions available to you to complete required tasks.\n"""
                )
            ),
            MessagesPlaceholder(variable_name="chat_history"),
            HumanMessagePromptTemplate.from_template("{input}"),
            MessagesPlaceholder(variable_name="agent_scratchpad"),
        ]
    )
    memory = ConversationBufferMemory(memory_key="chat_history", return_messages=True)
    llm = ChatOpenAI(callbacks=[handler], temperature=0)
    agent = OpenAIFunctionsAgent(llm=llm, prompt=prompt, tools=tools)
    agent_executor = AgentExecutor(
        agent=agent,
        verbose=True,
        tools=tools,
        memory=memory,
    )
    datasource = "Snowflake"
    output = agent_executor(
        f"""Is the following sql query: {query}, valid for execution in {datasource}. 
        {response_format}
        """
    )
    schemas_query = output_parser.parse(output["output"])
    return schemas_query
