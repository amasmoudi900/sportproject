import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userURL: string = "http://localhost:3000/users";
  constructor(private httpClient: HttpClient) { }

  signup(obj: any, photo: File) {
    // fData : 9offa
    let fData = new FormData();
    // fData.append(key, value)
    // LS.setItem(key, value)
    fData.append("img", photo);
    fData.append("firstName", obj.firstName);
    fData.append("lastName", obj.lastName);
    fData.append("email", obj.email);
    fData.append("pwd", obj.pwd);
    fData.append("phone", obj.phone);
    fData.append("role", obj.role);
    return this.httpClient.post<{ msg: string, isAdded: boolean }>(this.userURL + "/signup", fData);
  }

  login(obj: any) {
    return this.httpClient.post<{ msg: string, user: string }>(this.userURL + "/login", obj);
  }

}
