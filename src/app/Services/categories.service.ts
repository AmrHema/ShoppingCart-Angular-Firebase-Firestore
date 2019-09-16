import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private angularFirestore: AngularFirestore) { }

  addNewcategorie(title: string) {
   
    return new Promise((resolve, reject) => {
      this.angularFirestore.collection('categories').add({
        title
      }).then(()=>resolve(title + 'Added Succeded')).catch(()=>reject(title + 'Added failed'));
    })
  }

  getCatsValues(){
    return this.angularFirestore.collection('categories').valueChanges();

  }
  getAllcategories() {
    return this.angularFirestore.collection('categories').snapshotChanges();

  }

  getCategorieByID(catID: string) {
    return this.angularFirestore.doc('categories/' + catID).valueChanges();
  }

  updateCategorieByID(catID: string, title:string) {
    return this.angularFirestore.doc('categories/' + catID).update({title});
  }

  deleteCategorieByID(catID: string) {
    return this.angularFirestore.doc('categories/' + catID).delete();
  }



}
