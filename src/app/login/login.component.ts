import { userInfo } from './../Services/userInfo';
import { AngularFirestore } from '@angular/fire/firestore';
import { Component } from '@angular/core';
import { AuthService } from '../Services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(public af: AngularFirestore,public authService: AuthService,public router: Router) {  }

  errorrMessage:string='';
  GoogleLogin() {    this.authService.googleLogin();  }

  FaceLogin() {    this.authService.faceLogin();  }
  
  Login(data) {
    let user:userInfo = data;
    this.authService.loginwithEmailPassword(user.email, user.password).then(
      ()=>{this.router.navigate(['/'])}).catch(err=>{ this.errorrMessage = err.message; });
  }

 
}

