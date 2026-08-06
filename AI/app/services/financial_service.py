from app.database.connection import SessionLocal

from app.repositories.transaction_repository import TransactionRepository
from app.repositories.budget_repository import BudgetRepository
from app.repositories.goal_repository import GoalRepository
from app.repositories.category_repository import CategoryRepository
from app.repositories.user_repository import UserRepository


class FinancialService:

    def __init__(self):
        self.transaction_repo = TransactionRepository()
        self.budget_repo = BudgetRepository()
        self.goal_repo = GoalRepository()
        self.category_repo = CategoryRepository()
        self.user_repo = UserRepository()

    def get_user(self, user_id):
        db = SessionLocal()

        try:
            return self.user_repo.get_by_id(db, user_id)

        finally:
            db.close()

    def get_budget_limit(self, user_id):
        db = SessionLocal()

        try:
            return self.user_repo.get_monthly_budget_limit(db, user_id)

        finally:
            db.close()

    def get_dashboard_summary(self, user_id):
        db = SessionLocal()

        try:
            return {
                "total_income": self.transaction_repo.get_total_income(db, user_id) or 0,
                "total_expenses": self.transaction_repo.get_total_expenses(db, user_id) or 0,
                "total_budget": self.budget_repo.get_total_budget(db, user_id) or 0,
                "goal_count": self.goal_repo.count_goals(db, user_id) or 0,
                "transaction_count": self.transaction_repo.count_transactions(db, user_id) or 0,
            }

        finally:
            db.close()

    def get_financial_summary(self, user_id):
        db = SessionLocal()

        try:
            income = self.transaction_repo.get_total_income(db, user_id) or 0
            expenses = self.transaction_repo.get_total_expenses(db, user_id) or 0

            return {
                "income": income,
                "expenses": expenses,
                "balance": income - expenses,
            }

        finally:
            db.close()

    def get_recent_activity(self, user_id):
        db = SessionLocal()

        try:
            return self.transaction_repo.get_recent_transactions(db, user_id)

        finally:
            db.close()

    def get_budget_summary(self, user_id):
        db = SessionLocal()

        try:
            return {
                "total_budget": self.budget_repo.get_total_budget(db, user_id) or 0,
                "active_budgets": len(self.budget_repo.get_active_budgets(db, user_id)),
                "budget_count": self.budget_repo.count_budgets(db, user_id) or 0,
            }

        finally:
            db.close()

    def get_goal_summary(self, user_id):
        db = SessionLocal()

        try:
            return {
                "total_goal_amount": self.goal_repo.get_total_goal_amount(db, user_id) or 0,
                "completed_goals": len(self.goal_repo.get_completed_goals(db, user_id)),
                "pending_goals": len(self.goal_repo.get_pending_goals(db, user_id)),
                "goal_count": self.goal_repo.count_goals(db, user_id) or 0,
            }

        finally:
            db.close()

    def get_spending_analysis(self, user_id):
        db = SessionLocal()

        try:
            return {
                "total_expenses": self.transaction_repo.get_total_expenses(db, user_id) or 0,
                "highest_expense": self.transaction_repo.get_highest_expense(db, user_id),
            }

        finally:
            db.close()

    def get_income_analysis(self, user_id):
        db = SessionLocal()

        try:
            return {
                "total_income": self.transaction_repo.get_total_income(db, user_id) or 0,
                "monthly_income": self.transaction_repo.get_total_income_this_month(db, user_id) or 0,
            }

        finally:
            db.close()

    def get_category_analysis(self, user_id):
        db = SessionLocal()

        try:
            return self.transaction_repo.get_total_by_category(db, user_id)

        finally:
            db.close()

    def get_monthly_report(self, user_id):
        db = SessionLocal()

        try:
            return {
                "summary": self.transaction_repo.get_monthly_summary(db, user_id),
                "transactions": self.transaction_repo.get_transactions_this_month(db, user_id),
                "income": self.transaction_repo.get_total_income_this_month(db, user_id) or 0,
                "expenses": self.transaction_repo.get_total_expenses_this_month(db, user_id) or 0,
            }

        finally:
            db.close()
    def get_total_income(self, user_id):
        db = SessionLocal()

        try:
            return self.transaction_repo.get_total_income(db, user_id) or 0

        finally:
            db.close()

    def get_total_expenses(self, user_id):
        db = SessionLocal()

        try:
            return self.transaction_repo.get_total_expenses(db, user_id) or 0

        finally:
            db.close()

    def get_recent_transactions(self, user_id, limit=5):
        db = SessionLocal()

        try:
            return self.transaction_repo.get_recent_transactions(
                db,
                user_id,
                limit
            )

        finally:
            db.close()

    def count_transactions(self, user_id):
        db = SessionLocal()

        try:
            return self.transaction_repo.count_transactions(db, user_id)

        finally:
            db.close()

    def get_highest_expense(self, user_id):
        db = SessionLocal()

        try:
            return self.transaction_repo.get_highest_expense(db, user_id)

        finally:
            db.close()

    def get_total_by_category(self, user_id):
        db = SessionLocal()

        try:
            return self.transaction_repo.get_total_by_category(db, user_id)

        finally:
            db.close()

    def get_monthly_summary(self, user_id):
        db = SessionLocal()

        try:
            return self.transaction_repo.get_monthly_summary(db, user_id)

        finally:
            db.close()

    def get_transactions_this_month(self, user_id):
        db = SessionLocal()

        try:
            return self.transaction_repo.get_transactions_this_month(db, user_id)

        finally:
            db.close()

    def get_total_income_this_month(self, user_id):
        db = SessionLocal()

        try:
            return self.transaction_repo.get_total_income_this_month(db, user_id) or 0

        finally:
            db.close()

    def get_total_expenses_this_month(self, user_id):
        db = SessionLocal()

        try:
            return self.transaction_repo.get_total_expenses_this_month(db, user_id) or 0

        finally:
            db.close()