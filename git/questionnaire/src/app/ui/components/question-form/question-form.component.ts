import { Container } from '@angular/compiler/src/i18n/i18n_ast';
import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    Input,
    Output,
    EventEmitter,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatRadioChange } from '@angular/material/radio';
import { Question, QuestionType, Variant } from '@models';
import { Subscription } from 'rxjs';
import { FlexComponent } from '../flex.component';

export type QuestionTypeModel = {
    type: QuestionType;
    label: string;
};

export type VariantModel = {
    checkboxControl: FormControl;
    contentControl: FormControl;
    variant: Variant;
};

@Component({
    selector: 'ui-question-form',
    templateUrl: './question-form.component.html',
    styleUrls: ['./question-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuestionFormComponent extends FlexComponent implements OnInit {
    @Output()
    removeQuestion = new EventEmitter<number>();

    @Output()
    saveQuestion = new EventEmitter<Question>();

    @Output()
    cancelChanges = new EventEmitter<number>();

    questionCopy: Question;

    variants: VariantModel[] = [];

    private _typeChangeSubscription: Subscription;

    @Input()
    set question(q: Question) {
        this.questionCopy = new Question(q);

        if (q) {
            this.contentControl = new FormControl(q.content);
            this.timeControl = new FormControl(q.time);
            this.typeControl = new FormControl(q.type);

            if (this._typeChangeSubscription) {
                this._typeChangeSubscription.unsubscribe();
                delete this._typeChangeSubscription;
            }

            this._typeChangeSubscription = this.typeControl.valueChanges.subscribe(
                (value: QuestionType) => {
                    if (value === QuestionType.SingleChoice) {
                        this.variants.forEach((v) =>
                            v.checkboxControl.setValue(false)
                        );
                    }
                }
            );

            this.variants = q.variants.map((v) => ({
                variant: v,
                checkboxControl: new FormControl(v.isCorrect),
                contentControl: new FormControl(v.content),
            }));

            // this.variantControlMap.clear();
            // q.variants.forEach((v) => {
            //     this.variantControlMap.set(v.id, {});
            // });
        }
    }

    QuestionType = QuestionType;

    questionTypes: QuestionTypeModel[] = [
        {
            label: 'Single choice',
            type: QuestionType.SingleChoice,
        },
        {
            label: 'Multiple Choice',
            type: QuestionType.MultipleChoice,
        },
        {
            label: 'Single value',
            type: QuestionType.SingleValue,
        },
    ];

    contentControl = new FormControl();
    typeControl = new FormControl();
    timeControl = new FormControl();

    variantControlMap = new Map<number, VariantModel>();

    constructor() {
        super();
        this.isContainer = true;
    }

    varianAnswerChanged(event: MatRadioChange, variant: VariantModel) {
        this.variants.forEach((v) => v.checkboxControl.setValue(false));
        variant.checkboxControl.setValue(true);
        console.log('here');
    }

    save() {
        const question = new Question(this.questionCopy, {
            content: this.contentControl.value,
            time: this.timeControl.value,
            type: this.typeControl.value,
            variants: this.variants.map((v) => {
                const variant = new Variant(v.variant, {
                    isCorrect: v.checkboxControl.value,
                    content: v.contentControl.value,
                });
                return variant;
            }),
        });

        this.saveQuestion.emit(question);
    }

    addVariant() {
        const variant: VariantModel = {
            checkboxControl: new FormControl(false),
            contentControl: new FormControl(''),
            variant: new Variant(),
        };
        this.variants.push(variant);
    }

    deleteVariant(variant: VariantModel) {
        this.variants.splice(
            this.variants.findIndex((v) => v === variant),
            1
        );
    }

    ngOnInit(): void {}
}
