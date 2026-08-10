from langchain_core.prompts import ChatPromptTemplate


class QueryRewriter:

    def __init__(self, llm):

        self.llm = llm

        self.prompt = ChatPromptTemplate.from_template(
            """
You are a query rewriting component for a RAG system.

Your ONLY job is to convert the user's CURRENT question
into a standalone search query.

You must NOT answer the question.

You must NOT explain your reasoning.

You must NOT add information that is not supported by
the conversation.

--------------------------------------------------
RULES
--------------------------------------------------

1. Look at the CURRENT USER QUESTION first.

2. If the current question is already complete and
   understandable by itself, return it with minimal
   changes.

3. If the current question contains a reference such as:

   "it"
   "its"
   "this"
   "that"
   "they"
   "them"
   "more detail"
   "explain more"
   "tell me more"
   "why is it useful"
   "what are its components"

   resolve that reference using the topic of the LAST
   user question and assistant answer pair in the history
   (the most recent exchange), NOT the topic that appears
   most often earlier in the conversation.

4. "Most recent" means the last message pair only. Do NOT
   use an older topic just because it was discussed more
   times earlier in the conversation.

5. NEVER switch topics.

6. Preserve the user's original intent.

7. If the previous topic was about a user's uploaded PDF,
   keep the rewritten query related to that uploaded PDF.

8. If the previous topic was about a financial concept,
   keep the rewritten query related to that financial concept.

9. Do not answer the question.

10. Return ONLY the rewritten standalone query.

11. Do NOT write explanations such as:
   "Based on the conversation..."
   "The rewritten query is..."
   "I have rewritten..."
   
--------------------------------------------------
CONVERSATION HISTORY
--------------------------------------------------

{history}

--------------------------------------------------
CURRENT USER QUESTION
--------------------------------------------------

{question}

--------------------------------------------------
STANDALONE QUERY
--------------------------------------------------
"""
        )

    def rewrite(
        self,
        question,
        history
    ):

        # ---------------------------------------------
        # Build history text
        # ---------------------------------------------

        history_text = ""

        for chat in history:

            # Expected format:
            # {
            #   "user": "...",
            #   "assistant": "..."
            # }

            if isinstance(chat, dict):

                history_text += (
                    f"User: {chat.get('user', '')}\n"
                    f"Assistant: {chat.get('assistant', '')}\n\n"
                )

        # ---------------------------------------------
        # Invoke LLM
        # ---------------------------------------------

        chain = self.prompt | self.llm

        response = chain.invoke(
            {
                "history": history_text,
                "question": question
            }
        )

        rewritten = response.content.strip()

        # ---------------------------------------------
        # Safety fallback
        # ---------------------------------------------

        if not rewritten:

            return question

        return rewritten