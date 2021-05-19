import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminAuthService } from '../core/services/security/admin-auth.service';
import { LoggedAuthService } from '../core/services/security/logged-auth.service';
import { EditProfileComponent, LoginComponent, 
            ProfileComponent, RegisterComponent, ManageAdminComponent} from './components';


const routes: Routes = [

    {
        path:'login', 
        component: LoginComponent
    }, 
    {
        path:'register', 
        component: RegisterComponent
    },  
    {
        path:'profile',
        component: ProfileComponent, 
        canActivate: [LoggedAuthService]
    },
    {
        path:'profile/edit',
        component: EditProfileComponent,
        canActivate: [LoggedAuthService]
    },
    {
        path:'manage-admins',
        component: ManageAdminComponent,
        canActivate: [AdminAuthService]
    },

   
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})


export class UsersRoutingModule { }
