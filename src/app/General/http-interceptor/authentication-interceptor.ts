import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Observable } from "rxjs";
import { finalize } from "rxjs/operators";
import { AuthenticationService } from "../authentication.service";

Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {

    constructor(private authService: AuthenticationService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        let idToken = this.authService.getToken();
        if (idToken) {
            const cloned = req.clone({
                headers: req.headers.set('Authorization', "Bearer " + idToken)
            });
        } else {
            return next.handle(req).pipe(finalize(() => {console.log("finalize")}));
        }
    }
}
