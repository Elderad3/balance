

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FinanciamentoSacComponent } from './financimento-sac.component';

const routes: Routes = [
  { path: '', component: FinanciamentoSacComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FinanciamentoSacRoutingModule { }