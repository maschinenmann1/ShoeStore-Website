import { AbstractControl, AsyncValidatorFn, ValidationErrors } from "@angular/forms";
import { Observable, of } from "rxjs";
import { map } from "rxjs/operators";
import { UserService } from "../services/user-service/user.service";


export function EmailValidator(usrSvc: UserService): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
        if (control.invalid) {
            return of(null);
        }
        return usrSvc.emailIsTaken(control.value).pipe(
            map(taken => taken
                ? { emailTaken: 'Este email está en uso' }
                : null));
    };
}
