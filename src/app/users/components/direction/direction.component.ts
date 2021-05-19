import { Component, forwardRef, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { provinces } from 'src/app/users/models/provinces';
import { ZipCodeValidator } from '../../form-validators/zip-code.validator';
import { Address } from '../../models/address';
import { FormGroupConfig } from '../../models/formGroupConfig';


@Component({
  selector: 'app-direction',
  templateUrl: './direction.component.html',
  styleUrls: ['./direction.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DirectionComponent),
      multi: true,
    },
  ],
})
export class DirectionComponent implements OnInit {

  public arrProvinces = provinces;
  public direcForm: FormGroup;
  onChange = (_: any) => { };
  onTouch = () => { };
  constructor(private fb: FormBuilder) {
    this.createGroup();
  }

  ngOnInit(): void {
    const provinceControl = this.direcForm.get('province');
    const zipCodeControl = this.direcForm.get('zipCode');
    const countryControl = this.direcForm.get('country');

    zipCodeControl.setValidators(Validators.required);
    zipCodeControl.updateValueAndValidity();
    this.direcForm.get('country').valueChanges
      // .pipe(startWith(this.direcForm.get('country').value))
      .subscribe(value => {
        if (value === 'spain') {
          provinceControl.enable();
        } else {
          provinceControl.disable();
          zipCodeControl.setValidators(Validators.required);
          zipCodeControl.updateValueAndValidity();
        }
      });

    provinceControl.valueChanges.subscribe(value => {
      zipCodeControl.setValidators([ZipCodeValidator(value), Validators.required]);
      zipCodeControl.updateValueAndValidity();

    });
  }

  
  public getValidityClass(control: AbstractControl): string {
    return control.touched
      ? control.invalid ? 'is-invalid' : 'is-valid'
      : '';
  }

  createGroup() {
    const config: FormGroupConfig<Address> = {
      country: ['', Validators.required],
      city: [null, Validators.required],
      direction: [null, Validators.required],
      province: [{ value: '', disabled: true }, Validators.required],
      zipCode: [NaN, Validators.required]
    };
    this.direcForm = this.fb.group(config);

    this.direcForm.valueChanges.pipe(debounceTime(300)).subscribe(value => {
      if (this.direcForm.invalid) {
        this.onChange(null);
      } else {
        this.onChange(value);
      }
      this.onTouch();
    })
  }


  writeValue(address: Address): void {
    if (!address) {
      this.direcForm.setValue({
        country: "",
        city: null,
        direction: null,
        province: "",
        zipCode: "",
      })
    } else {
      this.direcForm.setValue(address);
    }
    this.direcForm.markAsPristine();
    this.direcForm.markAsUntouched();
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    if (isDisabled) {
      this.direcForm.disable();
    } else {
      this.direcForm.enable();
    }
  }

}
