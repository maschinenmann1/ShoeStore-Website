import { LoginComponent } from "./login";
import { RegisterComponent } from "./register";
import { DirectionComponent } from './direction';
import { ProfileComponent} from './profile'; 
import { ManageAdminComponent } from "./manage-admin";
import { EditProfileComponent } from "./edit-profile";


const USERS = [ RegisterComponent, LoginComponent, 
                DirectionComponent, ProfileComponent, 
                EditProfileComponent, ManageAdminComponent];

export { USERS, LoginComponent, RegisterComponent,EditProfileComponent,
                ProfileComponent, ManageAdminComponent};