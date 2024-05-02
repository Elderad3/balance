import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { TabelaInssComponent } from './components/conceito/tabela-inss.component';
import { TabelaIrComponent } from './components/conceito/tabela-ir.component';
import { TabelaSalarioFamiliaComponent } from './components/conceito/tabela-salario-familia.component';
import { BarChartComponent } from './components/graficos/bar/bar-chart.component';


@NgModule({
  declarations: [
    PageNotFoundComponent,
    TabelaInssComponent,
    TabelaIrComponent,
    TabelaSalarioFamiliaComponent,
    BarChartComponent

  ],
  imports: [
    CommonModule,

  ],
  exports: [
    CommonModule,
    TabelaInssComponent,
    TabelaIrComponent,
    TabelaSalarioFamiliaComponent,
    BarChartComponent
  ],
  providers: [],
})
export class SharedModule {

  // componentes, serviços etc, que podem ou não serem utilizados por um componente principal. 
  //Não são obrigatórios pro sistema como um todo funcionar

}
