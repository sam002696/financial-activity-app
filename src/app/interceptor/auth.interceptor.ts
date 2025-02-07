import { HttpEvent, HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { GlobalAlertService } from '../services/global-alert.service';
import { Router } from '@angular/router';

// Function-based interceptor using HttpHandlerFn
export const AuthInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {



    // Getting the access token from localStorage
    const user = localStorage.getItem('user');
    const token = user ? JSON.parse(user).accessToken : null;

    // console.log('user', user);
    // console.log('token', token);

    if (req.url.includes('/login') || req.url.includes('/register')) {

        return next(req);
    }


    if (token) {
        const cloned = req.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`
            }
        });
        return next(cloned).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error.status === 401) {

                    const alertService = new GlobalAlertService();
                    alertService.showAlert("Authentication failed. Please log in again.", 'error');


                    const router = new Router();
                    router.navigate(['/login']);
                }
                return throwError(() => error);
            })
        );
    }


    return next(req);
};
