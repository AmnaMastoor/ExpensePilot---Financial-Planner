from sqlalchemy import func

from app.database.models import FinancialGoal


class GoalRepository:

    def get_all(self, db):
        return db.query(FinancialGoal).all()

    def get_by_id(self, db, goal_id):
        return (
            db.query(FinancialGoal)
            .filter(FinancialGoal.financial_goal_id == goal_id)
            .first()
        )

    def get_user_goals(self, db, user_id):
        return (
            db.query(FinancialGoal)
            .filter(FinancialGoal.user_id == user_id)
            .all()
        )

    def get_goal_progress(self, db, goal_id):
        return (
            db.query(FinancialGoal)
            .filter(FinancialGoal.financial_goal_id == goal_id)
            .first()
        )

    def get_completed_goals(self, db, user_id):
     return (
        db.query(FinancialGoal)
        .filter(
            FinancialGoal.user_id == user_id,
            FinancialGoal.current_amount >= FinancialGoal.target_amount,
        )
        .all()
    )
    def get_pending_goals(self, db, user_id):
        return (
            db.query(FinancialGoal)
            .filter(
                FinancialGoal.user_id == user_id,
                FinancialGoal.current_amount < FinancialGoal.target_amount,
            )
            .all()
        )

    def get_total_goal_amount(self, db, user_id):
        return (
            db.query(func.sum(FinancialGoal.target_amount))
            .filter(FinancialGoal.user_id == user_id)
            .scalar()
        )

    def count_goals(self, db, user_id):
        return (
            db.query(func.count(FinancialGoal.financial_goal_id))
            .filter(FinancialGoal.user_id == user_id)
            .scalar()
        )