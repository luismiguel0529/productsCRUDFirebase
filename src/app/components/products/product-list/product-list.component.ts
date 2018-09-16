import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../models/product';
import { ToastrService } from 'ngx-toastr';




@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {


  productList: Product[];
  constructor(private productService:ProductService ,private toaster:ToastrService) { }

  ngOnInit() {
   


    this.productService.getProducts().subscribe(item=>{
      this.productList = [];
      item.forEach(element =>{
       let x = element.payload.toJSON();
       x["$key"] = element.key;
       this.productList.push(x as Product);
      })
    })
  }

  onEdit(product:Product){
    this.productService.selectedProduct = Object.assign({},product);
    
  }
  onDelete($key:string){

    let asnwer = confirm("Do you want to delete the data?")
    if (asnwer) {
      
      this.productService.deleteProduct($key);
      this.toaster.success("Successfull Operation","Product Deleted")
          
    } 
       
    
  }

}
