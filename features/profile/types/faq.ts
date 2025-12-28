export type Faq = {
    /** Stable unique identifier (used as list key/anchor). */
    id: string;
    /** The question being asked. */
    question: string;
    /** The answer to the question. Supports Markdown formatting. */
    answer: string;
    /** Whether this FAQ item is expanded by default in the UI. */
    isExpanded?: boolean;
};
