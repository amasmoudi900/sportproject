import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ResultComponent } from '../result/result.component';
import { NgFor } from '@angular/common';
import { MatchService } from '../../services/match.service';

@Component({
  selector: 'app-search-matches',
  imports: [FormsModule, ResultComponent, NgFor],
  templateUrl: './search-matches.component.html',
  styleUrl: './search-matches.component.css'
})
export class SearchMatchesComponent {

  obj: any = {};
  resultTab: any = [];

  constructor(private matchService: MatchService) { }
  search() {
    console.log("Here is search object", this.obj);
    this.matchService.searchMatchesByTeamName(this.obj).subscribe(
      (data) => {
        console.log("Here is data after search", data);
        this.resultTab = data.tab;
      }
    );
  }
}
