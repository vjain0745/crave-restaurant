import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { Router } from '@angular/router';
declare var $:any;

@Component({
  selector: 'app-bussiness-location',
  templateUrl: './bussiness-location.component.html',
  styleUrls: ['./bussiness-location.component.css']
})
export class BussinessLocationComponent implements OnInit {

  bussinessLocationForm: FormGroup;
  submitted= false;

  constructor(
    private formBuilder: FormBuilder, 
    private auth: AuthenticationService, 
    private router: Router) { }

  ngOnInit() {


    this.bussinessLocationForm = this.formBuilder.group({
      pincode: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      location: ['', Validators.required]
    });

  }

  get f(){return this.bussinessLocationForm.controls};

  onSubmit(){
    this.submitted= true;

    if(this.bussinessLocationForm.invalid){
      return
    }

    
  }

}
