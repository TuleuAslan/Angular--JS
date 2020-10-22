import { ThrowStmt } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {
    Question,
    Questionnaire,
    QuestionType,
    Variant,
} from '../models/questionnaire.models';
import { Utils } from '../utils';

const PREFIX = `Services.DBService`;
export const QUESTIONNARIES_STORAGE = `${PREFIX}.Questionnaries`;
export const CURRENT_QUESTIONNAIRE_ID = `${PREFIX}.CurrentQuestionnaire_ID`;

@Injectable({ providedIn: 'root' })
export class DbService {
    questionnaires = new BehaviorSubject<Questionnaire[]>([]);
    currentQuestionnaire = new BehaviorSubject<Questionnaire>(null);

    private _questionnaires: Questionnaire[];

    private get _currentQuestionnaire(): Questionnaire {
        return this.questionnaires.value.find(
            (q) => q.id === this.currentQuestionnaireId
        );
    }

    get currentQuestionnaireId(): number {
        return Utils.getItem(CURRENT_QUESTIONNAIRE_ID, null, sessionStorage);
    }

    constructor() {
        const savedQuestionnaires = Utils.getItem<Questionnaire[]>(
            QUESTIONNARIES_STORAGE,
            []
        );
        this._questionnaires = savedQuestionnaires.map(
            (q) => new Questionnaire(q)
        );

        if (this._questionnaires.length === 0) {
            this._questionnaires = [
                this.getStubQuestionnaire('First Questionnaire'),
                this.getStubQuestionnaire('Second Questionnaire'),
            ];

            this.saveQuestionnaires();
        }
        this.questionnaires.next(this._questionnaires);
        this.currentQuestionnaire.next(this._currentQuestionnaire);
    }

    saveQuestionnaires(): void {
        Utils.saveItem(QUESTIONNARIES_STORAGE, this._questionnaires);
        this.questionnaires.next(this._questionnaires);
    }

    editQuestinnaire(questionnaire: Questionnaire): void {
        this.setCurrentQuestionnaireId(questionnaire.id);
    }

    createQuestinnaire(): Questionnaire {
        const questinnaire = new Questionnaire({
            questions: [],
            userAnswers: [],
        });
        questinnaire.name = `Questionnaire ${questinnaire.id}`;
        this._questionnaires.push(questinnaire);
        this.saveQuestionnaires();
        return questinnaire;
    }

    saveQuestionnaire(questionnaire: Questionnaire): void {
        const index = this._questionnaires.findIndex(
            (q) => q.id === questionnaire.id
        );
        this._questionnaires[index] = questionnaire;
        this.saveQuestionnaires();
        this.setCurrentQuestionnaireId(null);
    }

    private setCurrentQuestionnaireId(id: number): void {
        Utils.saveItem(CURRENT_QUESTIONNAIRE_ID, id, sessionStorage);
        this.currentQuestionnaire.next(this._currentQuestionnaire);
    }

    startFilling(questionnaire: Questionnaire) {
        this.setCurrentQuestionnaireId(questionnaire.id);
    }

    private getStubQuestionnaire(title: string): Questionnaire {
        const questionnaire = new Questionnaire({
            name: title,
            time: 20,
            questions: [
                new Question({
                    content: 'First Question',
                    time: 10,
                    type: QuestionType.MultipleChoice,
                    variants: [
                        new Variant({
                            content: 'First variant',
                            isCorrect: true,
                        }),
                        new Variant({
                            content: 'Second variant',
                            isCorrect: true,
                        }),
                        new Variant({
                            content: 'Third variant',
                            isCorrect: false,
                        }),
                    ],
                }),
                new Question({
                    content: 'Second Question',
                    time: 10,
                    type: QuestionType.SingleChoice,
                    variants: [
                        new Variant({
                            content: 'First variant',
                            isCorrect: false,
                        }),
                        new Variant({
                            content: 'Second variant',
                            isCorrect: true,
                        }),
                        new Variant({
                            content: 'Third variant',
                            isCorrect: false,
                        }),
                    ],
                }),
                new Question({
                    content: 'Third Question',
                    time: 10,
                    type: QuestionType.SingleValue,
                    variants: [
                        new Variant({
                            content: 'Stub variant',
                            isCorrect: false,
                        }),
                    ],
                }),
            ],
            userAnswers: [],
        });
        return questionnaire;
    }
}
