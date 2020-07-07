import { Component, OnInit } from "@angular/core";
import { CacheService } from "src/app/shared/services/cache.service";
import { Router } from "@angular/router";
import { GlobalService } from "src/app/shared/services/global.service";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
})
export class ProfileComponent implements OnInit {
  profileData: any;

  constructor(
    private cache: CacheService,
    private router: Router,
    public gs: GlobalService
  ) {
    this.profileData = this.cache.currentUser;
  }

  ngOnInit() {
    this.gs.log("profile data", this.profileData);
  }
}
