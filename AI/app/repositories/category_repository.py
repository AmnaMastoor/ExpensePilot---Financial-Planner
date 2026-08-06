from sqlalchemy import func

from app.database.models import Category


class CategoryRepository:

    def get_all(self, db):
        return db.query(Category).all()

    def get_by_id(self, db, category_id):
        return (
            db.query(Category)
            .filter(Category.id == category_id)
            .first()
        )

    def get_default_categories(self, db):
        return (
            db.query(Category)
            .filter(Category.is_default == True)
            .all()
        )

    def get_user_categories(self, db, user_id):
        return (
            db.query(Category)
            .filter(Category.user_id == user_id)
            .all()
        )

    def get_category_by_name(self, db, name):
        return (
            db.query(Category)
            .filter(Category.name == name)
            .first()
        )

    def count_categories(self, db, user_id):
        return (
            db.query(func.count(Category.category_id))
            .filter(Category.user_id == user_id)
            .scalar()
        )