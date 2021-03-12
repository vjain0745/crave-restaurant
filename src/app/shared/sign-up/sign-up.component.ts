import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { Router } from '@angular/router';
import { MustMatch } from '../../service/mustMatch';
import { UtilsService } from '../../service/utils.service';
import { ApiService } from '../../service/api.service';
declare var $:any;
import {environment} from 'src/environments/environment'

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  baseurl
  signupForm: FormGroup;
  submitted = false;
  countryCode = "966";
  template: any;
  constructor(
    private formBuilder: FormBuilder, 
    private auth: AuthenticationService, 
    public utils: UtilsService, 
    private api: ApiService, 
    private router: Router) {
      this.signupForm = formBuilder.group({
        full_name: ['', [Validators.required, Validators.maxLength(35)]],
        email: ['', [Validators.required, Validators.email]],
        mobile_number: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(15)]],
        restaurant_name: ['', [Validators.required, Validators.maxLength(35)]],
        restaurant_number: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirm_password: ['', Validators.required]
      }, {
        validator: MustMatch('password', 'confirm_password')
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
  // convenience getter for easy access to form fields
  get f(){      console.log("invalodii" , this.signupForm.controls)
     return this.signupForm.controls; }

  submit() {
    
    this.submitted = true;

    // stop here if form is invalid
    if (this.signupForm.invalid) {
      console.log("invalod")

        return;
    }
   console.log(this.signupForm.value)
    let terms = $('#terms').prop('checked');
    if(!terms){
      this.utils.alert('warn', 'You must agree to terms and conditions.');
      return;
    }

    let dataToSend = {
      full_name: this.signupForm.value.full_name,
      email: this.signupForm.value.email,
      country_code: this.countryCode,
      mobile_number: this.signupForm.value.mobile_number,
      restaurant_name: this.signupForm.value.restaurant_name,
      registration_number: this.signupForm.value.restaurant_number,
      password: this.signupForm.value.password,
      latitude: '0',
      longitude: '0',
      device_type: '3',
      device_token: '0',
    };
    this.api.register(dataToSend).subscribe(
      data=> {
        this.utils.alert('success', data['message']);
        this.utils.set('crave_restaurant_data', data['response']);
        this.utils.goto('/otp2');
      },
      error=> {
        this.utils.alert('error', error.error.message);
        console.log(error);
         
      }
    );
  }

  onCountryChange(event){
    this.countryCode = event.dialCode;
  }

} 
