import { FormsModule } from '@angular/forms';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { CURRENCY_MASK_CONFIG } from 'ng2-currency-mask/src/currency-mask.config';
import { CurrencyMaskConfig } from 'ng2-currency-mask/src/currency-mask.config';
import { RescisaoRoutingModule } from './rescisao.rounting.module';
import { RouterModule } from '@angular/router';
import { CoreModule } from '../../core/core.module';
import { SharedModule } from '../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RescisaoComponent } from './rescisao.component';
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
  declarations: [RescisaoComponent],
  imports: [
    CommonModule, SharedModule, CoreModule, FormsModule, CurrencyMaskModule, RouterModule, RescisaoRoutingModule
  ],
  providers: [{ provide: CURRENCY_MASK_CONFIG, useValue: CustomCurrencyMaskConfig },]
})
export class RescisaoModule { }
