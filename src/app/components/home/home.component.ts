import { Component } from '@angular/core';
import { ResultComponent } from '../result/result.component';
import { CupEventComponent } from '../cup-event/cup-event.component';
import { NewsComponent } from '../news/news.component';
import { StandingsComponent } from '../standings/standings.component';
import { BlogComponent } from '../blog/blog.component';


@Component({
  selector: 'app-home',
  imports: [ResultComponent, CupEventComponent, NewsComponent, StandingsComponent, BlogComponent],
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  matchObj: any = { scoreOne: 2, scoreTwo: 1, teamOne: "FCB", teamTwo: "RMD" };
}
