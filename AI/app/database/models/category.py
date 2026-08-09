from sqlalchemy import Column, Integer, String, Boolean, ForeignKey

from app.database.base import Base


class Category(Base):
    __tablename__ = "Categories"

    category_id = Column(
        "CategoryId",
        Integer,
        primary_key=True,
        index=True
    )

    name = Column(
        "Name",
        String,
        nullable=False
    )

    description = Column(
        "Description",
        String,
        nullable=True
    )

    icon = Column(
        "Icon",
        String,
        nullable=True
    )

    user_id = Column(
        "UserId",
        String,
        ForeignKey("AspNetUsers.Id"),
        nullable=True
    )

    is_default = Column(
        "IsDefault",
        Boolean,
        default=False
    )

    is_active = Column(
        "IsActive",
        Boolean,
        default=True
    )