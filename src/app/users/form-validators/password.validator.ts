import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

const PasswordValidator = (password: string): ValidatorFn => {

    return (control: AbstractControl): ValidationErrors | null => {
        let errors: ValidationErrors = {
            passwordError: null
        };

        if (control.value != password) {
            errors.passwordError = 'Las contraseñas no coinciden';
        }

        if (errors.passwordError) { 
            return errors;
        }
        return null;
    }
}

export { PasswordValidator }