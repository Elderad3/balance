import { FormsModule } from '@angular/forms';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { CURRENCY_MASK_CONFIG } from 'ng2-currency-mask/src/currency-mask.config';
import { CurrencyMaskConfig } from 'ng2-currency-mask/src/currency-mask.config';
import { SalarioLiquidoRoutingModule } from './salario-liquido.rounting.module';
import { RouterModule } from '@angular/router';
import { CoreModule } from '../../core/core.module';
import { SharedModule } from '../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalarioLiquidoComponent } from './salario-liquido.component';
import { ConceitoSalarioLiquidoComponent } from './conceito/conceito-sal-liquido.component';
import { TabelaInssComponent } from '../rescisao/conceito/tabela-inss.component';
import { TabelaIrComponent } from '../rescisao/conceito/tabela-ir.component';
import { TabelaSalarioFamiliaComponent } from '../rescisao/conceito/tabela-salario-familia.component';

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
  declarations: [SalarioLiquidoComponent, ConceitoSalarioLiquidoComponent, TabelaInssComponent, TabelaIrComponent, TabelaSalarioFamiliaComponent],
  imports: [CommonModule, SharedModule, CoreModule, FormsModule, CurrencyMaskModule, RouterModule, SalarioLiquidoRoutingModule],
  exports: [TabelaInssComponent, TabelaIrComponent, TabelaSalarioFamiliaComponent],
  providers: [{ provide: CURRENCY_MASK_CONFIG, useValue: CustomCurrencyMaskConfig },]
})
export class SalarioLiquidoModule { }
