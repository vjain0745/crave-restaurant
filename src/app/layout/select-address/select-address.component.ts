import { Component, OnInit } from '@angular/core';
import { UtilsService } from '../../service/utils.service';
import { ApiService } from '../../service/api.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
declare var $:any;
@Component({
  selector: 'app-select-address',
  templateUrl: './select-address.component.html',
  styleUrls: ['./select-address.component.css']
})
export class SelectAddressComponent implements OnInit {
  addressList = [];
  constructor(
    public utils: UtilsService,
    private api: ApiService,
    private fb: FormBuilder,
    private router: Router,
  ) {
    this.getAddresses();
  }

  ngOnInit() {
  }

  getAddresses(){
    this.api.getAddressList().subscribe(
      data=> {
        this.addressList = data['response'];
        setTimeout(()=> {
          this.addressList.map(item=> {
            if(item.is_default) $('input:radio[value="'+item._id+'"]')[0].checked = true;
          });
        }, 100);
      },
      error=> {
        console.log(error);
         
      }
    );
  }

  selectedAddress;
  selectAddress(address){
    this.selectedAddress = address;
  }

  deleteAddress(){
    this.api.deleteAddress({ address_id: this.selectedAddress._id }).subscribe(
      data=> {
        this.utils.alert('success', data['message']);
        this.getAddresses();
      },
      error=> {
        console.log(error);
         
      }
    );
  }

  setDefault(){
    let address = $('input:radio[id=address]:checked').val();
    this.api.setDefaultAddress({ address_id: address }).subscribe(
      data=> {
        this.utils.alert('success', data['message']);
        this.getAddresses();
      },
      error=> {
        console.log(error);
         
      }
    );
  }

  selectEditAddress(address){
    this.router.navigate(['home/add-address', {id: address._id}]);
  }
}
