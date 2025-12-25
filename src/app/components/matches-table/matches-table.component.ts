import { NgFor, NgStyle, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatchService } from '../../services/match.service';

@Component({
  selector: 'app-matches-table',
  imports: [NgFor, NgIf],
  templateUrl: './matches-table.component.html',
  styleUrl: './matches-table.component.css'
})
export class MatchesTableComponent {

  matchesTab: any = [];

  constructor(private router: Router, private matchService: MatchService) { }
  ngOnInit() {
    this.matchService.getAllMatches().subscribe(
      (data) => {
        console.log("Here is data from BE", data);
        this.matchesTab = data.tab;
      }
    );
  }

  deleteMatch(matchId: any) {
    this.matchService.deleteMatch(matchId).subscribe(
      (response) => {
        console.log("Here is response after Match delete", response);
        if (response.isDeleted) {
          this.matchService.getAllMatches().subscribe(
            (data) => {
              this.matchesTab = data.tab;
            }
          )
        }
      }
    );
  }

  goToInfo(matchId: any) {
    // location.replace(page.html);
    // this.router.navigate([`matchInfo/${matchId}`]);
    this.router.navigate(['matchInfo/' + matchId]);
  }

  goToEdit(matchId: any) {
    this.router.navigate(["editMatch/" + matchId]);
  }

  scoreColor(a: number, b: number) {
    if (a > b) {
      return 'green';
    } else if (a < b) {
      return 'orange';
    }
    return 'blue';
  }

  resultMsg(obj: any) {
    if (obj.scoreOne > obj.scoreTwo) {
      return obj.teamOne + " is the winner";
    } else if (obj.scoreOne < obj.scoreTwo) {
      return obj.teamOne + " is the loser";
    }
    return "Draw";
  }
}
