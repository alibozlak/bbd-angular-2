import { HttpErrorResponse, HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, throwError } from "rxjs";

export const authInterceptor : HttpInterceptorFn = (request, next) =>{
    const router = inject(Router);
    const token = localStorage.getItem('accessToken');
    let clonedRequest = request.clone();

    if (token){
        clonedRequest = request.clone({
            setHeaders : {
                Authorization : `Bearer ${token}`
            }
        });
    }

    return next(clonedRequest).pipe(
        catchError((error : HttpErrorResponse) => {
            if (error.status === 401) {
                localStorage.removeItem('accessToken');
                localStorage.removeItem('role');

                router.navigate(['/login']);

                alert("Oturumunuzun süresi dolmuş. Lütfen tekrar giriş yapınız");
            }

            return throwError(() => error);
        })
    )
}