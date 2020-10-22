import { BaseModel, BaseModelPart, EnumProperty } from '@dev-stream/utils';
import { Utils } from '../utils';

const PREFIX = 'Models';
export const QUESTIONNAIRE_LAST_ID = `${PREFIX}.Questionnaire.lastId`;
export const QUESTION_LAST_ID = `${PREFIX}.Question.lastId`;
export const VARIANT_LAST_ID = `${PREFIX}.Variant.lastId`;
export const USER_ANSWER_LAST_ID = `${PREFIX}.UserAnswer.lastId`;

export type HasIdPart<TModel> = BaseModelPart<TModel, 'id' | 'ID_KEY'>;

export abstract class HasId<TModel extends HasId<TModel>> extends BaseModel<
    TModel
> {
    id: number;

    constructor(...parts: BaseModelPart<TModel>[]) {
        super(...parts);
    }

    protected abstract ID_KEY: string;

    protected Initialize() {
        if (this.id == null) {
            this.id = this.ID();
        }
    }

    private ID(): number {
        const nextId = Utils.getItem(this.ID_KEY, -1) + 1;
        Utils.saveItem(this.ID_KEY, nextId);
        return nextId;
    }
}

export enum QuestionType {
    MultipleChoice = 'MultipleChoice',
    SingleChoice = 'SingleChoice',
    SingleValue = 'SingleValue',
}

export class Variant extends HasId<Variant> {
    protected BASE_TYPE = Variant;
    protected ID_KEY = VARIANT_LAST_ID;

    content: string;
    isCorrect: boolean;

    constructor(...parts: HasIdPart<Variant>[]) {
        super(...parts);
        this.Initialize();
    }
}

export class Question extends HasId<Question> {
    protected BASE_TYPE = Question;
    protected ID_KEY = QUESTION_LAST_ID;

    time: number;
    content: string;

    @EnumProperty(QuestionType)
    type: QuestionType;

    variants: Variant[];

    constructor(...parts: HasIdPart<Question>[]) {
        super(...parts);
        this.Initialize();
        this.InitializeArrayProperty('variants', Variant);
    }
}

export class UserAnswer extends HasId<UserAnswer> {
    protected BASE_TYPE = UserAnswer;
    protected ID_KEY = USER_ANSWER_LAST_ID;

    questionId: number;
    variantId: number;
    singleValueAnswer: number;

    constructor(...parts: HasIdPart<UserAnswer>[]) {
        super(...parts);
        this.Initialize();
    }
}

// const question = new Question();

// const answers = [
//     new UserAnswer({
//         questionId: question.id,
//         variantId: question.variants[0].id,
//         singleValueAnswer: 123
//     }),
//     // new UserAnswer({
//     //     questionId: question.id,
//     //     variantId: question.variants[3].id,
//     // }),
//     // new UserAnswer({
//     //     questionId: question.id,
//     //     variantId: question.variants[5].id,
//     // }),
// ];

export class Questionnaire extends HasId<Questionnaire> {
    protected BASE_TYPE = Questionnaire;
    ID_KEY = QUESTIONNAIRE_LAST_ID;

    name: string;

    get time(): number {
        const times = this.questions.map((q) => q.time);
        return times.reduce((prev, cur) => prev + cur, 0);
    }
    set time(v: number) {}

    questions: Question[];
    userAnswers: UserAnswer[];

    constructor(...parts: HasIdPart<Questionnaire>[]) {
        super(...parts);
        this.Initialize();
        this.InitializeArrayProperty('questions', Question);
        this.InitializeArrayProperty('userAnswers', UserAnswer);
    }
}
