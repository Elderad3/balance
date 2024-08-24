

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DecimoTerceiroComponent } from './decimo-terceiro.component';

const routes: Routes = [
  { path: '', component: DecimoTerceiroComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DecimoTerceiroRoutingModule { }