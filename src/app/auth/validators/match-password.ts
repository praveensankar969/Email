import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, Validator, FormGroup } from '@angular/forms';
@Injectable({providedIn : 'root'})
export class MatchPassword implements Validator {
    
    validate(formGroup : AbstractControl){
    const { password, passwordConfirm} = formGroup.value;
        if(password === passwordConfirm){
            return null;
        }
        else{
            return {passwordDontMatch :true}
        }
    }

}
