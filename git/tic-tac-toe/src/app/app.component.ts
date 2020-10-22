import { Component } from '@angular/core';
import { GameService } from './services/game.service';
import { CellCoordinates } from './models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(public gameService: GameService) {}

  cellClickedHandler(coords: CellCoordinates) {
    this.gameService.cellClicked(coords);
  }
}
