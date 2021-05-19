import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Item } from '../../models/item';
import { ProductsService } from '../../services/products.http.service';

@Component({
  selector: 'app-compare-products',
  templateUrl: './compare-products.component.html',
  styleUrls: ['./compare-products.component.scss']
})
export class CompareProductsComponent implements OnInit {

  public products$: Observable<Item[]>;

  public compareForm: FormGroup;
  constructor(private prodSvc:ProductsService, private fb: FormBuilder, private router: Router) {
    this.createForm();
  }

  ngOnInit(): void {
    this.products$ = this.prodSvc.loadProducts();
  }

  goTo(url:string, id:number){
    this.router.navigateByUrl('/products/compare-products/(item1:item1//item2:item2//item3:item3)', {state: {data:id}}); //'+url+':'+url+'//'+url+':'+url+'//'+url+':'+url+'
  }

  createForm() {
    this.compareForm = this.fb.group({
      item1: [""],
      item2: [""],
      item3: [""],
    });
  }

}
