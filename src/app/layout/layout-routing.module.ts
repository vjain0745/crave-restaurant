import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PendingProfileComponent } from './pending-profile/pending-profile.component';
import { BussinessDetailComponent } from './bussiness-detail/bussiness-detail.component';
import { BankDetailComponent } from './bank-detail/bank-detail.component';

import { AddingToCartComponent } from './adding-to-cart/adding-to-cart.component';
import { CompleteProfileComponent } from './complete-profile/complete-profile.component';
import { WishlistComponent } from './wishlist/wishlist.component'; 
import { AddDishComponent } from './add-dish/add-dish.component';
import { AddComboComponent } from './add-combo/add-combo.component';
import { BranchesBranchComponent } from './branches-branch/branches-branch.component';
import { BranchesSubAdminComponent } from './branches-sub-admin/branches-sub-admin.component';
import { AddComboFurtherDetailsComponent } from './add-combo-further-details/add-combo-further-details.component';
import { ComboViewComponent } from './combo-view/combo-view.component';
import { DishViewComponent } from './dish-view/dish-view.component';
import { HelpComponent } from './help/help.component';
import { SelectAddressComponent } from './select-address/select-address.component';
import { AddAddressComponent } from './add-address/add-address.component';

import { DiscountsComponent } from './discounts/discounts.component';
import { AddDiscountComponent } from './add-discount/add-discount.component';
import { EditDiscountComponent } from './edit-discount/edit-discount.component';



const routes: Routes = [
  {path: '', redirectTo:'dashboard', pathMatch:'full' },
  {path: 'pending-profile', component: PendingProfileComponent },
  {path: 'bussiness-detail', component: BussinessDetailComponent },
  {path: 'bank-detail', component: BankDetailComponent },
  {path: 'adding-to-cart', component: AddingToCartComponent },
  {path: 'complete-profile', component: CompleteProfileComponent },
  {path: 'wishlist', component: WishlistComponent },
  {path: 'add-dish', component: AddDishComponent },
  {path: 'add-dish/:id', component: AddDishComponent },
  {path: 'add-combo', component: AddComboComponent },
  {path: 'add-combo/:id', component: AddComboComponent },
  {path: 'branches-branch', component: BranchesBranchComponent },
  {path: 'branches-sub-admin', component: BranchesSubAdminComponent },
  {path: 'branches-sub-admin', component: BranchesSubAdminComponent },
  {path: 'add-combo-further-details', component: AddComboFurtherDetailsComponent },
  {path: 'view-dish/:id', component: DishViewComponent },
  {path: 'view-combo/:id', component: ComboViewComponent },
  {path: 'help', component: HelpComponent },
  {path: 'manage-address', component: SelectAddressComponent },
  {path: 'add-address', component: AddAddressComponent },
  {path: 'edit-address', component: AddAddressComponent },

  {path: 'discounts', component: DiscountsComponent },
  {path: 'add-discount', component: AddDiscountComponent },
  {path: 'edit-discount/:id', component: EditDiscountComponent},

];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
