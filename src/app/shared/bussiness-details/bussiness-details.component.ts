import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { Router } from '@angular/router';
declare var $:any;

@Component({
  selector: 'app-bussiness-details',
  templateUrl: './bussiness-details.component.html',
  styleUrls: ['./bussiness-details.component.css']
})
export class BussinessDetailsComponent implements OnInit {

  bussinessLocationForm: FormGroup;
  submitted= false;

  constructor(
    private formBuilder: FormBuilder, 
    private auth: AuthenticationService, 
    private router: Router) { }

  ngOnInit() {


    this.bussinessLocationForm = this.formBuilder.group({
      bussinessName: ['', Validators.required],
      taxId: '',
      tinId: '',
      signature: '',
      pincode: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      location: ['', Validators.required]
    });

  }

  fileInput(event){
    let filename = event.target.files[0].name
    console.log(filename);
    $(event.target).closest('.form-control.file').append('<span class="text-dark">'+filename+'<i class="ti-close fs-10 ml-1 remove"></i></span>')
  }

  get f(){return this.bussinessLocationForm.controls};

  onSubmit(){
    this.submitted= true;

    if(this.bussinessLocationForm.invalid){
      return
    }

    
  }

}
