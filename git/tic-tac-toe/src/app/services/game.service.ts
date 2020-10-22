import { Injectable } from '@angular/core';
import { CellValue, CellCoordinates, Player } from '../models';

@Injectable()
export class GameService {
  field: CellValue[][];
  currentPlayer: Player;
  lastWonPlayer: Player;

  constructor() {
    this.initField();
  }

  initField() {
    this.field = [
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
    ];
    this.currentPlayer =
      this.lastWonPlayer == null ? 'user' : this.lastWonPlayer;
  }

  cellClicked(coords: CellCoordinates) {
    const cellValue = this.field[coords.row][coords.column];
    if (cellValue !== '') {
      return;
    }

    if (this.currentPlayer === 'user') {
      this.field[coords.row][coords.column] = 'X';
      this.currentPlayer = 'computer';
    } else {
      this.field[coords.row][coords.column] = 'O';
      this.currentPlayer = 'user';
    }

    if (!this.checkField() && this.currentPlayer === 'computer') {
      this.aiStep();
    }
  }

  checkField() {
    return false;
  }

  aiStep() {
    let rowResult: number;
    let columnResult: number;
    let found = false;

    this.field.forEach((row, rowIndex) => {
      row.forEach((cell, columnIndex) => {
        if (cell === '' && !found) {
          rowResult = rowIndex;
          columnResult = columnIndex;
          found = true;
        }
      });
    });

    if (found) {
      this.cellClicked({ row: rowResult, column: columnResult });
    }
  }
}
