from sqlalchemy import (
    Column,
    Integer,
    String,
    Numeric,
    DateTime,
    Boolean,
    ForeignKey,
    Enum,
)
from sqlalchemy.orm import relationship
import enum

from app.database.base import Base


class TransactionType(enum.Enum):
    Income = "Income"
    Expense = "Expense"


class Transaction(Base):
    __tablename__ = "Transactions"

    transaction_id = Column("TransactionId", Integer, primary_key=True, index=True)
    user_id = Column("UserId", String, ForeignKey("AspNetUsers.Id"))

    category_id = Column(
    "CategoryId",
    Integer,
    ForeignKey("Categories.CategoryId"),
    nullable=True,
)

    type = Column("Type", Integer, nullable=False)

    amount = Column("Amount", Numeric(18, 2), nullable=False)
    transaction_date = Column("TransactionDate", DateTime, nullable=False)

    title = Column("Title", String, nullable=False)

    description = Column("Description", String, nullable=True)

    budget_exceeded = Column("BudgetExceeded", Boolean, default=False)



