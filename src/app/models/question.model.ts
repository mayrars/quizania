export interface IQuestion {
    type:              Type;
    difficulty:        Difficulty;
    category:          string;
    question:          string;
    correct_answer:    string;
    incorrect_answers: string[];
}

export enum Difficulty {
    Easy = "easy",
    Hard = "hard",
    Medium = "medium",
}

export enum Type {
    Boolean = "boolean",
    Multiple = "multiple",
}
