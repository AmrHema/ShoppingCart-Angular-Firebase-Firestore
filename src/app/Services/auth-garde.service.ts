import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGardeService implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  // canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | import("@angular/router").UrlTree | import("rxjs").Observable<boolean | import("@angular/router").UrlTree> | Promise<boolean | import("@angular/router").UrlTree> {
  //  return new Promise (resolve=>{
  //    this.authService.user$.subscribe(user=>{
  //      if (user) return true;
  //      else{
  //        this.router.navigate(['/login'])
  //        return false;

  //      }
  //     })
  //  })
  // }

  canActivate(route:ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.authService.user$.pipe(map(
      user => {
        if (user) { return true; }
        else {
          this.router.navigate(['/login'], { queryParams: {returnUrl:state.url }});
          return false;
        }
      }
    ))
  }


  // canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
  //   const user :boolean = !!this.authService.user$;
  //   if (user) { return true;  }
  //   else {
  //     this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
  //     return false;
  //   }
  // }




}
