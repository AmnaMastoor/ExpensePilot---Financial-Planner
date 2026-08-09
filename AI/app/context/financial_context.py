from app.services.financial_service import FinancialService


class FinancialContextBuilder:

    def __init__(self):
        self.service = FinancialService()

    def build(self, user_id):

        # ---------------------------------------------------------
        # Get calculated financial data
        # ---------------------------------------------------------

        summary = self.service.get_financial_summary(user_id)
        dashboard = self.service.get_dashboard_summary(user_id)
        budget = self.service.get_budget_summary(user_id)
        goals = self.service.get_goal_summary(user_id)
        categories = self.service.get_category_analysis(user_id)
        transactions = self.service.get_recent_transactions(user_id)

        # ---------------------------------------------------------
        # Safe defaults
        # ---------------------------------------------------------

        summary = summary or {}
        dashboard = dashboard or {}
        budget = budget or {}
        goals = goals or {}
        categories = categories or []
        transactions = transactions or []

        # ---------------------------------------------------------
        # Recent transactions
        # ---------------------------------------------------------

        recent_transactions = ""

        for transaction in transactions:

            transaction_type = (
                "Income"
                if transaction.type == 0
                else "Expense"
            )

            transaction_date = ""

            if transaction.transaction_date:
                transaction_date = (
                    transaction.transaction_date.strftime(
                        "%Y-%m-%d"
                    )
                )

            recent_transactions += (
                f"- {transaction.title}: "
                f"Rs.{transaction.amount} "
                f"({transaction_type}) "
                f"on {transaction_date}\n"
            )

        if not recent_transactions:
            recent_transactions = (
                "No recent transactions available."
            )

        # ---------------------------------------------------------
        # Category analysis
        # ---------------------------------------------------------

        category_text = ""

        for category in categories:
            category_text += f"- {category}\n"

        if not category_text:
            category_text = (
                "No category analysis available."
            )

        # ---------------------------------------------------------
        # Financial context
        # ---------------------------------------------------------

        financial_context = f"""
IMPORTANT FINANCIAL DATA RULES:

The values below are calculated from the user's actual
financial data.

Use these values exactly as provided.

Do not invent missing values.

============================================================
ALL-TIME FINANCIAL SUMMARY
============================================================

Total Income:
Rs.{summary.get("income", "Not available")}

Total Expenses:
Rs.{summary.get("expenses", "Not available")}

Current Balance:
Rs.{summary.get("balance", "Not available")}

============================================================
CURRENT MONTH FINANCIAL SUMMARY
============================================================

Income This Month:
Rs.{summary.get("monthly_income", "Not available")}

Expenses This Month:
Rs.{summary.get("monthly_expenses", "Not available")}

Balance This Month:
Rs.{summary.get("monthly_balance", "Not available")}

============================================================
DASHBOARD SUMMARY
============================================================

Total Income:
Rs.{dashboard.get("total_income", "Not available")}

Total Expenses:
Rs.{dashboard.get("total_expenses", "Not available")}

Total Budget:
Rs.{dashboard.get("total_budget", "Not available")}

Total Transactions:
{dashboard.get("transaction_count", "Not available")}

Goals:
{dashboard.get("goal_count", "Not available")}

============================================================
BUDGET INFORMATION
============================================================

Total Budget:
Rs.{budget.get("total_budget", "Not available")}

Active Budgets:
{budget.get("active_budgets", "Not available")}

Budget Count:
{budget.get("budget_count", "Not available")}

============================================================
FINANCIAL GOALS
============================================================

Total Goal Amount:
Rs.{goals.get("total_goal_amount", "Not available")}

Completed Goals:
{goals.get("completed_goals", "Not available")}

Pending Goals:
{goals.get("pending_goals", "Not available")}

============================================================
RECENT TRANSACTIONS
============================================================

These are individual recent transactions.

Use them only for:

- specific transactions
- recent spending activity
- transaction details
- explaining where money was spent

Do NOT reconstruct financial totals from these transactions
when calculated totals above are available.

{recent_transactions}

============================================================
CATEGORY ANALYSIS
============================================================

{category_text}
"""

        return financial_context