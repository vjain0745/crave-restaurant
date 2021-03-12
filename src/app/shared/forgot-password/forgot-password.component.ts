import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { Router } from '@angular/router';
import { ApiService } from '../../service/api.service';
import { UtilsService } from '../../service/utils.service';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  submitted:boolean = false;
  forgotPass: FormGroup;
  countryCode = "966";
  constructor(
    private auth: AuthenticationService, 
    private router: Router,
    private api: ApiService,
    private utils: UtilsService,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {

    this.forgotPass = this.fb.group({
      mobile_number: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(15)]],
    });
  }

  get f(){ return this.forgotPass.controls; }

  submit(){
    this.submitted = true;

    if (this.forgotPass.invalid) {
      return;
    }

    let dataToSend = {
      mobile_number: this.forgotPass.value.mobile_number,
      country_code: this.countryCode
    }
    this.utils.set('crave_restaurant_data', dataToSend);
    this.api.forgetPassword(dataToSend).subscribe(
      data=> {
        this.utils.alert('success', data['message']);
        this.utils.goto('/reset-password');
      },
      error=> {
        this.utils.alert('error', error.error.message);
         
      }
    );
  }

  onCountryChange(event){
    this.countryCode = event.dialCode;
  }

}
