import { Injectable } from '@angular/core';
import { AngularFireDatabase,AngularFireList } from 'angularfire2/database';
import { Product } from '../models/product';
import { ToastrService, ToastrModule } from 'ngx-toastr';


//ngularFireDatabase :  es para utilizar la conexion a firebase
//AngularFireList :crear una lista de los datos que traiga de firebase
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  productList : AngularFireList<any>;//lista de producto de tipo angularfirelist de tipo any  el tipo lo define firebase
  selectedProduct: Product = new Product();
  constructor( private _firebase:AngularFireDatabase, private toastr:ToastrService) { }


  //definir metodos

  getProducts(){
      this.productList = this._firebase.list( 'products');//a productList se le asigna todo lo que se obtengo con firebse list list todo lo que este en el coleccion products
      return this.productList.snapshotChanges();
  
  }

  insertProduct( product:Product ){
    this.productList.push({
      name: product.name,
      category: product.category,
      location: product.location,
      price: product.price

    });   //agregar un dato a final de la lista

    this.toastr.success("Successfull Operation","Product Added")
  }


  updateProduct( product:Product ){
    this.productList.update(product.$key,{//se le pasa la clave para que lo encuentre y actualice los datos 7
      name: product.name,
      category: product.category,
      location: product.location,
      price: product.price
      
    })

    this.toastr.success("Successfull Operation","Product Edited")
  }

  deleteProduct( $key:string){
      this.productList.remove($key);
      
  }
}
