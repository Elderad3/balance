import { ChartModule } from 'primeng/chart';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { Grafico2Component } from './components/grafico2/grafico2.component';
import { TabelaInssComponent } from './components/conceito/tabela-inss.component';
import { TabelaIrComponent } from './components/conceito/tabela-ir.component';
import { TabelaSalarioFamiliaComponent } from './components/conceito/tabela-salario-familia.component';


@NgModule({
  declarations: [
    Grafico2Component,
    PageNotFoundComponent,
    TabelaInssComponent,
    TabelaIrComponent,
    TabelaSalarioFamiliaComponent

  ],
  imports: [
    CommonModule,
    ChartModule

  ],
  exports: [
    CommonModule,
    Grafico2Component,
    TabelaInssComponent,
    TabelaIrComponent,
    TabelaSalarioFamiliaComponent
  ],
  providers: [],
})
export class SharedModule {

  // componentes, serviços etc, que podem ou não serem utilizados por um componente principal. 
  //Não são obrigatórios pro sistema como um todo funcionar

}
