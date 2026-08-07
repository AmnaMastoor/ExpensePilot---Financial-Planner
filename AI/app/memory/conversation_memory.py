class ConversationMemory:

    def __init__(self):
        self.history = {}


    def get_history(self, user_id):

        return self.history.get(
            str(user_id),
            []
        )


    def add_message(
        self,
        user_id,
        question,
        answer
    ):

        if str(user_id) not in self.history:
            self.history[str(user_id)] = []


        self.history[str(user_id)].append(
            {
                "user": question,
                "assistant": answer
            }
        )