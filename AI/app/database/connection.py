from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.config import DATABASE_URL

# Create Engine
engine = create_engine(DATABASE_URL)

# Session Factory
SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

# Dependency / Session Getter
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

