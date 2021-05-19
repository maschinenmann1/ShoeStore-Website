import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ValidateUserService } from 'src/app/users/services/validate-user-service/validate-user.service';
import { CartService } from '../../services';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
  
  public products$ = this.cartService.cart$;
  private success;
  public gastosEnvio = 10;

  constructor(private cartService: CartService, private valUsSrv: ValidateUserService, private router:Router) { }

  get login() {
    return this.valUsSrv.logged;
  }

  purchase() {
    if(this.login){
      this.cartService.purchase()
        .subscribe(
          () => console.log("comprado"),
          error => console.error(error));
      this.success = true;
    }else{
      this.router.navigateByUrl('/users/login');
    }
  }

  get getSuccess(){
    return this.success;
  }

}
