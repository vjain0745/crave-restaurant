import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { UtilsService } from '../../service/utils.service';
import { environment } from '../../../environments/environment';
import { Router, ActivatedRoute } from '@angular/router';
declare var $;
@Component({
  selector: 'app-combo-view',
  templateUrl: './combo-view.component.html',
  styleUrls: ['./combo-view.component.css']
})
export class ComboViewComponent implements OnInit {
  environment = environment;
  combo_id;
  comboDetails;
  constructor(
    private utils: UtilsService,
    private api: ApiService,
    private act: ActivatedRoute,
  ) {
    this.act.params.subscribe(data=> {
      if(data.id){ 
        this.combo_id = data.id;
        this.getComboDetails();
      }
    });
  }

  getComboDetails(){
    this.api.getComboDetails({ combo_id: this.combo_id }).subscribe(
      data=> {
        this.comboDetails = data['response'];
      },
      error=> {
        console.log(error);
         
      },
    );
  }

  ngOnInit() {
    this.utils.scrollToTop();
  }

}
