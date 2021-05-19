import { NgModule } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { P404Component } from './routes';
import { HeropageComponent } from './routes';

const routes: Routes = [
  {
    path: '', 
    redirectTo: 'main', 
    pathMatch: 'full'
  },
  {
    path:'main', 
    component: HeropageComponent
  },  
  {
    path: 'contact',
    loadChildren: () => import('./contact/contacto.module').then(m => m.ContactModule),
  },
  {
    path: 'products',
    loadChildren: () => import('./products/products.module').then(m => m.ProductsModule),
  },
  {
    path: 'users',
    loadChildren: () => import('./users/users.module').then(m => m.UsersModule),
  },
  {
    path: 'comments',
    loadChildren: () => import('./comments/comments.module').then(m => m.CommentsModule),
  },
  {
    path: 'cart',
    loadChildren: () => import('./cart/cart.module').then(m => m.CartModule),
  },
  {
    path: '**',
    component: P404Component
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
