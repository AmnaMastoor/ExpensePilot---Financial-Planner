from sqlalchemy import Column, Integer, String, Numeric, DateTime, ForeignKey

from app.database.base import Base


class Budget(Base):
    __tablename__ = "Budgets"

    budget_id = Column("BudgetId", Integer, primary_key=True, index=True)

    user_id = Column("UserId", String, ForeignKey("AspNetUsers.Id"))

    category_id = Column("CategoryId", Integer, ForeignKey("Categories.CategoryId"))

    budget_amount = Column("BudgetAmount", Numeric(18, 2), nullable=False)

    start_date = Column("StartDate", DateTime, nullable=False)

    end_date = Column("EndDate", DateTime, nullable=False)