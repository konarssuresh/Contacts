import { Component, OnInit } from '@angular/core';
import { DataStorageService } from './services/datastorage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'ContactsApp';
  constructor(private dataStorageService:DataStorageService){
  }
  
  ngOnInit(): void {
    let contacts=this.dataStorageService.getContacts();
    if(!contacts){
      this.dataStorageService.saveInitItems();
    }
  }

}
