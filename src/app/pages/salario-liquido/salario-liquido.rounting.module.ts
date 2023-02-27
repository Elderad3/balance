

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SalarioLiquidoComponent } from './salario-liquido.component';

const routes: Routes = [
  { path: '', component: SalarioLiquidoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalarioLiquidoRoutingModule { }