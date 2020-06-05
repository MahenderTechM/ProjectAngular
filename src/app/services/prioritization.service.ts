import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders  } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Prioritization } from '../models/prioritization';
import { FormBuilder } from '@angular/forms';


@Injectable({
  providedIn: 'root'
})
export class PrioritizationService {

  formData: Prioritization;
 
  constructor(private http: HttpClient, private fb: FormBuilder){}

  private GetProjectPageListUrl:string=environment.Base_Url+"/Project/GetProjectPageDetails";
  GetProjectList() {
   return this.http.get(this.GetProjectPageListUrl);
 }

 private GetActionItemsPageListUrl:string=environment.Base_Url+"/Project/GetActionItemsPageDetails";
 debugger;
 GetActionItemDetails(){
   return this.http.get(this.GetActionItemsPageListUrl);
 }

 private GetCtnApprovalPageListUrl:string=environment.Base_Url+"/Project/GetCtnApprovalPageDetails";
 GetCtnApprovalDetails(projectId:number){
   return this.http.get(this.GetCtnApprovalPageListUrl);
 }

 private GetPrioLookupdataUrl:string=environment.Base_Url+"/NewProject/GetAllLookup";
 GetPrioLookup() {
  return this.http.post(this.GetPrioLookupdataUrl,{});
}

  // saveData(prioritization1: Prioritization){
  //    //return this.http.post('https://netqaappweb.amat.com/NMACAPTRACKER_API/api/AdminTables',prioritization1)
  //   return this.http.post('https://localhost:44386/api/AdminTables',prioritization1)
  // }
  
savePriorDetailsArray(Prioritization: any) {
let headers = new HttpHeaders();
headers = headers.set('Content-Type', 'application/json; charset=utf-8');
   //let  url ='https://netqaappweb.amat.com/NMACAPTRACKER_API/api/AdminTables/'+ Prioritization.projectId;
     let  url ='https://localhost:44397/api/Project/UpdateProjectPageDetails?projectId='+ Prioritization.projectId;
     console.log(url + Prioritization);
     return this.http.put(url, Prioritization,{headers:headers});

  }

  onSaveAccessDetails(Prioritization: any) {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
       //let  url ='https://netqaappweb.amat.com/NMACAPTRACKER_API/api/AdminTables/'+ Prioritization.projectId;
         let  url ='https://localhost:44397/api/Project/UpdateProjectPageDetails?projectId='+ Prioritization.projectId;
         console.log(url + Prioritization);
         return this.http.put(url, Prioritization,{headers:headers});
    
      }


}
