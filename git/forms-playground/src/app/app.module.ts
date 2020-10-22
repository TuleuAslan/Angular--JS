import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CustomMaterialModule } from './custom-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlphaDirective } from './validators/alpha.directive';
import { CounterComponent } from './custom-input/counter.component';
import { CreateQuizComponent } from './pages/create-quiz/create-quiz.component';
import { FillQuizComponent } from './pages/fill-quiz/fill-quiz.component';

@NgModule({
    declarations: [
        AppComponent,
        AlphaDirective,
        CounterComponent,
        CreateQuizComponent,
        FillQuizComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        CustomMaterialModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
