import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { TeamService } from '../../services/team.service';

@Component({
  selector: 'app-teams-table',
  imports: [NgFor],
  templateUrl: './teams-table.component.html',
  styleUrl: './teams-table.component.css'
})
export class TeamsTableComponent {
  teamsTab: any = [];
  constructor(private tService: TeamService) { }

  ngOnInit() {
    this.tService.getAllTeams().subscribe(
      (data) => {
        console.log("Here is teams from BE", data);
        this.teamsTab = data.teams;
      }
    )
  }

  deleteTeam(id: any) {
    this.tService.deleteTeam(id).subscribe(
      (response) => {
        console.log("Here is response after deleting team", response);
        this.tService.getAllTeams().subscribe(
          (data) => {
            this.teamsTab = data.teams;
          }
        )
      }
    );
  }
}
