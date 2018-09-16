import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

//service
import { ProductService } from '../../../services/product.service';

//Product Class
import { Product } from '../../../models/product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  constructor( public productService:ProductService) { }

  ngOnInit() {

    this.productService.getProducts();
    this.resetForm();
  }

  onSubmit( producForm:NgForm ){

    if(producForm.value.$key == null){
        this.productService.insertProduct(producForm.value);
    }
    else{
    this.productService.updateProduct(producForm.value);  //ingresar producto 
 
    }

    this.resetForm( producForm );
  }

  resetForm( productForm?:NgForm){
    if (productForm != null) {
      productForm.reset();//resetear formulario
      this.productService.selectedProduct = new Product();//dejar el selectedproduct vacio
    }
  }
}
