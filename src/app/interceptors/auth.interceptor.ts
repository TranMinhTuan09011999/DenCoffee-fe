import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HTTP_INTERCEPTORS,
  HttpEvent,
} from '@angular/common/http';
import {Observable} from "rxjs";
import {SessionAttribute} from "../modules/admin/constant/session-attribute";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor() { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
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
