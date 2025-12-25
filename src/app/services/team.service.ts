import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  address: string = "http://localhost:3000/teams";
  constructor(private http: HttpClient) { }

  getAllTeams() {
    return this.http.get<{ teams: any, nbr: number }>(this.address);
  }

  getTeamById(id: number) {
    return this.http.get<{ team: any }>(this.address + "/" + id);
  }

  deleteTeam(id: number) {
    return this.http.delete<{ teamRes: string, msgRes: string }>(this.address + "/" + id);
  }

  addTeam(obj: any) {
    return this.http.post<{ msg: string }>(this.address, obj);
  }

  editTeam(newObj: any) {
    return this.http.put<{ msg: string }>(this.address, newObj);
  }
}
