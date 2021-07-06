import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AbstractControl, AsyncValidator, ValidationErrors } from "@angular/forms";
import { of } from "rxjs";
import { map, catchError } from 'rxjs/operators';

@Injectable({providedIn : 'root'})
export class CheckUsername implements AsyncValidator{
    constructor(private http : HttpClient){
    }
    validate = (control: AbstractControl) => {
        const {value} = control;
        return this.http.post("https://api.angular-email.com/auth/username", {username : value}).pipe(
            map(()=>{
               return null
            }),
            catchError(err=>{
                return of({usernameunique : false})
            })
        );
    }

}
