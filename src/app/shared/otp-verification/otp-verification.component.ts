import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { Router } from '@angular/router';
import { UtilsService } from '../../service/utils.service';
import { ApiService } from '../../service/api.service';
import { MustMatch } from '../../service/mustMatch';
import { timer } from 'rxjs';
declare var $:any;
@Component({
  selector: 'app-otp-verification',
  templateUrl: './otp-verification.component.html',
  styleUrls: ['./otp-verification.component.css']
})
export class OtpVerificationComponent implements OnInit {
  subscribeTimer
  timeLeft = 30;

  resetForm: FormGroup;
  submitted= false;
  otp1= "";
  otp2= "";
  otp3= "";
  otp4= "";
  userData;

  constructor(
    private formBuilder: FormBuilder, 
    private auth: AuthenticationService, 
    private utils: UtilsService,
    private api: ApiService,
    private router: Router) {
      this.resetForm = this.formBuilder.group({
        password : ['', Validators.required],
        confirm_password : ['', Validators.required],
      }, {
        validator: MustMatch('password', 'confirm_password')
      });

      const source = timer(1000, 2000);
      const abc = source.subscribe(val => {
        this.subscribeTimer = this.timeLeft - val;
        if(this.subscribeTimer <= 0){
          abc.unsubscribe()
        }
      });
    }

  ngOnInit() {
    this.userData = this.utils.get('crave_restaurant_data');

    $('.form-group .showHidePass').on('click', function(){
      $(this).toggleClass('active');
      if($(this).hasClass('active')){
        $(this).prev('.password').prop('type', 'text');
      }else{
        $(this).prev('.password').prop('type', 'password');
      }
    });

    
    $('.otpField input').keyup(function (e) {
      var key = e.which || e.keyCode || e.charCode;
      if (key == 8 || key == 46) {
        let is_first_child = $($('.otpField input').is(':first-child'));
        debugger
        if (!is_first_child)
        debugger
          $(this).prev('input').trigger("select");
        return;
      }    
      $(this).next('input').trigger("select");      
      if (String.fromCharCode(e.keyCode).match(/[^0-9]/g)) return false;    
    });
  }

  get f(){return this.resetForm.controls; }

  submit(){
    this.submitted = true;
    if(this.resetForm.invalid) return;

    let otp = this.otp1+''+this.otp2+''+this.otp3+''+this.otp4;
    if(otp.trim().length < 4){
      this.utils.alert('warn', 'Please enter a valid otp.');
      return;
    }
    
    let dataToSend = {
      country_code: this.userData.country_code,
      mobile_number: this.userData.mobile_number, 
      password: this.resetForm.value.password,
      verification_code: otp
    }
    this.api.resetPassword(dataToSend).subscribe(
      data=> {
        // this.utils.alert('success', data['message']);
        this.utils.removeData('crave_restaurant_data');
        $('#done').modal('show');
        setTimeout(()=>{
          $('#done').modal('hide');
          this.utils.goto('/');
        },3000);
      },
      error=> {
        this.utils.alert('error', error['error']['message']);
         
      }
    );
  }

  resend(){
    if(this.subscribeTimer > 0){
      this.utils.alert('warn', 'Code will be re-send after '+ this.subscribeTimer +' seconds.');
      return
    }

    const source = timer(1000, 2000);
    const abc = source.subscribe(val => {
      this.subscribeTimer = this.timeLeft - val;
      if(this.subscribeTimer <= 0){
        abc.unsubscribe()
      }
    });

    let dataToSend = {
      country_code: this.userData.country_code,
      mobile_number: this.userData.mobile_number
    }
    this.api.resendOTP(dataToSend).subscribe(
      data=> {
        this.utils.alert('success', data['message']);
        this.otp1= "";
        this.otp2= "";
        this.otp3= "";
        this.otp4= "";
      },
      error=> {
        this.utils.alert('error', error['error']['message']);
        this.otp1= "";
        this.otp2= "";
        this.otp3= "";
        this.otp4= "";
         
      }
    );
  }
}