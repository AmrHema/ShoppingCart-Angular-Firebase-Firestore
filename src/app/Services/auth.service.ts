import { Injectable } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import * as firebase from 'firebase';

import { Observable, EMPTY, throwError, of } from 'rxjs'
import { switchMap } from 'rxjs/operators';

import { userInfo } from './userInfo';
import { UserService } from './user.service';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

// import  'rxjs/add/operator/switchMap';
// import 'rxjs/add/observable/of';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<firebase.User>;
  // user$: Observable<userInfo>;
  user: Observable<userInfo>;
  userUId;
  constructor(private angularFirestore: AngularFirestore, private angularFireAuth: AngularFireAuth, private activatedRoute: ActivatedRoute, private userService: UserService) {
    // this.user$ = angularFireAuth.authState;
    // angularFireAuth.authState.subscribe(user => {
    //   if (user) this.userUId = user.uid;
    // });

    // this.angularFireAuth.authState.subscribe(user=>{let id = user.uid;
    //      return this.angularFirestore.doc<userInfo>(`users/${user.uid}`).valueChanges() })
    this.user$ = angularFireAuth.authState.pipe(switchMap(user => {
      if (user) {
        this.userUId = user.uid;
        return this.angularFirestore.doc<userInfo>(`users/${user.uid}`).valueChanges()
      }
      else {
        // return EMPTY;
        return of(null);
      }

    }))

  }



  signUp(email, password) {
    return this.angularFireAuth.auth.createUserWithEmailAndPassword(email, password);
  }

  loginwithEmailPassword(email, password) {
    return this.angularFireAuth.auth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    this.angularFireAuth.auth.signOut();
  }

  get AppUser$(): Observable<userInfo> {
    return this.user$.pipe(switchMap(user => {
      if (user) { return this.userService.getUser(user.uid).valueChanges() }
      else { return of(null) }
    }));

  }

  // login() {
  //   this.angularFireAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  // }

  faceLogin() {
    const provider = new auth.FacebookAuthProvider();
    return this.oAuthLogin(provider);
  }

  googleLogin() {
    // return this.angularFireAuth.auth.signInWithPopup(new auth.GoogleAuthProvider()).then((credential) => {
    //   this.updatUserData(credential.user)
    // });

    const provider = new auth.GoogleAuthProvider();
    return this.oAuthLogin(provider);
  }
  private oAuthLogin(provider) {
    return this.angularFireAuth.auth.signInWithPopup(provider).then((credential) => {
      this.updatUserData(credential.user)
    });
  }

  private updatUserData(user) {
    const userRef: AngularFirestoreDocument<userInfo> = this.angularFirestore.doc<userInfo>(`users/${user.uid}`);
    const data: userInfo = {
      uid: user.uid, email: user.email, displayName: user.displayName, photoURL: user.photoURL
    }
    return userRef.set(data);

  }




}
