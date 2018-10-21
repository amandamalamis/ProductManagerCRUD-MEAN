import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Router, Params, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent implements OnInit {
  showProduct = { _id: "", title: "", price: "", url: "", created_at: Date, updated_at: Date };
  products = [];
  idToView = ""
  params: any;
  // show: object;

  constructor(private _httpService: HttpService, private _route: ActivatedRoute, private _router: Router) { }

  ngOnInit() { 
    this._route.params.subscribe((params: Params) => {
    this.idToView = params['id'];
    this.getProduct();
  })
}

  goHome() {
    this._router.navigate(['/']);
    this.getProduct();
  }

  getProduct(){
    let observable = this._httpService.getProduct(this.idToView);
    observable.subscribe(data => {
      console.log('got product: ', data)
      this.showProduct = data['product'];
    })
  }
  
  showData(product) {
    console.log(product);
    this.showProduct = product;
  }
}

