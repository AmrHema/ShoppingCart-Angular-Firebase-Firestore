import { async } from '@angular/core/testing';
import { shopping } from './../interface/shopping.interface';
import { Component, OnInit, Input } from '@angular/core';
import { ShoppingCardService } from '../Services/shopping-card.service';
import { products } from '../interface/products-interface';
import { AuthService } from '../Services/auth.service';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';
@Component({
  selector: 'productCard',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {

  // shoppingItems: shopping[]=[];
  shoppingItems: any;


  constructor(private shoppingCardService: ShoppingCardService, private authService: AuthService) {

  }
  @Input('product') product: products;
  @Input('index') index;
  add: number = -1;

  addToCart(index: number) {
    this.add = +index;
  }

  buy(amount: number) {
    if (!amount || amount < 1) {
      Swal.fire('Opps ... !', 'Sorry ! Amount must be more than 0 !', 'error')
    }
    else {
      let productSelected = this.product;
      let data = {
        title: productSelected.title, amount: amount, price: productSelected.price, imgUrl: productSelected.imgUrl, productID: productSelected.id
      }
      this.shoppingCardService.addToCart(data, productSelected.id, amount).then(() => {
        this.add = -1;
        Swal.fire('Thanks', 'Product added Succeded !', 'success')
      }).catch(err => {
        Swal.fire('Opps ... !', err.message, 'error')
      });
    }
  }
  getAmount() {
    const productMe: shopping = {};
    if (!this.shoppingItems) { return 0 }
    for (var i = 0; i < this.shoppingItems.length; i++) {
      if (this.shoppingItems[i].product.productID == this.product.id) {
        return this.shoppingItems[i].amount;
      }

    }
  }

  async ngOnInit(): Promise<void> {

    (await this.shoppingCardService.getItems()).valueChanges().subscribe(data => {
      this.shoppingItems = data;
      // console.log(this.shoppingItems)
    })

  }

 


}