import { FormsModule } from '@angular/forms';
import { CurrencyMaskConfig, CurrencyMaskModule, CURRENCY_MASK_CONFIG } from 'ng2-currency-mask';
import { DecimoTerceiroRoutingModule } from './decimo-terceiro.rounting.module';
import { RouterModule } from '@angular/router';
import { CoreModule } from '../../core/core.module';
import { SharedModule } from '../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DecimoTerceiroComponent } from './decimo-terceiro.component';
import { ConceitoDecimoTerceiroComponent } from './conceito/conc-decimo-terceiro.component';

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
  declarations: [DecimoTerceiroComponent, ConceitoDecimoTerceiroComponent],
  imports: [CommonModule, SharedModule, CoreModule, FormsModule, CurrencyMaskModule, RouterModule, DecimoTerceiroRoutingModule],
  exports: [],
  providers: [{ provide: CURRENCY_MASK_CONFIG, useValue: CustomCurrencyMaskConfig },]
})
export class DecimoTerceiroModule { }
