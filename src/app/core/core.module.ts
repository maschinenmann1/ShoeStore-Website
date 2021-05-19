import { CommonModule } from '@angular/common';
import { ErrorHandler, NgModule } from '@angular/core';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ProductStoreErrorHandlerService } from './services';




@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    ModalModule.forRoot()
  ],
  exports: [
    CommonModule,
    ModalModule,
  ],
  providers: [
    { provide: ErrorHandler, useExisting: ProductStoreErrorHandlerService }
  ]
})
export class CoreModule { }
