import { SharedModule } from './../../../shared/shared.module';
import { CoreModule } from './../../../core/core.module';
import { PrazosCilcosComponent } from './../prazos-ciclos/prazos-ciclos.component';
import { RetornoSobreVendasComponent } from './../situacao-economica/retorno-sobre-vendas/retorno-sobre-vendas.component';
import { RetornoSobrePlComponent } from './../situacao-economica/retorno-sobre-pl/retorno-sobre-pl.component';
import { RetornoSobreAtivoComponent } from './../situacao-economica/retorno-sobre-ativo/retorno-sobre-ativo.component';
import { GiroAtivoComponent } from './../situacao-economica/giro-ativo/giro-ativo.component';
import { EstruturaComponent } from './../situacao-financeira/estrutura/estrutura.component';
import { SolvenciaComponent } from './../situacao-financeira/solvencia/solvencia.component';
import { LiquidezComponent } from './../situacao-financeira/liquidez/liquidez.component';
import { HomeRoutingModule } from './home.routing.module';
import { CurrencyMaskConfig, CurrencyMaskModule, CURRENCY_MASK_CONFIG } from "ng2-currency-mask";
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { SituacaoEconomicaComponent } from './../situacao-economica/situacao-economica.component';
import { SituacaoFinanceiraComponent } from './../situacao-financeira/situacao-financeira.component';
import { AnaliseVerticalDreComponent } from './../analise-vertical-dre/analise-vertical-dre.component';
import { AnaliseVerticalComponent } from './../analise-vertical/analise-vertical.component';
import { AnaliseHorizontalDreComponent } from './../analise-horizontal-dre/analise-horizontal-dre.component';
import { AnaliseHorizontalComponent } from './../analise-horizontal/analise-horizontal.component';
import { CapitalGiroComponent } from './../capital-giro/capital-giro.component';
import { DreComponent } from './../dre/dre.component';
import { BalancoComponent } from './../balanco/balanco.component';
import { HomeComponent } from './home.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

export const CustomCurrencyMaskConfig: CurrencyMaskConfig = {
  align: "right",
  allowNegative: true,
  decimal: ",",
  precision: 2,
  prefix: "",
  suffix: "",
  thousands: "."
};

@NgModule({
  declarations: [
    HomeComponent, BalancoComponent, DreComponent, CapitalGiroComponent,
    AnaliseHorizontalComponent, AnaliseHorizontalDreComponent, GiroAtivoComponent, RetornoSobreAtivoComponent, RetornoSobrePlComponent, RetornoSobreVendasComponent,
    AnaliseVerticalComponent, AnaliseVerticalDreComponent, LiquidezComponent, SolvenciaComponent, EstruturaComponent, PrazosCilcosComponent,
    SituacaoFinanceiraComponent, SituacaoEconomicaComponent],
  imports: [CommonModule, CoreModule, SharedModule, FormsModule, CurrencyMaskModule, RouterModule, HomeRoutingModule],
  exports: [
    HomeComponent, BalancoComponent, DreComponent, CapitalGiroComponent,
    AnaliseHorizontalComponent, AnaliseHorizontalDreComponent, GiroAtivoComponent, RetornoSobreAtivoComponent, RetornoSobrePlComponent, RetornoSobreVendasComponent,
    AnaliseVerticalComponent, AnaliseVerticalDreComponent, LiquidezComponent, SolvenciaComponent, EstruturaComponent, PrazosCilcosComponent,
    SituacaoFinanceiraComponent, SituacaoEconomicaComponent],
  providers: [{ provide: CURRENCY_MASK_CONFIG, useValue: CustomCurrencyMaskConfig },]
})
export class HomeMainModule { }