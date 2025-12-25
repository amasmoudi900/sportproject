import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  address: string = "http://localhost:3000/players";
  constructor(private http: HttpClient) { }

  getAllPlayers() {
    return this.http.get<{ players: any, nbr: number }>(this.address);
  }

  getPlayerById(id: number) {
    return this.http.get<{ player: any }>(this.address + "/" + id);
  }

  deletePlayer(id: number) {
    return this.http.delete<{ msg: string }>(this.address + "/" + id);
  }

  addPlayer(obj: any) {
    return this.http.post<{ msg: string }>(this.address, obj);
  }

  editPlayer(newObj: any) {
    return this.http.put<{ msg: string }>(this.address, newObj);
  }
}
