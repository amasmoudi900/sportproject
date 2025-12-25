import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StadiumService } from '../../services/stadium.service';
import { Router } from '@angular/router';
import { TeamService } from '../../services/team.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-add-stadium',
  imports: [FormsModule, NgFor],
  templateUrl: './add-stadium.component.html',
  styleUrl: './add-stadium.component.css'
})
export class AddStadiumComponent {

  stadium: any = {};
  teamsTab: any = [];
  constructor(
    private stadiumService: StadiumService,
    private router: Router,
    private teamService: TeamService) { }

  ngOnInit() {
    this.teamService.getAllTeams().subscribe(
      (data) => {
        this.teamsTab = data.teams;
      }
    )
  }

  addStadium() {
    console.log("Here is stadium object", this.stadium);
    this.stadiumService.addStadium(this.stadium).subscribe(
      (data) => {
        console.log("Here is response after adding stadium", data.msg);
        this.router.navigate(['admin']);
      }
    );
  }
}
