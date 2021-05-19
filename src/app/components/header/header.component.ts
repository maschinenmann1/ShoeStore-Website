import { animate, style, transition, trigger } from '@angular/animations';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Component, HostListener, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CartService } from 'src/app/cart/services';
import { Item } from 'src/app/products/models/item';
import { ProductsService } from 'src/app/products/services/products.http.service';
import { ValidateUserService } from 'src/app/users/services/validate-user-service/validate-user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
    trigger('openClose', [
      // state(':enter', style({
      //   height: '200px',
      // })),
      // state(':leave', style({
      //   height: '0px',
      // })),
      transition(':enter', [
        style({ height: '0px' }),
        animate('250ms', style({ height: '*' }))
      ]),
      transition(':leave', [
        animate('250ms', style({ height: '0px' }))
      ])
    ]),
  ],
})
export class HeaderComponent implements OnInit {

  public isCollapsed = true;
  public cart$ = this.cartSvc.cart$;
  public products$: Observable<Item[]>;
  public products: Item[];
  public filterText: string = '';


  constructor(
    public breakpointObserver: BreakpointObserver,
    private validUsrSvc: ValidateUserService,
    private cartSvc: CartService,
    private prodSvc: ProductsService,
    private router: Router,
    private renderer: Renderer2) { }

  public get productName$() {
    return this.products$.pipe(map(list => list
      .filter(prod => prod.name.toLowerCase().indexOf(this.filterText.toLowerCase()) >= 0)));
  }

  get logged() {
    return this.validUsrSvc.logged;
  }

  @HostListener('window:resize')
  onResize() {
    this.breakpointObserver
      .observe(['(min-width: 991px)'])
      .subscribe((state: BreakpointState) => {
        const movNav = document.querySelector('.movileNav');
        if (movNav) {
          if (state.matches) {
            this.renderer.removeClass(movNav, 'navbar-collapse');
            this.renderer.removeClass(movNav, 'navbar-expand-lg');
          } else {
            this.renderer.addClass(movNav, 'navbar-collapse');
            this.renderer.addClass(movNav, 'navbar-expand-lg');
          }
        }
      });
  }

  ngOnInit() {
    this.products$ = this.prodSvc.loadProducts();
    this.prodSvc.loadProducts().subscribe(p => this.products = p);
  }

  onSelect(valor) {
    this.router.navigateByUrl('/products/' + valor.item.id);
  }

  salir() {
    this.validUsrSvc.logout();
  }

}
