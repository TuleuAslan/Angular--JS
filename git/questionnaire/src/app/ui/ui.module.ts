import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomMaterialModule } from '../custom-material/custom-material.module';
import { SpacerComponent } from './components/spacer/spacer.component';
import { FlexComponent } from './components/flex.component';
import { QuestionnaireListComponent } from './components/questionnaire-list/questionnaire-list.component';
import { CreationFormComponent } from './components/creation-form/creation-form.component';
import { NotSelectedQuestionnaireComponent } from './components/not-selected-questionnaire/not-selected-questionnaire.component';
import { QuestionFormComponent } from './components/question-form/question-form.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        SpacerComponent,
        FlexComponent,
        QuestionnaireListComponent,
        CreationFormComponent,
        NotSelectedQuestionnaireComponent,
        QuestionFormComponent,
    ],
    imports: [CommonModule, CustomMaterialModule, ReactiveFormsModule],
    exports: [
        CustomMaterialModule,
        SpacerComponent,
        FlexComponent,
        QuestionnaireListComponent,
        CreationFormComponent,
        NotSelectedQuestionnaireComponent,
        QuestionFormComponent,
    ],
})
export class UiModule {}
