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

    # ---------------------------------------------------------
    # User
    # ---------------------------------------------------------

    def get_user(self, user_id):

        db = SessionLocal()

        try:
            return self.user_repo.get_by_id(
                db,
                user_id
            )

        finally:
            db.close()

    # ---------------------------------------------------------
    # Monthly budget limit
    # ---------------------------------------------------------

    def get_budget_limit(self, user_id):

        db = SessionLocal()

        try:
            return self.user_repo.get_monthly_budget_limit(
                db,
                user_id
            )

        finally:
            db.close()

    # ---------------------------------------------------------
    # Dashboard summary
    # ---------------------------------------------------------

    def get_dashboard_summary(self, user_id):

        db = SessionLocal()

        try:
            return {
                "total_income": (
                    self.transaction_repo.get_total_income(
                        db,
                        user_id
                    ) or 0
                ),

                "total_expenses": (
                    self.transaction_repo.get_total_expenses(
                        db,
                        user_id
                    ) or 0
                ),

                "total_budget": (
                    self.budget_repo.get_total_budget(
                        db,
                        user_id
                    ) or 0
                ),

                "goal_count": (
                    self.goal_repo.count_goals(
                        db,
                        user_id
                    ) or 0
                ),

                "transaction_count": (
                    self.transaction_repo.count_transactions(
                        db,
                        user_id
                    ) or 0
                ),
            }

        finally:
            db.close()

    # ---------------------------------------------------------
    # Financial summary
    #
    # IMPORTANT:
    # This now provides BOTH:
    #
    # 1. All-time financial values
    # 2. Current-month financial values
    #
    # This prevents confusion between:
    # "my income"
    # and
    # "my income this month"
    # ---------------------------------------------------------

    def get_financial_summary(self, user_id):

        db = SessionLocal()

        try:

            # -------------------------------------------------
            # ALL-TIME VALUES
            # -------------------------------------------------

            total_income = (
                self.transaction_repo
                .get_total_income(
                    db,
                    user_id
                )
                or 0
            )

            total_expenses = (
                self.transaction_repo
                .get_total_expenses(
                    db,
                    user_id
                )
                or 0
            )

            total_balance = (
                total_income - total_expenses
            )

            # -------------------------------------------------
            # CURRENT MONTH VALUES
            # -------------------------------------------------

            monthly_income = (
                self.transaction_repo
                .get_total_income_this_month(
                    db,
                    user_id
                )
                or 0
            )

            monthly_expenses = (
                self.transaction_repo
                .get_total_expenses_this_month(
                    db,
                    user_id
                )
                or 0
            )

            monthly_balance = (
                monthly_income - monthly_expenses
            )

            return {

                # All-time
                "income": total_income,
                "expenses": total_expenses,
                "balance": total_balance,

                # Current month
                "monthly_income": monthly_income,
                "monthly_expenses": monthly_expenses,
                "monthly_balance": monthly_balance,
            }

        finally:
            db.close()

    # ---------------------------------------------------------
    # Recent activity
    # ---------------------------------------------------------

    def get_recent_activity(self, user_id):

        db = SessionLocal()

        try:
            return (
                self.transaction_repo
                .get_recent_transactions(
                    db,
                    user_id
                )
                or []
            )

        finally:
            db.close()

    # ---------------------------------------------------------
    # Budget summary
    # ---------------------------------------------------------

    def get_budget_summary(self, user_id):

        db = SessionLocal()

        try:

            active_budgets = (
                self.budget_repo.get_active_budgets(
                    db,
                    user_id
                )
                or []
            )

            return {
                "total_budget": (
                    self.budget_repo.get_total_budget(
                        db,
                        user_id
                    )
                    or 0
                ),

                "active_budgets": len(
                    active_budgets
                ),

                "budget_count": (
                    self.budget_repo.count_budgets(
                        db,
                        user_id
                    )
                    or 0
                ),
            }

        finally:
            db.close()

    # ---------------------------------------------------------
    # Goal summary
    # ---------------------------------------------------------

    def get_goal_summary(self, user_id):

        db = SessionLocal()

        try:

            completed_goals = (
                self.goal_repo.get_completed_goals(
                    db,
                    user_id
                )
                or []
            )

            pending_goals = (
                self.goal_repo.get_pending_goals(
                    db,
                    user_id
                )
                or []
            )

            return {
                "total_goal_amount": (
                    self.goal_repo.get_total_goal_amount(
                        db,
                        user_id
                    )
                    or 0
                ),

                "completed_goals": len(
                    completed_goals
                ),

                "pending_goals": len(
                    pending_goals
                ),

                "goal_count": (
                    self.goal_repo.count_goals(
                        db,
                        user_id
                    )
                    or 0
                ),
            }

        finally:
            db.close()

    # ---------------------------------------------------------
    # Spending analysis
    # ---------------------------------------------------------

    def get_spending_analysis(self, user_id):

        db = SessionLocal()

        try:
            return {
                "total_expenses": (
                    self.transaction_repo
                    .get_total_expenses(
                        db,
                        user_id
                    )
                    or 0
                ),

                "highest_expense": (
                    self.transaction_repo
                    .get_highest_expense(
                        db,
                        user_id
                    )
                ),
            }

        finally:
            db.close()

    # ---------------------------------------------------------
    # Income analysis
    # ---------------------------------------------------------

    def get_income_analysis(self, user_id):

        db = SessionLocal()

        try:
            return {
                "total_income": (
                    self.transaction_repo
                    .get_total_income(
                        db,
                        user_id
                    )
                    or 0
                ),

                "monthly_income": (
                    self.transaction_repo
                    .get_total_income_this_month(
                        db,
                        user_id
                    )
                    or 0
                ),
            }

        finally:
            db.close()

    # ---------------------------------------------------------
    # Category analysis
    # ---------------------------------------------------------

    def get_category_analysis(self, user_id):

        db = SessionLocal()

        try:
            return (
                self.transaction_repo
                .get_total_by_category(
                    db,
                    user_id
                )
                or []
            )

        finally:
            db.close()

    # ---------------------------------------------------------
    # Monthly report
    # ---------------------------------------------------------

    def get_monthly_report(self, user_id):

        db = SessionLocal()

        try:
            return {
                "summary": (
                    self.transaction_repo
                    .get_monthly_summary(
                        db,
                        user_id
                    )
                ),

                "transactions": (
                    self.transaction_repo
                    .get_transactions_this_month(
                        db,
                        user_id
                    )
                    or []
                ),

                "income": (
                    self.transaction_repo
                    .get_total_income_this_month(
                        db,
                        user_id
                    )
                    or 0
                ),

                "expenses": (
                    self.transaction_repo
                    .get_total_expenses_this_month(
                        db,
                        user_id
                    )
                    or 0
                ),
            }

        finally:
            db.close()

    # ---------------------------------------------------------
    # Total income - ALL TIME
    # ---------------------------------------------------------

    def get_total_income(self, user_id):

        db = SessionLocal()

        try:
            return (
                self.transaction_repo
                .get_total_income(
                    db,
                    user_id
                )
                or 0
            )

        finally:
            db.close()

    # ---------------------------------------------------------
    # Total expenses - ALL TIME
    # ---------------------------------------------------------

    def get_total_expenses(self, user_id):

        db = SessionLocal()

        try:
            return (
                self.transaction_repo
                .get_total_expenses(
                    db,
                    user_id
                )
                or 0
            )

        finally:
            db.close()

    # ---------------------------------------------------------
    # Recent transactions
    # ---------------------------------------------------------

    def get_recent_transactions(
        self,
        user_id,
        limit=5
    ):

        db = SessionLocal()

        try:
            return (
                self.transaction_repo
                .get_recent_transactions(
                    db,
                    user_id,
                    limit
                )
                or []
            )

        finally:
            db.close()

    # ---------------------------------------------------------
    # Transaction count
    # ---------------------------------------------------------

    def count_transactions(self, user_id):

        db = SessionLocal()

        try:
            return (
                self.transaction_repo
                .count_transactions(
                    db,
                    user_id
                )
                or 0
            )

        finally:
            db.close()

    # ---------------------------------------------------------
    # Highest expense
    # ---------------------------------------------------------

    def get_highest_expense(self, user_id):

        db = SessionLocal()

        try:
            return (
                self.transaction_repo
                .get_highest_expense(
                    db,
                    user_id
                )
            )

        finally:
            db.close()

    # ---------------------------------------------------------
    # Total by category
    # ---------------------------------------------------------

    def get_total_by_category(self, user_id):

        db = SessionLocal()

        try:
            return (
                self.transaction_repo
                .get_total_by_category(
                    db,
                    user_id
                )
                or []
            )

        finally:
            db.close()

    # ---------------------------------------------------------
    # Monthly summary
    # ---------------------------------------------------------

    def get_monthly_summary(self, user_id):

        db = SessionLocal()

        try:
            return (
                self.transaction_repo
                .get_monthly_summary(
                    db,
                    user_id
                )
                or []
            )

        finally:
            db.close()

    # ---------------------------------------------------------
    # Transactions this month
    # ---------------------------------------------------------

    def get_transactions_this_month(self, user_id):

        db = SessionLocal()

        try:
            return (
                self.transaction_repo
                .get_transactions_this_month(
                    db,
                    user_id
                )
                or []
            )

        finally:
            db.close()

    # ---------------------------------------------------------
    # Total income this month
    # ---------------------------------------------------------

    def get_total_income_this_month(self, user_id):

        db = SessionLocal()

        try:
            return (
                self.transaction_repo
                .get_total_income_this_month(
                    db,
                    user_id
                )
                or 0
            )

        finally:
            db.close()

    # ---------------------------------------------------------
    # Total expenses this month
    # ---------------------------------------------------------

    def get_total_expenses_this_month(self, user_id):

        db = SessionLocal()

        try:
            return (
                self.transaction_repo
                .get_total_expenses_this_month(
                    db,
                    user_id
                )
                or 0
            )

        finally:
            db.close()