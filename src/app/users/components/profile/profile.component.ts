import { Component, OnInit } from '@angular/core';
import { ValidateUserService } from '../../services/validate-user-service/validate-user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public infoIsCollapsed = true;
  public shopHIsCollapsed = true;
  constructor(public user: ValidateUserService) { }

  ngOnInit(): void {
  }

}
