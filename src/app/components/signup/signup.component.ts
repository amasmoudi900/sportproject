import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatchService } from '../../services/match.service';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  // Form ID
  signupForm!: FormGroup;
  errorMsg: string = "";
  photo: any;
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router) { }
  ngOnInit() {
    console.log("Here into Signup");
    // Declaration des attributs
    this.signupForm = this.formBuilder.group({
      firstName: ["", [Validators.required, Validators.minLength(3)]],
      lastName: ["", [Validators.required, Validators.minLength(5)]],
      email: ["", [Validators.required, Validators.email]],
      pwd: ["", [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
      confirmPwd: [""],
      phone: [""],
    });
  }
  // Method
  signup() {
    console.log("Here is user", this.signupForm.value);
    let path = this.router.url;
    console.log("Here is path", path);
    if (path == "/signup") {
      this.signupForm.value.role = "client";
    } else {
      this.signupForm.value.role = "admin";
    }

    this.userService.signup(this.signupForm.value, this.photo).subscribe(
      (data) => {
        console.log("Here is response after signup", data);
        if (data.isAdded) {
          this.router.navigate(["signin"]);
        } else {
          this.errorMsg = "Email Already Exists";
        }
      }
    )
  }

  onImageSelected(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement && inputElement.files && inputElement.files.length > 0) {
      this.photo = inputElement.files[0];
      console.log("Here selected photo", this.photo);
    }
  }

}
