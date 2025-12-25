import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { jwtDecode } from "jwt-decode";

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  user: any = {};
  errorMsg: string = "";
  constructor(
    private userService: UserService,
    private router: Router) {

  }
  login() {
    console.log("Here is user", this.user);
    this.userService.login(this.user).subscribe(
      (response) => {
        console.log("Here is response from BE", response);
        if (response.msg != "2") {
          this.errorMsg = "Invalid Email/PWD";
        } else {
          // save token into LS
          localStorage.setItem("token", response.user);
          // decode token
          let decodedToken: any = jwtDecode(response.user);
          console.log("Here is decoded token", decodedToken);
          if (decodedToken.role == 'client') {
            this.router.navigate(['']);
          } else {
            this.router.navigate(['admin']);
          }

        }
      }
    )
  }
}
