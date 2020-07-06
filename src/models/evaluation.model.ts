import Question from './question.model';

export default class Evaluation {
    id: number | null = 0;
    userId: number | null = 0;
    name: string | null = null;
    subjectId: number = 0;
    showGifs: boolean = false;
    questionsFrontEnd: Array<Question> = []
    questionQuantity: number | null = 0
}