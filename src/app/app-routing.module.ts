import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import {AuthGuard} from './service/auth.guards'

const routes: Routes = [
  { 
    path: '', 
    loadChildren: () => import('./shared/shared.module').then(m => m.SharedModule) 
  }, 
  { 
    path: 'orders', 
    loadChildren: () => import('./orders/orders.module').then(m => m.OrdersModule)  , canActivate:[AuthGuard]
  },
  { 
    path: 'menu', 
    loadChildren: () => import('./menu/menu.module').then(m => m.MenuModule)  , canActivate:[AuthGuard]
  },
  { 
    path: 'home', 
    loadChildren: () => import('./layout/layout.module').then(m => m.LayoutModule)  , canActivate:[AuthGuard]
  },
  { 
    path: 'marketplace', 
    loadChildren: () => import('./marketplace/marketplace.module').then(m => m.MarketplaceModule) , canActivate:[AuthGuard]
  }, 
  { 
    path: '**', 
    component: PageNotFoundComponent
  } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes , {
    preloadingStrategy : PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
