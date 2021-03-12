import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule, MatSortModule } from '@angular/material';


import {MatTableModule, MatTabsModule} from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { NgDatepickerModule } from 'ng2-datepicker';
import { ChartsModule } from 'ng2-charts';
import { CommanModule } from '../comman/comman.module';
import { LayoutRoutingModule } from './layout-routing.module';
import { PendingProfileComponent } from './pending-profile/pending-profile.component';
import { BussinessDetailComponent } from './bussiness-detail/bussiness-detail.component';
import { BankDetailComponent } from './bank-detail/bank-detail.component';
import { AddingToCartComponent } from './adding-to-cart/adding-to-cart.component';
import { CompleteProfileComponent } from './complete-profile/complete-profile.component';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import { WishlistComponent } from './wishlist/wishlist.component';
import { LazyLoadImageModule, scrollPreset } from 'ng-lazyload-image';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
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
import { NgxCalendarModule } from "ss-ngx-calendar";
import { AgmCoreModule } from '@agm/core';
import { AgmDirectionModule } from 'agm-direction';


import { environment } from '../../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { DiscountsComponent } from './discounts/discounts.component';
import { AddDiscountComponent } from './add-discount/add-discount.component';
import { EditDiscountComponent } from './edit-discount/edit-discount.component';
@NgModule({
  declarations: [
    
       PendingProfileComponent, 
       BussinessDetailComponent, 
       BankDetailComponent,  
        AddingToCartComponent, 
        CompleteProfileComponent, 
         WishlistComponent, 
         AddDishComponent, AddComboComponent,BranchesBranchComponent,BranchesSubAdminComponent,
           AddComboFurtherDetailsComponent, ComboViewComponent, DishViewComponent, 
          HelpComponent, SelectAddressComponent, AddAddressComponent, 
           DiscountsComponent, AddDiscountComponent,
         EditDiscountComponent
        ],

         
  imports: [
    CommonModule,
    CommanModule,
    LayoutRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgDatepickerModule,
    ChartsModule,
    GooglePlaceModule,
    NgxCalendarModule,
    LazyLoadImageModule.forRoot({
      preset: scrollPreset
    }),
    NgMultiSelectDropDownModule.forRoot(),
    AgmCoreModule.forRoot(),
    AgmDirectionModule,

    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireMessagingModule,
    MatTableModule,
    MatPaginatorModule,
    MatTabsModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule
  ]
})
export class LayoutModule { }
