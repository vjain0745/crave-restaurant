import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MarketplaceRoutingModule } from './marketplace-routing.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule, MatSortModule } from '@angular/material';


import {MatTableModule, MatTabsModule} from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { NgDatepickerModule } from 'ng2-datepicker';
import { ChartsModule } from 'ng2-charts';
import { CommanModule } from '../comman/comman.module';

import { MarketplaceHomeComponent } from '../marketplace/marketplace-home/marketplace-home.component';
import { MarketplaceStoreDetailComponent } from '../marketplace/marketplace-store-detail/marketplace-store-detail.component';
import { MarketplaceCartComponent } from '../marketplace/marketplace-cart/marketplace-cart.component';
import { MarketplaceOrderSummaryComponent } from '../marketplace/marketplace-order-summary/marketplace-order-summary.component';
import { MarketplacePaymentGatewayComponent } from '../marketplace/marketplace-payment-gateway/marketplace-payment-gateway.component';
import { MarketplaceOngoingOrderComponent } from '../marketplace/marketplace-ongoing-order/marketplace-ongoing-order.component';
import { MarketplaceCancelledComponent } from '../marketplace/marketplace-cancelled/marketplace-cancelled.component';
import { MarketplaceCompletedComponent } from '../marketplace/marketplace-completed/marketplace-completed.component';
import { MarketplaceCompletedAfterReviewComponent } from '../marketplace/marketplace-completed-after-review/marketplace-completed-after-review.component';
import { MarketplaceWalletComponent } from '../marketplace/marketplace-wallet/marketplace-wallet.component';
import { MarketplaceWalletManagecardComponent } from '../marketplace/marketplace-wallet-managecard/marketplace-wallet-managecard.component';
import { MarketplaceWalletAddcardComponent } from '../marketplace/marketplace-wallet-addcard/marketplace-wallet-addcard.component';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import { LazyLoadImageModule, scrollPreset } from 'ng-lazyload-image';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

import { NgxCalendarModule } from "ss-ngx-calendar";
import { AgmCoreModule } from '@agm/core';
import { AgmDirectionModule } from 'agm-direction';

import { environment } from '../../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { MarketplaceViewOngoinOrderComponent } from '../marketplace/marketplace-view-ongoin-order/marketplace-view-ongoin-order.component';
import { MarketplaceViewCancelledOrderComponent } from '../marketplace/marketplace-view-cancelled-order/marketplace-view-cancelled-order.component';
import { MarketplaceViewCompletedOrderComponent } from '../marketplace/marketplace-view-completed-order/marketplace-view-completed-order.component';

@NgModule({
  declarations: [

    MarketplaceHomeComponent,
     MarketplaceStoreDetailComponent, 
     MarketplaceCartComponent, 
     MarketplaceOrderSummaryComponent,
      MarketplacePaymentGatewayComponent, MarketplaceOngoingOrderComponent, 
      MarketplaceCancelledComponent, MarketplaceCompletedComponent, 
      MarketplaceCompletedAfterReviewComponent, MarketplaceWalletComponent, 
      MarketplaceWalletManagecardComponent, 
      MarketplaceWalletAddcardComponent, MarketplaceViewOngoinOrderComponent,MarketplaceViewCancelledOrderComponent,MarketplaceViewCompletedOrderComponent
   
  ],
  imports: [
    CommonModule,
    CommanModule,
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
    MatInputModule,
    MarketplaceRoutingModule
  ]
})
export class MarketplaceModule { }
