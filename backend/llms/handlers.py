from langchain.callbacks.base import BaseCallbackHandler
from pyboxen import boxen


def boxen_print(*args, **kwargs):
    print(boxen(*args, **kwargs))


class ChatModelStartHandler(BaseCallbackHandler):
    def on_chat_model_start(self, serialized, messages, **kwargs):
        print("\n\n\n\n======== Sending messages ======== \n\n")
        for message in messages[0]:
            if message.type == "system":
                boxen_print(message.content, title=message.type, color="yellow")

            elif message.type == "human":
                boxen_print(message.content, title=message.type, color="green")

            # printing function requested by ai with args.
            elif message.type == "ai" and "function_call" in message.additional_kwargs:
                call = message.additional_kwargs["function_call"]
                boxen_print(
                    f"Running tool call {call} with args {call['arguments']}",
                    title=message.type,
                    color="cyan",
                )

            elif message.type == "ai":
                boxen_print(message.content, title=message.type, color="blue")

            # printing result of function call. In this case message.type equals to function
            elif message.type == "function":
                boxen_print(message.content, title=message.type, color="purple")

            else:
                boxen_print(message.content, title=message.type)
