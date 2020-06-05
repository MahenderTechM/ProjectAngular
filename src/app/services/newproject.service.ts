import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ProjectDetails } from '../shared/models/ProjectDetails';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewprojectService {
  private AddNewProjectPageListUrl:string=environment.Base_Url+"/Project/CreateNewProjectPageDetails";
  private GetLookupdataUrl:string=environment.Base_Url+"/NewProject/GetAllLookup";
  constructor(private http:HttpClient) { }
  
  CreateNewProjectList(newProject:ProjectDetails){
    debugger;
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/json','No-Auth':'True' });    
    return this.http.post<any>(this.AddNewProjectPageListUrl,newProject,{headers
    :reqHeader});
 }
 GetLookup() {
    //return this.http.get<Prioritization[]>('https://netqaappweb.amat.com/NMACAPTRACKER_API/api//');
    return this.http.post(this.GetLookupdataUrl,{});
}
}
