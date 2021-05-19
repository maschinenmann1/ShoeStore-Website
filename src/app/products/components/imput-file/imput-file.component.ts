import { Component, EventEmitter, forwardRef, Input, OnInit } from '@angular/core';
import { AbstractControl, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-imput-file',
  templateUrl: './imput-file.component.html',
  styleUrls: ['./imput-file.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ImputFileComponent),
      multi: true,
    },
  ],
})
export class ImputFileComponent {

  private _value: string;
  private set value(val: string) {
    console.log("VALOR INICIO", val);
    this._value = val;
    this.onChange(val);
    this.onTouch();
  }

  public get getValue(){
    return this._value;
  }


  @Input() placeholder: string = 'Select an image...';
  @Input() myTitle: string = '';

  public isDisabled: boolean;

  onChange = (_: any) => { }
  onTouch = () => { }

  constructor() { }

  private readFile(fr: FileReader) {
    const result$ = new EventEmitter<string>();
    fr.onload = function () {
      result$.next(fr.result.toString());
    }
    fr.onerror = function (error) {
      result$.error(error);
    }
    return result$;
  }

  onInput(value: any) {
    this.value=null;
    if (value.target.files.length) {
      const myFile: File = value.target.files[0];
      this.placeholder = myFile.name;
      var reader = new FileReader();
      reader.readAsDataURL(myFile);
      this.readFile(reader).subscribe(
        base64 => this.fileReadSuccess(base64), 
        error => this.fileReadError(error));
    } else {
      this.placeholder = 'Select an image...';
    }
  }

  private fileReadSuccess(base64) {
    this.value = base64;
  }

  private fileReadError(error) {
    console.error(error);
    this.value = '';
  }

  writeValue(value: string | null): void {
    if (!value) {
      this.placeholder = 'Select an image...';
    }
    
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }


}
