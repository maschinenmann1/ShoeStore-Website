import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { delay, filter, map, switchMap, tap } from 'rxjs/operators';
import { Item } from 'src/app/products/models/item';
import { ProductsService } from 'src/app/products/services/products.http.service';
import { Colors } from '../../models/colors';

@Component({
  selector: 'app-edit-products',
  templateUrl: './edit-products.component.html',
  styleUrls: ['./edit-products.component.scss'],
})
export class EditProductsComponent implements OnInit {

  private id: number;
  // public prod: any;
  public producto$: Observable<Item>;
  public productForm: FormGroup;
  public generalError: boolean;
  public success: boolean;
  public colorList: { key: number, value: string}[] = [];
  public sizes = [];

  constructor(private route: ActivatedRoute, private fb: FormBuilder, private prodSvc: ProductsService,  private router:Router) {
    this.createForm();
  }

  ngOnInit(): void {

    const si$ = this.prodSvc.loadProducts().pipe(map(items => items
      .map(item=>item.size
        .filter((value, index, self) => self.indexOf(value) === index))));
    
    si$.subscribe(p=>{
      const sizesCopy=[];
      for(let i=0;i<p.length;i++){
        for(let a=0;a<p[i].length;a++){
            sizesCopy.push(p[i][a]);  
        }
      }
      this.sizes = sizesCopy.filter((value, index, self) => self.indexOf(value) === index)
      .sort((a, b) => a < b ? -1 : a > b ? 1 : 0);
    });


    for(const [key, value] of Object.entries(Colors)) {
      if (!isNaN(Number(key))) {
        this.colorList.push({key: +key, value: `${value}` });
      }
    }

    this.producto$ = this.route.paramMap
      .pipe(
        map(paramMap => Number(paramMap.get('id'))),
        tap(id => this.id = id), // do()
        delay(1000),
        switchMap(id => this.prodSvc.loadProduct(id)),
        filter(product => !!product),
        tap(product => this.productForm.setValue({
          name: product.name,
          price: product.price,
          imgBase64: product.imgBase64,
          colors: product.colors,
          size:product.size,
          section:product.section,
          descriptionLong: product.descriptionLong,
        }, { emitEvent: false })));

  }


  addNewSize(size:string){
    if(size!="" && size){
      this.sizes.push(+size);
    }
  }
  
  public getValidityClass(control: AbstractControl): string {
    return control.touched
      ? control.invalid ? 'is-invalid' : 'is-valid'
      : '';
  }


  createForm() {
    this.productForm = this.fb.group({
      name: ["", Validators.required],
      price: [null, Validators.required],
      section: ['', Validators.required],
      size:['', Validators.required],
      colors:['', Validators.required],
      imgBase64: ["", Validators.required],
      descriptionLong: ["", Validators.required],
    });
  }

  goBack(){
    this.router.navigateByUrl('/products/manage-products');
  }


  onSubmit() {
    window.scrollTo( 0, 0 );
    if (this.productForm.invalid) {
      this.generalError = true;
      this.success = false;
      console.error("Something is wrong", this.productForm);
    } else {
      const prod = new Item(this.productForm.value);
      prod.id = this.id;
      this.generalError = false;
      this.success = true;
      this.prodSvc.updateProduct(this.id, prod).subscribe(p =>p);
    }
  }


}
