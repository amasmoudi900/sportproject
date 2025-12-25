import { Component } from '@angular/core';
import { StadiumService } from '../../services/stadium.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-stadiums-table',
  imports: [NgFor],
  templateUrl: './stadiums-table.component.html',
  styleUrl: './stadiums-table.component.css'
})
export class StadiumsTableComponent {

  stadiumsTab: any = [];

  constructor(private stadiumService: StadiumService) { }

  ngOnInit(){
    this.stadiumService.getAllStadiums().subscribe(
      (data)=>{
        this.stadiumsTab = data.tab;
      }
    );
  }
}
