import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HeroesComponent } from "./heroes/heroes.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import {HeroDetailComponent} from "./hero-detail/hero-detail.component";
// import { CommonModule } from "@angular/common";

const routes: Routes = [
  {
    path: '', 
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: "dashboard",
    component: DashboardComponent
  },
  {
    path: 'detail/:id',
    component: HeroDetailComponent
  },
  {
  path: "heroes",
  component: HeroesComponent
  },
];

@NgModule({
  // imports: [CommonModule], //don't need in here
  // declarations: [] //don't need in here
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
