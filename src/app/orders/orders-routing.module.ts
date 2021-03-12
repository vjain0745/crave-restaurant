import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LiveOrdersComponent } from '../orders/live-orders/live-orders.component';
import { LiveOrderViewComponent } from '../orders/live-order-view/live-order-view.component';
import { PastOrdersComponent } from '../orders/past-orders/past-orders.component';

const routes: Routes = [  
  {path: 'live-orders', component: LiveOrdersComponent },
{path: 'past-orders', component: PastOrdersComponent },
{path: 'live-order-view', component: LiveOrderViewComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule { }
