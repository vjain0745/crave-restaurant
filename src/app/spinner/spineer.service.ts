import { Injectable } from '@angular/core';
import {BehaviorSubject , Observable} from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class SpineerService {



private count = 0;
private spinner = new BehaviorSubject<string>('');
public isLoading = new BehaviorSubject(false);



  constructor() { }
  getspinnerObserver() : Observable<string>{
    return this.spinner.asObservable();
  }
  requestStarted(){
    if(++this.count == 1){
      console.log("service start")

      this.spinner.next('start')
    }
  }

  requestEnded(){
    if(this.count == 0 || --this.count == 0 ){
      console.log("service stop")
      this.spinner.next('stop')

    }
    }
    resetSpinner(){
      this.count = 0
      this.spinner.next('stop')
  }


}
