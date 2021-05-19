import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentListComponent, COMMENTS, StarsComponent } from './components';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductsRoutingModule } from './comments-routing.module';


@NgModule({
  declarations: [
    ...COMMENTS
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ProductsRoutingModule
  ],
  exports: [
    CommentListComponent,
    StarsComponent,
  ]
})
export class CommentsModule { }
