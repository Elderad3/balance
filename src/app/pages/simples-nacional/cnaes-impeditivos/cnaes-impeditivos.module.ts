
import { CnaesImpeditivosRoutingModule } from './cnaes-impeditivos.rounting.module';
import { CoreModule } from './../../../core/core.module';
import { SharedModule } from './../../../shared/shared.module';
import { CnaesImpeditivosComponent } from './cnaes-impeditivos.component';
import { FormsModule } from '@angular/forms';
import { CurrencyMaskConfig, CurrencyMaskModule, CURRENCY_MASK_CONFIG } from 'ng2-currency-mask';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
  declarations: [CnaesImpeditivosComponent],
  imports: [
    CommonModule, SharedModule, CoreModule, FormsModule, CurrencyMaskModule, RouterModule, CnaesImpeditivosRoutingModule, FormsModule
  ],
  providers: [{ provide: CURRENCY_MASK_CONFIG, useValue: CustomCurrencyMaskConfig },]
})
export class CnaesImpeditivosModule { }
