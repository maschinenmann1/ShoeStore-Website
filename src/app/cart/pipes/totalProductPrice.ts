import { Pipe, PipeTransform } from '@angular/core';
import { Item } from 'src/app/products/models/item';

@Pipe({name: 'totalProductPrice'})
export class TotalProductPrice implements PipeTransform {
    
    transform(item: Item, qty?: number) {
        return item.price * qty;
    } 

}