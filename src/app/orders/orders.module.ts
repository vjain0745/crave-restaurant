import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersRoutingModule } from './orders-routing.module';
import { LiveOrdersComponent } from '../orders/live-orders/live-orders.component';
import { LiveOrderViewComponent } from '../orders/live-order-view/live-order-view.component';
import { PastOrdersComponent } from '../orders/past-orders/past-orders.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule, MatSortModule } from '@angular/material';


import {MatTableModule, MatTabsModule} from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { NgDatepickerModule } from 'ng2-datepicker';
import { ChartsModule } from 'ng2-charts';
import { CommanModule } from '../comman/comman.module';

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

@NgModule({
  declarations: [
    LiveOrdersComponent,  LiveOrderViewComponent, PastOrdersComponent
  ],
  imports: [
    CommonModule,
    OrdersRoutingModule,
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
    MatInputModule
  ]
})
export class OrdersModule { }
