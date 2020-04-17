import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListContactComponent } from './components/list-contact/list-contact.component';
import { ContactFormComponent } from './components/contact-form/contact-form.component';
import { ContactDetailsComponent } from './components/contact-details/contact-details.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';


const routes: Routes = [{path:'list',component:ListContactComponent},
{path:'dashboard',component:DashboardComponent},
{path:'add',component:ContactFormComponent},
{path:'update',component:ContactFormComponent},
{path:'detail/:index',component:ContactDetailsComponent},
{path:'',redirectTo:'/dashboard',pathMatch:'full'}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
