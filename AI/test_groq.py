from groq import Groq

client = Groq(
    api_key="your api"
)

print(client.models.list())