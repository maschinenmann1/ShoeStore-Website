import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Colors } from 'src/app/products/models/colors';
import { Item } from 'src/app/products/models/item';
import { CartItem } from '../../models/cartItem';
import { CartService } from '../../services';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss']
})
export class CartItemComponent implements OnInit {

  public product$: Observable<CartItem>;
  @Input()
  public itemID: number;
  public colorList: { key: number, value: string}[] = [];
  constructor(private cartService: CartService) { }

  ngOnInit(){
    this.product$ = this.cartService.loadProduct(this.itemID);
    this.product$.subscribe(products=>{
      for(const [key, value] of Object.entries(Colors)) {
        if (!isNaN(Number(key))) {
          if(products.product.colors[0] == Number(key)){
            this.colorList.push({key: +key, value: `${value}` });
          }
        }
      }
    });
  }

  reduceByOneItemQuantity(item: CartItem): void{
    this.cartService.removeFromCart(item, item.qty).subscribe(p=>p);
  }
  
  removeItemFromCart(item: CartItem): void{
    this.cartService.removeFromCart(item).subscribe(p=>p);
  }

  addToCart(item: Item): void{
    this.cartService.addToCart(item).subscribe(p=>p);
  }

}
