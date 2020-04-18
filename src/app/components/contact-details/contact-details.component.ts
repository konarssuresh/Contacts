import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataStorageService } from 'src/app/services/datastorage.service';
import Contact from 'src/app/models/Contact';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.css']
})
export class ContactDetailsComponent implements OnInit {
  stateObj:any;
  contact:Contact;
  constructor(private activatedRoute:ActivatedRoute,private router:Router ) { }

  ngOnInit(): void {

    this.activatedRoute.paramMap.pipe(
      map(() => window.history.state)
    ).subscribe((data)=>{
      if(data.contact){
        this.stateObj=data;
        this.contact=data.contact;
      }
      else{
        this.router.navigate(['dashboard']);
      }
    })
  }
}
