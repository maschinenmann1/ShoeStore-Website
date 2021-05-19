import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Item } from 'src/app/products/models/item';
import { ProductsService } from 'src/app/products/services/products.http.service';
import { Colors } from '../../models/colors';

@Component({
  selector: 'app-ceate-product',
  templateUrl: './ceate-product.component.html',
  styleUrls: ['./ceate-product.component.scss']
})
export class CeateProductComponent implements OnInit {

  public productForm: FormGroup;
  public generalError:boolean;
  public success:boolean;
  public product: Item;
  public products$: Observable<Item[]>;
  public colorList: { key: number, value: string}[] = [];
  public sizes = [];

  constructor(private fb: FormBuilder, private prodSvc: ProductsService, private router:Router) { 
    this.createForm();
    this.resetForm();
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
    
    this.products$ = this.prodSvc.loadProducts();
  }

  createForm() {
    this.productForm = this.fb.group({
      name: ["", Validators.required],
      price: [NaN, Validators.required],
      section: ['', Validators.required],
      size:['', Validators.required],
      colors:['', Validators.required],
      imgBase64: ["", Validators.required],
      descriptionLong: ["", Validators.required],
      comments:[[]],
    });
  }

  goBack(){
    this.router.navigateByUrl('/main');
  }

  public getValidityClass(control: AbstractControl): string {
    return control.touched
      ? control.invalid ? 'is-invalid' : 'is-valid'
      : '';
  }

  addNewSize(size:string){
    if(size!="" && size){
      this.sizes.push(size);
    }
  }

  // addNewColor(color:string){
  //   this.colorList.push({key: +(this.colorList.length+1), value: `${color}`});
  // }

  private resetForm() {
    this.productForm.setValue({
      name: '',
      price: null,
      imgBase64: "",
      size:"",
      section: '',
      colors:"",
      descriptionLong: '',
      comments:[],
    }, { emitEvent: false });

    for(let control of Object.values(this.productForm.controls)) {
      control.markAsPristine();
      control.markAsUntouched();
    }
  }

  onSubmit() {

    window.scrollTo( 0, 0 );
    if(this.productForm.invalid){
      this.generalError=true;
      this.success=false;
      console.error("Something is wrong", this.productForm);
    }else{
      this.product = new Item(this.productForm.value);
      this.generalError=false;
      this.success=true;
      this.prodSvc.addProduct(this.product).subscribe(_=>_);
      this.resetForm();
    }
  }

}
