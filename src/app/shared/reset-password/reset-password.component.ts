import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { Router } from '@angular/router';
import { MustMatch } from 'src/app/service/mustMatch';
declare var $:any;
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  resetForm: FormGroup;
  submitted= false;

  constructor(
    private formBuilder: FormBuilder, 
    private auth: AuthenticationService, 
    private router: Router) { }

  ngOnInit() {

    $('.form-group .showHidePass').on('click', function(){
      $(this).toggleClass('active');
      if($(this).hasClass('active')){
        $(this).prev('.password').prop('type', 'text');
      }else{
        $(this).prev('.password').prop('type', 'password');
      }
    });

    this.resetForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(8)]],
      rePassword: ['', [Validators.required, Validators.minLength(8)]],
      otp: ['', [Validators.required, Validators.minLength(4)]]
    },{
      validators: MustMatch('password', 'rePassword')
    });
  }

  get f(){return this.resetForm.controls}

  onSubmit(){
    this.submitted=true;

    if(this.resetForm.invalid){
      return
    }
  }

}
