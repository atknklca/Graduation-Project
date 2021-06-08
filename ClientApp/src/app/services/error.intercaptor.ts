import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable, pipe, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

export class ErrorInterceptor implements HttpInterceptor{
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        return next.handle(req)
            .pipe(catchError((error: HttpErrorResponse) => {
                console.log(error);
                
                if(error.status === 400){
                    return throwError(error.error.message);
                }

                if(error.status === 401){
                    return throwError(error.statusText);
                }

                if(error.status === 500){
                    return throwError(error.statusText);
                }
            }))

    }

}