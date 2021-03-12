import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { UtilsService } from '../../service/utils.service';
import { ActivatedRoute } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/database';
declare var $: any;
@Component({
  selector: 'app-live-order-view',
  templateUrl: './live-order-view.component.html',
  styleUrls: ['./live-order-view.component.css']
})
export class LiveOrderViewComponent implements OnInit {
  delay = true;
  order_id;
  order;
  custom_cancel_reason = '';
  selectedRejectOrder;
  cancel_reason = '';
  lat;
  long;
  user_lat;
  user_long;
  driver_lat;
  driver_long;
  trackOrder = false;

  origin= {};
  destination= {};
  routerChanged: boolean = true;
  constructor(
    private act: ActivatedRoute,
    private api: ApiService,
    private utils: UtilsService,
    public fireDB: AngularFireDatabase
  ) {
    this.act.params.subscribe(data => {
      if (data.id) {
        this.order_id = data.id;
        this.getOrderDetails();
      }
    });
    let restaurant = this.utils.get('crave_restaurant_data');
    this.lat = restaurant.location.coordinates[1];
    this.long = restaurant.location.coordinates[0];
  }

  ngOnInit() {
    // Show the first tab by default
    // $('.tabs-stage div').hide();
    // $('.tabs-stage div:first').show();
    // $('.tabs-stage div:first div').show();
    // $('.tabs-nav li:first').addClass('tab-active');

    // // Change tab class and display content
    // $('.tabs-nav a').on('click', function (event) {
    //   event.preventDefault();
    //   $('.tabs-nav li').removeClass('tab-active');
    //   $(this).parent().addClass('tab-active');
    //   $('.tabs-stage div').hide();
    //   $($(this).attr('href')).show();
    //   $($(this).attr('href')).find('div').show();
    // });
  }

  getOrderDetails(){
    this.api.getUserOrderDetails({order_id: this.order_id}).subscribe(
      data=> {
        this.order = data['response'];
        this.user_lat = parseFloat(this.order.address['latitude']);
        this.user_long = parseFloat(this.order.address['longitude']);
        this.driver_lat = parseFloat(this.order.driver_id != undefined ? this.order.driver_id['latitude'] : 0);
        this.driver_long = parseFloat(this.order.driver_id != undefined ? this.order.driver_id['longitude'] : 0);
        this.origin = { lat: this.driver_lat, lng: this.driver_long }
        this.destination = { lat: this.user_lat, lng: this.user_long }
        if(this.order){
          setTimeout(() => {
            this.routerChanged=false;
    
          }, 800);
         }
        this.resetStatus();
      },
      error=> {
        console.log(error);
         
      }
    );
  }

  selectRejectOrder(order){
    this.preparingTime = 10;
    this.extraTime = 10;
    this.selectedRejectOrder = order;
  }

  rejectOrder(){
    if(this.cancel_reason == ''){
      this.utils.alert('warn', 'Please select a reason for order cancelation.');
      return;
    }
    if(this.cancel_reason == 'other' && this.custom_cancel_reason.trim() == ''){
      this.utils.alert('warn', 'Please enter a reason for order cancelation.');
      return;
    }
    // if(this.order_details?.scheduled_date > this.prev_day){
    //   this.utils.alert('warn', 'Your time was out to cancel the order.');
    //   return;
    // }

    this.api.changeOrderStatus({ 
      order_id: this.selectedRejectOrder._id, 
      status: 6,
      reason: this.cancel_reason == 'other' ? this.custom_cancel_reason : this.cancel_reason
    }).subscribe(
      data=> {
        $('#reason').modal('hide');
        this.utils.alert('success',data['message']);
        this.utils.goto('/orders/live-orders');
      },
      error=> {
        this.utils.alert('success',error.error.message);
        console.log(error);
         
      }
    );
  }

  preparingTime = 10;
  changeTime(type){
    if(type == 'dec'){
      if(this.preparingTime == 0) return;
      this.preparingTime--;
    } else {
      this.preparingTime++;
    }
  }

  extraTime = 10;
  changeExtraTime(type){
    if(type == 'dec'){
      if(this.extraTime == 0) return;
      this.extraTime--;
    } else {
      this.extraTime++;
    }
  }

  resetStatus(){
    $(".tab-active").removeClass('tab-active');
    if(this.order.order_status == 0){
      $('.pending-tab').addClass('tab-active');
    }
    if(this.order.order_status == 1 || this.order.order_status == 2 || this.order.order_status == 5){
      $('.preparing-tab').addClass('tab-active');
    } 
    if(this.order.order_status == 3){
      $('.ready-tab').addClass('tab-active');
    } 
    if(this.order.order_status == 4 || this.order.order_status == 7){
      $('.ongoing-tab').addClass('tab-active');
    } 
  }

  acceptOrder(){
    this.api.changeOrderStatus({ 
      order_id: this.selectedRejectOrder._id, 
      status: 1,
      prepration_time: this.preparingTime
    }).subscribe(
      data=> {
        this.utils.alert('success',data['message']);
        this.getOrderDetails();
      },
      error=> {
        this.utils.alert('success',error.error.message);
        console.log(error);
         
      }
    );
  }

  markDelay(){
    this.api.changeOrderStatus({ 
      order_id: this.selectedRejectOrder._id, 
      status: 5,
      prepration_time: this.selectedRejectOrder.prepration_time ? +this.selectedRejectOrder.prepration_time + +this.extraTime : +this.preparingTime + +this.extraTime
    }).subscribe(
      data=> {
        this.utils.alert('success',data['message']);
        this.getOrderDetails();
      },
      error=> {
        this.utils.alert('success',error.error.message);
        console.log(error);
         
      }
    );
  }

  markReady(order){
    this.api.changeOrderStatus({ 
      order_id: order._id, 
      status: 3,
    }).subscribe(
      data=> {
        this.utils.alert('success',data['message']);
        this.getOrderDetails();
      },
      error=> {
        this.utils.alert('success',error.error.message);
        console.log(error);
         
      }
    );
  }

  openTracking(){
    this.trackOrder = !this.trackOrder;
    let driver_ref = 'drivers/'+this.order.driver_id._id;

    this.fireDB.list(driver_ref).valueChanges().subscribe(
      data=> {
        this.driver_lat = data[1];
        this.driver_long = data[2];
        this.origin = { lat: parseFloat(this.driver_lat), lng: parseFloat(this.driver_long) }
        this.destination = { lat: this.user_lat, lng: this.user_long }
      }, error=> {
        console.log(error);
         
      }
    );
    //  
  }

  getPaymentMode(tag){
    return this.utils.paymentMode(tag);
  }

  getOrderStatus(tag){
    return this.utils.orderStatus(tag);
  }
}
