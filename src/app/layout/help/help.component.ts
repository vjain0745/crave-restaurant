import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { UtilsService } from '../../service/utils.service';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
declare var $:any;
@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.css']
})
export class HelpComponent implements OnInit {

  constructor(
    private api: ApiService,
    public utils: UtilsService,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
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
}
