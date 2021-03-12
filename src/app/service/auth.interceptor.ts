import { HttpEvent, HttpHeaders, HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Injectable } from "@angular/core"
import { environment } from '../../environments/environment';
import { catchError, tap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { finalize } from "rxjs/operators";
import { SpineerService } from '../spinner/spineer.service';
// import { LoaderService } from './loader.service';
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    private requests: HttpRequest<any>[] = [];
    url: string;

    constructor(private loaderService: SpineerService) { }
  
    removeRequest(req: HttpRequest<any>) {
        var url = environment.baseUrl
        const i = this.requests.indexOf(req);
      if (i >= 0) {
        this.requests.splice(i, 1);
      }
      this.loaderService.isLoading.next(this.requests.length > 0);
    }
  
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  

        let token = localStorage.getItem('crave_restaurant_data') ? JSON.parse(localStorage.getItem('crave_restaurant_data')).access_token : '';
        let selectedLang = '';
        // if(localStorage.getItem('vendorData')){
        //     selectedLang = JSON.parse(localStorage.getItem('vendorData')).selected_language;
        // }
        if (!token) token = '';
        let url = environment.baseUrl;

        url += req.url;


        req.headers.append('access_token', token);
        req.headers.append('language', selectedLang); // en || sw

        const copiedReq = req.clone({
            headers: new HttpHeaders({
                'access_token':  token,
                'language': selectedLang
            }),
            url: url,
        });


      this.requests.push(copiedReq);
  
  
      this.loaderService.isLoading.next(true);
      return Observable.create(observer => {
        const subscription = next.handle(copiedReq)
          .subscribe(
            event => {
              if (event instanceof HttpResponse) {
                // this.removeRequest(copiedReq);
                observer.next(event);
              }
            },
            err => {
              // this.removeRequest(copiedReq);
              observer.error(err);
            },
            () => {
              // this.removeRequest(copiedReq);
              observer.complete();
            });
        // remove request from queue when cancelled
        return () => {
          // this.removeRequest(copiedReq);
          subscription.unsubscribe();
        };
      });
    }
  }