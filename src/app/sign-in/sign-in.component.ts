import { AuthService } from './../Services/auth.service';
import { Component, OnInit } from '@angular/core';
import { userInfo } from '../Services/userInfo';
import { UserService } from '../Services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {


  constructor(private authService: AuthService, private userService: UserService, private router: Router) { }

  messageError: string = ''

  async save(data) {
    let user: userInfo = data;
    // alert ('user.email' + user.email + 'password' + user.password)
    await this.authService.signUp(user.email, user.password).then(data => {
      this.messageError = '';
      this.userService.addNewUser(data.user.uid, user.displayName, user.address, user.email).
        then(() => this.router.navigate(['/'])).
        catch(err => { this.messageError = err.message; })

    }).catch(
      err => {
        this.messageError = err.message;
      }
    );
  }

}
