import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenuComboComponent } from '../menu/menu-combo/menu-combo.component';
import { MenuInventoryComponent } from '../menu/menu-inventory/menu-inventory.component';
import { MenuMyListingsComponent } from '../menu/menu-my-listings/menu-my-listings.component';

const routes: Routes = [
  {path: 'menu-combo', component: MenuComboComponent },
  {path: 'menu-inventory', component: MenuInventoryComponent },
  {path: 'menu-my-listings', component: MenuMyListingsComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuRoutingModule { }
