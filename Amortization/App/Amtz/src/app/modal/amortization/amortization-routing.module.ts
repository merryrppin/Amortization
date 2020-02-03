import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AmortizationPage } from './amortization.page';

const routes: Routes = [
  {
    path: '',
    component: AmortizationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AmortizationPageRoutingModule {}
