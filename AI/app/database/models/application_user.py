from sqlalchemy import Column, String, Numeric, DateTime

from app.database.base import Base


class ApplicationUser(Base):
    __tablename__ = "AspNetUsers"

    id = Column("Id", String, primary_key=True)

    user_name = Column("UserName", String)

    email = Column("Email", String)

    full_name = Column("FullName", String)

    monthly_budget_limit = Column("MonthlyBudgetLimit", Numeric(18, 2))

    created_at = Column("CreatedAt", DateTime)