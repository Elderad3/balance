import { ChartModule } from 'primeng/chart';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GraficoComponent } from './components/grafico/grafico.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';


@NgModule({
  declarations: [
    GraficoComponent, PageNotFoundComponent
  ],
  imports: [
    CommonModule,
    ChartModule

  ],
  exports: [
    CommonModule,
    GraficoComponent,
  ],
  providers: [],
})
export class SharedModule {

  // componentes, serviços etc, que podem ou não serem utilizados por um componente principal. 
  //Não são obrigatórios pro sistema como um todo funcionar

}
