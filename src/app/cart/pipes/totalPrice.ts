import { Pipe, PipeTransform } from '@angular/core';
import { CartItem } from '../models/cartItem';

@Pipe({name: 'totalPrice'})
export class TotalPrice implements PipeTransform {
  transform(cartItem: CartItem[], gastosEnvio=0): number {
    return cartItem.reduce((acc, item) =>  acc + (item.qty * item.product.price), gastosEnvio);
  }
}