from app.services.financial_service import FinancialService


class FinancialContextBuilder:

    def __init__(self):
        self.service = FinancialService()

    def build(self, user_id):

        recent = []

        for t in self.service.get_recent_transactions(user_id):
            recent.append({
            "title": t.title,
            "amount": float(t.amount),
            "type": "Income" if t.type == 0 else "Expense",
            "date": t.transaction_date.strftime("%Y-%m-%d"),
            "category_id": t.category_id,
        })

        return {
        "financial_summary": self.service.get_financial_summary(user_id),
        "dashboard_summary": self.service.get_dashboard_summary(user_id),
        "budget_summary": self.service.get_budget_summary(user_id),
        "goal_summary": self.service.get_goal_summary(user_id),
        "recent_transactions": recent,
        "category_analysis": self.service.get_category_analysis(user_id),
    }