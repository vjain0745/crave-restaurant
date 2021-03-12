import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuRoutingModule } from './menu-routing.module';
import { MenuComboComponent } from '../menu/menu-combo/menu-combo.component';
import { MenuInventoryComponent } from '../menu/menu-inventory/menu-inventory.component';
import { MenuMyListingsComponent } from '../menu/menu-my-listings/menu-my-listings.component';
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

import { NgxCalendarModule } from "ss-ngx-calendar";
import { AgmCoreModule } from '@agm/core';
import { AgmDirectionModule } from 'agm-direction';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';


import { environment } from '../../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';

@NgModule({
  declarations: [      
       MenuComboComponent, MenuInventoryComponent, MenuMyListingsComponent
     ],
  imports: [
    CommonModule,
    MenuRoutingModule,
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
export class MenuModule { }
