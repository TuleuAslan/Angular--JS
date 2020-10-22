import { Component, OnInit } from '@angular/core';
import { Question, Questionnaire } from '@models';
import { DbService } from 'src/app/shared/services/db.service';
import { PageComponent } from 'src/app/ui/components/page.component';

@Component({
    templateUrl: './filling-page.component.html',
    styleUrls: ['./filling-page.component.scss'],
})
export class FillingPageComponent extends PageComponent implements OnInit {
    questionnaires: Questionnaire[] = [];

    questions: Question[] = [];
    timeLeft: number;
    timer: any;

    disabled = false;

    private _selectedQuestionnaire: Questionnaire;
    public get selectedQuestionnaire(): Questionnaire {
        return this._selectedQuestionnaire;
    }
    public set selectedQuestionnaire(v: Questionnaire) {
        this._selectedQuestionnaire = v;
        if (v) {
            this.questions = [...v.questions];
            this.timeLeft = this.selectedQuestionnaire.time;
            if (this.timer) {
                clearInterval(this.timer);
            }
            this.timer = setInterval(this.countdown.bind(this), 1000);
            this.disabled = false;
        }
    }

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
        this._db.startFilling(questionnaire);
    }

    countdown() {
        this.timeLeft--;
        if (this.timeLeft <= 0 && this.timer) {
            clearInterval(this.timer);
            delete this.timer;
        }
        if (this.timeLeft <= 0) {
            this.disabled = true;
        }
    }
}
