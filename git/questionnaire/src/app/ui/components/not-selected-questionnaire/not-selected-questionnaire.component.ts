import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FlexComponent } from '../flex.component';

@Component({
    selector: 'ui-not-selected-questionnaire',
    templateUrl: './not-selected-questionnaire.component.html',
    styleUrls: ['./not-selected-questionnaire.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotSelectedQuestionnaireComponent
    extends FlexComponent
    implements OnInit {
    constructor() {
        super();
        this.alignment = 'center';
        this.justification = 'center';
        this.isContainer = true;
        this.grow = true;
        this.shrink = true;
    }

    ngOnInit(): void {}
}
