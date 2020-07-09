import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { GlobalService } from "src/app/shared/services/global.service";
import { HomeService } from "src/app/shared/services/modules/home.service";
import { CacheService } from "src/app/shared/services/cache.service";
import { RxwebValidators } from "@rxweb/reactive-form-validators";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  fg: FormGroup;
  submitted = false;
  currentSearch = null;

  constructor(
    public gs: GlobalService,
    private fb: FormBuilder,
    private homeSrv: HomeService,
    private cache: CacheService
  ) {
    this.cache.checkCurrentUser().subscribe((exists) => {
      exists
        ? (this.currentSearch = this.cache.currentUser)
        : (this.currentSearch = null);

      this.gs.log("current search", this.currentSearch);
    });
    this.initFormUser();
  }

  ngOnInit() {}

  initFormUser() {
    this.gs.validatorErrorMessage();
    this.fg = this.fb.group({
      username: [
        null,
        RxwebValidators.compose({
          validators: [RxwebValidators.required()],
        }),
      ],
    });
  }

  submitUser() {
    this.submitted = true;
    this.gs.log("fg?", this.fg);
    if (this.fg.invalid) {
      this.submitted = false;
      return;
    } else {
      this.homeSrv.getUserDetail(this.fg.value.username).subscribe(
        (res: any) => {
          this.gs.log("res get user", res);
          if (res.status === 200) {
            this.cache.setCurrentUser(res.body);
            this.gs.navigateTo("/profile");
            this.submitted = false;
          } else {
            this.submitted = false;
          }
        },
        (err) => {
          this.submitted = false;
        }
      );
    }
  }

  clearCurrentUser() {
    this.currentSearch = null;
    this.cache.removeCurrentUser();
  }
}
