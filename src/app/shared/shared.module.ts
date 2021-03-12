import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedRoutingModule } from './shared-routing.module';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { OtpVerificationComponent } from './otp-verification/otp-verification.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { BussinessTypeComponent } from './bussiness-type/bussiness-type.component';
import { BussinessLocationComponent } from './bussiness-location/bussiness-location.component';
import { BussinessDetailsComponent } from './bussiness-details/bussiness-details.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { Otp2Component } from './otp2/otp2.component';
import { SigninComponent } from './signin/signin.component';
import { Ng2TelInputModule } from 'ng2-tel-input';
import { CountdownModule } from 'ngx-countdown';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { DashboardComponent } from '../shared/dashboard/dashboard.component';
import { CommanModule } from '../comman/comman.module';

@NgModule({
  declarations: [
    // SharedComponent
    ForgotPasswordComponent,
    OtpVerificationComponent,
    ResetPasswordComponent,
    BussinessTypeComponent,
    BussinessLocationComponent,
    BussinessDetailsComponent,
    SignUpComponent,
    Otp2Component,
    SigninComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2TelInputModule,
    CountdownModule,CommanModule,
    NgxIntlTelInputModule
  ]
})
export class SharedModule { }
