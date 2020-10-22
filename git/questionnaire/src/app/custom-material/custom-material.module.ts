import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

const MODULES = [
    MatToolbarModule,
    MatListModule,
    MatCardModule,
    MatInputModule,
    MatCheckboxModule,
    MatRadioModule,
    MatProgressBarModule,
    MatSelectModule,
    MatStepperModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
];

@NgModule({
    declarations: [],
    imports: [CommonModule, ...MODULES],
    exports: [...MODULES],
})
export class CustomMaterialModule {}
