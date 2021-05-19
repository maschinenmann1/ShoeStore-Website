import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { filter, map, shareReplay, switchMap, switchMapTo, tap } from 'rxjs/operators';
import { Item } from 'src/app/products/models/item';
import { environment } from 'src/environments/environment';
import { CartItem } from '../../models/cartItem';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private readonly API_URL = environment.apiHost + '/cartItems';

  private shouldRefreshCart = new BehaviorSubject<boolean>(true);

  public cart$ = this.shouldRefreshCart.asObservable()
    .pipe(
      filter(refresh => refresh),
      switchMap(() => this.http.get<CartItem[]>(this.API_URL)),
      map(products => products.map(p => new CartItem(p))),
      shareReplay(1));

  constructor(private http: HttpClient) { }

  public loadProducts() {
    return this.http.get<CartItem[]>(this.API_URL)
      .pipe(map(products => products.map(p => new CartItem(p))))
  }

  public addToCart(product: Item, qty: number = 1) {
    const findId = product.id;
    let id;
    return this.loadProductsById(findId)
      .pipe(
        switchMap(prod => this.areTheSame(prod, product, qty)),
        tap(() => this.shouldRefreshCart.next(true)));
  }

  public loadProduct(id: number) {
    return this.loadProducts().pipe(map(products => products.find(p => p.id === id)));
  }

  public loadProductsById(id: number) {
    return this.loadProducts().pipe(map(products => products.filter(p => p.product.id === id)));
  }

  public removeFromCart(item: CartItem, qty: number = 1) {
    if (qty > 1) {
      return this.addToCart(item.product, -1);
    }
    return this.http.delete(this.API_URL + `/${item.id}`)
      .pipe(tap(_ => this.shouldRefreshCart.next(true)));
  }

  public purchase() {
    return this.http.delete(this.API_URL + '/').pipe(tap(() => this.shouldRefreshCart.next(true)));
  }

  private areTheSame(cartItem:CartItem[], product: Item, qty:number){
    if(cartItem){
      console.log(cartItem);
      for(let i=0;i<cartItem.length;i++){
        if(cartItem[i].product.colors[0]==product.colors[0] && cartItem[i].product.size[0]==product.size[0]){
          return this.http.patch(this.API_URL + `/${cartItem[i].id}`, { qty })
        }
      }
    }
    return this.http.post(this.API_URL, new CartItem({product, qty}));
  }
}
