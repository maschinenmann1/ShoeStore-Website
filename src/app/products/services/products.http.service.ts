import { Injectable } from '@angular/core';
import { Item } from '../models/item';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Colors } from '../models/colors';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private readonly API_URL = environment.apiHost + '/product';

  constructor(private http: HttpClient) { }

  public loadProducts() {
    return this.http.get<Item[]>(this.API_URL)
      .pipe(map(products => products.map(p => new Item(p))));
  }

  public addProduct(product: Item) {
    return this.http.post(this.API_URL, product);
  }

  public loadProduct(id: number) {
    return this.loadProducts().pipe(map(products => products.find(p => p.id === id)));
  }

  public deleteProduct(id: number) {
    return this.http.delete(this.API_URL + `/${id}`);
  }

  public updateProduct(id: number, user: Item) {
    return this.http.patch(this.API_URL + `/${id}`, user);
  }

  public filterProducts(sections: string[], sizes: number[], colors: number[], maxPrice: number, minPrice: number) {
    const products$ = this.loadProducts()
      .pipe(
        map(prod => prod
        .filter((item) => sections.length ? sections.indexOf(item.section) > -1 : true)
        .filter((item) => sizes.length ? sizes.filter(i => item.size.indexOf(i) > -1).length > 0 : true)
        .filter((item) => colors.length ? colors.filter(i => item.colors.indexOf(i) > -1).length > 0 : true)
        .filter((item) => maxPrice ? item.price <= maxPrice : true)
        .filter((item) => minPrice ? item.price >= minPrice : true)
        .sort((a, b) => a.name < b.name ? -1 : a.name > b.name ? 1 : 0)));
    return products$;
  }

}






