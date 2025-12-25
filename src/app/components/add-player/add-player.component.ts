import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PlayerService } from '../../services/player.service';
import { TeamService } from '../../services/team.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-add-player',
  imports: [FormsModule, NgFor],
  templateUrl: './add-player.component.html',
  styleUrl: './add-player.component.css'
})
export class AddPlayerComponent {

  obj: any = {};
  teamsTab: any = [];
  constructor(
    private playerService: PlayerService,
    private teamService: TeamService) { }

  ngOnInit() {
    this.teamService.getAllTeams().subscribe(
      (data) => {
        console.log("Here is all teams from BE", data.teams);
        this.teamsTab = data.teams;
      }
    );
  }
  addPlayer() {
    console.log("Here is match OBJ", this.obj);
    this.playerService.addPlayer(this.obj).subscribe(
      (response) => {
        console.log("Here is response from BE after adding player", response);
      }
    );
  }
}
