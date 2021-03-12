import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { UtilsService } from 'src/app/service/utils.service';
import { DateCompair } from '../../service/dateComapair';
import * as moment from 'moment';
declare var $: any;
@Component({
  selector: 'app-add-discount',
  templateUrl: './add-discount.component.html',
  styleUrls: ['./add-discount.component.css']
})
export class AddDiscountComponent implements OnInit {

  discountForm: FormGroup;
  isSubmitted: boolean;

  constructor(private fb: FormBuilder, private router: Router, private utils: UtilsService, private api: ApiService) { }

  ngOnInit() {
    this.valiadateDiscountForm();
  }
  offerBanner;
  // single = new Array();
  mySrc;
  offer_image;
  minDate = moment(new Date()).format('YYYY-MM-DD');
  maxDate = moment(new Date()).format('YYYY-MM-DD');

  uploadFile(event) {
    let file: any = event.target.files[0];
    let allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;

    if (!allowedExtensions.exec(file.name)) {
      this.utils.alert('error', 'Please upload file having extensions .jpeg/.jpg/.png only.')
      return false;
    }
    this.offerBanner = event.target.files;
    console.log("Its here");

    let uploadFile = event.target.files;
    this.offer_image = uploadFile[0];
    if (uploadFile) {
      for (let file of uploadFile) {
        let singleReader = new FileReader();
        singleReader.onload = (e: any) => {
          this.mySrc = e.target.result;    //  Valid For both single and multiple image(by chaging array index)
          return this.mySrc;
        };
        singleReader.readAsDataURL(file);
      }
    }
  }

  closeMe(event) {
    $(event.target).closest('.img-box').remove();
    this.offerBanner = false;
    $('#file').val("");
  }

  valiadateDiscountForm() {
    this.discountForm = this.fb.group({
      title: ['', [Validators.required]],
      to: ['', [Validators.required]],
      from: ['', [Validators.required]],
      discount: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
    });
  }

  get discount() { return this.discountForm.controls; }

  resetForm() {
    this.offer_image = undefined;
    this.discountForm.reset();
    $('#file').val("");
  };

  sendFromDate(){
    console.log("Value : ",this.discountForm.value.from);
    this.maxDate = moment(new Date(this.discountForm.value.from)).format('YYYY-MM-DD')
  }

  submitDiscountForm() {
    this.isSubmitted = true;

    if (this.discountForm.valid) {
      console.log("Form is valid");
      if (this.offer_image == undefined) {
        this.utils.alert('warn', 'Please select a offer image.');
        return
      } else {
        this.isSubmitted = false;
        let dataToSend = new FormData();
        dataToSend.append('offer_type', '2');
        console.log("Discount Data :", Date.parse(this.discountForm.value.to));
        dataToSend.append('title', this.discountForm.value.title);
        dataToSend.append('upload_banner_image', this.offer_image);
        dataToSend.append('valid_to', Date.parse(this.discountForm.value.to).toString());
        dataToSend.append('valid_from', Date.parse(this.discountForm.value.from).toString());
        dataToSend.append('percentage_discount', this.discountForm.value.discount);
        console.log("Discount Data :", typeof this.discountForm.value.to);
        
        
        this.api.createOffer(dataToSend).subscribe((res:any)=>{
          console.log("Res :",res);
          this.utils.alert('success',res['message']);
          this.router.navigateByUrl('/home/discounts');
        },(err:any)=>{
        this.isSubmitted = true;
          this.utils.alert('error',err['error'].message);
        });
      }

    }

  }

}
