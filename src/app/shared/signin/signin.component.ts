import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { UtilsService } from '../../service/utils.service';
import {environment} from 'src/environments/environment'
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
declare var $:any;
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  submitted:boolean = false;
  loginFrom: FormGroup;
  baseurl
  template
  countryCode = "966";
  onlyCountriesShow = ['ar','au','bh','br','ca','cn','fr','de','in','id','it','jp','kr','kw','mx','om','qa','ru','sa','za','tr','ae','gb','US']
  routerChanged: boolean = true;

  constructor(
    private api: ApiService,
    private utils: UtilsService,
    private fb: FormBuilder,
  ) {
    this.loginFrom = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      mobile_number: [undefined, [Validators.required]],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.baseurl = environment.baseUrl.slice(0,-1)
    this.templatee()
    $('.langues-dropdown li').click(function(){
      var aaa = this.innerHTML;
      $('.langues-dropdown #langues').html(aaa);
    });

    $('.form-group .showHidePass').on('click', function(){
      $(this).toggleClass('active');
      if($(this).hasClass('active')){
        $(this).prev('.password').prop('type', 'text');
      }else{
        $(this).prev('.password').prop('type', 'password');
      }
    });
  }

  get f(){ return this.loginFrom.controls; }
templatee(){
  this.api.getTemplate().subscribe((data)=>{
    console.log(data)
    this.template = data
    if(this.template){
      setTimeout(() => {
        this.routerChanged=false;

      }, 1000);
     }
 },error =>{
    console.log(error)
  })
}
  submit(){
    this.submitted = true;
    if (this.loginFrom.invalid) {
      return;
    }
    let dataToSend = {
      mobile_number: this.loginFrom.value.mobile_number.number,
      email: this.loginFrom.value.email,
      country_code: this.countryCode,
      password: this.loginFrom.value.password,
      latitude: "0",
      longitude: "0",
      device_token: "0"
    }

    this.api.login(dataToSend).subscribe(
      data=> {
        this.utils.set('crave_restaurant_data', data['response']);

        if(data['response'].is_mobile_number_verified == '0'){
          this.utils.alert('success', data['message']);
          this.utils.goto('/otp2');
        } else if(data['response'].is_profile_created == '0'){
          this.utils.alert('success', 'Please complete your profile.');
          this.utils.goto('/home/pending-profile');
        } else {
          this.utils.alert('success', data['message']);
          this.utils.goto('/dashboard');
        }
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
