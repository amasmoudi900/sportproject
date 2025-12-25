import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-header',
  imports: [RouterLink, NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  user: any = {};

  constructor(private router: Router) { }
  isLoggedIn(): boolean {
    let jwt = localStorage.getItem("token");
    if (jwt) {
      // decode token
      this.user = jwtDecode(jwt);
    }
    return !!jwt;
  }

  logout() {
    localStorage.removeItem("token");
    this.router.navigate(['']);
  }
}
