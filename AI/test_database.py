from app.database.connection import SessionLocal
from app.database.models import Transaction
from app.services.financial_service import FinancialService
from app.database.models import ApplicationUser
from app.context.financial_context import FinancialContextBuilder

db = SessionLocal()

transaction = db.query(Transaction).first()

user_id = transaction.user_id

db.close()
service = FinancialService()
user = service.get_user(user_id)

builder = FinancialContextBuilder()

context = builder.build(user_id)

print(context)