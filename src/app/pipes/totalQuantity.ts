import { Pipe, PipeTransform } from '@angular/core';
import { CartItem } from '../cart/models/cartItem';

@Pipe({name: 'totalQty'})
export class TotalQty implements PipeTransform {
  transform(cartItem: CartItem[]): number {
    let totalQty = 0;
    for (let i = 0; i < cartItem.length; i++) {
      totalQty += cartItem[i].qty;
    }
    return totalQty;
  }
}