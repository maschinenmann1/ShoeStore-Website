import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CONTACT } from './components';
import { ReactiveFormsModule } from '@angular/forms';
import { ContactRoutingModule } from './contact-routing.module';

@NgModule({
  declarations: [
    ...CONTACT
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ContactRoutingModule
  ]
})
export class ContactModule { }
