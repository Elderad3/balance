import { FormsModule } from '@angular/forms';
import { CurrencyMaskConfig, CurrencyMaskModule, CURRENCY_MASK_CONFIG } from 'ng2-currency-mask';
import { TaxaEfetivaRoutingModule } from './taxa-efetiva.rounting.module';
import { RouterModule } from '@angular/router';
import { CoreModule } from '../../core/core.module';
import { SharedModule } from '../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaxaEfetivaComponent } from './taxa-efetiva.component';
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
  declarations: [TaxaEfetivaComponent],
  imports: [
    CommonModule, SharedModule, CoreModule, FormsModule, CurrencyMaskModule, RouterModule, TaxaEfetivaRoutingModule
  ],
  providers: [{ provide: CURRENCY_MASK_CONFIG, useValue: CustomCurrencyMaskConfig },]
})
export class TaxaEfetivaModule { }
