import { Component, Input, OnInit } from '@angular/core';
import { Comment } from '../../models/comment';

@Component({
  selector: 'app-stars',
  templateUrl: './stars.component.html',
  styleUrls: ['./stars.component.scss']
})
export class StarsComponent {
  private readonly MAX_STARS = 5;

  @Input() comments: Comment[] = [];

  public get rating(): number {
    let rating = 0;
    let approvedComments = this.comments.filter(i => !i.pending);
    for(let comment of approvedComments) {
      rating += comment.stars;
    }
    return rating / approvedComments.length;
  }

  public get filledStars(): any[] {
    if (this.rating) {
      return new Array(Math.trunc(this.rating));
    }
    return [];
  }

  public get hasHalfStar(): boolean {
    return (this.rating - this.filledStars.length) > 0;
  }

  public get emptyStars(): any[] {
    let filledStars = this.filledStars.length;
    if (this.hasHalfStar) { filledStars++; }
    return new Array(this.MAX_STARS - filledStars);
  }
  
  constructor() { }
  
}

