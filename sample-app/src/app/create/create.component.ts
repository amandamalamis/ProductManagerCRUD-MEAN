import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  newProduct = { title: '', price: '', url: '' };
  products = [];
  error= { title: '', price: '', url: ''};
  message = '';

  constructor(private _httpService: HttpService, private _router: Router) { }
  ngOnInit() {
  }
  goHome(){
    this._router.navigate(['/']);
  }
  goToAll(){
    this._router.navigate(['/products']);
  
  }
  onSubmitAdd(){
    let observable = this._httpService.addProduct(this.newProduct);
    observable.subscribe(data => { 
      if (data['errors']){
        this.error = data['errors']
      }
      else{
        this.goToAll();
      }
    })
  }  
}

