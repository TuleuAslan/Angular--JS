import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    Input,
    Output,
    EventEmitter,
} from '@angular/core';
import { Question, Questionnaire } from '@models';
import { FlexComponent } from '../flex.component';

@Component({
    selector: 'ui-creation-form',
    templateUrl: './creation-form.component.html',
    styleUrls: ['./creation-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreationFormComponent extends FlexComponent implements OnInit {
    questionnireCopy: Questionnaire;

    @Input()
    set questionnaire(q: Questionnaire) {
        this.questionnireCopy = q;
    }

    constructor() {
        super();
        this.grow = true;
    }

    ngOnInit(): void {}

    addQuestion() {
        this.questionnireCopy.questions.push(
            new Question({ content: `Question`, variants: [] })
        );
    }

    removeQuestionHandler(questionId: number) {
        console.log('remove', questionId);
        const questionIndex = this.questionnireCopy.questions.findIndex(
            (q) => q.id === questionId
        );
        this.questionnireCopy.questions.splice(questionIndex, 1);
    }

    saveQuestionHandler(questionToSave: Question) {
        const questionIndex = this.questionnireCopy.questions.findIndex(
            (q) => q.id === questionToSave.id
        );
        this.questionnireCopy.questions[questionIndex] = questionToSave;
    }

    cancelChangesHandler(questionId: number) {
        const questionIndex = this.questionnireCopy.questions.findIndex(
            (q) => q.id === questionId
        );
        this.questionnireCopy.questions[questionIndex] = new Question(
            this.questionnireCopy.questions[questionIndex]
        );
    }

    getQuestionnaire() {
        return this.questionnireCopy;
    }
}
