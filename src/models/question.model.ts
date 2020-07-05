import QuestionAnswerOption from './questionAnswerOption.model';

export default class Question {
    id: number | null = 0;
    name: string | null = null;
    wildcard: string | null = null;
    evaluationId: number = 0;
    documentId: number = 0;
    userId: number = 0;
    questionAnswerOptions: Array<QuestionAnswerOption> = [];
    img: any = null;
}