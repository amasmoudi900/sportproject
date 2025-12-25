import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StadiumService {

  stadiumURL: string = "http://localhost:3000/stadiums";
  constructor(private http: HttpClient) { }

  // obj = {capacity: 20000, country: "TUN", name: "Rades", teamId: "la valeur de l'_id du team selectionné"}
  addStadium(obj: any) {
    return this.http.post<{ msg: string }>(this.stadiumURL, obj);
  }
  getAllStadiums() {
    return this.http.get<{ tab: any }>(this.stadiumURL);
  }
}
