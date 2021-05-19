import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user-service/user.service';
import { ValidateUserService } from '../../services/validate-user-service/validate-user.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent implements OnInit {

  public editProfileForm: FormGroup;
  public success: boolean;
  public user:User;
  public generalError:boolean
  public mailInicial: string;

  public get f() {
    return this.editProfileForm.controls;
  }
  constructor(private fb: FormBuilder, private actveusr:ValidateUserService, private usrSvc: UserService, private router:Router) { 
    this.createForm();
    this.mailInicial=this.editProfileForm.get('email').value;
  }


  private spainPhoneValidators = [Validators.required, Validators.maxLength(9), Validators.minLength(9), Validators.pattern(/^[67]{1}[0-9]*/)];
  private otherPhoneValidators = [Validators.required];

  ngOnInit(): void {
    const phoneNumberControl = this.editProfileForm.get('phone');
    const addressControl = this.editProfileForm.get('address');

    if ( addressControl.value.country === 'spain') {
      phoneNumberControl.setValidators(this.spainPhoneValidators);
    } else {
      phoneNumberControl.setValidators(this.otherPhoneValidators);
    }

    addressControl.statusChanges.subscribe(status =>{
      if(status=='VALID'){
        if ( addressControl.value.country === 'spain') {
          phoneNumberControl.setValidators(this.spainPhoneValidators);
        } else {
          phoneNumberControl.setValidators(this.otherPhoneValidators);
        }
      }
    });
  }

  
  public getValidityClass(control: AbstractControl): string {
    return control.touched
      ? control.invalid ? 'is-invalid' : 'is-valid'
      : '';
  }

  createForm() {
    this.editProfileForm = this.fb.group({
      name: [this.actveusr.activeUser.name, Validators.required],
      lastname: [this.actveusr.activeUser.lastname, Validators.required],
      email: [this.actveusr.activeUser.email, Validators.required],
      address: [this.actveusr.activeUser.address, Validators.required],
      phone: [this.actveusr.activeUser.phone, Validators.required],
      password: [this.actveusr.activeUser.password],
      admin: [this.actveusr.activeUser.admin],
    });

  }

  goBack(){
    this.router.navigateByUrl('/users/profile');
  }

  onSubmit() {
    if(this.editProfileForm.invalid){
      this.success=false;
      this.generalError=true;
      console.error("Something is wrong", this.editProfileForm);
    }else{
      this.user = new User(this.editProfileForm.value);
      this.usrSvc.updateUser(this.actveusr.activeUser.email, this.user).subscribe(u=>console.log(u));
      this.actveusr.activeUser=this.user;
      window.scrollTo( 0, 0 );
      this.success=true;
      this.generalError=false;
    }
  }

}
