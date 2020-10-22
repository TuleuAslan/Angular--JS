import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CellValue, CellCoordinates, Player } from 'src/app/models';

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.scss'],
})
export class FieldComponent implements OnInit {
  @Input()
  gameField: CellValue[][];

  @Output()
  cellClicked = new EventEmitter<CellCoordinates>();

  @Input()
  player: Player;

  constructor() {}

  ngOnInit(): void {}

  cellClickedHandler(coords: CellCoordinates) {
    console.log(
      `cell clicked! coords: row: ${coords.row} column: ${coords.column}`
    );
    this.cellClicked.emit(coords);
  }
}
