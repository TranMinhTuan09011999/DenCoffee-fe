import {Injectable} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest,} from '@angular/common/http';
import {catchError, tap, throwError} from "rxjs";
import {Router} from "@angular/router";
import {NonAuthenticateService} from "../modules/admin/services/non-authenticate.service";
import {LoadingService} from "../services/loading.service";
import {RouterConstant} from "../modules/admin/constant/router-constant";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router: Router,
              private nonAuthenticateService: NonAuthenticateService,
              private loadingService: LoadingService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    this.loadingService.pushProcessing(request.clone());
    const tmpHeaders = request.clone().headers;
    request = request.clone({
      withCredentials: true,
      headers: tmpHeaders
    });
    return next.handle(request).pipe(
      catchError((resp: HttpErrorResponse) => {
        this.loadingService.removeProcessing(resp);
        if (resp.error.status == 403) {
          // if request is unauthorized
          if (resp.error.message == 'Access Denied') {
            // if token is invalid
            this.nonAuthenticateService.logout().subscribe(data => {
                this.router.navigate([RouterConstant.DEN_COFFEE.path, RouterConstant.LOGIN.path]).then();
              }
            )
          }
        }
        return throwError(resp);
      }),
      tap(
        (resp) => {
          this.loadingService.removeProcessing(resp);
        }
      )
    );
  }

}

export const HttpInterceptorProviders = [
  {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
];
