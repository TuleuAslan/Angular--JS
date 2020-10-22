import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FieldComponent } from './field/field.component';
import { CellComponent } from './cell/cell.component';



@NgModule({
  declarations: [FieldComponent, CellComponent],
  imports: [
    CommonModule
  ],
  exports: [
      FieldComponent
  ]
})
export class UiModule { }
