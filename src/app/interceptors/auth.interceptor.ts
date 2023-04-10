import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HTTP_INTERCEPTORS,
  HttpErrorResponse,
} from '@angular/common/http';
import {catchError, Observable, tap, throwError} from "rxjs";
import {SessionAttribute} from "../modules/admin/constant/session-attribute";
import {RouterConstant} from "../modules/admin/constant/router-constant";
import {Router} from "@angular/router";
import {NonAuthenticateService} from "../modules/admin/services/non-authenticate.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private router: Router,
                private nonAuthenticateService: NonAuthenticateService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler) {
      return this.injectScreenId(request, next).pipe(
        catchError((resp: HttpErrorResponse) => {
          if (sessionStorage.getItem(SessionAttribute.TOKEN) != null) {
            this.nonAuthenticateService.checkToken(sessionStorage.getItem(SessionAttribute.TOKEN) + '').subscribe(data => {
              if (data) {

              } else {
                sessionStorage.removeItem(SessionAttribute.TOKEN);
                sessionStorage.removeItem(SessionAttribute.ROLES)
                this.router.navigate([RouterConstant.DEN_COFFEE.path, RouterConstant.ATTENDANCE.path]);
              }
            }, (error) => {

            });
          }
          return throwError('An error occurred');
        }),
        tap(
          (resp) => {

          }
        )
      );
    }

  private injectScreenId(request: HttpRequest<any>, next: HttpHandler) {
    if (sessionStorage.getItem(SessionAttribute.TOKEN) != null) {
      request = request.clone({
        setHeaders: {
          Authorization: 'Bearer ' + sessionStorage.getItem(SessionAttribute.TOKEN)
        }
      });
    }
    return next.handle(request);
  }

}
export const HttpInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
];
