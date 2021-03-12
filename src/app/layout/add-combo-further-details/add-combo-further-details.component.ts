import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { UtilsService } from '../../service/utils.service';
import { environment } from '../../../environments/environment';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
declare var $;
@Component({
  selector: 'app-add-combo-further-details',
  templateUrl: './add-combo-further-details.component.html',
  styleUrls: ['./add-combo-further-details.component.css']
})
export class AddComboFurtherDetailsComponent implements OnInit {
  selectedDishes;
  environment = environment;
  addDishForm : FormGroup;
  submitted = false;

  edit:boolean = false;
  combo_id;
  comboDetails;
  constructor(
    private utils: UtilsService,
    private api: ApiService,
    private fb: FormBuilder,
  ) {
    this.utils.dishList.subscribe(
      data=> {
        if(data == "default message") return;
        this.selectedDishes = data['selectedDishes'];
        this.combo_id = data['combo_id'];
        if(this.combo_id != undefined){
          this.getComboDetails();
          this.edit = true;
        }
      }
    );

    this.addDishForm = fb.group({
      combo_name: ['', Validators.required],
      combo_price: ['', Validators.required],
      tax_price: [''],
      final_price: ['0'],
      max_order_limit: ['', [Validators.required, Validators.min(1)]],
    });
  }

  ngOnInit() {
    this.utils.scrollToTop();
  }

  getComboDetails(){
    this.api.getComboDetails({ combo_id: this.combo_id }).subscribe(
      data=> {
        this.comboDetails = data['response'];
        this.addDishForm.patchValue({
          combo_name: this.comboDetails.combo_name,
          combo_price: this.comboDetails.combo_price,
          tax_price: this.comboDetails.tax_price,
          final_price: this.comboDetails.final_price,
          max_order_limit: this.comboDetails.max_order_limit,
        });
      },
      error=> {
        console.log(error);
         
      },
    );
  }

  updateFinalPrice(event){
    let value = event.target.value;
    this.addDishForm.patchValue({ final_price: Number(this.addDishForm.value.final_price) + Number(value) });
  }

  get f(){ return this.addDishForm.controls; }

  submit(){
    this.submitted = true;

    if(this.addDishForm.invalid) return;
    
    if(!this.selectedDishes || this.selectedDishes.length <= 0){
      this.utils.alert('warn', 'Please select more than 1 dishes, to create a combo.');
      return;
    }

    let dishes = [];
    this.selectedDishes.map(item=> {
      dishes.push({
        dish_id: item._id,
        dish_qty: item.quantity,
        dish_varient: item.selectedVarient._id
      });
    });

    let dataToSend = {
      combo_name: this.addDishForm.value.combo_name,
      combo_price: this.addDishForm.value.combo_price,
      tax_price: this.addDishForm.value.tax_price,
      final_price: this.addDishForm.value.final_price,
      dish_list: dishes,
      max_order_limit: this.addDishForm.value.max_order_limit
    }

    if(this.edit){
      dataToSend['combo_id'] = this.combo_id;
    }

     
    this.api.createCombo(dataToSend).subscribe(
      data=> {
        this.utils.alert('success', data['message']);
        this.utils.goto('/menu/menu-combo');
      },
      error=> {
        console.log(error);
         
      }
    );
  }

}
