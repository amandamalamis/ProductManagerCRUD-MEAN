import { Component, OnInit, Input } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-home',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.css']
})
export class AllComponent implements OnInit {

  constructor(private _httpService: HttpService) { }
  products = [];
  editProduct= {_id: '', title: '', price: '', url: ''};
  loadEdit=false;
  show: {};
  deleteProduct= {_id:'', title: '', price: '', url: ''};

  ngOnInit() {
    this.getAllProducts();
  }

  getAllProducts() {
    let observable = this._httpService.getAll();
    observable.subscribe(data => {
      console.log("successful route", data);
      for (var product in data){
      this.products.push(data[product])}
      // this.tasks = data;
    })
  }

  showData(product) {
    console.log(product);
    this.show = product;
  }
  getOneProduct(product) {    
    this.loadEdit=true;
    this.editProduct = {_id: product._id, title: product.title, price: product.price, url: product.url};
    console.log("Success at getone prod- edit ")
  }

  onDelete(product) {  
    this.deleteProduct = {_id: product._id, title: product.title, price: product.price, url: product.url};
    let observable = this._httpService.deleteProduct(this.deleteProduct);
    observable.subscribe(data => {
      for (var i=0;i< this.products.length; i++) { //this edits the tasks without a refresh by updating the tasks array (Defined above)
        if(this.products[i]['_id'] == this.deleteProduct._id) {
          this.products.splice(i,1); //removes array element starting at index i and for 1 value (only that index)
        }
      }

    });
  }
}
