

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FinanciamentoPriceComponent } from './financimento-price.component';

const routes: Routes = [
  { path: '', component: FinanciamentoPriceComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FinanciamentoPriceRoutingModule { }