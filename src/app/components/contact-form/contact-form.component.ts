import { Component, OnInit } from '@angular/core';
import { Router,  ActivatedRoute, NavigationEnd } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Contact from 'src/app/models/Contact';
import { DataStorageService } from 'src/app/services/datastorage.service';
import { filter, map } from 'rxjs/operators'

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit {
  contactsForm:FormGroup;
  errorMsg:string;
  isEdit:boolean;
  stateObj:any;
  oldValueToEdit:Contact;

  constructor(private fb:FormBuilder,private activatedRoute:ActivatedRoute,private router:Router
    ,private storageService:DataStorageService) { }

  ngOnInit(): void {
    let ContactObj:Contact;
    
    this.activatedRoute.paramMap.pipe(
      map(() => window.history.state)
    ).subscribe((data)=>{
      this.stateObj=data;;
    })

    if(this.stateObj.contact){
      this.isEdit=true;
      ContactObj=this.stateObj.contact;
    }else{
      ContactObj={
        FirstName:"",
        LastName:"",
        phoneNumber:"",
        Email:"",
        status:""
      }
    }

    this.contactsForm=this.fb.group({
      FirstName:[ContactObj.FirstName,{updateOn:"blur",validators:[Validators.required]}],
      LastName:[ContactObj.LastName,{updateOn:"blur",validators:[Validators.required]}],
      Email:[ContactObj.Email,{updateOn:"blur",validators:[Validators.required,Validators.email]}],
      phoneNumber:[ContactObj.phoneNumber,{updateOn:"blur",validators:[Validators.required,Validators.pattern(/^[0-9]{10}$/)]}],
      status:[ContactObj.status,[Validators.required]]
    })
  }

  onSubmit(){
    if(this.isEdit){
      //edit mode code to be added
      let contactToUpdate:Contact={
          FirstName:this.contactsForm.controls.FirstName.value,
          LastName:this.contactsForm.controls.LastName.value,
          Email:this.contactsForm.controls.Email.value,
          phoneNumber:this.contactsForm.controls.phoneNumber.value,
          status:this.contactsForm.controls.status.value
      }
      this.storageService.editContact(contactToUpdate,this.stateObj.contact);
      this.router.navigateByUrl('/list');
    }else{
      let contactToAdd:Contact={
        FirstName:this.contactsForm.controls.FirstName.value,
        LastName:this.contactsForm.controls.LastName.value,
        Email:this.contactsForm.controls.Email.value,
        phoneNumber:this.contactsForm.controls.phoneNumber.value,
        status:this.contactsForm.controls.status.value
      }

      let added:boolean=this.storageService.addContact(contactToAdd);
      if(added){
        this.router.navigate(['list']);
        this.errorMsg=null;
      }else{
        this.errorMsg="This number or name already exists"
      }
    }

  }

}
