import { ChartModule } from 'primeng/chart';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { Grafico2Component } from './components/grafico2/grafico2.component';


@NgModule({
  declarations: [
    Grafico2Component,
    PageNotFoundComponent
  ],
  imports: [
    CommonModule,
    ChartModule

  ],
  exports: [
    CommonModule,
    Grafico2Component
  ],
  providers: [],
})
export class SharedModule {

  // componentes, serviços etc, que podem ou não serem utilizados por um componente principal. 
  //Não são obrigatórios pro sistema como um todo funcionar

}
