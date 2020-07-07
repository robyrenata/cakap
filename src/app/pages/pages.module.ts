import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PagesComponent } from "./pages.component";
import { Routes, RouterModule } from "@angular/router";
import { AuthGuardGuard } from "../shared/guard/auth-guard.guard";

const routes: Routes = [
  {
    path: "",
    component: PagesComponent,
    children: [
      {
        path: "",
        redirectTo: "home",
        pathMatch: "full",
      },
      {
        path: "home",
        loadChildren: () =>
          import("./home/home.module").then((m) => m.HomeModule),
      },
      {
        path: "profile",
        loadChildren: () =>
          import("./profile/profile.module").then((m) => m.ProfileModule),
        canActivate: [AuthGuardGuard],
      },
      {
        path: "repos",
        loadChildren: () =>
          import("./repos/repos.module").then((m) => m.ReposModule),
        canActivate: [AuthGuardGuard],
      },
      {
        path: "**",
        loadChildren: () =>
          import("./not-found/not-found.module").then((m) => m.NotFoundModule),
        canActivate: [AuthGuardGuard],
      },
    ],
  },
];

@NgModule({
  declarations: [PagesComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class PagesModule {}
