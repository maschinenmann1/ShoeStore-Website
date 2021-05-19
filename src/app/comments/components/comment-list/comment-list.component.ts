import { Component, Input, OnInit } from '@angular/core';
import { ValidateUserService } from 'src/app/users/services/validate-user-service/validate-user.service';
import { Item } from 'src/app/products/models/item';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss']
})
export class CommentListComponent implements OnInit {

  public isLogged = false;

  @Input() public item = new Item();
  
  constructor(private valUsSvc: ValidateUserService) {}

  public get approvedComments() {
    return this.item.comments.filter(i => !i.pending);
  }

  ngOnInit() {
    this.isLogged = this.valUsSvc.logged;
  }
}
