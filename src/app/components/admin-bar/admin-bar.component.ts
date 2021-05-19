import { Component, OnInit } from '@angular/core';
import { ValidateUserService } from 'src/app/users/services/validate-user-service/validate-user.service';

@Component({
  selector: 'app-admin-bar',
  templateUrl: './admin-bar.component.html',
  styleUrls: ['./admin-bar.component.scss']
})
export class AdminBarComponent {

  constructor(private usrSvc: ValidateUserService) { }

  get isAdmin(){
    return this.usrSvc.activeUser.admin;
  }

  get isLogged(){
    return this.usrSvc.logged;
  }

}
