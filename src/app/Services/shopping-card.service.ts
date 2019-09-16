import { take, map } from 'rxjs/operators';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { products } from '../interface/products-interface';
import { AuthService } from './auth.service';
import { IshoppingCart } from '../model/IShoppingCart';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCardService {

  constructor(private angularFirestore: AngularFirestore, private authService: AuthService) { }
  // addToCart(product: products) {
  //   return this.angularFirestore.collection(`users/${this.authService.userUId}/cart`).add(product);
  // }



  async getCart() {
    let cartid = await this.getOrcreateCartID();
    return await this.angularFirestore.collection(`users/${this.authService.userUId}/cart/${cartid}/items`).snapshotChanges();
  }
  

  //getItem
  public async getItems() {
    let cartID = await this.getOrcreateCartID();
    return this.angularFirestore.collection(`users/${this.authService.userUId}/cart/${cartID}/items`);
  }


  async delete(id) {
    let cartid = await this.getOrcreateCartID();
    return await this.angularFirestore.doc(`users/${this.authService.userUId}/cart/${cartid}/items/${id}`).delete();

  }
  async save(productID, amount) {
    let cartid = await this.getOrcreateCartID();
    return await this.angularFirestore.doc(`users/${this.authService.userUId}/cart/${cartid}/items/${productID}`).update({
      amount
    });
  }
  private create() {
    return this.angularFirestore.collection(`users/${this.authService.userUId}/cart`).add({
      dateCreated: new Date().getDate()
    })
  }

  public async getOrcreateCartID() {
    let cartID = localStorage.getItem('CartID');
    if (cartID) return cartID;
    // else
    let result = await this.create();
    localStorage.setItem('CartID', result.id);
    return result.id;
  }
  //getItem
  getItem(cartID: string, productID: string) {
    return this.angularFirestore.doc(`users/${this.authService.userUId}/cart/${cartID}/items/${productID}`);
  }

  //Add or Mince quantity
  async addToCart(product, productID, amount) {
    //alert(productID)
    let cartid = await this.getOrcreateCartID();
  //  return this.angularFirestore.doc(`users/${this.authService.userUId}/cart/${cartid}/items/${productID}`).set(product);
     return this.angularFirestore.doc(`users/${this.authService.userUId}/cart/${cartid}/items/${productID}`).set({ product, amount });
  }

}
