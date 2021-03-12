import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { UtilsService } from '../../service/utils.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GooglePlaceDirective } from "ngx-google-places-autocomplete";
import { environment } from '../../../environments/environment';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
declare var $:any;
@Component({
  selector: 'app-bussiness-detail',
  templateUrl: './bussiness-detail.component.html',
  styleUrls: ['./bussiness-detail.component.css']
})
export class BussinessDetailComponent implements OnInit {
  @ViewChild("placesRef", {static: false}) placesRef : GooglePlaceDirective;
  form: FormGroup;
  submitted: boolean = false;
  user_details;

  countryList = [];
  cuisineList = [];
  selectedCuisine = [];
  stateList = [];
  cityList = [];

  // images
  rest_image = '';
  restCertificate;
  ownerID;
  ownerLicense;
  ownerProfile;
  isJoinLetterUploaded:boolean;
  isRestaurantLicenseUploaded:boolean;
  // coords
  lat = '0';
  long = '0';

  environment = environment;
  baseurl = environment.baseUrl.slice(0,-1)
  dropdownSettings:IDropdownSettings = {
    singleSelection: false,
    idField: '_id',
    textField: 'name',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 3,
    allowSearchFilter: true
  };
  constructor(
    private api: ApiService,
    public utils: UtilsService,
    private fb: FormBuilder,
  ) {
    this.getCountryList();
    this.getCuisineList();
    this.user_details = this.utils.get('crave_restaurant_data');

    this.form = fb.group({
      restaurant_name: [this.user_details ? this.user_details.restaurant_name : '', Validators.required],
      // registration_number: [this.user_details ? this.user_details.registration_number : '', Validators.required],
      email: [this.user_details ? this.user_details.email : '', Validators.required],
      // web_url: [this.user_details.restaurant_Details ? this.user_details.restaurant_Details.web_url : ''],

      restaurant_owner_first_name: [this.user_details.owner_details ? this.user_details.owner_details.restaurant_owner_first_name : '', [Validators.required, Validators.maxLength(35)]],
      restaurant_owner_last_name: [this.user_details.owner_details ? this.user_details.owner_details.restaurant_owner_last_name : '', [Validators.required, Validators.maxLength(35)]],
      restaurant_owner_email: [this.user_details.owner_details ? this.user_details.owner_details.restaurant_owner_email : '', [Validators.required, Validators.email]],

      landline_number: [this.user_details.restaurant_Details ? this.user_details.restaurant_Details.landline_number : '', Validators.required],
      location: [this.user_details ? this.user_details.location_str : '', Validators.required],
      // auth_person_designation: [this.user_details.restaurant_Details ? this.user_details.restaurant_Details.auth_person_designation : '', Validators.required],
      // restaurant_reg_number: [this.user_details.restaurant_Details ? this.user_details.restaurant_Details.restaurant_reg_number : '', Validators.required],
      mobile_number: [this.user_details ? this.user_details.country_code +'-'+ this.user_details.mobile_number : '', Validators.required],
      address: [this.user_details.restaurant_Details ? this.user_details.restaurant_Details.address : '', Validators.required],
      country: [this.user_details.restaurant_Details ? this.user_details.restaurant_Details.country : '', Validators.required],
      state: [this.user_details.restaurant_Details ? this.user_details.restaurant_Details.state : '', Validators.required],
      city: [this.user_details.restaurant_Details ? this.user_details.restaurant_Details.city : ''],
      delivery_type: [this.user_details.restaurant_Details ? this.user_details.restaurant_Details.delivery_type : '', Validators.required],
    });

      console.log("USerDetail :",this.form.value.state);
    if(this.user_details.restaurant_Details.rest_image){
      this.rest_image = this.user_details.restaurant_Details.rest_image[0]
    }

    if(this.user_details.restaurant_Details.restCertificate[0]){
      this.restCertificate = this.user_details.restaurant_Details.restCertificate[0];
    }


    if(this.user_details.restaurant_Details.city){
      this.getStateList({target:{ value: this.user_details.restaurant_Details.country }});
      this.getCityList({target:{ value: this.user_details.restaurant_Details.state }});
      this.lat = this.user_details.location.coordinates[1];
      this.long = this.user_details.location.coordinates[0];
      setTimeout(()=> {
        this.form.patchValue({
          city: this.user_details.restaurant_Details.city
        });
      },100);
    } else {
      this.form.patchValue({
        country: "",
        state: "",
        city: "",
        delivery_type: "",
      });
    }
  }

  getCountryList() {
    this.api.getCountryList().subscribe(
      data=> {
        this.countryList = data['response'];
        this.form.patchValue({
          country: 'SA'
        });
        this.getStateList({target:{ value: 'SA' }});
      },
      error=> {
        this.utils.alert('error', error.error.message);
        console.log(error);
         
      }
    );
  }
  
  getCuisineList() {
    this.api.getFoodCuisins().subscribe(
      data=> {
        this.cuisineList = data['response'];

        for(let i=0; i<this.cuisineList.length; i++){
          this.user_details.restaurant_Details.cuisine.map(element=> { 
            if(element == this.cuisineList[i]._id) this.selectedCuisine.push(this.cuisineList[i]);
          });
        }
        
      },
      error=> {
        this.utils.alert('error', error.error.message);
        console.log(error);
         
      }
    );
  }

  getStateList(event){
    let country = event.target.value;
    this.form.patchValue({
      city: ''
    });
    this.api.getCountryStates({ country: country }).subscribe(
      data=> {
        this.stateList = data['response'];
      },
      error=> {
        this.utils.alert('error', error.error.message);
        console.log(error);
         
      }
    );
  }

  getCityList(event){
    this.api.getStatesCities({ 
      country: this.form.value.country,
      state: event.target.value }
    ).subscribe(
      data=> {
        this.cityList = data['response'];
      },
      error=> {
        this.utils.alert('error', error.error.message);
        console.log(error);
         
      }
    );
  }

  get f(){ return this.form.controls; }

  ngOnInit() {
    $(document).on('click', '.remove', function(){
      $(this).closest('.form-control.file').find('input[type=file]').val('');
      $(this).closest('span').remove();
    });
  }

  fileInput(event){
    let filename = event.target.files[0].name
    console.log(filename);
    $(event.target).closest('.form-control.file').append('<span class="text-dark">'+filename+'<i class="ti-close fs-10 ml-1 remove"></i></span>')
  }

  restCert(event){
    $(event.target).closest('.form-control.file').children('.text-dark').remove();
    let filename = event.target.files[0].name
    console.log(filename);
    $(event.target).closest('.form-control.file').append('<span class="text-dark">'+filename+'<i class="ti-close fs-10 ml-1 remove"></i></span>')
    this.restCertificate = event.target.files[0];
  }

  // multi images
  ownerBusinessLicense(event){
    $(event.target).closest('.form-control.file').children('.text-dark').remove();
    let files = event.target.files;
    for(let i=0;i<files.length;i++){
      $(event.target).closest('.form-control.file').append('<span class="text-dark">'+files[i].name+'<i class="ti-close fs-10 ml-1 remove"></i></span>')
    } 
    this.isRestaurantLicenseUploaded = true;
    this.ownerLicense = event.target.files;
  }

  ownerProfilePic(event){
    $(event.target).closest('.form-control.file').children('.text-dark').remove();
    let files = event.target.files;
    for(let i=0;i<files.length;i++){
      $(event.target).closest('.form-control.file').append('<span class="text-dark">'+files[i].name+'<i class="ti-close fs-10 ml-1 remove"></i></span>')
    }
    this.isJoinLetterUploaded = true; 
    this.ownerProfile = event.target.files;
  }
  removeUploadJoiningLetter(){
    this.isJoinLetterUploaded = true;
  }

  removeUploadRestaurantLicense(){
    this.isRestaurantLicenseUploaded = true;
  }

  removeUploadedLogo(){
    this.rest_image = '';
  }

  removeUploadCertificate(){
    this.restCertificate = '';
  }

  // ownerIDProof(event){
  //   $(event.target).closest('.form-control.file').children('.text-dark').remove();
  //   let files = event.target.files;
  //   for(let i=0;i<files.length;i++){
  //     $(event.target).closest('.form-control.file').append('<span class="text-dark">'+files[i].name+'<i class="ti-close fs-10 ml-1 remove"></i></span>')
  //   } 
  //   this.ownerID = event.target.files;
  // }

  changeRestImage(event){
    $(event.target).closest('.form-control.file').children('.text-dark').remove();
    let filename = event.target.files[0].name
    console.log(filename);
    $(event.target).closest('.form-control.file').append('<span class="text-dark">'+filename+'<i class="ti-close fs-10 ml-1 remove"></i></span>');

    const reader = new FileReader();
    reader.onloadend = () => {
      $('#restaurant_img').prop('src', reader.result);
    };
    reader.readAsDataURL(event.target.files[0]);
    this.rest_image = event.target.files[0];
  }

  submit(){
    this.submitted = true;
    if(this.form.invalid) return;

    if(this.user_details.restaurant_Details.rest_image && this.user_details.restaurant_Details.rest_image.length <= 0){
      if(!this.rest_image || this.rest_image == ''){
        this.utils.alert('warn', 'Please select a restaurant logo.');
        return;
      }
  
      if(!this.restCertificate){
        this.utils.alert('warn', 'Please select a registration certificate.');
        return;
      }
    }
    if(!this.rest_image || this.rest_image == ''){
      this.utils.alert('warn', 'Please select a restaurant logo.');
      return;
    }

    if(!this.restCertificate || this.restCertificate == ''){
      this.utils.alert('warn', 'Please select a registration certificate.');
      return;
    }
    
    // if(this.user_details.owner_details.ownerID && this.user_details.owner_details.ownerID.length <= 0){
      // if(!this.ownerID || this.ownerID.length <= 0){
      //   this.utils.alert('warn', `Please provide a owner's ID proof.`);
      //   return;
      // }
  
      if((!this.ownerProfile || this.ownerProfile.length <= 0) && this.isJoinLetterUploaded){
        this.utils.alert('warn', `Please provide the company letter head.`);
        return;
      }
  
      if((!this.ownerLicense || this.ownerLicense.length <= 0)&& this.isRestaurantLicenseUploaded){
        this.utils.alert('warn', `Please provide a restaurant license.`);
        return;
      }
    // }

    if(this.selectedCuisine.length <= 0){
      this.utils.alert('warn', 'Please select atleast 1 cuisine to serve.');
      return;
    } else {
      var selectedCuisines = [];
      this.selectedCuisine.map(item => {
        selectedCuisines.push(item._id)
      });
    }
    
    let dataToSend = new FormData();
    // dataToSend.append('web_url', this.form.value.web_url);
    dataToSend.append('restaurant_owner_first_name', this.form.value.restaurant_owner_first_name);
    dataToSend.append('restaurant_owner_last_name', this.form.value.restaurant_owner_last_name);
    dataToSend.append('restaurant_owner_email', this.form.value.restaurant_owner_email);
    dataToSend.append('landline_number', this.form.value.landline_number);
    dataToSend.append('location', this.form.value.location);
    // dataToSend.append('auth_person_designation', this.form.value.auth_person_designation);
    // dataToSend.append('restaurant_reg_number', this.form.value.restaurant_reg_number);
    dataToSend.append('address', this.form.value.address);
    dataToSend.append('country', this.form.value.country);
    dataToSend.append('state', this.form.value.state);
    dataToSend.append('city', this.form.value.city);
    dataToSend.append('cuisine', selectedCuisines.toString());  
    dataToSend.append('delivery_type', this.form.value.delivery_type);  
    dataToSend.append('latitude', this.lat);
    dataToSend.append('longitude', this.long);  
    
    // images
    dataToSend.append('rest_image', this.rest_image);  
    dataToSend.append('restCertificate', this.restCertificate);  
    // if(this.ownerID && this.ownerID.length > 0){
    //   for(let i=0;i<this.ownerID.length;i++){
    //     dataToSend.append('ownerID', this.ownerID[i]);  
    //   }
    // }
    if(this.ownerLicense && this.ownerLicense.length > 0){
      for(let i=0;i<this.ownerLicense.length;i++){
        dataToSend.append('ownerLicense', this.ownerLicense[i]);  
      }
    }
    if(this.ownerProfile && this.ownerProfile.length > 0){
      for(let i=0;i<this.ownerProfile.length;i++){
        dataToSend.append('ownerProfile', this.ownerProfile[i]);  
      }
    }
    this.api.addBusinessDetails(dataToSend).subscribe(
      data=> {
        console.log("Now here :",data);
        this.utils.set('crave_restaurant_data', data['response']);
        this.utils.alert('success', data['message']);
        this.utils.goto('/home/pending-profile');
      },
      error=> {
        console.log(error);
        this.utils.alert('error', error.error.message);
      }
    );
  }

  logout(){
    this.api.logout().subscribe(
      data=> {
        this.utils.alert('success', data['message']);
        this.utils.goto('/');
        this.utils.removeData('crave_restaurant_data');
      },
      error=> {
         
        console.log(error);
      }
    );
  }

  handleAddressChange(address){
    this.lat = address.geometry.location.lat();
    this.long = address.geometry.location.lng();
    this.form.patchValue({
      location: address.formatted_address
    });
  }
}
