import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from "@angular/router";
import { Observable } from "rxjs";
import { CacheService } from "../services/cache.service";
import { GlobalService } from "../services/global.service";

@Injectable({
  providedIn: "root",
})
export class AuthGuardGuard implements CanActivate {
  constructor(
    private cache: CacheService,
    private gs: GlobalService,
    private router: Router
  ) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return new Observable<boolean>((observer) => {
      this.cache.checkCurrentUser().subscribe((exists) => {
        this.gs.log("exists?", exists);
        if (exists) {
          return observer.next(true);
        } else {
          this.router.navigate(["/"]);
          return observer.next(false);
        }
      });
    });
  }
}
