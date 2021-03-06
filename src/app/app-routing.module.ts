import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {StatisticComponent} from "./statistic/statistic.component";
import {DashboardComponent} from "./dashboard/dashboard.component";

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'statistics', component: StatisticComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
