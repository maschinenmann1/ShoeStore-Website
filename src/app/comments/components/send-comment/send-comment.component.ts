import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidateUserService } from 'src/app/users/services/validate-user-service/validate-user.service';
import { Item } from 'src/app/products/models/item';
import { ProductsService } from 'src/app/products/services/products.http.service';
import { Comment } from '../../models/comment';

@Component({
  selector: 'app-send-comment',
  templateUrl: './send-comment.component.html',
  styleUrls: ['./send-comment.component.scss']
})
export class SendCommentComponent{

  @Input() public item = new Item();
  public commentForm: FormGroup;
  public generalError:boolean;
  public comment: Comment;
  public success:boolean;
  public get f() {
    return this.commentForm.controls;
  }
  constructor(private fb: FormBuilder, private prodSvc:ProductsService, private valUsSvc: ValidateUserService) { 
    this.createForm();
  }

  createForm() {
    this.commentForm = this.fb.group({
      stars: [0, Validators.required],
      review: [""],
      user: [this.fullName]
    });
  }

  get fullName(){
    if(this.valUsSvc.logged){
      return this.valUsSvc.activeUser.name + " " + this.valUsSvc.activeUser.lastname; 
    }
    return "";
  }

  onSubmit() {
    if(this.commentForm.invalid || this.commentForm.get('stars').value===0){
      this.generalError=true;
      this.success=false;
      console.error("Something is wrong", this.commentForm);
    }else{
      this.generalError=false;
      this.success=true;
      this.comment = new Comment(this.commentForm.value);
      this.comment.pending = this.comment.review.length > 0;
      if(this.item.comments){
        this.item.comments.push(this.comment);
      }else{
        this.item.comments = [this.comment];
      }
      this.prodSvc.updateProduct(this.item.id, this.item).subscribe(p=>p);
      this.createForm();
    }
  }


}
