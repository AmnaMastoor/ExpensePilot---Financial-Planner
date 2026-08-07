from datetime import date
from sqlalchemy import func

from app.database.models import Transaction


class TransactionRepository:

    def get_all(self, db):
        return db.query(Transaction).all()

    def get_by_id(self, db, transaction_id):
        return (
            db.query(Transaction)
            .filter(Transaction.id == transaction_id)
            .first()
        )

    def get_recent_transactions(self, db, user_id, limit=5):
        return (
            db.query(Transaction)
            .filter(Transaction.user_id == user_id)
            .order_by(Transaction.transaction_date.desc())
            .limit(limit)
            .all()
        )

    def get_total_income(self, db, user_id):
        return (
            db.query(func.sum(Transaction.amount))
            .filter(
                Transaction.user_id == user_id,
                Transaction.type == 0
            )
            .scalar()
        )

    def get_total_expenses(self, db, user_id):
        return (
            db.query(func.sum(Transaction.amount))
            .filter(
                Transaction.user_id == user_id,
                Transaction.type == 1
            )
            .scalar()
        )

    def get_transactions_by_type(self, db, user_id, transaction_type):
        return (
            db.query(Transaction)
            .filter(
                Transaction.user_id == user_id,
                Transaction.type == transaction_type
            )
            .all()
        )

    def get_transactions_by_category(self, db, user_id, category_id):
        return (
            db.query(Transaction)
            .filter(
                Transaction.user_id == user_id,
                Transaction.category_id == category_id
            )
            .all()
        )

    def get_transactions_this_month(self, db, user_id):
        today = date.today()

        return (
            db.query(Transaction)
            .filter(
                Transaction.user_id == user_id,
                func.extract("year", Transaction.transaction_date) == today.year,
                func.extract("month", Transaction.transaction_date) == today.month
            )
            .all()
        )

    def get_transactions_between_dates(
        self,
        db,
        user_id,
        start_date,
        end_date
    ):
        return (
            db.query(Transaction)
            .filter(
                Transaction.user_id == user_id,
                Transaction.transaction_date.between(start_date, end_date)
            )
            .all()
        )

    def get_total_income_this_month(self, db, user_id):
        today = date.today()

        return (
            db.query(func.sum(Transaction.amount))
            .filter(
                Transaction.user_id == user_id,
                Transaction.type == 0,
                func.extract("year", Transaction.transaction_date) == today.year,
                func.extract("month", Transaction.transaction_date) == today.month
            )
            .scalar()
        )

    def get_total_expenses_this_month(self, db, user_id):
        today = date.today()

        return (
            db.query(func.sum(Transaction.amount))
            .filter(
                Transaction.user_id == user_id,
                Transaction.type == 1,
                func.extract("year", Transaction.transaction_date) == today.year,
                func.extract("month", Transaction.transaction_date) == today.month
            )
            .scalar()
        )

    def get_monthly_summary(self, db, user_id):
        today = date.today()

        return (
            db.query(
                Transaction.type,
                func.sum(Transaction.amount).label("total")
            )
            .filter(
                Transaction.user_id == user_id,
                func.extract("year", Transaction.transaction_date) == today.year,
                func.extract("month", Transaction.transaction_date) == today.month
            )
            .group_by(Transaction.type)
            .all()
        )

    def get_total_by_category(self, db, user_id):
        return (
            db.query(
                Transaction.category_id,
                func.sum(Transaction.amount).label("total")
            )
            .filter(Transaction.user_id == user_id)
            .group_by(Transaction.category_id)
            .all()
        )

    def get_highest_expense(self, db, user_id):
        return (
            db.query(Transaction)
            .filter(
                Transaction.user_id == user_id,
                Transaction.type == 1
            )
            .order_by(Transaction.amount.desc())
            .first()
        )

    def count_transactions(self, db, user_id):
        return (
            db.query(func.count(Transaction.transaction_id))
            .filter(Transaction.user_id == user_id)
            .scalar()
        )