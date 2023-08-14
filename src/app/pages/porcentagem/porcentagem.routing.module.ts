

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PorcentagemComponent } from './porcentagem.component';

const routes: Routes = [
  { path: '', component: PorcentagemComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PorcentagemRoutingModule { }