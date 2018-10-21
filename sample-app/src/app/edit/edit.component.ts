import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Router, Params, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  editProduct = { _id: "", title: "", price: "", url: "" };
  products = [];
  error= { title: '', price: '', url: ''};
  loadEdit = false;
  idToEdit = ""
  params: any;
  
  constructor(private _httpService: HttpService, private _route: ActivatedRoute, private _router: Router) { }

  ngOnInit() {
      this._route.params.subscribe((params: Params) => {
      this.idToEdit = params['id'];
      this.getProduct();
    })
  }
  
  goToAll() {
    this._router.navigate(['/products']);
  }

  getProduct(){
    let observable = this._httpService.getProduct(this.idToEdit);
    observable.subscribe(data => {
      console.log('got prod: ', data)
      this.editProduct = data['product'];
    })
  }

  onSubmitEdit() {
    let observable = this._httpService.editProduct(this.editProduct);
    observable.subscribe(data => {
      if (data['errors']){
        this.error = data['errors'];
      }
      else{
        this.goToAll();
        // this._router.navigate(['/home'])
      }
      // console.log("Data from EDIT ", data);
      // this.editTask = { _id: "", title: "", description: "" };
    })
  }

}

