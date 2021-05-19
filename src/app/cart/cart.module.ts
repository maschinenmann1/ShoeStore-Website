import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CART } from './components';
import { PIPES } from './pipes';
import { CartRoutingModule } from './cart-routing.module';



@NgModule({
  declarations: [
    ...CART,
    ...PIPES
  ],
  imports: [
    CommonModule,
    CartRoutingModule,
  ]
})
export class CartModule { }
