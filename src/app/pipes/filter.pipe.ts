import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any[], filterText:string): any[] {
    if(filterText&& filterText.length>0){
      value=value.filter((contact)=>{
        if(!((contact.FirstName+" "+contact.LastName).toLowerCase().search(filterText.toLowerCase()))||
        !contact.LastName.toLowerCase().search(filterText.toLowerCase())){
          return true;
        }
      })
    }

    if(value && value.length>0){
      value=value.sort((a,b)=>{
        if((a.FirstName+" "+a.LastName).toLowerCase()>=(b.FirstName+" "+b.LastName).toLowerCase()){
          return 1;
        }else{
          return -1
        }
      })
    }

    return value;
  }

}
