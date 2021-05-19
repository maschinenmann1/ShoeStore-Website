import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ContactService } from '../../services/contact.http.service';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent{
  
  public messageForm: FormGroup;
  public generalError:boolean;
  public success:boolean;
  public get f() {
    return this.messageForm.controls;
  }
  constructor(private fb: FormBuilder, private router:Router, private cnctSvc: ContactService ) { 
    this.createForm();
  }

  createForm() {
    this.messageForm = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mensaje: ['', Validators.required],
      asunto: ['', Validators.required],
    });
  }

  goBack(){
    this.router.navigateByUrl('/main');
  }

  public getValidityClass(control: AbstractControl): string {
    return control.touched
      ? control.invalid ? 'is-invalid' : 'is-valid'
      : '';
  }

  private resetForm() {
    this.messageForm.setValue({
      nombre: '',
      email: '',
      mensaje: '',
      asunto: ''
    }, { emitEvent: false });

    for(let control of Object.values(this.messageForm.controls)) {
      control.markAsPristine();
      control.markAsUntouched();
    }
  }

  onSubmit() {
    console.log(this.messageForm.value);
    window.scrollTo( 0, 0 );
    if(this.messageForm.invalid){
      this.generalError=true;
      this.success=false;
      console.error("Something is wrong", this.messageForm);
    }else{
      this.generalError=false;
      this.success=true;
      this.cnctSvc.sendMessage(this.messageForm.value).subscribe(_=>_);
      this.resetForm();
    }
  }

}
