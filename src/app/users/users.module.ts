import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { USERS } from './components';
import { UsersRoutingModule } from './users-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CollapseModule } from 'ngx-bootstrap/collapse';



@NgModule({
  declarations: [
    ...USERS,
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    ReactiveFormsModule,
    CollapseModule,
  ]
})
export class UsersModule { }
