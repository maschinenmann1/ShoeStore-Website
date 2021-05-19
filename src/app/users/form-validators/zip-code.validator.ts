import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

const ZipCodeValidator = (provinceCode: string): ValidatorFn => {
    return (control: AbstractControl): ValidationErrors | null => {
        let errors: ValidationErrors = {
            zipCodeError: {}
        };
        if(!control.value){
            return null;
        }
        if (!control.value.startsWith(provinceCode)) {
            errors.zipCodeError['wrongProvince'] = 'Este código postal pertenece a otra provincia';
        }


        if (control.value.length !== 5) {
            errors.zipCodeError['length'] = 'Debe ser de long 5';
        }

        if (errors.zipCodeError['wrongProvince'] || errors.zipCodeError['length']) {
            return errors;
        }
        
        return null;
    }
}

export { ZipCodeValidator }