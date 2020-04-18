import { Component, OnInit, TemplateRef } from '@angular/core';
import { DataStorageService } from 'src/app/services/datastorage.service';
import Contact from 'src/app/models/Contact';
import { Router, NavigationEnd } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-list-contact',
  templateUrl: './list-contact.component.html',
  styleUrls: ['./list-contact.component.css']
})
export class ListContactComponent implements OnInit {
  modalRef: BsModalRef;
  contacts:Contact[];
  deleteIndex:number;
  contactToBeEdited:Contact;
  contactToBeDeleted:Contact;
  editIndex:number;
  filterText:string;
  constructor(private modalService: BsModalService, private dataService:DataStorageService,private router:Router) { }

  ngOnInit(): void {
    this.contacts=this.dataService.getContacts();
  }

  deleteContact(contact:Contact,index:number){
    this.dataService.deleteContact(contact);
    this.contacts=this.dataService.getContacts();
  }

  editContact(contact:Contact,index:number){
    this.router.navigateByUrl('/update', { state: { contact: contact,index:index } });
  }

  viewDetails(contact:Contact){
    this.router.navigateByUrl('/detail', { state: { contact: contact } });
  }

  openDeleteModal(template: TemplateRef<any>,contact:Contact,index:number) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
    this.deleteIndex=index;
    this.contactToBeDeleted=contact;
  }
  confirmDelete(){
    this.deleteContact(this.contactToBeDeleted,this.deleteIndex);
    this.deleteIndex=null;
    this.contactToBeDeleted=null;
    this.modalRef.hide();
  }
  decline(){
    this.modalRef.hide();
  }

  openEditModal(template: TemplateRef<any>,contact,index) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
    this.editIndex=index;
    this.contactToBeEdited=contact;
  }
  confirmEdit(){
    this.editContact(this.contactToBeEdited,this.editIndex);
    this.editIndex=null;
    this.contactToBeEdited=null;
    this.modalRef.hide();
  }


}
