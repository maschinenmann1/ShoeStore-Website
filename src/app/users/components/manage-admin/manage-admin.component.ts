import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../models/user';
import { UserService } from '../../services/user-service/user.service';
import { ValidateUserService } from '../../services/validate-user-service/validate-user.service';

@Component({
  selector: 'app-manage-admin',
  templateUrl: './manage-admin.component.html',
  styleUrls: ['./manage-admin.component.scss']
})
export class ManageAdminComponent implements OnInit {

  
  public users$: Observable<User[]>;
  constructor(private users: UserService, private validateUsers:ValidateUserService) { }

  ngOnInit(): void {
    this.users$ = this.users.loadUsers();
  }

  public trackByEmail(user: User) {
    return user.email;
  }

  public makeAdmin(user:User){
    this.validateUsers.toggleAdmin(user);
  }

}
