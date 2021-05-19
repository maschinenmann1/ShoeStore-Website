import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Item } from '../../models/item';
import { ProductsService } from '../../services/products.http.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {

  public assetFolder = environment.assetsFolder;
  public product$: Observable<Item>;
  @Input()
  public itemID: number;
  constructor(private productService: ProductsService) { }

  ngOnInit(): void {
    this.product$ = this.productService.loadProduct(this.itemID);
  }

}
