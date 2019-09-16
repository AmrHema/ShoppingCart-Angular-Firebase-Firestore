import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';



@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private angularFirestore: AngularFirestore) { }
  addNewUser(uid, displayName, address, email) {
    return this.angularFirestore.doc('users/' + uid).set({ uid,displayName, address, email })
  }

  save(user) {
    return this.angularFirestore.doc('users/' + user.id).set(user);
  }

  getUser(uid) {
    return this.angularFirestore.doc('users/' + uid);
  }









}




