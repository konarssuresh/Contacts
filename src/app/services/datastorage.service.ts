import { Inject, Injectable } from '@angular/core';
import Contact from '../models/Contact';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import InitialContacts from '../../assets/initialContacts';

const STORAGE_KEY = 'contacts';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {


  constructor(@Inject(LOCAL_STORAGE) private storage: StorageService) { }

  saveInitItems(){
    this.storage.set(STORAGE_KEY,InitialContacts);
  }

  getContacts():Contact[]{
    let savedContacts:Contact[]=this.storage.get(STORAGE_KEY);
    return savedContacts;
  }

  findContact(contact){
    let savedContacts=this.getContacts();

    let foundContact = savedContacts.find((savedContact)=>{
      if((savedContact.FirstName==contact.FirstName && savedContact.LastName == contact.LastName) ||
      savedContact.phoneNumber==contact.phoneNumber ){
        return true;
      }
    })
    return foundContact;
  }

  addContact(contact:Contact){
    let foundContact=this.findContact(contact);
    if(foundContact){
      return false;
    }else{
      let savedContact=this.getContacts();
      savedContact.push(contact);
      this.storage.set(STORAGE_KEY,savedContact);
      return true;
    }
  }

  editContact(contact:Contact,index:number){
    let savedContact=this.getContacts();
    savedContact[index]=contact;
    this.storage.set(STORAGE_KEY,savedContact);
    return true;
  }

  deleteContact(index:number){
    let savedContacts=this.getContacts();
    savedContacts.splice(index,1);
    this.storage.set(STORAGE_KEY,savedContacts);
  }

  getContact(index:number):Contact{
    return this.getContacts()[index]
  }
}
