from openai import OpenAI
from agentkit import Agent

client = OpenAI()

# Define your agent
agent = Agent(
    name="MyCustomAgent",
    description="An AI assistant that can perform tasks",
    instructions="Always respond politely and help the user.",
)

# Start a conversation loop
print("AI Agent is running...")

while True:
    user_input = input("You: ")
    response = agent.run(user_input)
    print("Agent:", response)
