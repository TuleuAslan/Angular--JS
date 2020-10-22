import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuestionnaireRoutingModule } from './questionnaire-routing.module';
import { CreationPageComponent } from './pages/creation-page/creation-page.component';
import { FillingPageComponent } from './pages/filling-page/filling-page.component';
import { ResultsPageComponent } from './pages/results-page/results-page.component';
import { UiModule } from '../ui/ui.module';

@NgModule({
    declarations: [
        CreationPageComponent,
        FillingPageComponent,
        ResultsPageComponent,
    ],
    imports: [CommonModule, QuestionnaireRoutingModule, UiModule],
})
export class QuestionnaireModule {}
