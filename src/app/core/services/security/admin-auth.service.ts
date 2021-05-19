import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { ValidateUserService } from 'src/app/users/services/validate-user-service/validate-user.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthService implements CanActivate {

  constructor(private router: Router, private service: ValidateUserService) {
    console.log('AdminAuthService', router, service);
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (this.service.activeUser && this.service.activeUser.admin) {
        return true;
      }
      this.router.navigateByUrl('/products');
      return false;

  }
}
