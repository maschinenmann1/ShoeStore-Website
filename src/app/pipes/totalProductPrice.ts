import { Pipe, PipeTransform } from '@angular/core';
import { CartItem } from 'src/app/cart/models/cartItem';
import { Item } from 'src/app/products/models/item';
/*
 * Raise the value exponentially
 * Takes an exponent argument that defaults to 1.
 * Usage:
 *   value | exponentialStrength:exponent
 * Example:
 *   {{ 2 | exponentialStrength:10 }}
 *   formats to: 1024
*/
@Pipe({name: 'totalProductPrice'})
export class TotalProductPrice implements PipeTransform {
    
    transform(item: Item, qty?: number) {
        return item.price * qty;
    } 

}