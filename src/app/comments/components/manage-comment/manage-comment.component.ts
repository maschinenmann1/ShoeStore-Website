import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Item } from 'src/app/products/models/item';
import { ProductsService } from 'src/app/products/services/products.http.service';

@Component({
  selector: 'app-manage-comment',
  templateUrl: './manage-comment.component.html',
  styleUrls: ['./manage-comment.component.scss']
})
export class ManageCommentComponent implements OnInit {

  public products$: Observable<Item[]>;

  constructor(private prodSvc: ProductsService) { }

  ngOnInit(): void {
    this.products$ = this.prodSvc.loadProducts();
  }

  public admit(prod:Item, index: number){
    prod.comments[index].pending=false;
    this.products$ = this.prodSvc.updateProduct(prod.id, prod).pipe(switchMap(() => this.prodSvc.loadProducts()));
  }

  public remove(prod:Item, index: number){
    prod.comments.splice(index, 1);
    this.products$ = this.prodSvc.updateProduct(prod.id, prod).pipe(switchMap(() => this.prodSvc.loadProducts()));
  }

}
