import { Component } from '@angular/core';
import { ResultComponent } from '../result/result.component';
import { ActivatedRoute } from '@angular/router';
import { getFromLS } from '../../shared/genericFunctions';
import { MatchService } from '../../services/match.service';

@Component({
  selector: 'app-match-info',
  imports: [ResultComponent],
  templateUrl: './match-info.component.html',
  styleUrl: './match-info.component.css'
})
export class MatchInfoComponent {

  foundMatch: any = {};

  constructor(
    private activatedRoute: ActivatedRoute,
    private matchService: MatchService) { }

  ngOnInit() {
    // Get ID from PATH
    let matchId = this.activatedRoute.snapshot.params['id'];
    this.matchService.getMatchById(matchId).subscribe(
      (response) => {
        console.log("Here is object from BE", response);
        this.foundMatch = response.obj;
      }
    );

  }
}
