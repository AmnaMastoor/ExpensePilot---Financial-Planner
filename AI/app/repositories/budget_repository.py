from sqlalchemy import func

from app.database.models import Budget
from datetime import datetime

class BudgetRepository:

    def get_all(self, db):
        return db.query(Budget).all()

    def get_by_id(self, db, budget_id):
        return (
            db.query(Budget)
            .filter(Budget.id == budget_id)
            .first()
        )

    def get_user_budgets(self, db, user_id):
        return (
            db.query(Budget)
            .filter(Budget.user_id == user_id)
            .all()
        )

    def get_budget_by_category(self, db, user_id, category_id):
        return (
            db.query(Budget)
            .filter(
                Budget.user_id == user_id,
                Budget.category_id == category_id
            )
            .first()
        )

    def get_active_budgets(self, db, user_id):
      today = datetime.utcnow()

      return (
        db.query(Budget)
        .filter(
            Budget.user_id == user_id,
            Budget.start_date <= today,
            Budget.end_date >= today,
        )
        .all()
    )
    def get_total_budget(self, db, user_id):
        return (
            db.query(func.sum(Budget.budget_amount))
            .filter(Budget.user_id == user_id)
            .scalar()
        )

    def count_budgets(self, db, user_id):
        return (
            db.query(func.count(Budget.budget_id))
            .filter(Budget.user_id == user_id)
            .scalar()
        )