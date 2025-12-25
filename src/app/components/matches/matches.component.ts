import { Component } from '@angular/core';
import { ResultComponent } from '../result/result.component';
import { NgFor } from '@angular/common';
import { getFromLS } from '../../shared/genericFunctions';
import { MatchService } from '../../services/match.service';
import { BannerComponent } from '../banner/banner.component';

@Component({
  selector: 'app-matches',
  imports: [ResultComponent, NgFor, BannerComponent],
  templateUrl: './matches.component.html',
  styleUrl: './matches.component.css'
})
export class MatchesComponent {

  constructor(private matchService: MatchService) { }
  matches: any = [];
  ngOnInit() {
    this.matchService.getAllMatches().subscribe(
      (data) => {
        console.log("Here is data from BE", data);
        this.matches = data.tab;
      }
    );
  }

  updateMatches(T: any) {
    this.matches = T;
  }
}
