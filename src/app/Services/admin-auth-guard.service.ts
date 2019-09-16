import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardService implements CanActivate {

  constructor(private authService : AuthService) { }

  canActivate():Observable<boolean> {
    return this.authService.AppUser$.pipe(map((appuser:any)=>appuser.isAdmin));
  }

  
}
