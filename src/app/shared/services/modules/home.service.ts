import { Injectable } from "@angular/core";
import { ApiService } from "../core/api.service";

@Injectable({
  providedIn: "root",
})
export class HomeService {
  constructor(private api: ApiService) {}

  getUserDetail(username) {
    return this.api.getData(`users/${username}`);
  }
}
