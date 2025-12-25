import { NgStyle, NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatchService } from '../../services/match.service';

@Component({
  selector: 'app-result',
  imports: [NgStyle, NgClass],
  templateUrl: './result.component.html',
  styleUrl: './result.component.css'
})
export class ResultComponent {

  // obj = { id: 1, scoreOne: 0, scoreTwo: 4, teamOne: "RMD", teamTwo: "FCB" }
  // obj : PARAM
  @Input() obj: any = {};
  @Output() matchesToSend: EventEmitter<any> = new EventEmitter();

  constructor(private mService: MatchService) { }
  scoreColor(a: number, b: number) {

    if (a > b) {
      return 'green';
    } else if (a < b) {
      return 'orange';
    }
    return 'blue';
  }

  deleteMatch(id: any) {
    this.mService.deleteMatch(id).subscribe(
      (response) => {
        console.log("Here is response after deleting match", response);
        if (response.isDeleted) {
          this.mService.getAllMatches().subscribe(
            (data) => {
              console.log("Here is data from BE", data.tab);
              this.matchesToSend.emit(data.tab);
            }
          )
        }
      }
    );
  }
}
