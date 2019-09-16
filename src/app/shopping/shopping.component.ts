import { Subject } from 'rxjs';
import { ShoppingCardService } from './../Services/shopping-card.service';
import { Component, OnInit, Input } from '@angular/core';
import { shopping } from '../interface/shopping.interface';
import Swal from "sweetalert2";
import { Router } from '@angular/router';
@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.css']
})
export class ShoppingComponent implements OnInit {
  cart: shopping[] = [];
  // cart$;
  constructor(private shoppingCardService: ShoppingCardService, private router: Router) { }

  delete(i) {
    this.shoppingCardService.delete(this.cart[i].id).then(() => {
      Swal.fire('Thanks !', 'Product deleted succeded !', 'success')
    }).catch((error => { Swal.fire('Opps ...', error.message, 'error') }));
  }

  save(i) {
    this.shoppingCardService.save(this.cart[i].id, this.cart[i].amount).then(() => {
      Swal.fire('Thanks !', 'Product Updated succeded !', 'success')
    }).catch((error => { Swal.fire('Opps ...', error.message, 'error') }));

  }
  async  ngOnInit() {
    (await this.shoppingCardService.getCart()).subscribe(data => {
      this.cart = data.map(element => {
        return {
          id: element.payload.doc.id, ...element.payload.doc.data()
        }
      })
    })

  }

  CheckOut() {    Swal.fire('Thanks !', 'Thanks for your shopping with us !', 'success');  }

  returnProduct() {
    this.router.navigateByUrl('/products');
  }





}

