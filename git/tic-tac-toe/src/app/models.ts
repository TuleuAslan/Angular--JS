export type CellValue = '' | 'X' | 'O';

export interface CellCoordinates {
  row: number;
  column: number;
}

export type Player = 'user' | 'computer';
