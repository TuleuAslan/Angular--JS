import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateQuizComponent } from './pages/create-quiz/create-quiz.component';
import { FillQuizComponent } from './pages/fill-quiz/fill-quiz.component';

const routes: Routes = [
    {
        path: 'create',
        component: CreateQuizComponent,
    },
    {
        path: 'fill',
        component: FillQuizComponent,
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
