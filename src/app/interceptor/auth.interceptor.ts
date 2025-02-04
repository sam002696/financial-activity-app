import { HttpEvent, HttpInterceptorFn, HttpRequest, HttpHandlerFn } from '@angular/common/http';
import { Observable } from 'rxjs';

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
        return next(cloned);
    }


    return next(req);
};
