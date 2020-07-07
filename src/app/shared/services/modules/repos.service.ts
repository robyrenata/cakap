import { Injectable } from "@angular/core";
import { ApiService } from "../core/api.service";
import { CacheService } from "../cache.service";

@Injectable({
  providedIn: "root",
})
export class ReposService {
  constructor(private api: ApiService, private cache: CacheService) {}

  getRepoListByUser(pagination) {
    return this.api.getData(
      `users/${this.cache.currentUser.login}/repos`,
      pagination
    );
  }
}
