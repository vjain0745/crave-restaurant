import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { UtilsService } from '../../service/utils.service';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
declare var $:any;
import { environment } from '../../../environments/environment';
@Component({
  selector: 'app-bank-detail',
  templateUrl: './bank-detail.component.html',
  styleUrls: ['./bank-detail.component.css']
})
export class BankDetailComponent implements OnInit {
  bankSubmitted:boolean = false;
  bankDetails: FormGroup;
  userDetails;
  baseurl = environment.baseUrl.slice(0,-1)

  bankLetter = [];
  imagestatus: number;
  constructor(
    private api: ApiService,
    public utils: UtilsService,
    private fb: FormBuilder,
  ) {
    this.bankDetails = this.fb.group({
      bank_name: ['', Validators.required],
      branch_name: ['', Validators.required],
      iban: ['', Validators.required],
      accountant_num: ['', Validators.required],
      acc_no: ['', [Validators.required, , Validators.minLength(8), Validators.maxLength(20)]],
      acc_name: ['', [Validators.required, Validators.maxLength(35)]],
    });
    this.userDetails = this.utils.get('crave_restaurant_data');
    if(this.userDetails.bank_detail){
      this.prefillBankDetails();
    }
  }

  ngOnInit() {
  }

  get b(){ console.log("j======", this.bankDetails.controls)
   return this.bankDetails.controls; }

  prefillBankDetails(){
    console.log("jjj", this.userDetails.bank_detail.bank_letter)
    this.bankDetails.patchValue({
      bank_name: this.userDetails.bank_detail.choose_bank,
      branch_name: this.userDetails.bank_detail.branch_name,
      iban: this.userDetails.bank_detail.IBAN_code,
      accountant_num: this.userDetails.bank_detail.accountant_num,
      acc_no: this.userDetails.bank_detail.account_number,
      acc_name: this.userDetails.bank_detail.account_holder_name,
    });
    if(this.userDetails.bank_detail.bank_letter != undefined ){   
       this.bankLetter.push(this.userDetails.bank_detail.bank_letter);
    }
    else{
      this.bankLetter = []
    }
    console.log("jjj", this.userDetails.bank_detail.bank_letter , this.bankLetter)

  }

  bankSubmit(){
    this.bankSubmitted = true;

    if(this.bankDetails.invalid) return;

    if(this.bankLetter.length <= 0){
      this.utils.alert('warn', 'Please upload a bank IBAN letter.');
      return;
    }

    var dataToSend = new FormData();
    dataToSend.append('bank_letter', this.bankLetter[0]);
    dataToSend.append('choose_bank', this.bankDetails.value.bank_name);
    dataToSend.append('account_number', this.bankDetails.value.acc_no);
    dataToSend.append('accountant_num', this.bankDetails.value.accountant_num);
    dataToSend.append('branch_name', this.bankDetails.value.branch_name);
    dataToSend.append('account_holder_name', this.bankDetails.value.acc_name);
    dataToSend.append('IBAN_code', this.bankDetails.value.iban);

    this.api.addBankDetails(dataToSend).subscribe(
      data=> {
        this.utils.alert('success', data['message']);
        this.utils.set('crave_restaurant_data', data['response']);
        this.utils.goto('/home/pending-profile');
      },
      error=> {
        console.log(error);
         
      }
    );
  }

  uploadBankLetter(event){
    this.bankLetter = event.target.files
    console.log(this.bankLetter[0].name)
    if( this.bankLetter){    this.imagestatus = 1
    }
    }
  removeimage(){
    this.bankLetter = []
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
}
