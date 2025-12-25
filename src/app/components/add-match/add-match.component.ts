import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatchService } from '../../services/match.service';
import { BannerComponent } from '../banner/banner.component';

@Component({
  selector: 'app-add-match',
  imports: [FormsModule, BannerComponent],
  templateUrl: './add-match.component.html',
  styleUrl: './add-match.component.css'
})
export class AddMatchComponent {
  obj: any = {};
  constructor(private matchService: MatchService) { }
  addMatch() {
    console.log("Here is match OBJ", this.obj);
    this.matchService.addMatch(this.obj).subscribe(
      (response) => {
        console.log("Here is response from BE after adding match", response);
      }
    );
  }


}
