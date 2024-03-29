import { FormsModule } from '@angular/forms';
import { CurrencyMaskConfig, CurrencyMaskModule, CURRENCY_MASK_CONFIG } from 'ng2-currency-mask';
import { SalarioLiquidoRoutingModule } from './salario-liquido.rounting.module';
import { RouterModule } from '@angular/router';
import { CoreModule } from '../../core/core.module';
import { SharedModule } from '../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalarioLiquidoComponent } from './salario-liquido.component';
import { ConceitoSalarioLiquidoComponent } from './conceito/conceito-sal-liquido.component';

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
  declarations: [SalarioLiquidoComponent, ConceitoSalarioLiquidoComponent],
  imports: [CommonModule, SharedModule, CoreModule, FormsModule, CurrencyMaskModule, RouterModule, SalarioLiquidoRoutingModule],
  exports: [],
  providers: [{ provide: CURRENCY_MASK_CONFIG, useValue: CustomCurrencyMaskConfig },]
})
export class SalarioLiquidoModule { }
