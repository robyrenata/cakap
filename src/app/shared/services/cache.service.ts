import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class CacheService {
  private privateKey = "cakap_frontend";
  currentUser = null;
  constructor() {}

  setCurrentUser(data) {
    this.currentUser = data;
    return sessionStorage.setItem(this.privateKey, JSON.stringify(data));
  }

  checkCurrentUser() {
    return new Observable<boolean>((observer) => {
      const user = JSON.parse(sessionStorage.getItem(this.privateKey));
      if (user) {
        this.setCurrentUser(user);
        return observer.next(true);
      } else {
        this.removeCurrentUser();
        return observer.next(false);
      }
    });
  }

  removeCurrentUser() {
    this.currentUser = null;
    return sessionStorage.removeItem(this.privateKey);
  }
}
