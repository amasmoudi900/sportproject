import { Component } from '@angular/core';
import { InfoComponent } from '../info/info.component';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-news',
  imports: [InfoComponent, NgFor],
  templateUrl: './news.component.html',
  styleUrl: './news.component.css'
})
export class NewsComponent {

  newsTab: any = [
    { name: "Name 1", image: "images/img_1.jpg", avatar: "images/person_1.jpg", title: "Title 1", date: "20/11/2025" },
    { name: "Name 2", image: "images/img_2.jpg", avatar: "images/person_2.jpg", title: "Title 2", date: "22/11/2025" },
    { name: "Name 3", image: "images/img_3.jpg", avatar: "images/person_3.jpg", title: "Title 3", date: "23/11/2025" }
  ]
}
