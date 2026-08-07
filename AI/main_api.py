from fastapi import FastAPI
from app.api.routes import router

<<<<<<< HEAD

=======
>>>>>>> origin/main
app = FastAPI()

app.include_router(router)