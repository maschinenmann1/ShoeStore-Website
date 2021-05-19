import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ValidateUserService } from 'src/app/users/services/validate-user-service/validate-user.service';

@Injectable({
  providedIn: 'root'
})
export class LoggedAuthService {

  constructor(private router: Router, private service: ValidateUserService) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (!this.service.logged) {
        this.router.navigateByUrl('/products');
        return false;
      }
      return true;
  }
}
