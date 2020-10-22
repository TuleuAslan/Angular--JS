import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    Input,
    EventEmitter,
    Output,
} from '@angular/core';
import { MatSelectionListChange } from '@angular/material/list';
import { Questionnaire } from '@models';
import { FlexComponent } from '../flex.component';

@Component({
    selector: 'ui-questionnaire-list',
    templateUrl: './questionnaire-list.component.html',
    styleUrls: ['./questionnaire-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuestionnaireListComponent
    extends FlexComponent
    implements OnInit {
    @Input()
    questionnaires: Questionnaire[];

    @Input()
    selectedQuestionnaire: Questionnaire;

    @Output()
    questionnaireSelected = new EventEmitter<Questionnaire>();

    constructor() {
        super();
    }

    ngOnInit(): void {}

    selectionChangeHandler(event: MatSelectionListChange): void {
        this.questionnaireSelected.emit(event.option.value);
    }
}
