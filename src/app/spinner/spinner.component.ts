import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { SpineerService } from './spineer.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent implements OnInit {
  showspinner: boolean = false;
  loading: boolean;

  constructor(private loaderService: SpineerService) {

    this.loaderService.isLoading.subscribe((v) => { 
    
    this.loading = false;
  });

}


ngOnInit() {
}

 

}
