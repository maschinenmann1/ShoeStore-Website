import { NgModule } from '@angular/core';
import { CoreModule } from '../core';

import { SharedRoutingModule } from './shared-routing.module';



@NgModule({
  declarations: [
  ],
  imports: [
    CoreModule,
    SharedRoutingModule
  ],
  exports: [
  ]
})
export class SharedModule { }
