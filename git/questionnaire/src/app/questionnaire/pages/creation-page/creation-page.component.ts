import { Component, OnInit } from '@angular/core';
import { Questionnaire } from '@models';
import { DbService } from 'src/app/shared/services/db.service';
import { PageComponent } from 'src/app/ui/components/page.component';

@Component({
    templateUrl: './creation-page.component.html',
    styleUrls: ['./creation-page.component.scss'],
})
export class CreationPageComponent extends PageComponent implements OnInit {
    questionnaires: Questionnaire[] = [];
    selectedQuestionnaire: Questionnaire;

    constructor(private _db: DbService) {
        super();
        this.isContainer = true;
        this.direction = 'row';
        this.alignment = 'stretch';
        this.gap = 24;
    }

    ngOnInit(): void {
        this._db.questionnaires.subscribe((questionnaires) => {
            this.questionnaires = [...questionnaires];
        });
        this._db.currentQuestionnaire.subscribe((questionnaire) => {
            this.selectedQuestionnaire = questionnaire;
        });
    }

    questionnaireSelectedHandler(questionnaire: Questionnaire): void {
        this._db.editQuestinnaire(questionnaire);
    }

    create() {
        this._db.createQuestinnaire();
    }

    save(questionnaire: Questionnaire) {
        this._db.saveQuestionnaire(questionnaire);
    }
}
