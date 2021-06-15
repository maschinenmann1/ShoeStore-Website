import { Component, EventEmitter, HostListener, OnDestroy, OnInit, Output, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { interval, Observable, Subject, Subscription } from 'rxjs';
import { map, takeWhile } from 'rxjs/operators';
import { Colors } from '../../models/colors';
import { Item } from '../../models/item';
import { Section } from '../../models/section';
import { ProductsService } from '../../services/products.http.service';



@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnDestroy {

  public clickSubject = new Subject<void>();
  private subscriptions: Subscription[] = [];
  private interval$ = interval(1);
  private _stops: [number, string][] = [
    [0, 'none'],
    [270, 'color-fondo'],
  ];
  private isIncreasing = true;
  private currentIndex = 0;


  public get getIsIncreasing(){
    return this.isIncreasing;
  }

  private get nextIndex() {
    return this.isIncreasing
      ? (this.currentIndex + 1)
      : (this.currentIndex - 1);
  }

  @Output() filterEvent: EventEmitter<Observable<Item[]>> = new EventEmitter<Observable<Item[]>>();
  public sizes = [];
  public colorList: { key: number, value: string }[] = [];
  public filterForm: FormGroup;

  sections: Section[] = [
    "Hombre",
    "Mujer",
    "Niño/a"
  ];


  constructor(
    private fb: FormBuilder, 
    private prodSvc:ProductsService,
    private renderer: Renderer2,) {
      this.createForm();
    }



  private setNextIndex() {
    if (!this._stops[this.nextIndex]) {
      this.isIncreasing = !this.isIncreasing;
    }
    this.currentIndex = this.nextIndex;
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


    for (const [key, value] of Object.entries(Colors)) {
      if (!isNaN(Number(key))) {
        this.colorList.push({ key: +key, value: `${value}` });
      }
    }

    const max = this.filterForm.get('maxPrice');
    const min = this.filterForm.get('minPrice');


    min.valueChanges.subscribe(_ => {
      if (min.value > max.value) {
        min.setValue(max.value);
      }
    });

    max.valueChanges.subscribe(_ => {
      if (max.value < min.value) {
        max.setValue(min.value);
      }
    });

  }

  private toggleClass(element: HTMLElement) {
    this.setNextIndex();
    this.renderer.addClass(element, this._stops[this.currentIndex][1]);
  }

  buttonClicked() {
    const element: HTMLElement = document.getElementById("sideBar"); //this.ref.nativeElement
    
      this.toggleClass(element);
      this.interval$
        .pipe(
          takeWhile(() => this._stops[this.currentIndex][0] !== element.clientWidth),
          map(() => this.isIncreasing ? element.offsetWidth + 2 : element.offsetWidth - 2),
          map(width=> this.isIncreasing==false&&width==10 ? width-10 : width))
        .subscribe(width => this.renderer.setStyle(element, 'width', `${width}px`));
    

    
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    const element: HTMLElement = document.getElementById("sideBar");
    if(event.target.innerWidth>=990){
      this.renderer.removeAttribute(element, 'style');
      this.renderer.removeAttribute(element, 'class');
    }else{
      this.renderer.addClass(element, this._stops[this.currentIndex][1]);
    }
  }

  ngOnDestroy() {
    this.subscriptions.filter(sub => sub).forEach(sub => sub.unsubscribe());
  }

  /* FILTRO */

  
  createForm() {
    this.filterForm = this.fb.group({
      section: this.fb.group({ "Hombre": false, "Niño/a": false, "Mujer": false }),
      size: this.fb.group({
        34: false, 35: false, 36: false, 37: false,
        38: false, 39: false, 40: false, 41: false,
        42: false, 43: false, 44: false, 48: false, 49: false,
      }),
      colors: this.fb.group({
        1: false, 2: false, 3: false, 4: false,
        5: false, 6: false, 7: false, 8: false
      }),
      maxPrice: [500],
      minPrice: [0],
    });
  }

  onSubmit() {

    if (this.filterForm.invalid) {
      console.error("Something is wrong");
    } else {

      const sections = this.filterKeysIfValorTrue(this.filterForm.get('section').value);
      const sizes = this.filterKeysIfValorTrue(this.filterForm.get('size').value).map(i => Number(i));
      const colors = this.filterKeysIfValorTrue(this.filterForm.get('colors').value).map(i => Number(i));
      const maxPrice = this.filterForm.get('maxPrice').value;
      const minPrice = this.filterForm.get('minPrice').value;
      this.filterEvent.emit(this.prodSvc.filterProducts(sections, sizes, colors, maxPrice, minPrice));
    }

  }

  filterKeysIfValorTrue(formValue: any){
    const items = [];
    const itemKeys = Object.keys(formValue);
    const itemValues = Object.values(formValue);

    for (let i = 0; i < itemKeys.length; i++) {
      if (itemValues[i] === true) {
        items.push(itemKeys[i]);
      }
    }
    return items;
  }

}
