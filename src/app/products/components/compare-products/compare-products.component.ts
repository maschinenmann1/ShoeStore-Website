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
    const item1 = this.compareForm.get('item1');
    const item2 = this.compareForm.get('item2');
    const item3 = this.compareForm.get('item3');
    item2.disable();
    item3.disable();
    item1.valueChanges.subscribe(value=>{
      this.router.navigateByUrl(this.router.url);
      if(value==""){
        item2.disable();
        item2.setValue("");
      }else{
        item2.enable();
      }
    });

    item2.valueChanges.subscribe(value=>{
      if(value==""){
        item3.disable();
        item3.setValue("");
      }else{
        item3.enable();
      }
    });
  }

  createForm() {
    this.compareForm = this.fb.group({
      item1: [""],
      item2: [""],
      item3: [""],
    });
  }

  // goTo1(url:string, id:number){
  //   if(id){
  //     this.router.navigateByUrl('/products/compare-products/('+url+':'+url+')', {state: {data:id}});
  //   }else{
  //     this.router.navigateByUrl('/products/compare-products');
  //   }
  // }

  // goTo2(url:string, id:number){
  //   if(id){
  //     this.router.navigateByUrl('/products/compare-products/(item1:item1//'+url+':'+url+')', {state: {data:id}});
  //   }else{
  //     this.router.navigateByUrl('/products/compare-products/(item1:item1)');
  //   } 
  // }

  // goTo3(url:string, id:number){
  //   if(id){   
  //     this.router.navigateByUrl('/products/compare-products/(item1:item1//item2:item2//'+url+':'+url+')', {state: {data:id}});
  //   }else{
  //     this.router.navigateByUrl('/products/compare-products/(item1:item1//item2:item2)');
  //   } 
  // }



}
