export default class QuestionAnswerOption {
    id: number | null = 0;
    userId: number = 0;
    title: string | null = null;
    deleted: boolean = false;
    isCorrect: boolean = false;
    questionId: number | null = 0;
}