import { FormsModule } from '@angular/forms';
import { CurrencyMaskConfig, CurrencyMaskModule, CURRENCY_MASK_CONFIG } from 'ng2-currency-mask';
import { DecimoTerceiroProporcionalRoutingModule } from './decimo-terceiro-proporcional.rounting.module';
import { RouterModule } from '@angular/router';
import { CoreModule } from '../../core/core.module';
import { SharedModule } from '../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DecimoTerceiroProporcionalComponent } from './decimo-terceiro-proporcional.component';
import { ConceitoDecimoTerceiroProporcionalComponent } from './conceito/conc-decimo-terceiro-proporcional.component';

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
  declarations: [DecimoTerceiroProporcionalComponent, ConceitoDecimoTerceiroProporcionalComponent],
  imports: [CommonModule, SharedModule, CoreModule, FormsModule, CurrencyMaskModule, RouterModule, DecimoTerceiroProporcionalRoutingModule],
  exports: [],
  providers: [{ provide: CURRENCY_MASK_CONFIG, useValue: CustomCurrencyMaskConfig },]
})
export class DecimoTerceiroProporcionalModule { }
