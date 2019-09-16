import { AuthService } from './Services/auth.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from './Services/user.service';
import * as $ from 'jquery';
import { trigger, state, query, style, animate, transition, group } from '@angular/animations';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('animRoutes', [
      transition('* <=> *',
        [
          group([
            query(':enter', [
              style({ transform: 'translateX(100%)' }),
              animate('1s ease-in-out', style({ transform: 'translateX(0)' , opacity: 1}))
            ]),
            query(':leave', [
              style({ transform: 'translateX(0)' }),
              animate('1s ease-in-out', style({ transform: 'translateX(-100%)',  opacity: 0 }))
            ])

          ])

        ])])
  ]



})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    $(function () {
      $('#click').click(function () {
        alert('Hello jQuery !')
      })
    })
  }
  title = 'test2';
  constructor(private userService: UserService, private authService: AuthService, private activatedRoute: ActivatedRoute, private router: Router) {

    // this.authService.user$.subscribe(user => {
    //   if (user) {
    // //   this.userService.save(user);
    //    this.userService.addNewUser(user.uid,user.displayName,user.adress,user.email);
    //     let returnUrl = this.activatedRoute.snapshot.queryParamMap.get('returnUrl');
    //     this.router.navigateByUrl(returnUrl);
    //   }
    // })
  }
  // getPage(outlet) {
  //   return outlet.activatedRouteData['index'] || '1';
  // }
}
