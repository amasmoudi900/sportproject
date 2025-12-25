import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TeamService } from '../../services/team.service';

@Component({
  selector: 'app-add-team',
  imports: [FormsModule],
  templateUrl: './add-team.component.html',
  styleUrl: './add-team.component.css'
})
export class AddTeamComponent {

  obj: any = {};
  constructor(private teamService: TeamService) { }
  addTeam() {
    console.log("Here is match OBJ", this.obj);
    this.teamService.addTeam(this.obj).subscribe(
      (response) => {
        console.log("Here is response from BE after adding team", response);
      }
    );
  }
}
