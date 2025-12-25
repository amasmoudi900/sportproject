import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-info',
  imports: [],
  templateUrl: './info.component.html',
  styleUrl: './info.component.css'
})
export class InfoComponent {
  // infoObj : PARAM
  @Input() infoObj: any = {};
}
