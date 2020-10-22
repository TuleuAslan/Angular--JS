import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

const MODULES = [
  MatToolbarModule,
  MatInputModule,
  MatCardModule,
  MatSelectModule,
  MatFormFieldModule,
  MatButtonModule,
];

@NgModule({
  declarations: [],
  imports: [CommonModule, ...MODULES],
  exports: [...MODULES],
  providers: [],
})
export class CustomMaterialModule {}
