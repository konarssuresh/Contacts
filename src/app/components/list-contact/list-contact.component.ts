import { Component, OnInit } from '@angular/core';
import { DataStorageService } from 'src/app/services/datastorage.service';
import Contact from 'src/app/models/Contact';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-list-contact',
  templateUrl: './list-contact.component.html',
  styleUrls: ['./list-contact.component.css']
})
export class ListContactComponent implements OnInit {

  contacts:Contact[];
  constructor(private dataService:DataStorageService,private router:Router) { }

  ngOnInit(): void {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
          return;
      }
      window.scrollTo(0, 0)
     });
    this.contacts=this.dataService.getContacts();
  }

  deleteContact(index:number){
    console.log(index);
    this.dataService.deleteContact(index);
    this.contacts=this.dataService.getContacts();
  }

  editContact(contact:Contact,index:number){
    this.router.navigateByUrl('/update', { state: { contact: contact,index:index } });
  }

  viewDetails(index:number){
    this.router.navigate(['detail',index])
  }

}
