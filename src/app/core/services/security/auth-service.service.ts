import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ValidateUserService } from 'src/app/users/services/validate-user-service/validate-user.service';


@Injectable({
  providedIn: 'root'
})
export class AuthServiceService implements CanActivate{

  constructor(private router: Router, private service: ValidateUserService) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      if (this.service.logged) {
        this.router.navigateByUrl('/product-list');
        return false;
      }
      return true;
  }
}
