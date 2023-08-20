

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TaxaEfetivaComponent } from './taxa-efetiva.component';

const routes: Routes = [
  { path: '', component: TaxaEfetivaComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaxaEfetivaRoutingModule { }