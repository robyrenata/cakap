import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";

import { catchError, map, mergeMap } from "rxjs/operators";
import { Router } from "@angular/router";
import { GlobalService } from "../services/global.service";
import { ToastrService } from "ngx-toastr";

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(
    private gs: GlobalService,
    private router: Router,
    private toast: ToastrService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          this.gs.log("Event from HttpRes (Error Interceptor) -->", event);
        }
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        this.gs.log("err from interceptor", error);
        // HANDLE ERROR CONDITION HERE!
        this.gs.log("error?", error, "error");
        if (error) {
          this.toast.error(error.error.message, error.statusText);
        } else {
          this.toast.error(error.message, error.name);
        }
        return throwError(error);
      })
    );
  }
}
