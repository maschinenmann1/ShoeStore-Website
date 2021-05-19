import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminAuthService } from '../core/services/security/admin-auth.service';
import { CeateProductComponent, ComparedItemComponent, CompareProductsComponent, EditProductsComponent, ItemDetailsComponent, 
          ItemListComponent, ManageProductsComponent } from './components';

const routes: Routes = [
  {
    path:'', 
    pathMatch: 'full',
    component: ItemListComponent
  },
  {
    path:'manage-products',
    component: ManageProductsComponent,
    canActivate: [AdminAuthService]
  },
  {
    path: 'manage-products/:id', 
    component: EditProductsComponent, 
    canActivate: [AdminAuthService]
  },
  {
    path: 'create-products',
    component: CeateProductComponent,
    canActivate: [AdminAuthService]
  },
  {
    path: 'compare-products',
    component: CompareProductsComponent,
    children: [
      {
        path: 'item1',
        component: ComparedItemComponent,
        outlet:'item1',
      },
      {
        path: 'item2',
        component: ComparedItemComponent,
        outlet:'item2',
      },
      {
        path: 'item3',
        component: ComparedItemComponent,
        outlet:'item3',
      },
    ]
  },
  {
    path: ':id', 
    component: ItemDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
