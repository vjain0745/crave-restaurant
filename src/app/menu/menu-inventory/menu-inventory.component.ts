import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../service/api.service';
import { UtilsService } from '../../service/utils.service';
import { environment } from '../../../environments/environment';
declare var $;
@Component({
  selector: 'app-menu-inventory',
  templateUrl: './menu-inventory.component.html',
  styleUrls: ['./menu-inventory.component.css']
})
export class MenuInventoryComponent implements OnInit {
  products = [];
  environment = environment;
  constructor(
    private utils: UtilsService,
    private api: ApiService,
  ) { }

  ngOnInit() {

    	$(document).ready(function(){
    $('#qty_input').prop('disabled', true);
    $('#plus-btn').click(function(){
    	$('#qty_input').val(parseInt($('#qty_input').val()) + 1 );
    	    });
        $('#minus-btn').click(function(){
    	$('#qty_input').val(parseInt($('#qty_input').val()) - 1 );
    	if ($('#qty_input').val() == 0) {
			$('#qty_input').val(1);
		}

    	    });
 });
    this.getInventoryData();
  }

  getInventoryData(){
    this.api.getInventoryData().subscribe(
      data=> {
        this.products = data['response'];
      },
      error=> {
        this.utils.alert('error', error.error.message);
         
      }
    );
  }

  mark(product) {
    this.api.changeIngredientStatus({
      ingredient_id: product._id,
      status: product.marked_to_serve == 0 ? 1 : 0
    }).subscribe(
      data=> {
        this.utils.alert('success', data['message']);
      },
      error=> {
        console.log(error);
         
      }
    );
  }

  selectedIngredient;
  selectIngredient(prod){
    $('#qty_input').val(prod.quantity);
    this.selectedIngredient = prod;
  }

  setQuantity(){
    let qty = $('#qty_input').val();
    let dataToSend = {
      prod_id: this.selectedIngredient._id,
      qty: qty
    };
    this.api.setIngredientQuantity(dataToSend).subscribe(
      data=> {
        this.utils.alert('success', data['message']);
        this.getInventoryData();
      },
      error=> {
        console.log(error);
         
      }
    );
  }

  changeReminder(event, prod){
    this.api.setQuantityLimit({
      prod_id: prod._id,
      limit: event.target.value
    }).subscribe(
      data=> {
        this.utils.alert('success', data['message']);
        this.getInventoryData();
      },
      error=> {
        console.log(error);
         
      }
    );
  }
}
