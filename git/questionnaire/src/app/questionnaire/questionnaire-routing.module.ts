import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreationPageComponent } from './pages/creation-page/creation-page.component';
import { FillingPageComponent } from './pages/filling-page/filling-page.component';
import { ResultsPageComponent } from './pages/results-page/results-page.component';

const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'create' },
    { path: 'create', component: CreationPageComponent },
    {
        path: 'fill',
        component: FillingPageComponent,
    },
    {
        path: 'results',
        component: ResultsPageComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class QuestionnaireRoutingModule {}
