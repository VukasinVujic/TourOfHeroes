import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HeroesComponent } from "./heroes/heroes.component";

// import { CommonModule } from "@angular/common";

const routes: Routes = [
  {
    path: "heroes",
    component: HeroesComponent
  }
];

@NgModule({
  // imports: [CommonModule], //don't need in here
  // declarations: [] //don't need in here
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
