from app.services.financial_service import FinancialService


class FinancialContextBuilder:

    def __init__(self):
        self.service = FinancialService()


    def build(self, user_id):

        summary = self.service.get_financial_summary(user_id)
        dashboard = self.service.get_dashboard_summary(user_id)
        budget = self.service.get_budget_summary(user_id)
        goals = self.service.get_goal_summary(user_id)
        categories = self.service.get_category_analysis(user_id)
        transactions = self.service.get_recent_transactions(user_id)


        recent_transactions = ""

        for t in transactions:
            transaction_type = (
                "Income" 
                if t.type == 0 
                else "Expense"
            )

            recent_transactions += (
                f"- {t.title}: Rs.{t.amount} "
                f"({transaction_type}) "
                f"on {t.transaction_date.strftime('%Y-%m-%d')}\n"
            )


        category_text = ""

        for category in categories:
            category_text += f"- {category}\n"


        financial_context = f"""
This section contains calculated financial totals.
Always use these values for questions about total spending, income, balance, or monthly analysis.

Total Income This Month: Rs.{summary['income']}
Total Expenses This Month: Rs.{summary['expenses']}
Remaining After Expenses:  Rs.{summary['balance']}


Dashboard Summary
-----------------
Total Income: Rs.{dashboard['total_income']}
Total Expenses: Rs.{dashboard['total_expenses']}
Total Budget: Rs.{dashboard['total_budget']}
Total Transactions: {dashboard['transaction_count']}
Goals: {dashboard['goal_count']}


Budget Information
------------------
Total Budget: Rs.{budget['total_budget']}
Active Budgets: {budget['active_budgets']}
Budget Count: {budget['budget_count']}


Financial Goals
---------------
Total Goal Amount: Rs.{goals['total_goal_amount']}
Completed Goals: {goals['completed_goals']}
Pending Goals: {goals['pending_goals']}


These are recent individual transactions.
Do not calculate monthly totals from this section if Financial Summary values are available.

{recent_transactions}


Category Analysis
-----------------
{category_text}
"""

        return financial_context