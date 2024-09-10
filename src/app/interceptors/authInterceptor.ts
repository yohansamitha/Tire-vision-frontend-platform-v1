import { Injectable, Provider } from '@angular/core';
import {
  HTTP_INTERCEPTORS,
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('bearerToken');
    const baseUrl = environment.baseUrl;
    const urlSplit = req.url.split('/');

    if (
      urlSplit[urlSplit.length - 1] !== 'login' &&
      req.url !== `${baseUrl}/v1/user/register` &&
      req.url !== `${baseUrl}/v1/guest/tire-check`
    ) {
      req = req.clone({
        setHeaders: {
          Authorization: `${token}`,
        },
      });
    }
    return next.handle(req).pipe(
      tap({
        next: (event) => {},
        error: (error) => {
          if (error instanceof HttpErrorResponse) {
            if (error.error.code) {
              if (401 == error.error.code.toString()) {
                console.log('unauthorized');
                sessionStorage.clear();
                this.router.navigate(['./']);
              }
            }
          }
        },
      }),
      catchError((error: HttpErrorResponse) => {
        return throwError(error);
      })
    );
  }
}

export const authInterceptorProvider: Provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptor,
  multi: true,
};
