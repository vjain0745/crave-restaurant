import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { Router } from '@angular/router';
declare var $:any;

@Component({
  selector: 'app-bussiness-type',
  templateUrl: './bussiness-type.component.html',
  styleUrls: ['./bussiness-type.component.css']
})
export class BussinessTypeComponent implements OnInit {

  bussinessTypeForm: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder, 
    private auth: AuthenticationService, 
    private router: Router) { }

  ngOnInit() {

    this.bussinessTypeForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });

  }

  // convenience getter for easy access to form fields
  get f(){ return this.bussinessTypeForm.controls; }

  onSubmit() {
    
    this.submitted = true;

    // stop here if form is invalid
    if (this.bussinessTypeForm.invalid) {
        return;
    }
   
  }

} 
