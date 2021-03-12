import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommanRoutingModule } from './comman-routing.module';
import { HeaderComponent } from './header/header.component';
import { LeftSidebarComponent } from './left-sidebar/left-sidebar.component';


@NgModule({
  declarations: [HeaderComponent, LeftSidebarComponent],
  imports: [
    CommonModule,
    CommanRoutingModule
  ],
  exports: [
    HeaderComponent,
    LeftSidebarComponent
  ]
})
export class CommanModule { }
