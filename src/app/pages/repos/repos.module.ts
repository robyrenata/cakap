import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReposComponent } from "./repos.component";
import { Routes, RouterModule } from "@angular/router";
import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { TooltipModule } from "ngx-bootstrap/tooltip";
import { ClipboardModule } from "ngx-clipboard";
import { SpinnerModule } from "src/app/shared/common/component/spinner/spinner.module";

const routes: Routes = [
  {
    path: "",
    component: ReposComponent,
  },
];

@NgModule({
  declarations: [ReposComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ClipboardModule,
    SpinnerModule,
  ],
})
export class ReposModule {}
