import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { UtilsService } from '../../service/utils.service';
import { environment } from '../../../environments/environment';
import { GooglePlaceDirective } from "ngx-google-places-autocomplete";
import { Router, ActivatedRoute } from '@angular/router';
declare var $;
@Component({
  selector: 'app-dish-view',
  templateUrl: './dish-view.component.html',
  styleUrls: ['./dish-view.component.css']
})
export class DishViewComponent implements OnInit {
  environment = environment;
  dish_id;
  dishDetails;
  datatosend: any;
  constructor(
    private utils: UtilsService,
    private api: ApiService,
    private act: ActivatedRoute,
  ) {
    this.act.params.subscribe(data=> {
      if(data.id){ 
        this.dish_id = data.id;
        this.getDishDetails()
      }
    });
  }

  ngOnInit() {
    $('input.example').on('change', function() {
      $('input.example').not(this).prop('checked', false);  
  });
  }

  getDishDetails(){
    this.api.getDishDetails({ dish_id: this.dish_id }).subscribe(
      data=> {
        this.dishDetails = data['response'];
        console.log(this.dishDetails)
        if( this.dishDetails.provide_cutlery == 'yes'){
          $('#chargeable_cutlery').prop('checked', true);
        }
        else{
          $('#cutlery').prop('checked', true);
        }
      },
      error=> {
        console.log(error);
         
      }
    );
  }

  submit(){
    if($('#chargeable_cutlery').prop('checked')){
      this.dishDetails.provide_cutlery = 'yes'
    }
    else if($('#cutlery').prop('checked')){
      this.dishDetails.provide_cutlery = 'no'

    }
    console.log(  this.dishDetails.provide_cutlery ,  this.dishDetails)
    this.datatosend = this.dishDetails

    console.log(this.datatosend)
    // this.api.addFood(this.datatosend).subscribe(
    //   data=> {
    //     this.utils.alert('success', data['message']);
    //       this.utils.goto('/menu/menu-my-listings');
    //     }
      
      
    // );
  }
  
}
