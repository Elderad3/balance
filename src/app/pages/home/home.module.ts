import { EstruturaComponent } from './../situacao-financeira/estrutura/estrutura.component';
import { SolvenciaComponent } from './../situacao-financeira/solvencia/solvencia.component';
import { LiquidezComponent } from './../situacao-financeira/liquidez/liquidez.component';
import { HomeRoutingModule } from './home.routing.module';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { CURRENCY_MASK_CONFIG } from 'ng2-currency-mask/src/currency-mask.config';
import { CurrencyMaskConfig } from 'ng2-currency-mask/src/currency-mask.config';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SharedModule } from './../../shared/shared.module';
import { CoreModule } from './../../core/core.module';
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
  prefix: "R$ ",
  suffix: "",
  thousands: "."
};

@NgModule({
  declarations: [
    HomeComponent, BalancoComponent, DreComponent, CapitalGiroComponent,
    AnaliseHorizontalComponent, AnaliseHorizontalDreComponent,
    AnaliseVerticalComponent, AnaliseVerticalDreComponent, LiquidezComponent, SolvenciaComponent, EstruturaComponent,
    SituacaoFinanceiraComponent, SituacaoEconomicaComponent],
  imports: [CommonModule, CoreModule, SharedModule, FormsModule, CurrencyMaskModule, RouterModule, HomeRoutingModule],
  exports: [
    HomeComponent, BalancoComponent, DreComponent, CapitalGiroComponent,
    AnaliseHorizontalComponent, AnaliseHorizontalDreComponent,
    AnaliseVerticalComponent, AnaliseVerticalDreComponent, LiquidezComponent, SolvenciaComponent, EstruturaComponent,
    SituacaoFinanceiraComponent, SituacaoEconomicaComponent],
  providers: [{ provide: CURRENCY_MASK_CONFIG, useValue: CustomCurrencyMaskConfig },]
})
export class HomeMainModule { }