import { Injectable, isDevMode } from "@angular/core";
import { ReactiveFormConfig } from "@rxweb/reactive-form-validators";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class GlobalService {
  constructor(private router: Router) {}

  log(message: string, data: any = null, type: string = "log") {
    if (isDevMode()) {
      if (type === "log") {
        if (data) {
          console.log(message, data);
        } else {
          console.log(message);
        }
      } else if (type === "error") {
        console.error(message, data);
      }
    }
  }

  validatorErrorMessage() {
    return ReactiveFormConfig.set({
      validationMessage: {
        required: "This field is required",
      },
    });
  }

  navigateTo(path) {
    return this.router.navigate([path]);
  }
}
