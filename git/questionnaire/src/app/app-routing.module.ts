import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';

const routes: Routes = [
    {
        path: 'questionnaire',
        loadChildren: async () => {
            const module = await import('./questionnaire/questionnaire.module');
            return module.QuestionnaireModule;
        },
    },
    {
        path: '',
        pathMatch: 'full',
        component: MainPageComponent,
    },
    // {
    //     path: '**',
    //     redirectTo: '',
    // },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
