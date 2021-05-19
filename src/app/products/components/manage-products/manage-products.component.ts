import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Item } from 'src/app/products/models/item';
import { ProductsService } from 'src/app/products/services/products.http.service';

@Component({
  selector: 'app-manage-products',
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.scss']
})
export class ManageProductsComponent implements OnInit {

  public products$: Observable<Item[]>;
  constructor(private prodSvc: ProductsService) { }

  ngOnInit(): void {
    console.log('ManageProductsComponent');
    this.products$ = this.prodSvc.loadProducts();
  }

  public trackById(prod: Item) {
    return prod.id;
  }

  public removeProduct(num: number){
    this.products$ = this.prodSvc.deleteProduct(num).pipe(switchMap(() => this.prodSvc.loadProducts()));;
  }

}
