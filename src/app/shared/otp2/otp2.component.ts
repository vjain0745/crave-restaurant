import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { Router } from '@angular/router';
import { UtilsService } from '../../service/utils.service';
import { ApiService } from '../../service/api.service';
import { timer } from 'rxjs';
declare var $:any;
import {environment} from 'src/environments/environment'

@Component({
  selector: 'app-otp2',
  templateUrl: './otp2.component.html',
  styleUrls: ['./otp2.component.css']
})
export class Otp2Component implements OnInit {
  subscribeTimer
  timeLeft = 30;

  otpForm: FormGroup;
  submitted= false;

  otp1= "";
  otp2= "";
  otp3= "";
  otp4= "";
  userData;
  baseurl: string;
  template: any;
  constructor(
    private formBuilder: FormBuilder, 
    private auth: AuthenticationService, 
    private utils: UtilsService,
    private api: ApiService,
    private router: Router) {
      this.userData = this.utils.get('crave_restaurant_data');

      const source = timer(1000, 1000);
      const abc = source.subscribe(val => {
        this.subscribeTimer = this.timeLeft - val;
        if(this.subscribeTimer <= 0){
          abc.unsubscribe()
        }
      });
    }

  ngOnInit() {
 this.baseurl = environment.baseUrl.slice(0,-1)
    this.templatee()
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

    this.otpForm = this.formBuilder.group({
      otp1 : ['', Validators.required],
      otp2 : ['', Validators.required],
      otp3 : ['', Validators.required],
      otp4 : ['', Validators.required]
    })

  }
  templatee(){
    this.api.getTemplate().subscribe((data)=>{
      console.log(data)
      this.template = data
      if(this.template){
       
       }
   },error =>{
      console.log(error)
    })
  }
  get f(){return this.otpForm.controls}

  submit(){
    let otp = this.otp1+''+this.otp2+''+this.otp3+''+this.otp4;
    if(otp.trim().length < 4){
      this.utils.alert('warn', 'Please enter a valid otp.');
      return;
    }
    let dataToSend = {
      country_code: this.userData.country_code,
      mobile_number: this.userData.mobile_number, 
      verification_code: otp
    }
    this.api.verifyOTP(dataToSend).subscribe(
      data=> {
        this.utils.alert('success', data['message']);
        this.utils.goto('/home/pending-profile');
         
        // if(data['response'].is_profile_created == '1'){
        //   this.utils.goto('/home/dashboard');
        // } else if(data['response'].is_mobile_number_verified == '0'){
        //   this.utils.goto('/signup-otp');
        // } else {
        //   this.utils.goto('/home/pending-profile');
        // }

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