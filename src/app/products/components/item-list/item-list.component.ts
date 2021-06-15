import { Component, OnInit } from '@angular/core';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Item } from '../../models/item';
import { ProductsService } from '../../services/products.http.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss'],
})
export class ItemListComponent implements OnInit {

  public products$: Observable<Item[]>;
  public productsPerPage$: Observable<Item[]>;
  public itemsPerPage = 9;


  constructor(private prodServ: ProductsService) {}

  ngOnInit(): void {
    window.scrollTo( 0, 0 );
    this.loadProducts();
  }

  listFilteredProducts(item:Observable<Item[]>){
    window.scrollTo( 0, 0 );
    this.products$ = item;
    this.productsPerPage$=this.products$.pipe(map(items=>items.slice(0, this.itemsPerPage)));
  }

  loadProducts(){
    this.products$ = this.prodServ.loadProducts();
    this.productsPerPage$=this.products$.pipe(map(items=>items.slice(0, this.itemsPerPage)));
  }

  pageChanged(event: PageChangedEvent): void {
    window.scrollTo( 0, 0 );
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.productsPerPage$=this.products$.pipe(map(items=>items.slice(startItem, endItem)));
  }

  
}


