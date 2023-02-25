

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RescisaoComponent } from './rescisao.component';

const routes: Routes = [
  { path: '', component: RescisaoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RescisaoRoutingModule { }