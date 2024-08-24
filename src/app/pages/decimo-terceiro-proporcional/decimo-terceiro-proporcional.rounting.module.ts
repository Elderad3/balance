

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DecimoTerceiroProporcionalComponent } from './decimo-terceiro-proporcional.component';

const routes: Routes = [
  { path: '', component: DecimoTerceiroProporcionalComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DecimoTerceiroProporcionalRoutingModule { }