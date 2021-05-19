import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminAuthService } from '../core/services/security/admin-auth.service';
import { ManageCommentComponent } from './components';


const routes: Routes = [
  {
      path:'manage-comments',
      component: ManageCommentComponent,
      canActivate: [AdminAuthService]
      
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
