import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataStorageService } from 'src/app/services/datastorage.service';
import Contact from 'src/app/models/Contact';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.css']
})
export class ContactDetailsComponent implements OnInit {
  stateObj:any;
  contact:Contact;
  constructor(private router:Router,private activatedRoute:ActivatedRoute,private dataService:DataStorageService ) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe((params)=>{
      console.log(params);
      this.contact=this.dataService.getContact(params['index']);
      console.log(this.contact);
    })
  }

  

}
