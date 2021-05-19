import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { from, Observable } from 'rxjs';
import { CartService } from 'src/app/cart/services';
import { Colors } from '../../models/colors';
import { Item } from '../../models/item';
import { ProductsService } from '../../services/products.http.service';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.scss']
})
export class ItemDetailsComponent implements OnInit {

  public itemForm: FormGroup;
  public id: number;
  public success: boolean;
  public generalError: boolean;
  public title: string;
  public product$: Observable<Item>;
  public colorList: { key: number, value: string}[] = [];
  
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private prodSvc: ProductsService,
    private router: Router,
    private cartSvc: CartService) {
    this.createForm();
  }

  public getValidityClass(control: AbstractControl): string {
    return control.touched
      ? control.invalid ? 'is-invalid' : 'is-valid'
      : '';
  }

  createForm() {
    this.itemForm = this.fb.group({
      colors: ['', Validators.required],
      size: ['', Validators.required],
    });
  }


  private resetForm() {
    this.itemForm.setValue({
      colors: '',
      size: '',
    }, { emitEvent: false });
  }

  ngOnInit(): void {

    for(const [key, value] of Object.entries(Colors)) {
      if (!isNaN(Number(key))) {
        this.colorList.push({key: +key, value: `${value}` });
      }
    }
    
    this.route.paramMap.subscribe(params => {
      this.id = Number(params.get('id'));
      this.product$ = this.prodSvc.loadProduct(this.id);
    });
  }

  exit(){
    this.router.navigateByUrl('/products');
  }

  addToCart(product:Item) {
    if (this.itemForm.invalid) {
      console.error('something wrong');
      this.success=false;
      this.generalError=true;
    } else {
      const prod = Object.assign({}, product);
      prod.size = [this.itemForm.get('size').value];
      prod.colors = [this.itemForm.get('colors').value];
      this.success=true;
      this.generalError=false;
      this.cartSvc.addToCart(prod).subscribe(p=>p);
      this.createForm(); //this.resetForm() | Uso create en vez de reset para que no salte evento
    }
  }

}