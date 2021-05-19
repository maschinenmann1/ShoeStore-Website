import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { User } from '../../models/user';
import { UserService } from '../user-service/user.service';

@Injectable({
  providedIn: 'root'
})
export class ValidateUserService {

  public activeUser: User;
  private log:boolean=false;
  constructor(private userService: UserService, private router: Router) {
  }
  
  login(email: string, password: string): Observable<boolean> {
    return this.userService.loadUser(email).pipe(
      map(user => this.activeUser = user),
      map(user => user && user.password == password),
      tap(isLogged => this.log = isLogged)
      );
  }

  get logged(){
    return this.log;
  }

  logout(){
    this.log=false;
    this.activeUser = undefined;
    this.router.navigateByUrl('/main');
  }

  toggleAdmin(usr: User){
    usr.admin = !usr.admin;
    this.userService.updateUser(usr.email, usr).subscribe(u=>console.log(u));
  }
}
