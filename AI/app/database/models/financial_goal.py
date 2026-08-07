from sqlalchemy import Column, Integer, String, Numeric, DateTime, ForeignKey

from app.database.base import Base


class FinancialGoal(Base):
    __tablename__ = "FinancialGoals"

    financial_goal_id = Column(
        "FinancialGoalId",
        Integer,
        primary_key=True,
        index=True
    )

    title = Column("Title", String, nullable=False)

    description = Column("Description", String, nullable=True)

    target_amount = Column("TargetAmount", Numeric(18, 2), nullable=False)

    current_amount = Column("CurrentAmount", Numeric(18, 2), nullable=False)

    target_date = Column("TargetDate", DateTime, nullable=False)

    user_id = Column("UserId", String, ForeignKey("AspNetUsers.Id"))