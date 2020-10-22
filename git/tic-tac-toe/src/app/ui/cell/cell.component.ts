import {
  Component,
  OnInit,
  Input,
  EventEmitter,
  Output,
  HostBinding,
  HostListener,
} from '@angular/core';
import { CellValue, CellCoordinates } from 'src/app/models';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.scss'],
})
export class CellComponent implements OnInit {
  @Input()
  value: CellValue;

  @Input()
  row: number;

  @Input()
  column: number;

  @Output()
  cellClicked = new EventEmitter<CellCoordinates>();

  constructor() {}

  ngOnInit(): void {}

  @HostListener('click')
  cellClickedBinding() {
    this.cellClicked.emit({ row: this.row, column: this.column });
  }
}
