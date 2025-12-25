import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MatchService {

  // Backend address (adresse de destination du backend)
  matchURL: string = "http://localhost:3000/matches";
  // httpClient : bostagi
  constructor(private httpClient: HttpClient) { }

  // Req 1 : Get All Matches
  // Response: Array of Matches
  getAllMatches() {
    return this.httpClient.get<{ tab: any, nbr: number }>(this.matchURL); // http://localhost:3000/matches
  }

  // Req 2 : Get Match By ID
  //Response : One Object
  getMatchById(id: any) {
    // http://localhost:3000/param
    let address = this.matchURL + "/" + id;
    return this.httpClient.get<{ obj: any, msg: string }>(address);
  }


  // Req 3 : Delete Match By ID
  // Response : true/false || "Deleted/Not Deleted"
  deleteMatch(id: any) {
    return this.httpClient.delete<{ msg: string, isDeleted: boolean }>(this.matchURL + "/" + id);
  }

  // Req 4 : Add Match
  // Response : created Object || true/false|| "Added/Not Added"
  addMatch(obj: any) {
    return this.httpClient.post<{ msg: string }>(this.matchURL, obj);
  }

  // Req 5 : Edit Match
  // Response :  true/false|| "Edited/Not Edited"
  editMatch(newObj: any) {
    return this.httpClient.put<{ msg: string }>(this.matchURL, newObj);
  }


  // Req 6 : search Matches By Team Name
  // Response :  Array
  searchMatchesByTeamName(obj: any) {
    return this.httpClient.post<{ tab: any, msg: string }>
    (this.matchURL + "/searchMatches", obj);
  }






}
