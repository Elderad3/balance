
import { CnaesImpeditivosComponent } from './cnaes-impeditivos.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '', component: CnaesImpeditivosComponent,
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CnaesImpeditivosRoutingModule { }