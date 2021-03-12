import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
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
import { MarketplaceViewOngoinOrderComponent } from '../marketplace/marketplace-view-ongoin-order/marketplace-view-ongoin-order.component';
import { MarketplaceViewCompletedOrderComponent } from '../marketplace/marketplace-view-completed-order/marketplace-view-completed-order.component';
import { MarketplaceViewCancelledOrderComponent } from '../marketplace/marketplace-view-cancelled-order/marketplace-view-cancelled-order.component';



const routes: Routes = [
  {path: '', redirectTo:'dashboard', pathMatch:'full' },

  {path: 'marketplace-home', component: MarketplaceHomeComponent },
  {path: 'marketplace-store-detail', component: MarketplaceStoreDetailComponent },
  {path: 'marketplace-cart', component: MarketplaceCartComponent },
  {path: 'marketplace-order-summary', component: MarketplaceOrderSummaryComponent },
  {path: 'marketplace-payment-gateway', component: MarketplacePaymentGatewayComponent },
  {path: 'marketplace-ongoing-order', component: MarketplaceOngoingOrderComponent },
  {path: 'marketplace-cancelled', component: MarketplaceCancelledComponent },
  {path: 'marketplace-completed', component: MarketplaceCompletedComponent },
  {path: 'marketplace-completed-after-review', component: MarketplaceCompletedAfterReviewComponent },
  {path: 'marketplace-wallet', component: MarketplaceWalletComponent },
  {path: 'marketplace-wallet-managecard', component: MarketplaceWalletManagecardComponent },
  {path: 'marketplace-wallet-addcard', component: MarketplaceWalletAddcardComponent },


  {path: 'marketplace-view-ongoing-Order/:id', component: MarketplaceViewOngoinOrderComponent},
  {path: 'marketplace-view-Completed-Order/:id', component: MarketplaceViewCompletedOrderComponent},
  {path: 'marketplace-view-cancelled-order/:id', component: MarketplaceViewCancelledOrderComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MarketplaceRoutingModule { }
