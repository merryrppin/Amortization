import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private db: AngularFireDatabase) { }
 
  getFiles() {
    let ref = this.db.list('files');
 
    // return ref.snapshotChanges().map(changes => {
    //   return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
    // });
  }
 
  uploadToStorage(information) {
    let newName = `${new Date().getTime()}.txt`;
    
    // return this.afStorage.ref(`files/${newName}`).putString(information);
  }
 
  storeInfoToDatabase(metainfo) {
    let toSave = {
      created: metainfo.timeCreated,
      url: metainfo.downloadURLs[0],
      fullPath: metainfo.fullPath,
      contentType: metainfo.contentType
    }
    return this.db.list('files').push(toSave);
  }
 
 
  deleteFile(file) {
    let key = file.key;
    let storagePath = file.fullPath;
 
    let ref = this.db.list('files');
 
    ref.remove(key);
    // return this.afStorage.ref(storagePath).delete();
  }
}
