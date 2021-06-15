import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { Colors } from '../../models/colors';
import { Item } from '../../models/item';
import { ProductsService } from '../../services/products.http.service';
@Component({
  selector: 'app-compared-item',
  templateUrl: './compared-item.component.html',
  styleUrls: ['./compared-item.component.scss']
})
export class ComparedItemComponent implements OnInit, OnChanges{

  @Input() itemID: number;
  public name: string;
  public item$: Observable<Item>;
  public colorList: { key: number, value: string}[] = [];

  constructor(private prodSvc:ProductsService) { }

  ngOnInit(): void {
    for(const [key, value] of Object.entries(Colors)) {
      if (!isNaN(Number(key))) {
        this.colorList.push({key: +key, value: `${value}` });
      }
    }
  }
  
  ngOnChanges(){
    this.item$ = this.prodSvc.loadProduct(+this.itemID);
  }

}
