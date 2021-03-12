import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
declare var navigator;
declare var google;
@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  private selectedDishes = new BehaviorSubject('default message');
  dishList = this.selectedDishes.asObservable();

  private cartDishes = new BehaviorSubject('default message');
  cartList = this.cartDishes.asObservable();

  constructor(
    private toast: ToastrService,
    private router: Router
  ) { }

  /*storage*/
  set(key, data) {
    window.localStorage.setItem(key, JSON.stringify(data));
  }

  get(key) {
    return JSON.parse(window.localStorage.getItem(key));
  }

  update(key, dataKey, data) {
    let BData = this.get(key);
    this.removeData(key);
    BData[dataKey] = data;
    window.localStorage.setItem(key, JSON.stringify(BData));
  }

  removeData(key) {
    window.localStorage.removeItem(key);
  }

  clear() {
    window.localStorage.clear();
  }

  isDataExist(key) {
    let data = window.localStorage.getItem(key);
    if (data) return true;
    return false;
  }

  /*toaster*/
  alert(type, msg) {
    switch (type) {
      case "success":
        this.toast.success(msg, 'SUCCESS');
        break;
      case "info":
        this.toast.info(msg, 'INFORMATION');
        break;
      case "error":
        this.toast.error(msg, 'ERROR');
        break;
      case "warn":
        this.toast.warning(msg, 'WARNING');
        break;
      default:
        this.toast.success(msg, 'SUCCESS');
        break;
    }
  }

  /*location service*/
  setLocation(callback) {
    navigator.geolocation.getCurrentPosition((data) => {
      this.getAddressFromMarker(data['coords']['latitude'], data['coords']['longitude'], callback);
    }, error=> {
      console.log(error);
    }, {enableHighAccuracy:true, maximumAge:0, timeout:10000});
  }

  getAddressFromMarker(lat, lng, callback) {
    var that = this;
    // var loc_str = that.get('bringness_data').location.address_string;
    // if(loc_str != "")
    // callback();
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode
      ({
        latLng: { lat: lat, lng: lng }
      },
        function (results, status) {
          // that.update('bringness_data', 'location', {
          //   address_string: results.length != 0 ? results[2].formatted_address : '',
          //   lat: lat,
          //   long: lng
          // });
          callback(results[0].formatted_address, results[2].address_components, { lat: lat, lng: lng });
        }
      );
  }

  scrollToTop() {
    window.scrollTo(0, 0);
  }

  /* loading */
  showPageLoading() {
    document.getElementById('preloader').style.display = "block";
  }

  hidePageLoading() {
    document.getElementById('preloader').style.display = "none";
  }

  // router
  goto(route) {
    this.router.navigate([route]);
  }

  gotoWithData(route, data) {
    this.router.navigate([route, data]);
  }

  formatDate(date) {
    let data = new Date(date);
    let year = data.getFullYear();
    let month = data.getMonth() + 1 > 9 ? data.getMonth() + 1 : "0" + (data.getMonth() + 1);
    let day = data.getDate() > 9 ? data.getDate() : "0" + (data.getDate());
    return year + '-' + month + "-" + day;
  }

  saveDishes(image) {
    this.selectedDishes.next(image);
  }

  addDisheToCart(image) {
    this.cartDishes.next(image);
  }

  // convert base64 image data to file
  dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  }

  // image file to base64
  fileToBase64(file, callback) {
    var reader = new FileReader();
    reader.onloadend = function () {
      callback(reader.result);
    }
    reader.readAsDataURL(file);
  }

  // getUnique(arr, key) {
  //   var uniqueArray = [];
  //   var unique = [...new Set(arr.map(item => item[key]))];
  //   unique.map(item => {
  //     let element = arr.filter(it => { return it[key] == item });
  //     uniqueArray.push(element[0]);
  //   });
  //   return uniqueArray;
  // }

  restrictSpaceAtFirst(e){
    if (e.which === 32 && !e.target.value.length)
      e.preventDefault();
  }

  paymentMode(code) {
    let cod = parseInt(code);
    switch (cod) {
      case 0:
        return 'COD';
        break;
      case 1:
        return 'Debit/Credit Cart';
        break;
      case 2:
        return 'Internet Banking';
        break;
      case 3:
        return 'Wallet';
        break;
      case 4:
        return 'Other';
        break;
      default: 
        return 'Other'
    }
  }

  orderStatus(code) {
    let cod = parseInt(code);
    switch (cod) {
      case 0:
        return 'Pending';
        break;
      case 1:
        return 'Accepted';
        break;
      case 2:
        return 'Driver Assigned';
        break;
      case 3:
        return 'Ready';
        break;
      case 4:
        return 'Picked';
        break;
      case 5:
        return 'Delayed';
        break;
      case 6:
        return 'Rejected By Restaurant';
        break;
      case 7:
        return 'Delivered';
        break;
      case 8:
        return 'Rejected By User';
        break;
      case 9:
        return 'Onroute to Restaurant';
        break;
      case 10:
        return 'Arrived at Restaurant';
        break;
      case 11:
        return 'Onroute to Delivery Location';
        break;
      case 12:
        return 'Arrived at Delivery Location';
        break;
        case 13:
        return 'Rejected By Admin';
        break;
      default:
        return 'Pending';
    }
  }
}
