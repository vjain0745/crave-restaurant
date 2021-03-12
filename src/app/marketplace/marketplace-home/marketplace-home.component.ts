import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { UtilsService } from '../../service/utils.service';
import { environment } from '../../../environments/environment';
import { GooglePlaceDirective } from "ngx-google-places-autocomplete";
import { Router } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
declare var google;
@Component({
  selector: 'app-marketplace-home',
  templateUrl: './marketplace-home.component.html',
  styleUrls: ['./marketplace-home.component.css']
})
export class MarketplaceHomeComponent implements OnInit {
  @ViewChild("placesRef", {static: false}) placesRef : GooglePlaceDirective;
  userDetails = "";
  suppliers = [];
  environment = environment;
  locationSearch;
  searchProduct = "";
  offers = [];

  lat = "";
  long = "";
  categories = [];
  selectedCategories = [];
  offerSuplierList:any = [];
  dropdownSettings:IDropdownSettings = {
    singleSelection: false,
    idField: '_id',
    textField: 'name',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 3,
    allowSearchFilter: true
  };
  routerChanged: boolean = true;
  constructor(
    private utils: UtilsService,
    private api: ApiService,
    private router: Router,
  ) {
    this.userDetails = this.utils.get('crave_restaurant_data');
  }

  ngOnInit() {
    this.utils.removeData('supplier_details');
    // this.lat = this.userDetails['location']['coordinates'][1],
    // this.long = this.userDetails['location']['coordinates'][0]
    this.getSuppliers();
    this.utils.scrollToTop();
    this.getOfferList();
    this.getProductCategoryList();
  }

  getProductCategoryList(){
    this.api.getProductCategoryList().subscribe(
      data=> {
        this.categories = data['response'];
      },
      error=> {
        console.log(error);
        debugger
      }
    );
  }

  getOfferList(){
   // getOffers()
    
    this.api.getSupliersOffer().subscribe(
      data=> {
        console.log("This.offers:",data['response']);
        this.offers = data['response'];
      },
      error=> {
        console.log(error);
         
      }
    );
  }

  locationChange(event){
    if(event.target.value.trim() == ""){
      this.lat = "";
      this.long = "";
      this.getSuppliers();

    }
  }

  getSuppliers(){
    var payload;
    if(this.lat == "" && this.long == ""){
      payload = {}
    } else {
      payload = {
        lat: this.lat,
        long: this.long
      }
    }
    this.api.getSupplierList(payload).subscribe(
      data=> {
        this.suppliers = data['response'];

    if(this.suppliers){
                    
        this.routerChanged=false;

         }
      },
      error=> {
        console.log(error);
         
      }
    );
  }

  markFavorite(sup) {
    this.api.markSupplierFav({
      supplier_id: sup._id,
      is_fav: sup.is_fav == '1' ? 0 : 1
    }).subscribe(
      data=> {
        this.utils.alert('success', data['message']);
        this.getSuppliers();
      },
      error=> {
        this.utils.alert('error', error.error.message);
         
      }
    )
  }

  handleAddressChange(address){
    this.lat = address.geometry.location.lat();
    this.long = address.geometry.location.lng();
    this.getSuppliers();
  }

  openOfferedSupplier(supplier_id,offer){
    console.log("IsSupplier :",offer);
    let supplier = this.suppliers.find(item=> {
      return item._id == supplier_id;
    });
    this.openOfferDetails(offer);
    this.openSupplierDetails(supplier);
  }

  openOfferDetails(haveOffer){
    this.utils.set('Offer_details', haveOffer);
  }

  openSupplierDetails(sup){
    console.log("123",sup)
    this.utils.set('supplier_details', sup);
    this.router.navigateByUrl('/marketplace/marketplace-store-detail');
  }

  searchProd(event){
    if(event == ""){
      this.getSuppliers();
    } else {
      if(event.length > 3){
        this.api.searchSupplierByProduct({ 
          string: event.toLowerCase().trim(),
          lat: this.lat,
          long: this.long 
        }).subscribe(
          data=> {
            this.suppliers = data['response'];
          },
          error=> {
            console.log(error);
             
          }
        );
      }
    }
  }

  searchCatogory(){
    let selectedItem = [];
    this.selectedCategories.map(item=> {
      selectedItem.push(item._id);
    })
    if(selectedItem.length <= 0){
      this.getSuppliers();
    } else {
       
      this.api.searchSupplierByCategory({ 
        cat_id: selectedItem,
      }).subscribe(
        data=> {
          this.suppliers = data['response'];
           
        },
        error=> {
          console.log(error);
           
        }
      );
    }
  }
}
