import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemPresentationComponent, PRODUCTS } from './components';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { ProductsRoutingModule } from './products-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CommentsModule } from '../comments/comments.module';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { PIPES } from './pipes';
import { ComparedItemComponent } from './components/compared-item/compared-item.component';

@NgModule({
  declarations: [
    ...PRODUCTS,
    ...PIPES,
    ComparedItemComponent,
  ],
  imports: [
    CommonModule,
    CarouselModule,
    ProductsRoutingModule,
    ReactiveFormsModule,
    CommentsModule,
    PaginationModule,
  ],
  exports: [
    ItemPresentationComponent,
  ]
})
export class ProductsModule { }
