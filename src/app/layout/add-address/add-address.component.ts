import { Component, OnInit } from '@angular/core';
import { UtilsService } from '../../service/utils.service';
import { ApiService } from '../../service/api.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
declare var $:any;
@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.component.html',
  styleUrls: ['./add-address.component.css']
})
export class AddAddressComponent implements OnInit {
  lat;
  location_str;
  long;

  addressForm;
  submitted = false;
  selectedAddressID;
  selectedAddress;
  constructor(
    public utils: UtilsService,
    private api: ApiService,
    private fb: FormBuilder,
    private act: ActivatedRoute,
  ) {
    this.addressForm = fb.group({
      name: ['', Validators.required],
      mobile: ['', Validators.required],
      house_no: ['', Validators.required],
      location_str: ['', Validators.required],
      locality: ['', Validators.required],
      city: ['', Validators.required],
      district: ['', Validators.required],
      pin_code: ['', Validators.required],
      address_type: ['Home'],
    });
    this.act.params.subscribe(data=> {
      if(data.id) {
        this.selectedAddressID = data.id;
        this.prefillData();
      } else {
        this.getCurrentLocation();
      }
    })
  }
  
  ngOnInit() {
    $('.add-tags').slideToggle();
  }

  prefillData(){
    this.api.getAddressDetails({ address_id: this.selectedAddressID }).subscribe(
      data=> {
        this.selectedAddress = data['response'];
        this.addressForm.patchValue({
          name: this.selectedAddress.name,
          mobile: this.selectedAddress.mobile_number,
          house_no: this.selectedAddress.house_no,
          location_str: this.selectedAddress.address_title,
          locality: this.selectedAddress.street,
          city: this.selectedAddress.city,
          district: this.selectedAddress.district,
          pin_code: this.selectedAddress.postal_code,
          address_type: this.selectedAddress.address_type,
        });
        this.lat = parseFloat(this.selectedAddress.latitude);
        this.long = parseFloat(this.selectedAddress.longitude);
        $('#address').prop('checked', this.selectedAddress.is_default);
        this.getAddressStringFromCoords(this.lat, this.long);
      },
      error=> {
        console.log(error);
         
      }
    );
  }
  
  getCurrentLocation(){
    window.navigator.geolocation.getCurrentPosition(data=> {
      this.lat = data.coords.latitude;
      this.long = data.coords.longitude;
      this.getAddressStringFromCoords(this.lat, this.long);
    });
  }

  get f(){ return this.addressForm.controls; }

  getAddressStringFromCoords(lat, long){
    this.utils.getAddressFromMarker(lat, long, (address, locality, coords)=> {
      console.log(address)
      this.addressForm.patchValue({
        location_str: address
      });
    });
  }

  getMarkerLocation(event){
    this.lat = event.coords.lat;
    this.long = event.coords.lng;
    this.getAddressStringFromCoords(this.lat, this.long);
  }

  mapClicked(event){
    this.lat = event.coords.lat;
    this.long = event.coords.lng;
    this.getAddressStringFromCoords(this.lat, this.long);
  }

  handleAddressChange(address){
    console.log(address.geometry , address.geometry.location.lat())
    this.lat = address.geometry.location.lat();
    this.long = address.geometry.location.lng();
    this.addressForm.patchValue({
      location_str: address.formatted_address
    });
  }

  submit(){
    this.submitted = true;

    if(this.addressForm.invalid) return;

    let dataToSend = {
      name: this.addressForm.value.name,
      mobile: this.addressForm.value.mobile,
      house_no: this.addressForm.value.house_no,
      location_str: this.addressForm.value.location_str,
      locality: this.addressForm.value.locality,
      city: this.addressForm.value.city,
      district: this.addressForm.value.district,
      pin_code: this.addressForm.value.pin_code,
      is_default: $('#address').prop('checked'),
      address_type: this.addressForm.value.address_type,
      latitude: this.lat,
      longitude: this.long,
    };

    if(this.selectedAddressID != undefined){
      dataToSend['address_id'] = this.selectedAddressID;
    }
    this.api.saveAddress(dataToSend).subscribe(
      data=> {
        this.utils.alert('success', data['message']);
        history.back();
      },
      error=> {
        console.log(error);
         
      }
    );
  }
}
