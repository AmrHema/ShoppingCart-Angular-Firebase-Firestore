import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private angularFirestore: AngularFirestore, private angularFireStorage: AngularFireStorage) { }

  addNewProduct(title: string, price: number, categorie: string, image: File) {

    return new Promise((resolve, reject) => {
      let ref = this.angularFireStorage.ref('products/' + image.name);
      ref.put(image).then(() => {
        ref.getDownloadURL().subscribe(imgUrl => {
          this.angularFirestore.collection('products').add({
            title, price, categorie, imgUrl
          }).then(() => resolve(title + 'Added Succeded'));

        })
      })
    })
  }

  getAllProducts() {
    return this.angularFirestore.collection('products').snapshotChanges();
  }

  getProductByID(productID: string) {
    return this.angularFirestore.doc('products/' + productID).valueChanges();
  }

  updateProductByID(productID: string, title, price, categorie, imgUrl) {
    return this.angularFirestore.doc('products/' + productID).update({ title, price, categorie, imgUrl });
  }

  deleteProductByID(productID: string) {
    return this.angularFirestore.doc('products/' + productID).delete();
  }


}
