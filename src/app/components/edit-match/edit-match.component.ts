import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { getFromLS } from '../../shared/genericFunctions';
import { MatchService } from '../../services/match.service';

@Component({
  selector: 'app-edit-match',
  imports: [FormsModule],
  templateUrl: './edit-match.component.html',
  styleUrl: './edit-match.component.css'
})
export class EditMatchComponent {

  obj: any = {};

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private matchService: MatchService) { }
  ngOnInit() {
    // Get ID from URL
    let id = this.activatedRoute.snapshot.params["mId"];
    this.matchService.getMatchById(id).subscribe(
      (data) => {
        console.log("Here is data from BE", data);
        this.obj = data.obj
      }
    );

  }
  editMatch() {
    console.log("Here is new values", this.obj);
    this.matchService.editMatch(this.obj).subscribe(
      (response) => {
        console.log("Here is response after Match Update", response);
        this.router.navigate(["admin"]);
      }
    );
  }
}
