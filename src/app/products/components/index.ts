import { ItemComponent } from "./item";
import { ItemListComponent } from "./item-list";
import { ItemPresentationComponent } from "./item-presentation";
import { SidebarComponent } from "./sidebar";
import { ItemDetailsComponent } from "./item-details";
import { ManageProductsComponent } from "./manage-products";
import { EditProductsComponent } from "./edit-products";
import { CeateProductComponent } from "./ceate-product";
import { ImputFileComponent } from './imput-file';
import { CompareProductsComponent } from "./compare-products";
import { ComparedItemComponent } from "./compared-item";

const PRODUCTS = [ ItemListComponent, ItemComponent, ItemPresentationComponent,
                    SidebarComponent, ItemDetailsComponent, CeateProductComponent,
                    EditProductsComponent, ManageProductsComponent, ImputFileComponent,
                    CompareProductsComponent, ComparedItemComponent ];

export { PRODUCTS, ItemPresentationComponent, ItemListComponent,
                    ItemDetailsComponent, ManageProductsComponent,
                    EditProductsComponent, CeateProductComponent, 
                    CompareProductsComponent, ComparedItemComponent };