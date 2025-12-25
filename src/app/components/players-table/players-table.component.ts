import { Component } from '@angular/core';
import { PlayerService } from '../../services/player.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-players-table',
  imports: [NgFor],
  templateUrl: './players-table.component.html',
  styleUrl: './players-table.component.css'
})
export class PlayersTableComponent {

  playersTab: any = [];
  constructor(private pService: PlayerService) { }

  ngOnInit() {
    this.pService.getAllPlayers().subscribe(
      (data) => {
        console.log("Here is players from BE", data);
        this.playersTab = data.players;
      }
    )
  }
}
