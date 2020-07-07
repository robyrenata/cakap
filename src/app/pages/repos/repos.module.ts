import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReposComponent } from "./repos.component";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    component: ReposComponent,
  },
];

@NgModule({
  declarations: [ReposComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class ReposModule {}
