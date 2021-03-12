import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { OtpVerificationComponent } from './otp-verification/otp-verification.component';
import { BussinessTypeComponent } from './bussiness-type/bussiness-type.component';
import { BussinessLocationComponent } from './bussiness-location/bussiness-location.component';
import { BussinessDetailsComponent } from './bussiness-details/bussiness-details.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { Otp2Component } from './otp2/otp2.component';
import { SigninComponent } from './signin/signin.component';
import { DashboardComponent } from '../shared/dashboard/dashboard.component';
import { AuthGuard } from '../service/auth.guards';

const routes: Routes = [
  { path: '', redirectTo: 'signin', pathMatch: 'full' },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  {path: 'dashboard', component: DashboardComponent  , canActivate:[AuthGuard] },
  { path: 'otp', component: ResetPasswordComponent },
  { path: 'reset-password', component: OtpVerificationComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'otp2', component: Otp2Component },
  { path: 'bussiness-type', component: BussinessTypeComponent },
  { path: 'bussiness-location', component: BussinessLocationComponent },
  { path: 'bussiness-details', component: BussinessDetailsComponent },
  { path: 'signin', component: SigninComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SharedRoutingModule { }
