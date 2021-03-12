import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { UtilsService } from '../../service/utils.service';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
declare var $:any;
@Component({
  selector: 'app-pending-profile',
  templateUrl: './pending-profile.component.html',
  styleUrls: ['./pending-profile.component.css']
})
export class PendingProfileComponent implements OnInit {
  user;
  constructor(
    private api: ApiService,
    public utils: UtilsService,
    private fb: FormBuilder,
  ) { }
  
  ngAfterViewInit(){
    this.user = this.utils.get('crave_restaurant_data');
  }

  ngOnInit() {
    setTimeout(function(){

      $("#owl-slider").owlCarousel({
        items: 3,
        margin:50,
        loop: true,
        autoplay: true,
        dots: false,
        nav: false,
        autoplaySpeed: 1500,
        autoplayTimeout: 2500,
        responsive:{
          0:{
            items: 1
          },
          576:{
            items: 2
          },
          768:{
            items: 3
          },
        }
      });
    },150);
  
  }

  logout(){
    this.api.logout().subscribe(
      data=> {
        this.utils.alert('success', data['message']);
        this.utils.goto('/');
        this.utils.removeData('crave_supplier_data');
      },
      error=> {
         
        console.log(error);
      }
    );
  }

  completeNstart(){
    let data = this.utils.get('crave_restaurant_data');
    if(data['is_profile_created'] == 0 ){
      this.utils.alert('warn', 'please complete your profile.');
      return;
    } 

    if(!data['is_blocked']){
      this.utils.goto("/");
      this.utils.removeData('crave_restaurant_data');
      this.utils.alert('warn', 'Your account is initially blocked due to verification process. Please wait till your account gets verified by Admin.');
      return;
    }

    this.utils.goto("/dashboard");
  }
}
