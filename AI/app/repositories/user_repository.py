from app.database.models import ApplicationUser


class UserRepository:

    def get_all(self, db):
        return db.query(ApplicationUser).all()

    def get_by_id(self, db, user_id):
        return (
            db.query(ApplicationUser)
            .filter(ApplicationUser.id == user_id)
            .first()
        )

    def get_by_email(self, db, email):
        return (
            db.query(ApplicationUser)
            .filter(ApplicationUser.email == email)
            .first()
        )

    def get_monthly_budget_limit(self, db, user_id):
        user = (
            db.query(ApplicationUser)
            .filter(ApplicationUser.id == user_id)
            .first()
        )

        return user.monthly_budget_limit if user else 0

    def count_users(self, db):
        return db.query(ApplicationUser).count()