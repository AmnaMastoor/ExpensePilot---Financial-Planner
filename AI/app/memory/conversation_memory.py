class ConversationMemory:

    def __init__(self):
        self.history = {}

    # =========================================================
    # GET HISTORY
    # =========================================================

    def get_history(self, user_id):

        return self.history.get(
            str(user_id),
            []
        )

    # =========================================================
    # ADD MESSAGE
    # =========================================================

    def add_message(
        self,
        user_id,
        question,
        answer
    ):

        user_key = str(user_id)

        if user_key not in self.history:
            self.history[user_key] = []

        self.history[user_key].append(
            {
                "user": question,
                "assistant": answer
            }
        )

    # =========================================================
    # CLEAR HISTORY
    # =========================================================

    def clear(self, user_id=None):

        # If a user_id is provided, clear only that user's history
        if user_id is not None:

            user_key = str(user_id)

            self.history.pop(
                user_key,
                None
            )

            return

        # If no user_id is provided, clear everything
        self.history.clear()

    # =========================================================
    # BACKWARD COMPATIBILITY
    # =========================================================

    def clear_history(self, user_id):

        self.clear(user_id)

    # =========================================================
    # GET LAST MESSAGE
    # =========================================================

    def get_last_message(self, user_id):

        history = self.get_history(
            user_id
        )

        if not history:
            return None

        return history[-1]