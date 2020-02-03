import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AmortizationPageRoutingModule } from './amortization-routing.module';

import { AmortizationPage } from './amortization.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AmortizationPageRoutingModule
  ],
  declarations: [AmortizationPage]
})
export class AmortizationPageModule {}
