import { ShoppingCardService } from './../Services/shopping-card.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Services/auth.service';
import { userInfo } from '../Services/userInfo';
@Component({
  selector: 'NavBarMy',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  isOpen: boolean = false;
  appuser: userInfo;
  shoppingCartCounter: number;
  shoppingItems: any;
  constructor(public authService: AuthService, public shoppingCardService: ShoppingCardService) {
    this.authService.AppUser$.subscribe(newappuser => this.appuser = newappuser);

  }
  toggleIsOpen() {
    this.isOpen = !this.isOpen
  }


  logout() { this.authService.logout(); }


}
