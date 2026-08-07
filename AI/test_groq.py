from groq import Groq

client = Groq(
    api_key="GROQ_API_KEY"
)

print(client.models.list())