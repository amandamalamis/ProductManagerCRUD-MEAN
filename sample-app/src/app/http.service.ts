import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
//   providedIn: 'root'
export class HttpService {
  constructor(private _http: HttpClient) {
    console.log("Entered http service file");
  }
  getProduct(id) {
    return this._http.get('/products/' + id);
  }

  getAllProducts() {
    return this._http.get('/products');
  }
  
  getAll() {
    return this._http.get('/products');
  }


  getOneProduct(_id){
    return this._http.get(`/${_id}`);
  }

  onButtonClick(products): void {
    console.log(`Click event is working with event: ${products}`);
  }

  addProduct(newProduct){
    return this._http.post('/products', newProduct);
  }

  editProduct(editProduct) {
    return this._http.put(`/products/${editProduct._id}`, editProduct);
  }
  deleteProduct(_id){
  return this._http.delete(`/products/${_id}`);
  }
  removeProduct(_id){
    return this._http.delete(`/products/${_id}`);
  }

}





// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class HttpService {

//   constructor(private _http: HttpClient) { }

//   getAuthors() {
//     return this._http.get('/authors');
//   }

//   // createAuthor(data) {
//   //   return this._http.post('/authors', data);
//   // }

//   onButtonClick(tasks): void {
//     console.log(`Click event is working with event: ${tasks}`);
//   }


//   getAuthor(id) {
//     return this._http.get(`/authors/${id}`);
//   }

//   editAuthor(id, data) {
//     return this._http.put(`/authors/${id}`, data);
//   }

//   deleteAuthor(id) {
//     return this._http.delete(`/authors/${id}`);
//   }
  
// }

