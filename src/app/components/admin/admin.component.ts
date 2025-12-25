import { Component } from '@angular/core';
import { MatchesTableComponent } from '../matches-table/matches-table.component';
import { TeamsTableComponent } from '../teams-table/teams-table.component';
import { PlayersTableComponent } from '../players-table/players-table.component';
import { DatePipe, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { ReversePipe } from '../../pipes/reverse.pipe';
import { StadiumsTableComponent } from '../stadiums-table/stadiums-table.component';

@Component({
  selector: 'app-admin',
  imports: [MatchesTableComponent, TeamsTableComponent, PlayersTableComponent, ReversePipe, DatePipe, TitleCasePipe, UpperCasePipe, StadiumsTableComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {

  title: string = 'admin dashboard';
  actualDate: Date = new Date();
}
