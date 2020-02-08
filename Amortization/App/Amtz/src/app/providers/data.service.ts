import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { firestore } from 'firebase';
import * as firebase from 'firebase/app';
import { DataBaseCollections } from "src/environments/environment";
import { AmortizationCls } from '../data/models/AmortizationCls';
import { AngularFireDatabase, AngularFireList, PathReference } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public listAmortization: Array<AmortizationCls>;
  public amortizationsListRef: PathReference;
  constructor(private afs: AngularFirestore, private afd: AngularFireDatabase, ) {
    this.amortizationsListRef = firebase.database().ref(DataBaseCollections.amortizations + "/" + firebase.auth().currentUser.uid);
  }

  // addObject(collectionStr: string, objectToInsert: any) {
  //   return new Promise<any>((resolve, reject) => {
  //     this.afs.collection(collectionStr).add(JSON.parse(JSON.stringify(objectToInsert)))
  //       .then(
  //         (res) => {
  //           resolve(res)
  //         },
  //         err => reject(err)
  //       )
  //   })
  // }

  addObject(objectToInsert: any, userId: string) {
    return new Promise<any>((resolve, reject) => {
      this.afd.list(this.amortizationsListRef, ref => {
        return ref.equalTo(userId, 'UserId');
      }).push(objectToInsert)
        .then(
          (res) => {
            resolve(res)
          },
          err => reject(err)
        )
    })
  }

  getListAmortizations() {
    return new Promise<any>((resolve, reject) => {
      this.afd.list(this.amortizationsListRef, ref => ref.orderByChild('Order'))
      .valueChanges().toPromise()
      .then(
        (res) => {
          debugger;
          resolve(res)
        },
        err => reject(err)
      );
    })
  }
}
