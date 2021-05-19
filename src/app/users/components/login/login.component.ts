import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ValidateUserService } from '../../services/validate-user-service/validate-user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public userForm: FormGroup;
  public generalError: boolean;
  public wrongUserPass: boolean;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private validateUserService: ValidateUserService) {
    this.createForm();
  }

  ngOnInit(): void {
    window.scrollTo( 0, 0 );
  }

  createForm() {
    this.userForm = this.fb.group({
      email: [null, Validators.required],
      password: [null, Validators.required],
    });
  }

  public getValidityClass(control: AbstractControl): string {
    return control.touched
      ? control.invalid ? 'is-invalid' : 'is-valid'
      : '';
  }

  onSubmit() {
    if (this.userForm.invalid) {
      this.generalError = true;
    } else {
      const password = this.userForm.get("password").value;
      const email = this.userForm.get("email").value;
      this.validateUserService.login(email, password)
        .subscribe(isLogged => {
          if (isLogged) {
            this.router.navigateByUrl('/products');
          } else {
            this.validateUserService.activeUser = undefined;
            this.generalError = true;
            console.error("Something is wrong");
          }
        });
    }
  }


}
