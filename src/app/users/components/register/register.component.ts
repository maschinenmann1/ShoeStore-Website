import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmailValidator } from '../../form-validators/email.validator';
import { PasswordValidator } from '../../form-validators/password.validator';
import { User } from '../../models/user';
import { UserService } from '../../services/user-service/user.service';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  private user: User;
  public generalError;
  public userForm: FormGroup;
  public get f() {
    return this.userForm.controls;
  }

  constructor(private fb: FormBuilder, private router: Router, private userService: UserService) {
    this.createForm();
  }

  private spainPhoneValidators = [Validators.required, Validators.maxLength(9), Validators.minLength(9), Validators.pattern(/^[67]{1}[0-9]*/)];
  private otherPhoneValidators = [Validators.required];

  public getValidityClass(control: AbstractControl): string {
    return control.touched
      ? control.invalid ? 'is-invalid' : 'is-valid'
      : '';
  }

  ngOnInit(): void {
    window.scrollTo(0, 0);

    const phoneNumberControl = this.userForm.get('phone');
    const addressControl = this.userForm.get('address');

    addressControl.statusChanges.subscribe(status => {
      if (status == 'VALID') {
        if (addressControl.value.country === 'spain') {
          phoneNumberControl.setValidators(this.spainPhoneValidators);
        } else {
          phoneNumberControl.setValidators(this.otherPhoneValidators);
        }
      }
    });



    this.userForm.get('password').valueChanges.subscribe(value => {
      if (value) {
        this.userForm.get('repeatPassword').setValidators([PasswordValidator(value), Validators.required]);
      } else {
        this.userForm.get('repeatPassword').setValidators(Validators.required);
      }
    });
  }


  createForm() {
    this.userForm = this.fb.group({
      name: [null, Validators.required],
      lastname: [null, Validators.required],
      email: [null, { validators: [Validators.required, Validators.email], asyncValidators: EmailValidator(this.userService) }],
      address: [null, Validators.required],
      phone: [null, Validators.required],
      password: [null, Validators.required],
      repeatPassword: [null, Validators.required]
    });
  }

  onSubmit() {
    window.scrollTo(0, 0);
    if (this.userForm.invalid) {
      this.generalError = true;
      console.error("Something is wrong", this.userForm);
    } else {
      this.user = new User(this.userForm.value);
      this.userService.addUser(this.user).subscribe(u=>console.log(u));
      console.log("Usuario:", this.user);
      this.router.navigateByUrl('/users/login');
    }
  }

}
